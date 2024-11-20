import instance from '@/configs/axios'
import { IProduct } from '@/types/product'
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

// Lấy tất cả sản phẩm
export const getAllProducts = async (params?: any): Promise<IProduct[]> => {
  try {
    const response = await instance.get('/products', { params })
    return response.data
  } catch (error) {
    return [] // Trả về mảng rỗng nếu có lỗi
  }
}

// Lấy thông tin sản phẩm theo ID
export const getProductById = async (id: number | string) => {
  try {
    const response = await instance.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error)
  }
}

// Thêm sản phẩm mới
export const addProduct = async (product: IProduct) => {
  try {
    const response = await instance.post(`/products`, product, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error)
  }
}

// Xóa sản phẩm
export const removeProduct = async (product: IProduct) => {
  try {
    const response = await instance.delete(`/products/${product._id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error)
  }
}

export const editProduct = async (product: IProduct) => {
  if (!product._id) {
    return null // Trả về null nếu không có _id
  }

  try {
    const response = await instance.put(`/products/${product._id}`, product, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error)
  }
}
