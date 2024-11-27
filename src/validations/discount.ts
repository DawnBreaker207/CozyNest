import { z } from 'zod'

export const DiscountZodSchema = z.object({
  _id: z.union([z.number(), z.string()]).optional(),
  name: z.string().min(1, 'Tên không được để trống'),
  couponCode: z.number().min(1, 'Giá trị không được để trống'),
  couponQuantity: z.number().min(1, 'Giá trị không được để trống'),
  status: z.string().min(1, 'Trạng thái không được để trống'),
  couponValue: z.number().min(1, 'Giá trị không được để trống')
})
