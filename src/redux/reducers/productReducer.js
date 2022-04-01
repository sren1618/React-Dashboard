import {SAVE_PRODUCTS} from '../actions';

let initState = []

export default  (preState = initState, action) => {
  const {type, data} = action
  let newState
  switch (type){
    case SAVE_PRODUCTS:
      newState = [...data]
      return newState
    default:
      return preState
  }
}