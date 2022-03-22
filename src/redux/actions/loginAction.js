import {SAVE_USER_INFO} from './index'


export const createSaveUserInfo = (data) => {
  localStorage.setItem('user', JSON.stringify(data.username))
  localStorage.setItem('token', JSON.stringify(data.token))
  return {type:SAVE_USER_INFO, data}
}