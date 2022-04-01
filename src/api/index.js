import myAxios from './ajax';
import {BASE_URL} from "../config";

export const reqlogin = (username, password) =>{
   return myAxios.post(`${BASE_URL}/login`, {username, password});
}

export const reqCategories = () => (
  myAxios.get( `${BASE_URL}/manage/category/list`))

export const reqAddCategory = (categoryName) => (
  myAxios.post(`${BASE_URL}/manage/category/add`, {categoryName}))

export const reqUpdateCategory = (categoryId, categoryName) => (
  myAxios.post(`${BASE_URL}/manage/category/update`, {categoryId,categoryName}))

export const reqProductList = (pageNum, pageSize) => (
  myAxios.get(`${BASE_URL}/manage/product/list`, {params:{pageNum, pageSize}}))

export const reqUpdateProdsStatus = (productId, status) =>  (
  myAxios.post(`${BASE_URL}/manage/product/updateStatus`, {productId, status}))

export const reqSearchProds = (productName , productDesc, pageNum, pageSize) =>  (
  myAxios.get(`${BASE_URL}/manage/product/search`, {params:{productName , productDesc, pageNum, pageSize}}))

export const reqProductInfo = (productId) =>  (
  myAxios.get(`${BASE_URL}/manage/product/info`, {params:{productId}}))