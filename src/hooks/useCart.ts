/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { debounce, reduce } from 'lodash'
import { ChangeEvent, useEffect } from 'react'
import { useLocalStorage } from './useStorage'
import { useCartStore } from './store/cartStore'

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
interface CartProduct {
  sku_id: string
  id: string
  name: string
  quantity: number
}

// Định nghĩa kiểu dữ liệu trả về từ API cho giỏ hàng
interface CartData {
  res: {
    products: CartProduct[]
    cartId: string
  }
}

const useCart = () => {
  const queryClient = useQueryClient()
  const [user] = useLocalStorage('user', {})
  const token = user?.data?.accessToken
  const userId = user?.data?.res?._id

  const setProducts = useCartStore((state) => state.setProducts)
  const setQuantities = useCartStore((state) => state.setQuantities)
  const { products, quantities } = useCartStore((state) => state)

  // Thực hiện query để lấy dữ liệu giỏ hàng
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, refetch, ...restQuery } = useQuery<CartData>({
    queryKey: ['cart', userId],
    queryFn: async () => {
      if (!userId) {
        return { res: { products: [], cartId: '' } }
      }

      try {
        const { data: cartData } = await instance.get(`/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(cartData)

        return cartData
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Giỏ hàng không tồn tại, reset lại sản phẩm và số lượng
          setProducts([])
          setQuantities([])
          return { res: { products: [], cartId: '' } }
        }
        console.log(123)
        throw error // Ném lỗi nếu có lỗi khác
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!userId // Chỉ gọi API nếu userId tồn tại
  })

  // Sử dụng useEffect để cập nhật state khi dữ liệu query thành công
  useEffect(() => {
    if (data) {
      setProducts(data.res.products || [])
      setQuantities(data.res.products.map((product) => product.quantity))
    }
  }, [data, setProducts, setQuantities]) // Chạy lại khi data thay đổi

  // Hàm debounce để cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantityDebounce = debounce(async (sku_id: string, quantity: number) => {
    try {
      await axios.post(
        `/cart/update-product-quantity`,
        { userId, sku_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }, 300)

  // Xử lý sự kiện thay đổi số lượng sản phẩm
  const handleQuantityChange = (sku_id: string, e: ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value)
    updateQuantityDebounce(sku_id, quantity)
  }

  // Mutation để thay đổi giỏ hàng (thêm, xóa, tăng, giảm)
  const { mutate } = useMutation({
    mutationFn: async ({
      action,
      sku_id,
      quantity,
      cartId
    }: {
      action: string
      quantity?: number
      sku_id?: string
      cartId?: string
    }) => {
      if (!userId) return

      switch (action) {
        case 'INCREMENT':
          await instance.post(`/cart/increase`, { userId, sku_id }, { headers: { Authorization: `Bearer ${token}` } })
          break
        case 'DECREMENT':
          await instance.post(`/cart/decrease`, { userId, sku_id }, { headers: { Authorization: `Bearer ${token}` } })
          break
        case 'REMOVE':
          await instance.post(
            `/cart/remove-from-cart`,
            { userId, sku_id },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          break
        case 'ADD':
          if (quantity !== undefined) {
            await instance.post(
              `/cart/add-to-cart`,
              { userId, sku_id, quantity }, // Gửi quantity từ payload
              { headers: { Authorization: `Bearer ${token}` } }
            )
          }
          break
        case 'DELETE':
          await instance.delete(`/cart/remove-cart/${cartId}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          break
        default:
          break
      }
    },
    onSuccess: () => {
      // Invalidate the cart query
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
      setTimeout(() => refetch(), 250)
    }
  })

  // Hàm tính tổng giá trị của giỏ hàng
  const calculateTotal = () => {
    if (!products || products.length === 0) return 0
    return reduce(
      products,
      (total, product, index: number) => {
        const quantity = quantities[index] || product.quantity
        return total + product.price * quantity
      },
      0
    )
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (sku_id: string, quantity: number = 1) => {
    if (userId) {
      mutate({ action: 'ADD', sku_id, quantity })
    }
  }

  // Hàm xóa giỏ hàng
  const deleteCart = (cartId: string) => {
    if (userId) {
      mutate({ action: 'DELETE', cartId })
    }
  }
  // Hàm xóa tất cả sản phẩm trong giỏ hàng
  const removeAllProductsFromCart = async () => {
    try {
      await instance.delete(`cart/remove-all/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      // Sau khi xóa, có thể thực hiện các thao tác cập nhật lại giỏ hàng, chẳng hạn như gọi lại API để lấy dữ liệu giỏ hàng
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
      setTimeout(() => refetch(), 250)
    } catch (error) {
      console.error('Failed to remove all products from cart:', error)
    }
  }
  return {
    data,
    mutate,
    calculateTotal,
    handleQuantityChange,
    products,
    quantities,
    setQuantities,
    addToCart,
    deleteCart,
    removeAllProductsFromCart,
    ...restQuery
  }
}

export default useCart
