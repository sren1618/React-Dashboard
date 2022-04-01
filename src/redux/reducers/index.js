import {combineReducers} from 'redux';
import loginReducer from './loginReducer'
import globalAlertReducer from './globalAlertReducer'
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  globalAlert:globalAlertReducer,
  userInfo:loginReducer,
  productList: productReducer,
  categoryList: categoryReducer
})