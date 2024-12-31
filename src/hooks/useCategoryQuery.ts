import { getAllCategories, getCategoryById } from '@/services/category'
import { ICategory } from '@/types/category'
import { IQuery, ResAPI } from '@/types/responseApi'
import { useQuery } from '@tanstack/react-query'

export const useCategoryQuery = (options?: Partial<IQuery>) => {
  const { data, ...rest } = useQuery<ResAPI<ICategory[]>>({
    queryKey: ['CATEGORY_KEY', options],
    queryFn: async () => await getAllCategories(options)
  })

  return { data, ...rest }
}

export const useCategory = (id: string | undefined) => {
  const { data, ...rest } = useQuery({
    queryKey: ['CATEGORY_KEY', id],
    queryFn: async () => getCategoryById(id)
  })

  return { data, ...rest }
}
