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
