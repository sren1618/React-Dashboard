import myAxios from './ajax';
import {BASE_URL} from "../config";

export const reqlogin = (username, password) =>{
   return myAxios.post(`${BASE_URL}/login`, {username, password});
}

export const reqCategories = () => {
   return myAxios.get( `${BASE_URL}/manage/category/list`)
}