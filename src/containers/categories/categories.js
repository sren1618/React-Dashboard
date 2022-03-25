import {useEffect, useState} from 'react';
import { reqCategories } from '../../api'
import './categories.scss'

const Categories = () => {

  const [tableData, setTableDate] = useState([[{'_id': '', name: ''}]])
  const [showTable, setShowTable] = useState( {
    pre: true,
    currentPage: 1,
    next: false,
    data:[{'_id': '', name: ''}]
  })

  useEffect(  () => {
    fetchTableData(3)
  },[])

  useEffect(  () => {
    setShowTable({...showTable, data: tableData[0]})

  },[tableData])

  const fetchTableData = async (pageNumber) => {
    const categories = await reqCategories()
    let totalPages = Math.ceil(categories.data.length / pageNumber)
    let start = 0
    const data = []
    for (let i = 0; i< totalPages;i++ ){
      data.push(categories.data.slice(start, pageNumber+start))
      start = start + pageNumber
    }
    setTableDate(data)
  }

  const CreatePagination = () => {
    let arr = []
    for(let i = 1; i <= tableData.length; i++){
      arr.push(
        <li className="page-item">
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

  return (
    <div className="card">
      <div className="card-header">
        <button className=' btn btn-primary'>+ ADD</button>
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
          {showTable['data'].map( (item) => {
            return (
              <tr key={item['_id']}>
                <th scope="row">1</th>
                <td>{item.name}</td>
                <td>Otto</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><button className=' btn btn-primary ' disabled= {showTable.pre} onClick={() => handlePagination('pre')}>Previous</button></li>
          {CreatePagination()}
          <li className="page-item"><button className=' btn btn-primary' onClick={() => handlePagination('next')}>Next</button></li>
          <li className="page-item">Page : { showTable.currentPage}</li>
        </ul>
      </nav>
    </div>
  );
}

export default Categories;
