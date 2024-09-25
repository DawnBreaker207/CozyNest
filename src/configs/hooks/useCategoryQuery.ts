import { getAllCategories, getCategoryById } from '@/services/category'
import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCategoryQuery = (options?: any) => {
  // {_limit: 2, _page: 1, id: 1}
  const { data, ...rest } = useQuery({
    queryKey: ['CATEGORY_KEY', options],
    queryFn: async () => {
      return options?.id ? await getCategoryById(options.id as number | string) : await getAllCategories(options)
    }
  })

  return { data, ...rest }
}
