import instance from '@/configs/axios'
import { ResAPI } from '@/types/responseApi'
import { IUsers } from '@/types/user'
import { AxiosResponse } from 'axios'

export const register = async (input: Partial<IUsers>) => {
  try {
    const { data } = await instance.post<ResAPI<IUsers>>(`/auth/register`, input)
    return data
  } catch (error) {
    throw new Error('Đăng ký thất bại')
  }
}
export const login = async (input: Partial<IUsers>): Promise<AxiosResponse> => {
  try {
    const { data } = await instance.post(`/auth/login`, input)
    return data.res // Trả về dữ liệu từ phản hồi
  } catch (error) {
    throw new Error('Đăng nhập thất bại')
  }
}

export const forgotPassword = async (input: Partial<IUsers>) => {
  try {
    const { data } = await instance.post<ResAPI<IUsers>>(`/users/forgotPassword`, input)
    return data
  } catch (error) {
    throw new Error('Đăng ký thất bại')
  }
}
