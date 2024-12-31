export type CartProduct = {
  sku_id: {
    product_id: {
      _id: string
      name: string
      is_hidden: boolean
    }
    _id: string
    name: string
  }
  price: number
  quantity: number
}

// Định nghĩa kiểu dữ liệu trả về từ API cho giỏ hàng
export interface CartData {
  products: CartProduct[]
  cart_id: string
}
