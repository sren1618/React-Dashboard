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
    // 1). 将post/put请求的data对象数据转换为urlencode格式的字符串数据
    const {data} = config
    // const {token} = store.getState().userInfo
    // console.log('atguigu_'+ token)
    // if(token) config.headers.Authorization = 'atguigu_'+ token
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