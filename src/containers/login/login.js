import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import './login.scss'
import UserIcon from '../../assets/icons/person-circle.svg'
import LockIcon from '../../assets/icons/file-lock2-fill.svg'
import {useEffect, useState} from 'react';
import {createSaveUserInfo} from '../../redux/actions/loginAction'
import {globalAlert} from '../../redux/actions/globalAlertAction'
import {reqlogin} from '../../api';

const Login = (props) => {
  const {isLogin} = props.userInfo
  const [formData, setFormData] = useState({
    username: '',
    password:''
  })
  const navigate = useNavigate();
  useEffect( () => {
    if(isLogin){
      navigate('/admin', {replace:true})
    }
  },[])

  const handleFormSubmit = async (event) =>{
    const {username, password} = formData
    event.preventDefault()
    setFormData({ username: '', password:''} )
    const reqResult = await reqlogin(username, password)
    if(reqResult.status === 1) props.globalAlert({show: true, msg:reqResult.msg})
    props.createSaveUserInfo(reqResult.data)
    navigate('/admin/home', {replace: true})
  }

  const handelFormInputChange = (type) => (event) =>{
    switch (type){
      case 'username':
        setFormData({...formData, username: event.target.value })
        break
      case 'password':
        setFormData({...formData, password: event.target.value })
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="container">
        <header className='login-header'>
          <h1>EasyShop Management System</h1>
        </header>
        <div className="row">
          <div className="col"/>
          <div className=" col-4">
            <form className='login-form' onSubmit={handleFormSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <img src={UserIcon} alt="Bootstrap" width="32" height="32"/>
                </span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                       aria-describedby="basic-addon1" onChange={handelFormInputChange('username')} value={formData.username}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <img src={LockIcon} alt="Bootstrap" width="32" height="32"/>
                </span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password"
                       aria-describedby="basic-addon1" onChange={handelFormInputChange('password')} value={formData.password}/>
              </div>
              <button type="submit" className="btn btn-primary submitButton">Submit</button>
            </form>
          </div>
          <div className="col"/>
        </div>
      </div>
    </>
  );
}

export default connect(
  state => ( {
    userInfo:state.userInfo
  }),
  {
    globalAlert,
    createSaveUserInfo,
  }
)(Login);
