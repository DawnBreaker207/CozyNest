import { IProduct } from './product'

export interface ICategory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any // Nếu `res` không thực sự cần thiết, có thể bỏ nó đi
  _id: string // MongoDB `_id` thường là kiểu `string`
  name: string
  isHidden: boolean
  products: IProduct[]
  createdAt: string
  updatedAt: string
  type: 'normal' | 'default' // Chỉ chấp nhận hai giá trị như trên backend
}
