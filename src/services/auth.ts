import instance from '@/configs/axios'
import { ResAPI } from '@/types/responseApi'
import { IUsers } from '@/types/user'

export const register = async (input: Partial<IUsers>) => {
  try {
    const { data } = await instance.post<ResAPI<IUsers>>(`/auth/register`, input)
    return data
  } catch (error) {
    console.log(error)
    throw new Error('Dang ky that bai')
  }
}
export const login = async (input: Partial<IUsers>) => {
  try {
    const { data } = await instance.post(`/auth/login`, input)
    return data // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.log(error)

    throw error
  }
}

export const forgotPassword = async (input: Partial<IUsers>) => {
  try {
    const { data } = await instance.post<ResAPI<IUsers>>(`/users/forgotPassword`, input)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
