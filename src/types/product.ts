import { ICategory } from './category'
export interface Variants {
  option_id: {
    _id: string
    name: string
  }
  option_value_id: { _id: string; value: string }
  sku_id: {
    price_discount_percent: number
    price_before_discount: number
    _id: string
    SKU: string
    name: string
    image: string[]
    price: number
    stock: number
    sold: number
  }
}
export interface IProduct {
  sku_id: string
  _id: string | number
  name: string
  thumbnail: string
  category_id: ICategory
  brand: string
  description: string
  sold: number
  isSale: boolean
  is_hidden: boolean
  images: string[]
  quantity: number
  createdAt: string
  updatedAt: string
  variants: Variants[]
}
