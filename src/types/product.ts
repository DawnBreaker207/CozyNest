/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  res: any
  _id: string | number
  originId?: string | null
  name: string
  thumbnail: string
  categoryId: string
  brand: string
  description: string
  price: number
  discount: number
  sold: number
  isSale: boolean
  isHidden: boolean
  images: string[]
  createdAt: string
  updatedAt: string
  variants?: Array<{
    option_id: { _id: string; name: string }
    option_value_id: { _id: string; value: string }
    sku_id: { _id: string; SKU: string; name: string; price: number; stock: number }
  }>
}
