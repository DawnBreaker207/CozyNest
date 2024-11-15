import { z } from 'zod'

export const ArticleZodSchema = z.object({
  _id: z.union([z.number(), z.string()]).optional(),
  title: z.string().min(1, 'Tên sản phẩm không được để trống'),
  content: z.string().min(1, 'Nội dung không được để trống'),
  images: z.array(z.string()).min(1, 'Ảnh không được để trống'),
  author: z.string().min(1, 'Tác giản không được để trống'),
})