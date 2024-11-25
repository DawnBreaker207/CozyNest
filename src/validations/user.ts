import { z } from 'zod'

export const UserZodSchema = z.object({
  _id: z.union([z.number(), z.string()]).optional(),
  username: z.string().min(1, 'Tên người dùng không được để trống'),
  email: z.string().min(1, 'Email không được để trống'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
  role: z.string().min(1, 'Role không được để trống'),
  phoneNumber: z.string().min(1, 'Số điện thoại không được để trống'),
  avatar: z.string().min(1, 'Avatar không được để trống'),
  address: z.string().min(1, 'Địa chỉ không được để trống'),
  status: z.boolean(),

  city: z.string().min(1, 'Thành phố không được để trống')
})
