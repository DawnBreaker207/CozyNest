/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProducts, getProductById } from '@/services/product'
import { IProduct } from '@/types/product'
import { IQuery, ResAPI } from '@/types/responseApi'
import { useQuery } from '@tanstack/react-query'

export const useProductQuery = (options?: Partial<IQuery>) => {
  // {_limit: 2, _page: 1, id: 1}
  const { data, ...rest } = useQuery<ResAPI<IProduct[]>>({
    queryKey: ['PRODUCT_KEY', options],
    queryFn: async () => await getAllProducts(options)
  })
  return { data, ...rest }
}

export const useProduct = (id: string | undefined) => {
  const { data, ...rest } = useQuery<IProduct>({
    queryKey: ['PRODUCT_KEY', id],
    queryFn: async () => await getProductById(id)
  })

  return { data, ...rest }
}
export const useProductCart = (products: any[], mutate: any) => {
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
