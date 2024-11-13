import { ResAPI } from './category'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProduct extends ResAPI<IProduct> {
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
