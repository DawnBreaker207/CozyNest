import { getAllCoupons, getCouponById } from '@/services/coupon'
import { useQuery } from '@tanstack/react-query'

export const useCouponQuery = (options?: { id?: string }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['COUPON_KEY', options],
    queryFn: async () => {
      return options?.id ? await getCouponById(options.id) : await getAllCoupons(options)
    }
  })

  return { data, ...rest }
}
