import { getAllProducts, getProductById } from '@/services/product'
import { useQuery } from '@tanstack/react-query'

export const useProductQuery = (options?: any) => {
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
export const useProducts = (products: any[], mutate: any) => {
  const increase = (index: number) => {
    if (products[index].quantity < 10) {
      mutate({ action: 'INCREMENT', productId: products[index].productId._id })
    }
  }

  const decrease = (index: number) => {
    if (products[index].quantity > 1) {
      mutate({ action: 'DECREMENT', productId: products[index].productId._id })
    }
  }

  return { increase, decrease }
}
