// import instance from '@/configs/axios' // instance của axios
// import { IUsers } from '@/types/user'
// import Cookies from 'js-cookie'

// // Cấu hình axios để gửi cookie trong mỗi request
// instance.defaults.withCredentials = true // Đảm bảo gửi cookie đi cùng với yêu cầu

// // Lấy thông tin người dùng từ cookie (dữ liệu không phải là refreshToken)
// const getUserData = () => {
//   const dataUser = Cookies.get('user') // Cookies không phải là HttpOnly
//   if (dataUser) {
//     try {
//       return JSON.parse(dataUser) // Trả về dữ liệu người dùng đã phân tích
//     } catch (error) {
//       console.error('Không thể phân tích dữ liệu từ cookie:', error)
//     }
//   }
//   return null // Nếu không có thông tin người dùng trong cookie
// }

// // Lấy token từ cookie
// const getToken = (): string | null => {
//   const token = Cookies.get('refreshToken') // Lấy token từ cookie
//   return token || null // Trả về token hoặc null nếu không có
// }

// // Lấy tất cả người dùng
// export const getAllUser = async (): Promise<IUsers[]> => {
//   const userData = getUserData() // Lấy thông tin người dùng từ cookie
//   if (!userData || userData.role !== 'admin') {
//     return [] // Nếu không phải admin hoặc không có người dùng, trả về mảng rỗng
//   }

//   const token = getToken() // Lấy token từ cookie (sử dụng hàm getToken đã định nghĩa)

//   if (!token) {
//     // console.error('Không có token để gửi request')
//     return [] // Nếu không có token, trả về mảng rỗng
//   }

//   try {
//     const response = await instance.get('/users', {
//       headers: {
//         Authorization: `Bearer ${token}` // Gửi token trong header
//       },
//       withCredentials: true // Đảm bảo gửi cookie
//     })
//     return response.data
//   } catch (error) {
//     console.error('Lỗi khi lấy dữ liệu người dùng:', error)
//     return [] // Trả về mảng rỗng nếu có lỗi
//   }
// }

// // Lấy thông tin người dùng theo ID
// export const getUserById = async (id: number | string) => {
//   try {
//     const response = await instance.get(`/users/${id}`) // Gửi request mà không cần token trong header
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// }

// // Cập nhật thông tin người dùng
// export const editUser = async (users: IUsers) => {
//   const token = getToken()
//   try {
//     const response = await instance.patch(`/users/${users?._id}`, users, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token ? token : ''
//       }
//     })
//     return response.data
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed to update user')
//   }
// }

import instance from '@/configs/axios'
import { IUsers } from '@/types/user'

// Lấy tất cả người dùng

export const getAllUser = async (params?: Partial<IUsers>) => {
  try {
    const { data } = await instance.get('/users', { params })
    return data
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error)
    throw error
  }
}

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: string | undefined) => {
  try {
    const { data } = await instance.get(`/users/${id}`)
    return data.res
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Cập nhật thông tin người dùng
export const editUser = async (users: Partial<IUsers>) => {
  try {
    const { data } = await instance.patch(`/users/${users._id}`, users)
    return data.res
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update user')
  }
}
