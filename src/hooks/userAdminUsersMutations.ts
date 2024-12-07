import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { message } from 'antd'
import { IUsers } from '@/types/user'
import { editUser } from '@/services/usersAdmin'

type useAdminUsersMutationProps = {
  action: 'UPDATE'
  onSuccess?: () => void
}

const useAdminUsersMutations = ({ action, onSuccess }: useAdminUsersMutationProps) => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      phone_number: '',
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
        setTimeout(() => {
          messageApi.success({
            content: 'Cập nhật thành công!',
            duration: 2
          })
        }, 0)
      } else {
        setTimeout(() => {
          messageApi.error({
            content: 'Có lỗi xảy ra, vui lòng thử lại sau',
            duration: 2
          })
        }, 0)
      }
    },
    onError: (error) => {
      console.error(error)
      setTimeout(() => {
        messageApi.error({
          content: 'Có lỗi xảy ra trong quá trình xử lý',
          duration: 2
        })
      }, 0)
    }
  })

  const onSubmit: SubmitHandler<IUsers> = async (user) => {
    mutate(user)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useAdminUsersMutations
