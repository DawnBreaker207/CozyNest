import { addProduct, editProduct, removeProduct } from '@/services/product'
import { IProduct } from '@/types/product'
import { ProductZodSchema } from '@/validations/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'

type useProductMutationProps = {
  action: 'CREATE' | 'DELETE' | 'UPDATE'
  onSuccess?: () => void
}

const useProductMutation = ({ action, onSuccess }: useProductMutationProps) => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage() // Antd useMessage hook

  const form = useForm({
    resolver: zodResolver(ProductZodSchema),
    defaultValues: {
      originId: null,
      name: '',
      thumbnail: '',
      categoryId: '',
      brand: '',
      description: '',
      price: 0,
      discount: 0,
      sold: 0,
      isSale: false,
      isHidden: false,
      images: [] // Làm mảng cho images
    }
  })

  const { mutate, ...rest } = useMutation({
    mutationFn: async (product: IProduct) => {
      switch (action) {
        case 'CREATE':
          return await addProduct(product)
        case 'DELETE':
          return await removeProduct(product)
        case 'UPDATE':
          // Ensure the product has the _id for update action
          if (!product._id) {
            throw new Error('Product ID is missing for update')
          }
          return await editProduct(product)
        default:
          return null
      }
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess()
        queryClient.invalidateQueries({
          queryKey: ['PRODUCT_KEY']
        })
      } else {
        // Xử lý trường hợp không có dữ liệu trả về từ API
        messageApi.error({
          content: 'Có lỗi xảy ra, vui lòng thử lại sau',
          duration: 2
        })
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      messageApi.error({
        content: 'Có lỗi xảy ra trong quá trình xử lý',
        duration: 2
      })
    }
  })

  const onSubmit: SubmitHandler<IProduct> = (product) => {
    mutate(product)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useProductMutation
