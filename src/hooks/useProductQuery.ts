import { getAllProducts, getProductById } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { IQuery } from './useArticleQuery'

export const useProductQuery = (options?: Partial<IQuery>) => {
  // {_limit: 2, _page: 1, id: 1}
  const { data, ...rest } = useQuery({
    queryKey: ['PRODUCT_KEY', options],
    queryFn: async () => {
      return options?._id ? await getProductById(options._id as string) : await getAllProducts(options)
    }
  })
  const product = Array.isArray(data) ? data[0] : data

  return { data: product, ...rest }
}
