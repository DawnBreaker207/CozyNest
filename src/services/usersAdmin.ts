import instance from '@/configs/axios'
import { IUsers } from '@/types/user'
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
export const getAllUser = async (params?: any): Promise<IUsers[]> => {
  try {
    const response = await instance.get('/users', { params })
    return response.data
  } catch (error) {
    return []
  }
}
export const getUserById = async (id: number | string) => {
  try {
    const response = await instance.get(`/users/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const editUser = async (users: IUsers) => {
  try {
    const response = await instance.patch(`/users/${users?._id}`, users, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token ? token : ''
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Failed to update user')
  }
}
