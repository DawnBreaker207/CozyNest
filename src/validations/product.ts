import { z } from 'zod'

export const ProductZodSchema = z.object({
  _id: z.union([z.number(), z.string()]).optional(), 
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  category: z.string().optional(),
  base_price: z.number().min(0, 'Giá phải là số dương'),
  brand: z.string().min(1, 'Thương hiệu không được để trống'),
  thumbnail: z.string().min(1, 'Thumbnail không được để trống'),
  description: z.string().optional(),
  isHidden: z.boolean()
})
