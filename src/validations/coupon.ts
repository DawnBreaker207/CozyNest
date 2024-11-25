import { z } from 'zod'

export const CouponZodSchema = z.object({
  couponCode: z.string().min(1, 'Mã coupon là bắt buộc'),
  name: z.string().min(1, 'Tên coupon là bắt buộc'),
  couponValue: z.number().min(0, 'Giá trị coupon phải là số và không nhỏ hơn 0'),
  couponQuantity: z.number().min(0, 'Số lượng coupon phải là số và không nhỏ hơn 0'),
  couponStartDate: z.date().nullable(),
  couponEndDate: z.date().nullable(),
  status: z.boolean()
})
