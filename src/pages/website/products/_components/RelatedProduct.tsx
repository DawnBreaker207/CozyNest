import { useQuery } from '@tanstack/react-query'
import instance from '@/configs/axios'
import { FaRegEye } from 'react-icons/fa'
import { Cart } from '@/components/icons'
import { IProduct } from '@/types/product'
import { Link } from 'react-router-dom'
import { useState } from 'react'
type Props = {
  id: string | undefined
}
const RelatedProduct = ({ id }: Props) => {
  const [hoveredImages, setHoveredImages] = useState({})
  const [hoveredPrices, setHoveredPrices] = useState({})
  const { data, isLoading } = useQuery({
    queryKey: ['RELATED_PRODUCT', id],
    queryFn: async () => {
      const { data } = await instance.get(`/categories/${id}`)
      return data.res
    }
  })
  console.log(data)

  if (isLoading) return

  // Ensure we access the correct array from the response
  const products = data?.products || []

  return (
    <div className='mt-10'>
      <h1 className='text-[#fca120] font-semibold text-[25px] mb-8'>Xem thêm sản phẩm cùng loại</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5'>
        {products.map((product: IProduct, index: number) => {
          // Lấy biến thể đầu tiên
          const firstVariant = product.variants?.[0]
          const price = firstVariant?.sku_id?.price || 'N/A' // Giá từ biến thể hoặc 'N/A'
          const discountPrice = firstVariant?.sku_id?.price_discount_percent
            ? firstVariant.sku_id.price - (firstVariant.sku_id.price * firstVariant.sku_id.price_discount_percent) / 100
            : price

          return (
            <div key={index} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 bg-white'>
              <div className='relative'>
                <div className='flex transition-transform ease-in-out duration-500'>
                  <a href={`/detail/${product._id}`}>
                    <img
                      src={
                        hoveredImages[product._id] || // Ảnh hiện tại được hover
                        product?.variants?.[0]?.sku_id?.image?.[0] || // Ảnh mặc định ban đầu
                        'default-image.jpg' // Ảnh mặc định nếu không có
                      }
                      alt={product?.name}
                      className='object-cover'
                    />
                    <FaRegEye
                      className='absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                      title='Xem nhanh'
                    />
                  </a>
                </div>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>{product?.name}</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  {/* Hiển thị giá thay đổi khi hover */}
                  <span className='text-[#FF0000] font-semibold'>
                    {(hoveredPrices[product._id] || product?.variants?.[0]?.sku_id?.price).toLocaleString()}₫
                  </span>
                  {hoveredPrices[product._id] ? (
                    <span className='text-[#878c8f] font-light line-through text-[13px]'>
                      {product?.variants?.[0]?.sku_id?.price.toLocaleString()}₫
                    </span>
                  ) : null}
                </div>
                <div className='flex space-x-4'>
                  {product.variants.map((variant, idx) => {
                    const value = variant.option_value_id.value
                    const bgColor =
                      value === 'Nâu' ? 'bg-[#A0522D]' : value === 'Màu Tự Nhiên' ? 'bg-[#F5DEB3]' : 'bg-gray-200'

                    const isSelected = hoveredImages[product._id]
                      ? hoveredImages[product._id] === variant.sku_id.image?.[0]
                      : idx === 0 // Mặc định chọn màu đầu nếu chưa hover

                    return (
                      <div
                        key={idx}
                        className={`w-6 h-6 rounded-full ${bgColor} cursor-pointer`}
                        title={value}
                        style={{
                          outline: isSelected ? '2px solid black' : 'none', // Hiển thị viền nếu được chọn
                          outlineOffset: '3px'
                        }}
                        onMouseEnter={() => {
                          setHoveredImages((prev) => ({
                            ...prev,
                            [product._id]: variant.sku_id.image?.[0] || '' // Cập nhật ảnh khi hover
                          }))
                          setHoveredPrices((prev) => ({
                            ...prev,
                            [product._id]: variant.sku_id.price || null // Cập nhật giá khi hover
                          }))
                        }}
                        onClick={() => {
                          setHoveredImages((prev) => ({
                            ...prev,
                            [product._id]: variant.sku_id.image?.[0] // Duy trì trạng thái hover sau khi click
                          }))
                          setHoveredPrices((prev) => ({
                            ...prev,
                            [product._id]: variant.sku_id.price // Duy trì giá sau khi click
                          }))
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedProduct
