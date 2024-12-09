import { useQuery } from '@tanstack/react-query'
import instance from '@/configs/axios'
import { FaRegEye } from 'react-icons/fa'
import { Cart } from '@/components/icons'
import { IProduct } from '@/types/product'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from 'antd'
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
      <h2 className='text-[#fca120] font-semibold text-[25px] mb-8'>Xem thêm sản phẩm cùng loại</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5'>
        {products.map((product) => {
          console.log(product)

          // Kiểm tra các variant và lấy giá trị từ sku_id
          const firstVariant = product?.variants?.[0]
          console.log(firstVariant)

          const price = firstVariant?.sku_id?.price || 0 // Sử dụng giá mặc định là 0 nếu không có giá
          // const priceDiscountPercent = firstVariant?.sku_id?.price_discount_percent || 0
          // const discountedPrice = price - price * (priceDiscountPercent / 100)

          return (
            <div key={product._id} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <Link to={`/detail/${product._id}`}>
                <div className='relative'>
                  <div className='flex transition-transform ease-in-out duration-500'>
                    <img
                      src={
                        hoveredImages[product._id] || // Ảnh hiện tại được hover
                        product?.variants?.[0]?.sku_id?.image?.[0] || // Ảnh mặc định ban đầu
                        'default-image.jpg' // Ảnh mặc định nếu không có
                      }
                      alt={product?.name}
                      className='object-cover'
                    />
                  </div>

                  <FaRegEye
                    className='absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                    title='Xem nhanh'
                  />
                </div>

                <div className='mx-2 text-center space-y-2 mt-3'>
                  <h3>{product?.name}</h3>
                  <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                    {/* Hiển thị giá thay đổi khi hover */}
                    <span className='text-[#FF0000] font-semibold'>
                      {(hoveredPrices[product._id] || product?.variants?.[0]?.sku_id?.price).toLocaleString()}₫
                    </span>
                  </div>
                  <Button>xem chi tiết</Button>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedProduct
