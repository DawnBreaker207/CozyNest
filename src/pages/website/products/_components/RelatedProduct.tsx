/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { FaRegEye } from 'react-icons/fa'
type Props = {
  id: string | undefined
}
const RelatedProduct = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['RELATED_PRODUCT', id],
    queryFn: async () => {
      const { data } = await instance.get(`/categories/${id}`)
      return data.res
    }
  })

  if (isLoading) return

  // Ensure we access the correct array from the response
  const products = data?.products || []

  return (
    <div className='mt-10'>
      <h2 className='text-[#fca120] font-semibold text-[20px] md:text-[25px] mb-8'>Xem thêm sản phẩm cùng loại</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5'>
        {products
          .filter((product: any) => !product.is_hidden)
          .map((product: any) => {
            // Kiểm tra các variant và lấy giá trị từ sku_id
            const firstVariant = product?.variants?.[0]
            return (
              <div key={product._id} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
                <div className='relative'>
                  <div className='flex transition-transform ease-in-out duration-500'>
                    <p className='absolute top-1 left-1 bg-[#FF0000] px-[4px] py-[2px] text-white text-sm rounded-md'>
                      {firstVariant?.sku_id?.price_discount_percent}
                      <span className='text-xs'>%</span>
                    </p>
                    <a href={`/detail/${product._id}`}>
                      <img
                        src={
                          firstVariant?.sku_id?.image?.[0] || 'default-image.jpg' // Ảnh mặc định ban đầu
                        }
                        alt={product?.name}
                        className='object-cover'
                      />
                      <FaRegEye
                        className='absolute left-[45%] top-[30%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                        title='Xem nhanh'
                      />
                      <div className='mx-2 text-center space-y-2 mt-3'>
                        <h3 className='line-clamp-2'>{firstVariant?.sku_id?.name}</h3>
                        <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                          {/* Hiển thị giá thay đổi khi hover */}
                          <span className='text-[#FF0000] font-semibold'>
                            {firstVariant?.sku_id?.price.toLocaleString()}₫
                          </span>
                          <span className='text-gray-500 line-through font-medium text-sm'>
                            {firstVariant?.sku_id?.price_before_discount.toLocaleString()}₫
                          </span>
                        </div>
                        <Button>xem chi tiết</Button>
                      </div>
                    </a>
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
