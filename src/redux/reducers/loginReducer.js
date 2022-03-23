
import {SAVE_USER_INFO, DELETE_USER_INFO} from '../actions/index'

let user = JSON.parse(localStorage.getItem('user'))
let token = JSON.parse(localStorage.getItem('token'))
let initState = {
  user: user || '',
  token: token || '',
  isLogin: !!(user && token)
}

export default (preState = initState, action) => {
  const {type, data} = action
  let newState
  switch (type){
    case SAVE_USER_INFO:
      newState = {
        user: data.user,
        token: data.token,
        isLogin: true
      }
      return newState
    case DELETE_USER_INFO:
      newState = {
        user: '',
        token: '',
        isLogin: false
      }
      return newState
    default:
      return preState
  }
}