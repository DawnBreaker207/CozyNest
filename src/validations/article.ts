import { z } from 'zod'

export const ArticleZodSchema = z.object({
  _id: z.union([z.number(), z.string()]).optional(),
  title: z.string().min(1, 'Tên sản phẩm không được để trống'),
  author: z.string().min(1, 'Tác giả không được để trống')
})
