import { useQuery } from '@tanstack/react-query'
import instance from '@/configs/axios'
import { FaRegEye } from 'react-icons/fa'
import { Cart } from '@/components/icons'
import { IProduct } from '@/types/product'
import { Link } from 'react-router-dom'
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
                <a href={`/detail/${product._id}`}>
                  <img
                    src={product.images?.[0]?.url || '/default-image.jpg'}
                    alt={product.name}
                    className='object-cover w-full h-full'
                  />
                  <FaRegEye
                    className='absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                    title='Xem nhanh'
                  />
                </a>
                {product.discount && (
                  <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                    {product.discount}%
                  </span>
                )}
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>{product.name}</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>{discountPrice.toLocaleString()}₫</span>
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
