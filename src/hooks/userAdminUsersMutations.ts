import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { message, Modal } from 'antd'
import { ProductZodSchema } from '@/validations/product'
import { IUsers } from '@/types/user'
import { addUser, editUser, removeUser } from '@/services/usersAdmin'

type useProductMutationProps = {
  action: 'CREATE' | 'DELETE' | 'UPDATE'
  onSuccess?: () => void
}

const useAdminUsersMutations = ({ action, onSuccess }: useProductMutationProps) => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  const form = useForm({
    resolver: zodResolver(ProductZodSchema),
    defaultValues: {
      username: '',
      email: '',
      phoneNumber: '',
      avatar: '',
      password: '',
      role: '',
      address: '',
      city: '',
      status: false
    }
  })

  const { mutate, ...rest } = useMutation({
    mutationFn: async (user: IUsers) => {
      switch (action) {
        case 'CREATE':
          return await addUser(user)
        case 'DELETE': {
          return new Promise((resolve) => {
            Modal.confirm({
              title: 'Bạn có chắc chắn không?',
              onOk: async () => {
                const result = await removeUser(user)
                resolve(result)
              },
              onCancel: () => {
                resolve(false)
              }
            })
          })
        }
        case 'UPDATE':
          return await editUser(user)
        default:
          return null
      }
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess()
        queryClient.invalidateQueries({
          queryKey: ['USER_KEY']
        })
      } else {
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

  const onSubmit: SubmitHandler<IUsers> = async (user) => {
    mutate(user)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useAdminUsersMutations
