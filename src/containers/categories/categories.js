import {connect} from 'react-redux';
import {useEffect, useState} from 'react';
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api'
import './categories.scss'
import {globalAlert} from '../../redux/actions/globalAlertAction';
import {createSaveCategories} from '../../redux/actions/categoryAction';

const Categories = (props) => {

  const [tableData, setTableDate] = useState([[{'_id': '', name: ''}]])
  const [showTable, setShowTable] = useState( {
    pre: true,
    currentPage: 1,
    next: false,
    data:[{'_id': '', name: ''}]
  })
  const [modalData, setModalData] = useState( {
    type:'',
    id:'',
    title:  '',
    placeholder: '',
    defaultData:'',
    data: ''
  })


  useEffect(  () => {
    fetchTableData(5)
  },[])

  useEffect(  () => {
    setShowTable({...showTable, data: tableData[0]})
  },[tableData])


  const fetchTableData = async (pageNumber) => {
    const result = await reqCategories()
    props.saveCategories(result)
    const categories = result.data.reverse()
    let totalPages = Math.ceil(categories.length / pageNumber)
    let start = 0
    const data = []
    for (let i = 0; i< totalPages;i++ ){
      data.push(categories.slice(start, pageNumber+start))
      start = start + pageNumber
    }
    setTableDate(data)
  }

  const CreatePagination = () => {
    let arr = []
    for(let i = 1; i <= tableData.length; i++){
      arr.push(
        <li className="page-item" key={i}>
          <button className=' btn' onClick={() => handlePagination(i)}>{i}</button>
        </li>)
    }
    return arr
  }

  const handlePagination = (page) => {
    switch( page){
      case 'pre':
        const prePage = showTable.currentPage-1
        console.log(prePage)
        if ( prePage !== 0){
          setShowTable({...showTable, pre: false, currentPage: prePage, data: tableData[prePage-1]})
        }
        break
      case 'next':
        const nextPage = showTable.currentPage + 1
        if ( nextPage <= tableData.length){
          setShowTable({currentPage: nextPage, data: tableData[nextPage-1]})
        }
        break
      default:
        setShowTable({currentPage: page, data: tableData[page-1]})
        break
    }
  }

  const handleCategoryModal = (id, name) => {
    if (id && name) {
      setModalData({ type: 'edit',id:id, title: 'Edit Category', placeholder: '', defaultData:name, data: name })
    }else{
      setModalData({ type: 'add',id:'', title: 'Add a New Category', placeholder: 'new category', defaultData:'', data: '' })
    }

  }
  const handleModalInputChange = (e) => {
    const inputValue = e.target.value
    setModalData({...modalData, data:inputValue})
  }

  const handleCloseModal = () => {
    setModalData({...modalData, data:''})
  }

  const handleSubmit = async (type) => {

    const {id, data, defaultData} = modalData

    if (data!== '' && data !== defaultData ){
      //ajax
      if(type === 'add'){
        let result = await reqAddCategory(modalData.data)
        if(result.status === 1){
          props.globalAlert({show:true, msg:'Already exist'})
        }else{
          props.globalAlert({show:true, msg:'Added successfully!'})
          fetchTableData(5)
        }
      }else if (type === 'edit'){
        console.log(id)
        let result = await reqUpdateCategory(id, data)
        props.globalAlert({show:true, msg:'Edited successfully!'})
        fetchTableData(5)
      }else{
        //error
        props.globalAlert({show:true, msg:'handle type error'})
      }
    }else{
      //error
      props.globalAlert({show:true, msg:'Cannot be blank or same as previous'})
    }
  }

  return (
    <>
    <div className="card">
      <div className="card-header">
        <button className=' btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={ () => handleCategoryModal()}>+ ADD</button>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Handle</th>
          </tr>
          </thead>
          <tbody>
          {showTable['data'].map( (item, index) => {
            return (
              <tr key={item['_id']}>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td><button className=' btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={ () => handleCategoryModal(item._id,item.name)}>Edit</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation" className=' navbar card-footer'>
        <h4 className="page-item">Page : { showTable.currentPage}</h4>
        <ul className="pagination">
          <li className="page-item"><button className=' btn btn-primary ' disabled= {showTable.pre} onClick={() => handlePagination('pre')}>Previous</button></li>
          {CreatePagination()}
          <li className="page-item"><button className=' btn btn-primary' onClick={() => handlePagination('next')}>Next</button></li>
        </ul>
      </nav>
    </div>
    {/*modal*/}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">{modalData.title}</h5>
        </div>
        <div className="modal-body">
          <input type="email" className="form-control" id="exampleFormControlInput1" value={modalData.data} placeholder={modalData.placeholder} onChange={ (e) => {handleModalInputChange(e)}}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={ () => {handleSubmit(modalData.type)}}>Submit</button>
        </div>
      </div>
    </div>
  </div>
    </>
  );
}

export default connect(
  state => ({}),
  {
    globalAlert,
    saveCategories: createSaveCategories
  }
)(Categories);
