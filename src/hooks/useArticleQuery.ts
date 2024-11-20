import { getAllArticles, getArticleById } from '@/services/article'
import { useQuery } from '@tanstack/react-query'

export const useArticleQuery = (options?: any) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ARTICLE_KEY', options],
    queryFn: async () => {
      return options?._id ? await getArticleById(options._id) : await getAllArticles()
    }
  })

  return { data, ...rest }
}
