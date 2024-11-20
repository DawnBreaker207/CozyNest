// hooks/useArticleQuery.ts

import { getAllArticles, getArticleById } from '@/services/article'
import { useQuery } from '@tanstack/react-query'

export type IQuery = {
  _order: string
  _sort: string
  _page: number | string
  _limit: number
  _category: number
  _id: string | null
}
export const useArticleQuery = (options?: Partial<IQuery>) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ARTICLE_KEY', options],
    queryFn: async () => {
      return options?._id ? await getArticleById(options._id) : await getAllArticles()
    }
  })
  const article = Array.isArray(data) ? data[0] : data

  return { data: article, ...rest }
}
