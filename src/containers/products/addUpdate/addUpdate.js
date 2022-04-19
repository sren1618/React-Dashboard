import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import EditorConvertToHTML from '../../../components/richTextEditor/richTextEditor'
import {reqCategories, reqUploadImage, reqDeleteImage, reqAddProduct, reqProductInfo, reqUpdateProduct} from '../../../api';
import {globalAlert} from '../../../redux/actions/globalAlertAction';
import {BASE_URL} from '../../../config';

const AddUpdate = (props) => {
  const navigate = useNavigate()
  const richTextRef = useRef();
  const imgInputRef = useRef();
  const params = useParams()
  const [actionType, setActionType] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [uploadedImage, setUploadedImage] = useState({
    path: '',
    files: '',
    name:''
  })
  const [product, setProduct] = useState({
    categoryId:'',
    desc:'',
    detail:'',
    imgs: [],
    name:'',
    price:''
  })

  useEffect(() => {
    fetchCategoryList()
    if(params.id){
      setActionType('Edit')
      fetchProductInfo(params.id)
    }else{
      setActionType('Add')
    }
  },[])

  const fetchProductInfo = async (id) => {
    let productInfo
    let productList = props.productList
    if(productList.length) productInfo = productList.find((product) => (product._id === id))
    else{
      let result = await reqProductInfo(id)
      productInfo= result.data
    }
    setProduct({...productInfo})
    setUploadedImage({...uploadedImage, path:`${BASE_URL}/upload/${productInfo.imgs[0]}` })
    richTextRef.current.setRichText(productInfo.detail)
  }

  const fetchCategoryList = async () => {
    let categoryList = props.categoryList
    if(categoryList){
      let result = await reqCategories()
      categoryList = result.data
    }
    setCategoryList(categoryList)
  }

  const handelUploadImage = async (event) => {
    let formData = new FormData();
    let file = event.target.files[0]
    setUploadedImage ({files:file.name , path: URL.createObjectURL(file), name: ''})
    formData.append("image", file);
    let result = await reqUploadImage(formData)
    console.log(result)
    if(result.status === 0){
      setUploadedImage({files:file.name , path: URL.createObjectURL(file), name:result.data.name})
    }
  }

  const handleDeleteUploadedImage = async () => {
    let result = await reqDeleteImage(uploadedImage.name)
    if (result.status === 0){
      imgInputRef.current.value=''
      setUploadedImage({...uploadedImage,path:  `${BASE_URL}/upload/${product.imgs[0]}`     })
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    let productItem = {}
    productItem._id = params.id
    productItem.categoryId = event.target.category.value
    productItem.name = event.target.title.value
    productItem.price = event.target.price.value
    productItem.desc = event.target.description.value
    if( uploadedImage.files) productItem.imgs = [uploadedImage.name]
    else productItem.imgs = product.imgs[0]
    productItem.detail = richTextRef.current.getRichText()
    let result
    if(actionType === 'Add') result = await reqAddProduct(productItem)
    else  result = await reqUpdateProduct(productItem)
    if(result.status === 0){
      props.globalAlert({show:true, msg:'Added successfully!'})
      navigate('/admin/prod/products', {replace:true})
    }else{
      props.globalAlert({show:true, msg:result.msg})
    }
  }

  return (

    <div className="card">
        <div className="card-header">
          <h2>{actionType} Product</h2>
          <button className="btn btn-primary" type="button" onClick={() => {navigate(-1)}}>GO Back</button>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className=" mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm" >Title</span>
              <input type="text" name='title' className="form-control" aria-label="Sizing example input" defaultValue={product.name}
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className=" mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Description</span>
              <input type="text" name='description' className="form-control" aria-label="Sizing example input" defaultValue={product.desc}
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className=" mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Price</span>
              <input type="text" name='price' className="form-control" aria-label="Sizing example input" defaultValue={product.price}
                     aria-describedby="inputGroup-sizing-sm"/>
            </div>
            <div className=" mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Category</span>
              <select className="form-select" name='category' value={product.categoryId}
                      onChange={(event) => {setProduct({...product, categoryId:event.target.value})}}>
                {
                  categoryList.map( (category) => {
                    return <option key={category._id} value={category._id} name={category.name}>{category.name}</option>
                  })
                }
              </select>
            </div>
            <div className="mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">Picture</span>
              <input className="form-control" name='picture' type="file" id="formFile" ref={imgInputRef}
                     onChange={ (event) => {handelUploadImage(event)}}/>
              <img src={uploadedImage.path} alt="" />
              {/*<button type='button' onClick={handleDeleteUploadedImage}>Delete</button>*/}
            </div>
            <div className="mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">details</span>
              <EditorConvertToHTML ref={richTextRef}/>
            </div>
            <input className="form-control" type="submit" style={{backgroundColor: '#F24A72', cursor:'pointer'}}/>
          </form>
        </div>
      </div>
  );
}

export default connect(
  state => ({
    categoryList: state.categoryList,
    productList: state.productList
  }),
  {
    globalAlert
  }
)(AddUpdate);
