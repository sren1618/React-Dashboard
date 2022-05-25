import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {reqUsersList, reqDeleteUser} from '../../api';
import {globalAlert} from '../../redux/actions/globalAlertAction';

const Users = (props) => {
  const [usersList, setUsersList] = useState([])
  useEffect( () => {
    fetchUsersList()
  }, [])

  const fetchUsersList =  async () => {
    let result = await reqUsersList()
    let users = result.data.users
    let roles = result.data.roles
    users.map( (user) => {
      const roleName = roles.find( role => role._id = user._id)
      user.roleName = roleName.name
      return user
    })
    console.log(users)
    setUsersList(users)
  }

  const handleEditUser = (id) => {}

  const handleDeleteUser = async(id) => {
    let result = await reqDeleteUser(id)
    if  (result.status === 0){
      fetchUsersList()
      props.globalAlert({show:true, msg:'Delete successfully!'})
    }else{
      props.globalAlert({show:true, msg:result.msg})
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>Users</h2>
          {/*<button className=' btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop1" >+ ADD</button>*/}
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Create Time</th>
            </tr>
            </thead>
            <tbody>
            {usersList.map( (item, index) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{index+1}</th>
                  <td>{item.username}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.roleName}</td>
                  <td>{dayjs(item.create_time).format('DD/MM/YYYY')}</td>
                  <td><button className=' btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => {handleEditUser(item._id)}}>Edit</button></td>
                  <td><button className=' btn btn-primary'  onClick={() => {handleDeleteUser(item._id)}}>Delete</button></td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        {/*<nav aria-label="Page navigation" className=' navbar card-footer'>*/}
        {/*  <h4 className="page-item">Page : { showTable.currentPage}</h4>*/}
        {/*  <ul className="pagination">*/}
        {/*    <li className="page-item"><button className=' btn btn-primary ' disabled= {showTable.pre} onClick={() => handlePagination('pre')}>Previous</button></li>*/}
        {/*    {CreatePagination()}*/}
        {/*    <li className="page-item"><button className=' btn btn-primary' onClick={() => handlePagination('next')}>Next</button></li>*/}
        {/*  </ul>*/}
        {/*</nav>*/}
      </div>
      {/*new role modal*/}
      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel1">Add New Role</h5>
            </div>
            <div className="modal-body">
              {/*<input type="text" className="form-control" id="exampleFormControlInput1"  placeholder={'role name'} ref={newRoleInput}/>*/}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
              {/*<button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={handleNewRole}>Submit</button>*/}
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
  }
)(Users);
