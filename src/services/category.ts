import instance from '@/configs/axios' // instance của axios
import { ICategory } from '@/types/category'
import Cookies from 'js-cookie'

// Cấu hình axios để gửi cookie trong mỗi request
instance.defaults.withCredentials = true // Đảm bảo gửi cookie đi cùng với yêu cầu

// Lấy thông tin người dùng từ cookie (dữ liệu không phải là refreshToken)
const getUserData = () => {
  const dataUser = Cookies.get('user') // Cookies không phải là HttpOnly
  if (dataUser) {
    try {
      return JSON.parse(dataUser) // Trả về dữ liệu người dùng đã phân tích
    } catch (error) {
      console.error('Không thể phân tích dữ liệu từ cookie:', error)
    }
  }
  return null // Nếu không có thông tin người dùng trong cookie
}

// Lấy token từ cookie
const getToken = (): string | null => {
  const token = Cookies.get('refreshToken') // Lấy token từ cookie
  return token || null // Trả về token hoặc null nếu không có
}

// Lấy tất cả danh mục (categories)
export const getAllCategories = async (params?: ICategory[]): Promise<ICategory[]> => {
  const userData = getUserData() // Lấy thông tin người dùng từ cookie
  if (!userData || userData.role !== 'admin') {
    console.error('User is not admin or no user data available.')
    return [] // Nếu không phải admin hoặc không có người dùng, trả về mảng rỗng
  }

  const token = getToken() // Lấy token từ cookie

  if (!token) {
    console.error('Không có token để gửi request')
    return [] // Nếu không có token, trả về mảng rỗng
  }

  try {
    const response = await instance.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}` // Gửi token trong header
      },
      params, // Nếu có params thì gửi theo
      withCredentials: true // Đảm bảo gửi cookie
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy danh mục:', error)
    return [] // Trả về mảng rỗng nếu có lỗi
  }
}

// Lấy thông tin danh mục theo ID
export const getCategoryById = async (id: number | string) => {
  try {
    const response = await instance.get(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken() || ''}` // Gửi token trong header
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Thêm một danh mục
export const addCategory = async (category: ICategory) => {
  const token = getToken() // Lấy token từ cookie
  try {
    const response = await instance.post('/categories', category, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}` // Gửi token trong header
      },
      withCredentials: true // Đảm bảo gửi cookie
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Xóa một danh mục
export const removeCategory = async (category: ICategory) => {
  const token = getToken() // Lấy token từ cookie
  try {
    const response = await instance.delete(`/categories/${category._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}` // Gửi token trong header
      },
      withCredentials: true // Đảm bảo gửi cookie
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Cập nhật một danh mục
export const editCategory = async (category: ICategory) => {
  const token = getToken()
  try {
    const response = await instance.put(`/categories/${category?._id}`, category, {
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
