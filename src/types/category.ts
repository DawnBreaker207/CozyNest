import { IProduct } from './product'

export interface ICategory {
  _id: string | undefined
  name: string
  isHidden: boolean
  thumbnail: string
  products: IProduct[]
  createdAt: string
  updatedAt: string
  type: 'normal' | 'default' // Chỉ chấp nhận hai giá trị như trên backend
}
