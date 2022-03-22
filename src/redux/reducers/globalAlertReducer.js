import {GLOBAL_ALERT} from '../actions/index';

let initState = {
  show: false,
  msg: 'test'
}
export default (preState = initState, action) => {
  const {type, data} = action
  console.log(2)
  let newState
  switch (type){
    case GLOBAL_ALERT:
      console.log(data)
      newState = {
        show: data.show,
        msg: data.msg
      }
      return newState
    default:
      return preState
  }
}