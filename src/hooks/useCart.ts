import { useEffect } from 'react'
import io from 'socket.io-client'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import instance from '@/configs/axios'
import { CartData } from '@/types/cart'
import { ResAPI } from '@/types/responseApi'
import { useCartStore } from './store/cartStore'
import { useCookie } from './useStorage'
import { debounce, reduce } from 'lodash'

// Utility: Kiểm tra ObjectId hợp lệ
const isValidObjectId = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id)

const useCart = () => {
  const queryClient = useQueryClient()
  const [user] = useCookie('user', {})
  const userId = user?._id

  const setProducts = useCartStore((state) => state.setProducts)
  const setQuantities = useCartStore((state) => state.setQuantities)
  const { products, quantities } = useCartStore((state) => state)

  // Thực hiện query để lấy dữ liệu giỏ hàng
  const { data, refetch, ...restQuery } = useQuery<ResAPI<CartData>>({
    queryKey: ['cart', userId],
    queryFn: async () => {
      if (!userId || !isValidObjectId(userId)) {
        console.error('Invalid userId format')
        return { res: { products: [], cartId: '' } }
      }

      try {
        const { data: cartData } = await instance.get(`/cart/${userId}`)
        console.log(cartData)

        // Lọc các sản phẩm có is_hidden = false
        const filteredProducts = cartData.res.products.filter(
          (product: { sku_id: { product_id: { is_hidden: boolean } } }) => !product.sku_id.product_id.is_hidden
        )

        return {
          ...cartData,
          res: {
            ...cartData.res,
            products: filteredProducts // Chỉ trả về các sản phẩm không bị ẩn
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          setProducts([]) // Reset giỏ hàng nếu không tìm thấy
          setQuantities([]) // Reset số lượng nếu không tìm thấy
          return { res: { products: [], cart_id: '' } }
        }
        throw error
      }
    },
    refetchOnWindowFocus: false,
    enabled: !!userId // Chỉ gọi API nếu userId tồn tại
  })

  // Lắng nghe sự kiện cập nhật sản phẩm từ Socket.IO
  useEffect(() => {
    const socket = io('http://localhost:8888') // Đảm bảo địa chỉ đúng với server của bạn

    socket.on('productUpdated', (data: any) => {
      // Xử lý khi nhận được sự kiện cập nhật sản phẩm
      console.log('Product updated:', data)
      // Cập nhật lại giỏ hàng hoặc trạng thái liên quan đến sản phẩm
      refetch() // Ví dụ: gọi lại query để lấy dữ liệu giỏ hàng mới
    })

    // Dọn dẹp khi component unmount
    return () => {
      socket.disconnect()
    }
  }, [refetch])

  // Sử dụng useEffect để cập nhật state khi dữ liệu query thành công
  useEffect(() => {
    if (data) {
      setProducts(data.res.products || [])
      setQuantities(data.res.products.map((product) => product.quantity))
    }
  }, [data, setProducts, setQuantities])

  // Hàm debounce để cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantityDebounce = debounce(async (sku_id: string, quantity: number) => {
    if (!userId || !isValidObjectId(userId)) {
      console.error('Invalid userId format')
      return
    }

    try {
      await axios.post(`/cart/update-product-quantity`, { userId, sku_id, quantity })
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }, 300)

  // Xử lý sự kiện thay đổi số lượng sản phẩm
  const handleQuantityChange = (sku_id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value)
    updateQuantityDebounce(sku_id, quantity)
  }

  // Mutation để thay đổi giỏ hàng (thêm, xóa, tăng, giảm)
  const { mutate } = useMutation({
    mutationFn: async ({
      action,
      sku_id,
      quantity,
      cart_id
    }: {
      action: string
      quantity?: number
      sku_id?: string | number
      cart_id?: string
    }) => {
      if (!userId || !isValidObjectId(userId)) {
        console.error('Invalid userId format')
        return
      }

      switch (action) {
        case 'INCREMENT':
          await instance.post(`/cart/increase`, { userId, sku_id })
          break
        case 'DECREMENT':
          // Mặc định quantity là 1 nếu không có giá trị
          // eslint-disable-next-line no-case-declarations
          const decreaseQuantity = quantity !== undefined ? quantity : 1

          // Truyền số lượng giảm cho action 'DECREMENT'
          if (decreaseQuantity > 0) {
            await instance.post(`/cart/decrease`, { userId, sku_id, quantity: decreaseQuantity })
          }
          break
        case 'REMOVE':
          await instance.post(`/cart/remove-from-cart`, { userId, sku_id })
          break
        case 'ADD':
          if (quantity !== undefined) {
            await instance.post(`/cart/add-to-cart`, { userId, sku_id, quantity })
          }
          break
        case 'DELETE':
          await instance.delete(`/cart/remove-cart/${cart_id}`, {})
          break
        default:
          break
      }
    },
    onSuccess: () => {
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
      mutate({ action: 'DELETE', cart_id: cartId })
    }
  }

  // Hàm xóa tất cả sản phẩm trong giỏ hàng
  const removeAllProductsFromCart = async () => {
    if (!userId || !isValidObjectId(userId)) {
      console.error('Invalid userId format')
      return
    }

    try {
      await instance.delete(`/cart/remove-allproducts-cart/${userId}`)
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
