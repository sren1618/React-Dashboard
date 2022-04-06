import {connect} from 'react-redux';
import {deleteUserInfo} from '../../../redux/actions/loginAction';
import './navigation.scss'

const Navigation = (props) => {

  const handelLogout = () =>{
    props.deleteUserInfo()
  }
  return (
    <>
      <nav className="navbar" >
        <div className="container-fluid">
          <h1>XXX Mangement system</h1>
          <p>wellcome! {props.userInfo.user.username}</p>
          <button className=' btn' data-bs-toggle="modal" data-bs-target="#exampleModal" >log out</button>
        </div>
      </nav>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Hi {props.userInfo.user.username}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to log out？</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" className="btn btn-primary" onClick={handelLogout}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    </>
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


