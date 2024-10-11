import { useQuery } from '@tanstack/react-query'
import instance from '@/configs/axios'
import { FaRegEye } from 'react-icons/fa'
import { Cart } from '@/components/icons'
import { IProduct } from '@/types/product'

const RelatedProduct = ({ id }: { id: string | number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['RELATED_PRODUCT', id],
    queryFn: async () => {
      const { data } = await instance.get(`/categories/${id}`)
      return data
    }
  })

  if (isLoading) return <div>Loading...</div>

  // Ensure we access the correct array from the response
  const products = data?.res?.products || []

  return (
    <div className=''>
      <h1 className='text-[#fca120] font-semibold text-[25px] mb-8'>Xem thêm sản phẩm cùng loại</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5'>
        {products.map((product: IProduct, index: number) => (
          <div key={index} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 bg-white'>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src={product?.thumbnail} alt='' className='object-cover' />
                <img src={product?.thumbnail} alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>{product.name}</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
