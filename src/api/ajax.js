import axios from 'axios'
import {BASE_URL} from "../config";
import store from '../redux/strore'
import {globalAlert} from '../redux/actions/globalAlertAction';

const instance = axios.create(
  {
    timeout: 1000,
    baseURL: BASE_URL
  }
)

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    const {token} = store.getState().userInfo
    if(token) config.headers.Authorization = 'atguigu_'+ token
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    store.dispatch(globalAlert({show:true, msg:'Please log in'}))
  }
);

export default instance