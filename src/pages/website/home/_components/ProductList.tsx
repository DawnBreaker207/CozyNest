import { Cart } from '@/components/icons/index'
import useCart from '@/hooks/useCart'
import { IProduct } from '@/types/product'
import { message } from 'antd'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type ProductListProps = {
  products?: IProduct[]
  pagination?: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}

const ProductList = ({ products }: ProductListProps) => {
  const { addToCart } = useCart() // Sử dụng hook useCart
  const [messageApi, contextHolder] = message.useMessage()

  const handleAddToCart = (productId: string) => {
    addToCart(productId) // Thêm sản phẩm vào giỏ hàng
    messageApi.success('Thêm vào giỏ hàng thành công!')
  }
  return (
    <>
      {contextHolder}
      {/* sản phẩm  */}
      <div className='mx-auto container mt-20'>
        {/* <span className='m-4'>{pagination?.totalItems} sản phẩm</span> */}
        <h2 className='text-center text-[25px] sm:text-[45px] mb-8 mt-10 md:mt-20 text-[#FCA120]'>
          Sản phẩm mới ra mắt
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 lg:mx-[40px]  mt-4 mb-8'>
          {products?.slice(0, 5).map((product: IProduct, index: number) => (
            <div key={index} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
              <Link to={`/detail/${product._id}`}>
                <div className='relative'>
                  <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                    <img src={product?.thumbnail} alt={product?.name} className='object-cover' />
                    <img src={product?.thumbnail} alt={product?.name} className='object-cover' />
                  </div>

                  <FaRegEye
                    className='absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                    title='Xem nhanh'
                  />
                  <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                    -{product?.discount}%
                  </span>
                </div>
              </Link>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>{product?.name}</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>
                    {product?.price - product?.price * (product?.discount / 100)}₫
                  </span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>{product?.price}₫</span>
                </div>
                <button
                  className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'
                  onClick={() => handleAddToCart(String(product._id))}
                >
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='pagination'></div>
      </div>
    </>
  )
}

export default ProductList
