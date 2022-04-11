import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {reqProductList, reqSearchProds, reqUpdateProdsStatus} from '../../api'
import {globalAlert} from '../../redux/actions/globalAlertAction';
import './products.scss'
import {Link} from 'react-router-dom';
import {createSaveProducts} from '../../redux/actions/productAction';

const Products = (props) => {
  const [products, setProducts] =useState([])
  const [tablePagination, setTablePagination] =useState({
    totalPages: 0,
    currentPage:1
  })
  const [tableHeader, setTableHeader] = useState({
    searchType: 'name',
    searchContent:''
  })
  useEffect( () => {
    fetchProductsList(1, 5)
  }, [tableHeader.searchContent])


  const fetchProductsList = async (pageNum, pageSize) => {
    let result = await reqProductList(pageNum, pageSize)
    const {status, data} = result
    if(status === 0){
      setProducts(data.list)
      setTablePagination({totalPages:data.total, currentPage: data.pages})
      props.saveProducts(data.list)
    }
  }

  const CreatePagination = () => {
    let arr = []
    for(let i = 1; i <= tablePagination.totalPages; i++){
      arr.push(
        <li className="page-item" key={i}>
          <button className=' btn' onClick={() => handlePagination(i)}>{i}</button>
        </li>)
    }
    return arr
  }

  const handlePagination = () => {}

  const handleProductState = async({_id, status}) => {
    if(status === 1) status =2
    else status =1
    let result = await reqUpdateProdsStatus(_id,status)
    if ( result.status === 0){
      //fetch again or set state
      fetchProductsList(1, 5)
      props.globalAlert({show:true, msg:'Updated Successfully!'})
    }else{
      props.globalAlert({show:true, msg:'Updated Not Successfully!'})
    }
  }

  const handleSearchClicked = async (event) => {
    event.preventDefault()
    const {searchType, searchContent} = tableHeader
    let result
    if (searchType === 'name'){
      result = await reqSearchProds(searchContent, undefined, 1, 5)
    }else{
      result = await reqSearchProds(undefined,searchContent, 1, 5 )
    }
    setProducts(result.data.list)
  }

  return (
    <div className="product-card">
      <div className="card">
        <div className="card-header">
          <h2>Products</h2>
          <form className="d-flex">
            <select className="form-select"
              onChange={ (event) => {setTableHeader({...tableHeader,searchType: event.target.value})}}
              value={tableHeader.searchType}>
              <option value="name">Search by Name</option>
              <option value="description">Search by Description</option>
            </select>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
               onChange={ (event) => {setTableHeader({...tableHeader,searchContent: event.target.value})}}/>
            <button className="btn btn-outline-success" type="submit" onClick={ (event) => {handleSearchClicked(event)}}>Search</button>
          </form>
          <Link to={'/admin/prod/products/add-update'}>
          <button className=' btn btn-primary' >+ Add new product</button>
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">State</th>
              <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            {products.map( (product, index) => {
              return (
                <tr key={product._id}>
                  <th scope="row">{index+1}</th>
                  <td>{product.name}</td>
                  <td>{product.desc}</td>
                  <td>AUD {product.price}</td>
                  <td>
                    <button
                      className={product.status ===1? "btn btn-success":"btn btn-danger"}
                      onClick={() => {handleProductState(product)}}
                    >{product.status ===1 ? 'Listed': 'Not Listed'}</button></td>
                  <td>
                    <Link to={`/admin/prod/products/details/${product._id}`}>
                      <button className=' btn' >Details</button>
                    </Link>
                    <Link to={`/admin/prod/products/add-update/${product._id}`}>
                      <button className=' btn' >Edit</button>
                    </Link>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        <div aria-label="Page navigation" className='  card-footer'>
          <h4 className="page-item">Page : { tablePagination.currentPage}</h4>
          <ul className="pagination">
            <li className="page-item"><button className=' btn btn-primary '  onClick={() => handlePagination('pre')}>Previous</button></li>
            {CreatePagination()}
            <li className="page-item"><button className=' btn btn-primary' onClick={() => handlePagination('next')}>Next</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect(
  state => ({}),
  {
    globalAlert,
    saveProducts: createSaveProducts
  }
)(Products);
