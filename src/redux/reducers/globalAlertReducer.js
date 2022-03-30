import {GLOBAL_ALERT} from '../actions/index';

let initState = {
  show: false,
  msg: 'test'
}
export default (preState = initState, action) => {
  const {type, data} = action
  let newState
  switch (type){
    case GLOBAL_ALERT:
      newState = {
        show: data.show,
        msg: data.msg
      }
      return newState
    default:
      return preState
  }
}