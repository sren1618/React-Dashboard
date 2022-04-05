import {connect} from 'react-redux';
import {Outlet} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react';
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


  return (
    <div style={{display: 'flex'}}>
      <Sidebar/>
      <div style={{width: '100%'}}>
        <Navigation/>
        <Outlet/>
      </div>
    </div>
  );
}

export default connect(
  state => ({
    userInfo: state.userInfo
  })
)(Admin);
