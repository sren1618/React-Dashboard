import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import {reqRolesList, reqAddRole, reqUpdateRolePermissions} from '../../api'
import {globalAlert} from '../../redux/actions/globalAlertAction';

const Roles = (props) => {
  const newRoleInput = useRef()
  const [rolesList, setRolesList] = useState([])
  const [checkboxMenu, setCheckboxMenu] = useState({
    home:false,
    prod:false,
    users: false,
    roles: false,
    charts: false
  })
  const [modifiedRole, setModifiedRole] = useState('')

  useEffect( () => {
    fetchRolesList()
  }, [])

  const fetchRolesList =  async () => {
    let result = await reqRolesList()
    setRolesList(result.data)
  }

  const handleNewRole = async() => {
    const roleName = newRoleInput.current.value
    if(roleName){
      let result = await reqAddRole(roleName)
      if  (result.status === 0){
        props.globalAlert({show:true, msg:'Added successfully!'})
        fetchRolesList()
      }else{
        props.globalAlert({show:true, msg:result.msg})
      }
      console.log(result)
    }else{
      props.globalAlert({show:true, msg:'Cannot be blank!'})
    }
  }

  const handleCheckbox = (event, type) => {

    setCheckboxMenu({...checkboxMenu, [type]:event.target.checked})
  }
  const  handleSettingRolePermissions = async () => {
    let role = {}
    let menus = []
    for (const menu in checkboxMenu){
      if (checkboxMenu[menu] !== false) menus.push(menu)
    }
    role._id = modifiedRole
    role.auth_name = props.userInfo.user.username
    role.menus = menus
    role.auth_time = Date.now()
    let result = await reqUpdateRolePermissions(role)
    if  (result.status === 0){
      props.globalAlert({show:true, msg:'Setting successfully!'})
      fetchRolesList()
    }else{
      props.globalAlert({show:true, msg:result.msg})
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>Roles</h2>
          <button className=' btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop1" >+ ADD</button>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Role Name</th>
              <th scope="col">Create Time</th>
              <th scope="col">Authorizer</th>
              <th scope="col">Modification</th>
            </tr>
            </thead>
            <tbody>
            {rolesList.map( (item, index) => {
              return (
                <tr key={item._id}>
                  <th scope="row">{index+1}</th>
                  <td>{item.name}</td>
                  <td>{dayjs(item.create_time).format('DD/MM/YYYY')}</td>
                  <td>{item.auth_name}</td>
                  <td><button className=' btn btn-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={() => {setModifiedRole(item._id)}} >Setting Permissions</button></td>
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
              <input type="text" className="form-control" id="exampleFormControlInput1"  placeholder={'role name'} ref={newRoleInput}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={handleNewRole}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {/*setting permissions modal*/}
      <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel2">Setting Permissions</h5>
            </div>
            <div className="modal-body">
              <h3>Role Name</h3>
              <div>
                <input className="form-check-input" type="checkbox" checked={checkboxMenu.home} onChange={(event) => {handleCheckbox(event, 'home')}}/>
                <label className="form-check-label">HOME</label>
              </div>
              <div>
                <input className="form-check-input" type="checkbox"  checked={checkboxMenu.products} onChange={(event) => {handleCheckbox(event, 'prod')}}/>
                <label className="form-check-label" >PRODUCTS</label>
              </div>
              <div>
                <input className="form-check-input" type="checkbox"  checked={checkboxMenu.users} onChange={(event) => {handleCheckbox(event, 'users')}}/>
                <label className="form-check-label" >USERS</label>
              </div>
              <div>
                <input className="form-check-input" type="checkbox" checked={checkboxMenu.roles} onChange={(event) => {handleCheckbox(event, 'roles')}}/>
                <label className="form-check-label" >ROLES</label>
              </div>
              <div>
                <input className="form-check-input" type="checkbox"  checked={checkboxMenu.charts} onChange={(event) => {handleCheckbox(event, 'charts')}}/>
                <label className="form-check-label" >CHARTS</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSettingRolePermissions}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default  connect(
  state => ({
    userInfo:state.userInfo
  }),
  {
    globalAlert,
  }
)(Roles);
