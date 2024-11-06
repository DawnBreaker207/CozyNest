import instance from '@/configs/axios'
import { IUsers } from '@/types/user'
import Cookies from 'js-cookie'

// Lấy dữ liệu cookie và parse nó
const getToken = () => {
  const userDataString = Cookies.get('refreshToken') // Lấy cookie refreshToken
  // console.log('User data in cookie:', userDataString) // In ra cookie để kiểm tra

  if (userDataString) {
    try {
      // console.log('Token extracted:', userDataString) // Kiểm tra token
      return userDataString || ''
    } catch (error) {
      console.error('Không thể phân tích dữ liệu từ cookie:', error)
    }
  }
  return '' // Nếu không có token thì trả về rỗng
}

// const token = getToken()
// console.log('Token extracted from cookie:', token) // Kiểm tra token lấy từ cookie

// Lấy thông tin người dùng từ cookie và kiểm tra quyền admin
const getUserData = () => {
  const dataUser = Cookies.get('user')
  if (dataUser) {
    try {
      return JSON.parse(dataUser) // Trả về dữ liệu người dùng đã phân tích
    } catch (error) {
      console.error('Không thể phân tích dữ liệu từ cookie:', error)
    }
  }
  return null // Nếu không có thông tin người dùng trong cookie
}

// Lấy tất cả người dùng
export const getAllUser = async (): Promise<IUsers[]> => {
  const userData = getUserData()
  if (!userData || userData.role !== 'admin') {
    return [] // Nếu không phải admin hoặc không có người dùng, trả về mảng rỗng
  }

  const token = getToken() // Lấy token từ cookie
  if (!token) {
    console.error('Không có token để gửi request')
    return [] // Nếu không có token, trả về mảng rỗng
  }

  // console.log('Headers being sent:', { Authorization: `Bearer ${token}` })

  try {
    const response = await instance.get('/users', {
      headers: {
        Authorization: `Bearer ${token}` // Gửi token trong header
      }
    })
    console.log('Response:', response.data)
    return response.data
  } catch (error) {
    // console.error('Lỗi khi lấy dữ liệu người dùng:', error)
    return [] // Trả về mảng rỗng nếu có lỗi
  }
}

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: number | string) => {
  const token = getToken() // Lấy token từ cookie
  try {
    const response = await instance.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Cập nhật thông tin người dùng
export const editUser = async (users: IUsers) => {
  const token = getToken() // Lấy token từ cookie
  try {
    const response = await instance.patch(`/users/${users?._id}`, users, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update user')
  }
}
