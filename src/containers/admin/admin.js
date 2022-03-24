import {connect} from 'react-redux';
import {Outlet} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react';
import {deleteUserInfo} from '../../redux/actions/loginAction';
import Sidebar from './sidebar/sidebar';
import Navigation from './navigation/navigation';


const Admin = (props) => {
  const {isLogin} = props.userInfo
  const navigate = useNavigate()
  useEffect( ()=>{
    if(!isLogin){
      navigate('/login', {replace:true})
    }
  }, [isLogin])

  const handelLogout = () =>{
    props.deleteUserInfo()
  }
  return (
    <div>
      {props.userInfo.user.username}
      <button onClick={handelLogout}>log out</button>
      <Navigation/>
      <div style={{display:'flex'}}>
        <Sidebar/>
        <Outlet/>
      </div>

    </div>
  );
}

export default connect(
  state => ({
    userInfo: state.userInfo
  }),
  {
    deleteUserInfo
  }
)(Admin);
