import { z } from 'zod'

export const CategoryZodSchema = z.object({
  _id: z.union([z.number(), z.string()]).optional(), 
  name: z.string().min(1, 'Tên danh mục không được để trống'),
  isHidden: z.boolean()
})
