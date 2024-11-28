export interface ISku {
  _id: string | number
  product_id: {
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
