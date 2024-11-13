import { IProduct } from './product'

export interface ICategory extends ResAPI<ICategory> {
  _id: string | number
  name: string
  isHidden: boolean
  products: IProduct[]
  createdAt: string
  updatedAt: string
}

export interface ResAPI<T> {
  res: T
}
