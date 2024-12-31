import { addArticle, editArticle, softDeleteArticle } from '@/services/article'
import IArticle from '@/types/article'
import { ArticleZodSchema } from '@/validations/article'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { SubmitHandler, useForm } from 'react-hook-form'

type useArticleMutationProps = {
  action: 'CREATE' | 'DELETE' | 'UPDATE'
  onSuccess?: () => void
}

const useArticleMutation = ({ action, onSuccess }: useArticleMutationProps) => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  const form = useForm({
    resolver: zodResolver(ArticleZodSchema),
    defaultValues: {
      title: '',
      content: [{ heading: '', paragraph: '', images: [] }],
      author: ''
    }
  })

  const { mutate, ...rest } = useMutation({
    mutationFn: async (article: Partial<IArticle>) => {
      switch (action) {
        case 'CREATE':
          return await addArticle(article)
        case 'DELETE':
          return await softDeleteArticle(article)
        case 'UPDATE':
          return await editArticle(article)
        default:
          throw new Error('Invalid action type')
      }
    },
    onSuccess: (data) => {
      if (data) {
        onSuccess && onSuccess()
        queryClient.invalidateQueries({
          queryKey: ['ARTICLE_KEY']
        })
      } else {
        messageApi.error('Có lỗi xảy ra, vui lòng thử lại sau')
      }
    },
    onError: (error) => {
      console.error('Mutation error:', error)
      messageApi.error('Có lỗi xảy ra, vui lòng thử lại sau')
    }
  })

  const onSubmit: SubmitHandler<IArticle> = async (article) => {
    console.log('Data before mutation submission:', article)
    if (!article._id) {
      console.error('Missing _id for editing')
      return
    }
    mutate(article)
  }

  return { mutate, form, onSubmit, contextHolder, ...rest }
}

export default useArticleMutation
