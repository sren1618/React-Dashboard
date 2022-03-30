import myAxios from './ajax';
import {BASE_URL} from "../config";

export const reqlogin = (username, password) =>{
   return myAxios.post(`${BASE_URL}/login`, {username, password});
}

export const reqCategories = () => {
   return myAxios.get( `${BASE_URL}/manage/category/list`)
}

export const reqAddCategory = (categoryName) => ( myAxios.post(`${BASE_URL}/manage/category/add`, {categoryName}))

export const reqUpdateCategory = (categoryId, categoryName) => (myAxios.post(`${BASE_URL}/manage/category/update`, {categoryId,categoryName}))
