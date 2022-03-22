import {connect} from 'react-redux';
import './login.scss'
import UserIcon from '../../assets/icons/person-circle.svg'
import LockIcon from '../../assets/icons/file-lock2-fill.svg'
import {useState} from 'react';
import {createSaveUserInfo} from '../../redux/actions/loginAction'
import {globalAlert} from '../../redux/actions/globalAlertAction'
import {reqlogin} from '../../api';

const Login = (props) => {
  const [formData, setFormData] = useState({
    username: '',
    password:''
  })

  const handleFormSubmit = async (event) =>{
    const {username, password} = formData
    event.preventDefault()
    const reqResult = await reqlogin(username, password)
    if(reqResult.status === 1) props.globalAlert({show: true, msg:reqResult.msg})
    console.log(reqResult)
    // props.saveUserInfo(reqResult.data)
    // console.log(reqResult.data)
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
                       aria-describedby="basic-addon1" onChange={handelFormInputChange('username')}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <img src={LockIcon} alt="Bootstrap" width="32" height="32"/>
                </span>
                <input type="text" className="form-control" placeholder="Password" aria-label="Password"
                       aria-describedby="basic-addon1" onChange={handelFormInputChange('password')}/>
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

  }),
  {
    globalAlert,
    saveUserInfo: createSaveUserInfo,
  }
)(Login);
