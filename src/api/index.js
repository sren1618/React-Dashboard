import myAxios from './ajax';
import {BASE_URL} from "../config";
import products from '../containers/products/products';

export const reqlogin = (username, password) =>{
   return myAxios.post(`${BASE_URL}/adminUsers/login`, {username, password});
}

//categories
export const reqCategories = () => (
  myAxios.get( `${BASE_URL}/manage/categories`))

export const reqAddCategory = (categoryName) => (
  myAxios.post(`${BASE_URL}/manage/categories`, {categoryName}))

export const reqUpdateCategory = (categoryId, categoryName) => (
  myAxios.put(`${BASE_URL}/manage/categories`, {categoryId,categoryName}))

//products
export const reqProductList = (pageNum, pageSize) => (
  myAxios.get(`${BASE_URL}/manage/products`, {params:{pageNum, pageSize}}))

export const reqAddProduct =  (product) =>  (
  myAxios.post(`${BASE_URL}/manage/products`, product))

export const reqUpdateProduct =  (product) =>  (
  myAxios.put(`${BASE_URL}/manage/products`, product))

export const reqUpdateProdsStatus = (productId, status) =>  (
  myAxios.put(`${BASE_URL}/manage/products/status/${productId}`, {status}))

export const reqSearchProds = (productName , productDesc, pageNum, pageSize) =>  (
  myAxios.get(`${BASE_URL}/manage/products/search`, {params:{productName , productDesc, pageNum, pageSize}}))

export const reqProductInfo = (productId) =>  (
  myAxios.get(`${BASE_URL}/manage/products/${productId}`))

//img
export const reqUploadImage = (formData) => (
  myAxios.post(`${BASE_URL}/manage/img`, formData, {
     headers: {
        'Content-Type': 'multipart/form-data'
     }
  }))

export const reqDeleteImage = (name) =>  (
  myAxios.delete(`${BASE_URL}/manage/img`, {name}))

//users
export const reqUsersList = () => (
  myAxios.get( `${BASE_URL}/manage/users`))

export const reqDeleteUser = (userId) => (
  myAxios.delete('/manage/users', {userId}))

export const reqAddOrUpdateUser = (user) => {
  if(user._id === 'add') myAxios.post('/manage/users', user)
  myAxios.put('/manage/users', user)
}

//roles
export const reqRolesList = () => (
  myAxios.get( `${BASE_URL}/manage/roles`))

export const reqAddRole = (roleName) => (
  myAxios.post(`${BASE_URL}/manage/roles`, {roleName}))

export const reqUpdateRolePermissions = (role) =>  (
  myAxios.put(`${BASE_URL}/manage/roles`, role))


