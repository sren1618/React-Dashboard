import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {reqCategories, reqProductInfo} from '../../../api';
import './details.scss'

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
    // console.log(productDetail)
    // console.log(categoryDetail)
    setProduct({...productDetail, categoryName:categoryDetail.name})
  }

  return (
    <div className="card">
      <div className="card-header">
        <button className="btn btn-primary" type="button" onClick={() => {navigate(-1)}}>GO Back</button>
      </div>
      <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className='title'>Title:</span>
          <div className=' content'>{product.name}</div>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className='title'>Description:</span>
          <div className=' content'>{product.desc}</div>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className='title'>Price:</span>
          <div className=' content'>{product.price}</div>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className='title'>Category:</span>
          <div className=' content'>{product.categoryName}</div>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span >Picture:</span>
          {
            product.imgs.map( (img, index) => {
              return <img key={index} src={`http://localhost:5001/upload/`+img} alt="img"/>
            })
          }
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className='title'>Details:</span>
          <div className='content'>
          <div  dangerouslySetInnerHTML={{__html: product.detail}}></div>
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
