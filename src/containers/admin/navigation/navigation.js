import {connect} from 'react-redux';
import {deleteUserInfo} from '../../../redux/actions/loginAction';
import './navigation.scss'

const Navigation = (props) => {

  const handelLogout = () =>{
    props.deleteUserInfo()
  }
  return (
    <nav className="navbar" >
      <div className="container-fluid">
        <h1>XXX Mangement system</h1>
        <p>wellcome! {props.userInfo.user.username}</p>
        <button className=' btn' onClick={handelLogout}>log out</button>
      </div>
    </nav>
  );
}

export default connect(
  state => ({
    userInfo: state.userInfo
  }),
  {
    deleteUserInfo
  }
)(Navigation);


