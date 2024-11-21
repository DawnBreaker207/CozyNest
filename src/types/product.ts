/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct {
  variants: any
  sku_id: any
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
}
