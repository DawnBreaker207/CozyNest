import instance from '@/configs/axios' // instance của axios
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

// Cấu hình axios để gửi cookie trong mỗi request
instance.defaults.withCredentials = true // Đảm bảo gửi cookie đi cùng với yêu cầu

// Lấy tất cả danh mục (categories)
export const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await instance.get('/categories', {})
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error)
    return [] // Trả về mảng rỗng nếu có lỗi
  }
}

// Lấy thông tin danh mục theo ID
export const getCategoryById = async (id: number | string) => {
  try {
    const response = await instance.get(`/categories/${id}`, {})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Thêm một danh mục
export const addCategory = async (category: ICategory) => {
  try {
    const response = await instance.post('/categories', category, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Xóa một danh mục
export const removeCategory = async (category: ICategory) => {
  try {
    const response = await instance.delete(`/categories/${category._id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Cập nhật một danh mục
export const editCategory = async (category: ICategory) => {
  try {
    const response = await instance.put(`/categories/${category?.res?._id}`, category, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
