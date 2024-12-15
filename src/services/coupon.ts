/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { ICoupon } from '@/types/coupon'

// API để lấy tất cả mã giảm giá
export const getAllCoupons = async (params?: any) => {
  const response = await instance.get('/coupon', { params })
  return response.data
}

// API để lấy một mã giảm giá theo ID
export const getCouponById = async (id: string) => {
  const response = await instance.get(`/coupon/${id}`)
  return response.data
}

// API để thêm mã giảm giá
export const addCoupon = async (coupon: ICoupon) => {
  const response = await instance.post('/coupon', coupon)
  return response.data
}

// API để chỉnh sửa mã giảm giá
export const editCoupon = async (coupon: any) => {
  const response = await instance.put(`/coupon/${coupon._id}`, coupon)
  return response.data
}

// API để xóa mã giảm giá
export const removeCoupon = async (coupon: ICoupon) => {
  const response = await instance.delete(`/coupon/${coupon._id}`)
  return response.data
}
