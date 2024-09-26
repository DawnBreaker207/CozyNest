import { addProduct, editProduct, removeProduct } from '@/services/product'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { message, Modal } from 'antd'
import { IProduct } from '@/types/product'
import { ProductZodSchema } from '@/validations/product'

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
      name: '',
      category: '',
      base_price: 0,
      brand: '',
      thumbnail: '',
      description: '',
      isHidden: false
    }
  })
  const { mutate, ...rest } = useMutation({
    mutationFn: async (product: IProduct) => {
      switch (action) {
        case 'CREATE':
          return await addProduct(product)
        case 'DELETE': {
          return new Promise((resolve) => {
            Modal.confirm({
              title: 'Bạn có chắc chắn không?',
              onOk: async () => {
                const result = await removeProduct(product)
                resolve(result)
              },
              onCancel: () => {
                resolve(false)
              }
            })
          })
        }
        case 'UPDATE':
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
      console.log(error)
      messageApi.error({
        content: 'Có lỗi xảy ra trong quá trình xử lý',
        duration: 2
      })
    }
  })

  const onSubmit: SubmitHandler<IProduct> = async (product) => {
    mutate(product)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useProductMutation
