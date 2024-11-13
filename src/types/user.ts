import { ResAPI } from './category'

export interface IUsers extends ResAPI<IUsers> {
  _id?: number | string
  username: string
  email: string
  password: string
  avatar: string
  phoneNumber: string
  address: string
  role: string
  status: string
  city: string
}
