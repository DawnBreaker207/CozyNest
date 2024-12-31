/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProductCart } from '@/types/producrCart'
import { IProduct } from '@/types/product'
import { Color } from 'antd/es/color-picker'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
interface CartState {
  products: IProductCart[]
  quantities: number[]
  setProducts: (products: any[]) => void
  setQuantities: (quantities: number[]) => void
  setQuantity: (index: number, quantity: number) => void
}

export const useCartStore = create<CartState>()(
  devtools((set) => ({
    products: [],
    quantities: [],
    setProducts: (products) => set({ products }),
    setQuantities: (quantities) => set({ quantities }),
    setQuantity: (index, quantity) =>
      set((state) => {
        const newQuantities = [...state.quantities]
        newQuantities[index] = quantity
        return { quantities: newQuantities }
      })
  }))
)
interface CartStore {
  quantity: number
  activeImageIndex: number
  selectedColorId: string | null
  isCartVisible: boolean
  colors: Color[]
  selectedProduct: any | null
  selectedSkuId: string | null | number
  setQuantity: (quantity: number) => void
  setActiveImageIndex: (index: number) => void
  setSelectedColorId: (id: string | null) => void
  setIsCartVisible: (visible: boolean) => void
  setColors: (colors: Color[]) => void
  setSelectedProduct: (product: IProduct | null) => void
  setSelectedSkuId: (skuId: string | null) => void
}

export const useCartStoreHeader = create<CartStore>()(
  devtools((set) => ({
    quantity: 1,
    activeImageIndex: 0,
    selectedColorId: null,
    isCartVisible: false,
    colors: [],
    selectedProduct: null,
    selectedSkuId: null,
    setQuantity: (quantity) => set({ quantity }),
    setActiveImageIndex: (index) => set({ activeImageIndex: index }),
    setSelectedColorId: (id) => set({ selectedColorId: id }),
    setIsCartVisible: (visible) => set({ isCartVisible: visible }),
    setColors: (colors) => set({ colors }),
    setSelectedProduct: (product) => set({ selectedProduct: product }),
    setSelectedSkuId: (skuId) => set({ selectedSkuId: skuId })
  }))
)
