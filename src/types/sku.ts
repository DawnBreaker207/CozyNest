export interface ISku {
  _id: string
  product_id: string
  name?: string
  SKU: string
  slug: string
  shared_url: string
  price: number
  stock: number
  price_before_discount?: number
  price_discount_percent?: number
  image?: {
    id: string
    url: string
  }
  assets: {
    id: string
    url: string
  }[]
}
