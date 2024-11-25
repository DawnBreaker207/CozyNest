export interface SkuType extends Document {
  _id: string
  sku_id: string
  product_id: string
  SKU: string
  name: string
  slug: string
  shared_url: string
  price: number
  price_before_discount?: number
  price_discount_percent?: number
  stock: number
  image?: {
    id: string
    url: string
  }
  assets: {
    id: string
    url: string
  }[]
}
