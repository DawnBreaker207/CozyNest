import { IProduct } from './product'

export interface ICategory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any
  _id: string | number
  name: string
  isHidden: boolean
  thumbnail: string
  products: IProduct[]
  createdAt: string
  updatedAt: string
}
