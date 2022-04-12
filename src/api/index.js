import myAxios from './ajax';
import {BASE_URL} from "../config";


export const reqLogin = (username, password) =>{
   return myAxios.post(`${BASE_URL}/adminUsers/login`, {username, password});
}

//categories
export const reqCategories = () => (
  myAxios.get( `${BASE_URL}/categories`))

export const reqAddCategory = (categoryName) => (
  myAxios.post(`${BASE_URL}/categories`, {categoryName}))

export const reqUpdateCategory = (categoryId, categoryName) => (
  myAxios.put(`${BASE_URL}/categories`, {categoryId,categoryName}))

export const reqDeleteCategory = (categoryId) => (
  myAxios.delete(`${BASE_URL}/categories`, {data: {categoryId}}))

//products
export const reqProductList = (pageNum, pageSize) => (
  myAxios.get(`${BASE_URL}/products`, {params:{pageNum, pageSize}}))

export const reqAddProduct =  (product) =>  (
  myAxios.post(`${BASE_URL}/products`, product))

export const reqUpdateProduct =  (product) =>  (
  myAxios.put(`${BASE_URL}/products`, product))

export const reqDeleteProduct = (productId) => (
  myAxios.delete(`${BASE_URL}/products`, {data: {productId}}))

export const reqUpdateProdsStatus = (productId, status) =>  (
  myAxios.put(`${BASE_URL}/products/status/${productId}`, {status}))

export const reqSearchProds = (productName , productDesc, pageNum, pageSize) =>  (
  myAxios.get(`${BASE_URL}/products/search`, {params:{productName , productDesc, pageNum, pageSize}}))

export const reqProductInfo = (productId) =>  (
  myAxios.get(`${BASE_URL}/products/${productId}`))

//img
export const reqUploadImage = (formData) => (
  myAxios.post(`${BASE_URL}/manage/img`, formData, {
     headers: {
        'Content-Type': 'multipart/form-data'
     }
  }))

export const reqDeleteImage = (name) =>  (
  myAxios.delete(`${BASE_URL}/manage/img`, {data:{name}}))

//users
export const reqUsersList = () => (
  myAxios.get( `${BASE_URL}/manage/users`))

export const reqDeleteUser = (userId) => (
  myAxios.delete('/manage/users', {data: {userId}}))

export const reqAddOrUpdateUser = (user) => {
  if(user._id === 'add') return myAxios.post('/manage/users', user)
  return myAxios.put('/manage/users', user)
}

//roles
export const reqRolesList = () => (
  myAxios.get( `${BASE_URL}/manage/roles`))

export const reqAddRole = (roleName) => (
  myAxios.post(`${BASE_URL}/manage/roles`, {roleName}))

export const reqUpdateRolePermissions = (role) =>  (
  myAxios.put(`${BASE_URL}/manage/roles`, role))


