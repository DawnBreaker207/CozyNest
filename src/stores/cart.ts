import { create } from 'zustand'
interface CartStore {
  quantities: number[]
  setQuantities: (quantities: number[]) => void
  increase: (index: number) => void
  decrease: (index: number) => void
}

export const useCartStore = create<CartStore>((set) => ({
  quantities: [],
  setQuantities: (quantities) => set({ quantities }),
  increase: (index) =>
    set((state) => {
      const newQuantities = [...state.quantities]
      if (newQuantities[index] < 10) newQuantities[index]++
      return { quantities: newQuantities }
    }),
  decrease: (index) =>
    set((state) => {
      const newQuantities = [...state.quantities]
      if (newQuantities[index] > 1) newQuantities[index]--
      return { quantities: newQuantities }
    })
}))
