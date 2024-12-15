export interface ISku {
  image: any
  _id: string | number
  product_id: {
    name: string | undefined
    variants: any
    is_hidden: boolean
    _id: string
    thumbnail: string
  }
  name: string
}
export interface IProductCart {
  sku_id: ISku
  _id: string | number
  name: string
  thumbnail: string
  price: number
  price_before_discount: number
  price_discount_percent: number
  quantity: number
}
