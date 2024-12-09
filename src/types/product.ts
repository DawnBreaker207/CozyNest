import { ICategory } from './category'
export interface Variants {
  option_id: { _id: string; name: string }
  option_value_id: { _id: string; value: string }
  sku_id: {
    price_discount_percent: number
    _id: string
    SKU: string
    name: string
    price: number
    stock: number
  }
}
export interface IProduct {
  sku_id: string
  _id: string | number
  originId?: string | null
  name: string
  thumbnail: string
  category_id: ICategory
  brand: string
  description: string
  price: number
  discount: number
  sold: number
  isSale: boolean
  is_hidden: boolean
  images: string[]
  quantity: number
  createdAt: string
  updatedAt: string
  variants?: Variants[]
}
