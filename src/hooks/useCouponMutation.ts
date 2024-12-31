import { addCoupon, editCoupon, removeCoupon } from '@/services/coupon'
import { ICoupon } from '@/types/coupon'
import { CouponZodSchema } from '@/validations/coupon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'

type useCouponMutationProps = {
  action: 'CREATE' | 'DELETE' | 'UPDATE'
  onSuccess?: () => void
}

const useCouponMutation = ({ action, onSuccess }: useCouponMutationProps) => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  const form = useForm({
    resolver: zodResolver(CouponZodSchema),
    defaultValues: {
      couponCode: '',
      name: '',
      couponValue: 0,
      couponQuantity: 0,
      couponStartDate: null,
      couponEndDate: null,
      status: true // Trạng thái mặc định là active
    }
  })

  const { mutate, ...rest } = useMutation({
    mutationFn: async (coupon: ICoupon) => {
      switch (action) {
        case 'CREATE':
          return await addCoupon(coupon)
        case 'DELETE':
          return await removeCoupon(coupon)
        case 'UPDATE':
          return await editCoupon(coupon)
        default:
          return null
      }
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess()
        queryClient.invalidateQueries({
          queryKey: ['COUPON_KEY']
        })
      } else {
        messageApi.error({
          content: 'Có lỗi xảy ra, vui lòng thử lại sau',
          duration: 2
        })
      }
    },
    onError: (error) => {
      console.error(error)
      messageApi.error({
        content: 'Có lỗi xảy ra trong quá trình xử lý',
        duration: 2
      })
    }
  })

  const onSubmit: SubmitHandler<ICoupon> = async (coupon) => {
    mutate(coupon)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useCouponMutation
