import instance from '@/configs/axios'
import { ICategory } from '@/types/category'
// TODO: Fix
const userDataString = localStorage.getItem('user')
let token = ''
if (userDataString) {
  try {
    const userData = JSON.parse(userDataString)
    token = userData.token || ''
  } catch (error) {
    console.error('Không thể phân tích dữ liệu từ localStorage:', error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllCategories = async (params?: any): Promise<ICategory[]> => {
  try {
    const response = await instance.get('/categories', { params })
    return response.data
  } catch (error) {
    return []
  }
}

export const getCategoryById = async (id: number | string) => {
  try {
    const response = await instance.get(`/categories/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const addCategory = async (category: ICategory) => {
  try {
    const response = await instance.post(`/categories`, category, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (token ? token : '')
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const removeCategory = async (category: ICategory) => {
  try {
    const response = await instance.delete(`/categories/${category._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (token ? token : '')
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const editCategory = async (category: ICategory) => {
  try {
    const response = await instance.put(`/categories/${category?.res._id}`, category, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (token ? token : '')
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
