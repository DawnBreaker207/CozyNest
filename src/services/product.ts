import instance from '@/configs/axios'
import { IProduct } from '@/types/product'
import Cookies from 'js-cookie'

// Lấy token từ cookie
const getToken = (): string | null => {
  const token = Cookies.get('refreshToken') // Lấy token từ cookie
  return token || null // Trả về token hoặc null nếu không có
}

// Lấy tất cả sản phẩm
export const getAllProducts = async (params?: IProduct[]): Promise<IProduct[]> => {
  try {
    const response = await instance.get('/products', { params })
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy tất cả sản phẩm:', error)
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
  const token = getToken()
  if (!token) {
    console.error('Không có token để gửi request')
    return null
  }
  try {
    const response = await instance.post(`/products`, product, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error)
  }
}

// Xóa sản phẩm
export const removeProduct = async (product: IProduct) => {
  const token = getToken()
  if (!token) {
    console.error('Không có token để gửi request')
    return null
  }
  try {
    const response = await instance.delete(`/products/${product._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error)
  }
}

export const editProduct = async (product: IProduct) => {
  const token = getToken()
  if (!token) {
    console.error('Không có token để gửi request')
    return null
  }

  if (!product._id) {
    console.error('Không có _id trong sản phẩm:', product)
    return null // Trả về null nếu không có _id
  }

  try {
    const response = await instance.put(`/products/${product._id}`, product, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error)
  }
}
