import { getAllArticles, getArticleById } from '@/services/article'
import IArticle from '@/types/article'
import { IQuery, ResAPI } from '@/types/responseApi'
import { useQuery } from '@tanstack/react-query'

export const useArticleQuery = (options?: Partial<IQuery>) => {
  const { data, ...rest } = useQuery<ResAPI<IArticle[]>>({
    queryKey: ['ARTICLE_KEY', options],
    queryFn: async () => await getAllArticles(options)
  })

  return { data, ...rest }
}
export const useArticle = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ARTICLE_KEY', id],
    queryFn: async () => await getArticleById(id)
  })

  return { data, ...rest }
}
