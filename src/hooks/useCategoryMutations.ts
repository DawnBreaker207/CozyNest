import { addCategory, editCategory, removeCategory } from '@/services/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { message } from 'antd'
import { ICategory } from '@/types/category'
import { CategoryZodSchema } from '@/validations/category'

type useCategoryMutationProps = {
  action: 'CREATE' | 'DELETE' | 'UPDATE'
  onSuccess?: () => void
}

const useCategoryMutation = ({ action, onSuccess }: useCategoryMutationProps) => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage() // Antd useMessage hook

  const form = useForm({
    resolver: zodResolver(CategoryZodSchema),
    defaultValues: {
      name: '',
      isHidden: false
    }
  })

  const { mutate, ...rest } = useMutation({
    mutationFn: async (category: ICategory) => {
      switch (action) {
        case 'CREATE':
          return await addCategory(category)
        case 'DELETE':
          return await removeCategory(category)
        case 'UPDATE':
          return await editCategory(category)
        default:
          return null
      }
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess()
        queryClient.invalidateQueries({
          queryKey: ['CATEGORY_KEY']
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

  const onSubmit: SubmitHandler<ICategory> = async (category) => {
    mutate(category)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useCategoryMutation
