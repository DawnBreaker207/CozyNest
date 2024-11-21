export interface ICoupon {
  _id?: string // ID của coupon, có thể không có khi tạo mới
  couponCode: string // Mã coupon
  name: string // Tên coupon
  couponValue: number // Giá trị của coupon (giảm giá)
  couponQuantity: number // Số lượng coupon có sẵn
  couponStartDate: Date | null // Ngày bắt đầu sử dụng coupon
  couponEndDate: Date | null // Ngày hết hạn coupon
  status: boolean // Trạng thái (active/inactive)
}
