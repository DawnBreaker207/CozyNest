import { IProduct } from '@/types/product'
import { useState } from 'react'

export const useFilterProducts = (products: IProduct[]) => {
  console.log(products)

  const filterProductsByPrice = (priceRanges: string[]) => {
    if (priceRanges.length === 0) return products // Nếu không có khoảng giá nào được chọn, trả về tất cả sản phẩm

    return products.filter((product) => {
      console.log(product)

      // Duyệt qua các variants của sản phẩm để lấy giá từ sku_id
      return product.variants.some((variant) => {
        console.log(variant)

        const price = variant?.sku_id?.price // Lấy giá từ sku_id, bỏ qua giảm giá nếu không có dữ liệu
        console.log(price)

        if (priceRanges.includes('Dưới 1.000.000₫') && price < 1000000) return true
        if (priceRanges.includes('1.000.000₫ - 2.000.000₫') && price >= 1000000 && price <= 2000000) return true
        if (priceRanges.includes('2.000.000₫ - 3.000.000₫') && price >= 2000000 && price <= 3000000) return true
        if (priceRanges.includes('3.000.000₫ - 4.000.000₫') && price >= 3000000 && price <= 4000000) return true
        if (priceRanges.includes('Trên 4.000.000₫') && price > 4000000) return true
        return false
      })
    })
  }

  return { filterProductsByPrice }
}
export const useSortProducts = (products: IProduct[]) => {
  const sortProducts = (key: string) => {
    switch (key) {
      // Chức năng sắp xếp giá từ thấp đến cao
      case '1':
        return [...products].sort((a, b) => a.price - b.price)

      // Chức năng sắp xếp giá từ cao đến thấp
      case '2':
        return [...products].sort((a, b) => b.price - a.price)
      case '3':
        // Chức năng sắp xếp theo tên từ A-Z
        return [...products].sort((a, b) => a.name.localeCompare(b.name))
      case '4':
        // Chức năng sắp xếp theo tên từ Z-A
        return [...products].sort((a, b) => b.name.localeCompare(a.name))

      default:
        return products
    }
  }
  return { sortProducts }
}
export const usePaginate = (items: IProduct[], itemPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const currentItems = items?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(items.length / itemPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1)
  }

  return { currentItems, totalPages, handleNextPage, handlePrevPage, currentPage }
}
