// hooks/useArticleQuery.ts

import { getAll, getArticleById } from '@/services/article'
import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useArticleQuery = (options?: any) => {
  const { data, ...rest } = useQuery({
    queryKey: ['ARTICLE_KEY', options],
    queryFn: async () => {
      return options?.id ? await getArticleById(options.id) : await getAll()
    }
  })

  return { data, ...rest }
}
