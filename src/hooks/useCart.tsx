/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalStorage } from './useStorage'
import axios from 'axios'
import { debounce, reduce } from 'lodash'
import { ChangeEvent, useState, useEffect } from 'react'
import instance from '@/configs/axios'

const useCart = () => {
  const queryClient = useQueryClient()
  const [user] = useLocalStorage('user', {})
  const userId = user?.data?.res?._id
  const { data, ...restQuery } = useQuery({
    queryKey: ['cart', userId],
    queryFn: async () => {
      if (userId) {
        const { data } = await instance.get(`/cart/${userId}`)
        return data // Dữ liệu từ API
      }
      return { res: { products: [] } } // Giá trị mặc định khi không có userId
    }
  })

  const updateQuantityDebounce = debounce(async (productId: string, quantity: number) => {
    await axios.post(`/cart/update-product-quantity`, {
      userId,
      productId,
      quantity
    })
  }, 300)

  const handleQuantityChange = (productId: string, e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value)
    updateQuantityDebounce(productId, quantity)
  }

  const { mutate } = useMutation({
    mutationFn: async ({ action, productId }: { action: string; productId: string }) => {
      switch (action) {
        case 'INCREMENT':
          await instance.post(`/cart/increase`, {
            userId,
            productId
          })
          break
        case 'DECREMENT':
          await instance.post(`/cart/decrease`, {
            userId,
            productId
          })
          break
        case 'REMOVE':
          await instance.post(`/cart/remove-from-cart`, {
            userId,
            productId
          })
          break
        case 'ADD':
          await instance.post(`/cart/add-to-cart`, {
            userId,
            productId,
            quantity: 1, // Đặt mặc định số lượng là 1
            price: data.res.products.find((product: any) => product._id === productId)?.price // Lấy giá từ dữ liệu hiện có
          })
          break
        default:
          break
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart', userId]
      })
    }
  })

  const [quantities, setQuantities] = useState<number[]>([])

  useEffect(() => {
    if (data && data.res && data.res.products) {
      setQuantities(data.res.products.map((product: any) => product.quantity)) // Khởi tạo số lượng từ dữ liệu
    }
  }, [data])

  const calculateTotal = () => {
    if (!data || !data.res || !data.res.products) return 0
    return reduce(
      data.res.products,
      (total, product, index: number) => {
        const quantity = quantities[index] || product.quantity // Lấy số lượng từ state `quantities`
        return total + product.price * quantity // Tính tổng
      },
      0
    )
  }

  const addToCart = (productId: string) => {
    mutate({ action: 'ADD', productId })
  }
  return {
    data,
    mutate,
    calculateTotal,
    handleQuantityChange,
    quantities,
    setQuantities, // Thêm setQuantities vào return để có thể cập nhật số lượng từ ngoài
    addToCart, // Trả về hàm addToCart
    ...restQuery
  }
}

export default useCart
