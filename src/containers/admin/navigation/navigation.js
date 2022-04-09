import {connect} from 'react-redux';
import {deleteUserInfo} from '../../../redux/actions/loginAction';
import './navigation.scss'
import {useEffect, useState} from 'react';
import dayjs from 'dayjs';

const Navigation = (props) => {

  const [currentTime, setCurrentTime] = useState( '')

  useEffect( () => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format('DD-MM-YYYY HH:mm:ss'))
    }, 1000);
    return () => {
      clearInterval(intervalId)
    }
  })

  const handelLogout = () =>{
    props.deleteUserInfo()
  }
  return (
    <>
      <nav className="navbar" >
          <h1>EasyShop Mangement system</h1>
          <div className='leftContent'>
            <h2 className='user'>Welcome!  {props.userInfo.user.username}</h2>
            <h2 className='time'> {currentTime}</h2>
            <button className=' btn' data-bs-toggle="modal" data-bs-target="#exampleModal" >Log Out</button>
          </div>
      </nav>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Hi {props.userInfo.user.username}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to log out？</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handelLogout}>Yes</button>
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


