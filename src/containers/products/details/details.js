import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {reqCategories, reqProductInfo} from '../../../api';

const Details = (props) => {

  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({
    categoryId:'',
    categoryName:'',
    desc:'',
    detail:'',
    imgs: [],
    name:'',
    price:''
  })

  useEffect(() => {
    fetchProductDetail()
  },[])

  const fetchProductDetail = async () => {
    const productList = props.productList
    const categoryList = props.categoryList.data
    let productDetail
    let categoryDetail
    if (productList.length){
      productDetail = productList.find( (product) => product._id === params.id)
    }else{
      //ajax
      let result = await reqProductInfo(params.id)
      productDetail = result.data
    }

    if(categoryList){
      categoryDetail = categoryList.find( (category) => category._id === productDetail.categoryId)
    }else{
      let result = await reqCategories()
      categoryDetail = result.data.find( (category) => category._id === productDetail.categoryId)
    }
    setProduct({...productDetail, categoryName:categoryDetail.name})
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <button className="btn btn-primary" type="button" onClick={() => {navigate(-1)}}>GO Back</button>
        </div>
        <div className="card-body">
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
            <span>{product.name}</span>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Description</span>
            <span>{product.desc}</span>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Price</span>
            <span>{product.price}</span>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Category</span>
            <span>{product.categoryName}</span>
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Picture</span>
            {
              product.imgs.map( (img, index) => {
                return <img key={index} src={`http://localhost:4000/upload/`+img} alt="img"/>
              })
            }
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">Details</span>
            <span dangerouslySetInnerHTML={{__html: product.detail}}></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    productList: state.productList,
    categoryList: state.categoryList
  })
)(Details);
