export interface IProduct {
  _id?: number | string
  name: string
  category?: string
  base_price: number
  brand: string
  thumbnail: string
  description: string
  isHidden: boolean
}
