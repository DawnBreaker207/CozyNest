import { Shoppingcart } from '@/components/icons'
import { FaRegEye } from 'react-icons/fa'

type Props = {}

const ProductList = (props: Props) => {
  return (
    <>
      <h2 className='text-center text-[25px] sm:text-[45px] mb-5'>Sản phẩm mới ra mắt</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 mx-8'>
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp1.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp2.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp2.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp3.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp3.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp4.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp4.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp5.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp5.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp6.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp6.2.jpg' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp7.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp7.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp8.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp8.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp9.jpg' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp9.2.jpg' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
        <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
          <div className='relative'>
            <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
              <img src='./src/assets/images/product/sp10.webp' alt='' className='object-cover' />
              <img src='./src/assets/images/product/sp10.2.webp' alt='' className='object-cover' />
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
            <h3>Ấm trà inox không ghỉ</h3>
            <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
              <span className='text-[#FF0000] font-semibold'>890,000₫</span>
              <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
            </div>
            <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
              <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
              <div className='p-[6px] bg-[#FCA120] rounded-full'>
                <Shoppingcart />
              </div>
            </button>
          </div>
        </div>
        {/* End product */}
      </div>
    </>
  )
}

export default ProductList
