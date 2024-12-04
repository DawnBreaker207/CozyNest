export interface CartProduct {
  sku_id: string
  id: string
  name: string
  quantity: number
  price: number
}

// Định nghĩa kiểu dữ liệu trả về từ API cho giỏ hàng
export interface CartData {
  products: CartProduct[]
  cart_id: string
}
