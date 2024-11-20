import { getAllCategories, getCategoryById } from '@/services/category'
import { useQuery } from '@tanstack/react-query'

export const useCategoryQuery = (options?: any) => {
  // {_limit: 2, _page: 1, id: 1}
  const { data, ...rest } = useQuery({
    queryKey: ['CATEGORY_KEY', options],
    queryFn: async () => {
      options?._id ? await getCategoryById(options._id as number | string) : await getAllCategories(options)
    }
  })
  const category = Array.isArray(data) ? data[0] : data

  return { data: category, ...rest }
}
