import {combineReducers} from 'redux';
import loginReducer from './loginReducer'
import globalAlertReducer from './globalAlertReducer'
export default combineReducers({
  globalAlert:globalAlertReducer,
  userInfo:loginReducer
})