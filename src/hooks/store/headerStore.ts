/* eslint-disable @typescript-eslint/no-explicit-any */
// src/stores/useHeaderStore.ts
import { create } from 'zustand'

type HeaderStore = {
  user: any
  userId: number | string | null
  isVisible: boolean
  quantities: number[]
  products: any[]
  setUser: (user: any) => void
  setUserId: (userId: number | string | null) => void
  setIsVisible: (isVisible: boolean) => void
  setQuantities: (quantities: number[]) => void
  setProducts: (products: any[]) => void
  increaseQuantity: (index: number) => void
  decreaseQuantity: (index: number) => void
  resetVisibility: () => void
}

const useHeaderStore = create<HeaderStore>((set) => ({
  user: null,
  userId: null,
  isVisible: true,
  quantities: [],
  products: [],
  setUser: (user) => set({ user }),
  setUserId: (userId) => set({ userId }),
  setIsVisible: (isVisible) => set({ isVisible }),
  setQuantities: (quantities) => set({ quantities }),
  setProducts: (products) => set({ products }),
  increaseQuantity: (index) =>
    set((state) => {
      const newQuantities = [...state.quantities]
      if (newQuantities[index] < 10) newQuantities[index]++
      return { quantities: newQuantities }
    }),
  decreaseQuantity: (index) =>
    set((state) => {
      const newQuantities = [...state.quantities]
      if (newQuantities[index] > 1) newQuantities[index]--
      return { quantities: newQuantities }
    }),
  resetVisibility: () => {
    set({ isVisible: false })
    setTimeout(() => set({ isVisible: true }), 6000)
  }
}))

export default useHeaderStore
