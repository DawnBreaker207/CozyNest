import { IProduct } from './product'

export interface ICategory {
  _id: string | number
  name: string
  isHidden: boolean
  products: IProduct[]
  createdAt: string
  updatedAt: string
  type: 'normal' | 'default' // Chỉ chấp nhận hai giá trị như trên backend
}

export interface ResAPI<T> {
  res: T
}
