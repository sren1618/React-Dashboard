import React from 'react';
import {connect} from 'react-redux';
import './globalAlert.scss'
import { globalAlert} from '../../redux/actions/globalAlertAction'

const GlobalAlert = (props) => {
  const {show, msg} = props.alertInfo
  const handelAlertClose = () => {
    props.globalAlert({show: false, msg:""})
  }

  return (
    <>
      <div className="alert alert-warning alert-dismissible fade show globalAlert" role="alert"
           style={ show?{ }:{ display : 'none'}}>
        <strong>{msg}</strong>
        <button type="button" className="btn-close" onClick={handelAlertClose}></button>
      </div>
    </>
  );
}

export default connect(
  state =>{
    return {alertInfo: state.globalAlert}
  },
  {
    globalAlert
  }
)(GlobalAlert) ;
