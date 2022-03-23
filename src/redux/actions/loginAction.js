import {SAVE_USER_INFO, DELETE_USER_INFO} from './index'


export const createSaveUserInfo = (data) => {
  localStorage.setItem('user', JSON.stringify(data.user))
  localStorage.setItem('token', JSON.stringify(data.token))
  return {type:SAVE_USER_INFO, data}
}
export const deleteUserInfo = () =>{
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type: DELETE_USER_INFO}
}
