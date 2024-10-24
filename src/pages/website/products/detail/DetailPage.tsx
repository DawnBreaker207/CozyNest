import { FaRegEye } from 'react-icons/fa'
import CouponCard from '../../cart/_components/CouponCard'
import { Cart } from '@/components/icons/index'
import { useState } from 'react'
import { GrFormNext } from 'react-icons/gr'
import { GrFormPrevious } from 'react-icons/gr'
import { useProductQuery } from '@/hooks/useProductQuery'
import { Link, useParams } from 'react-router-dom'
import RelatedProduct from '../_components/RelatedProduct'
const ProductDetail = () => {
  const [count, setCount] = useState(1) // State để giữ số lượng sản phẩm
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0) // Quản lý trạng thái ảnh hiện tại

  const { id } = useParams() // Lấy productId từ URL
  const { data, isLoading, error } = useProductQuery({ id })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  //Kiểm tra dữ liệu product
  if (!data || !data.res) return <p>Product not found</p>
  const product = data.res
  const category = product.categoryId?.[0]
  // console.log(category.products)

  const increase = () => {
    if (count < 10) setCount(count + 1)
  }

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }

  // Hàm tính toán chiều cao của phần mô tả
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  const couponCode1 = 'A87TYRT55'
  const couponCode2 = 'QH5G8J0Y'
  const couponCode3 = 'A789UYT'

  // const [image, setImage] = useState('https://via.placeholder.com/500')
  const thumbnails = [
    '/src/assets/images/product/img-slide-1.jpg',
    '/src/assets/images/product/img-slide-2.webp',
    '/src/assets/images/product/img-slide-3.webp',
    '/src/assets/images/product/img-slide-4.webp',
    '/src/assets/images/product/img-slide-5.webp',
    '/src/assets/images/product/img-slide-6.webp'
  ]

  return (
    <div>
      <div className='lg:grid lg:grid-cols-2 flex flex-col mt-10 container xl:gap-0 lg:gap-6'>
        <div className='flex flex-col'>
          <div className='flex lg:flex-row flex-col col-span-1 gap-4 lg:mx-0 mx-auto'>
            {/* List of Thumbnails */}
            <div className='lg:flex flex-wrap flex-col hidden'>
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Product Thumbnail ${index + 1}`}
                  className='w-16 h-16 mb-3 cursor-pointer'
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
            <div className='relative lg:mx-0 md:w-[450px] md:h-[450px] h-auto w-full overflow-hidden'>
              <div
                className='flex lg:mx-auto transition-transform duration-1000 ease-in-out'
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                {thumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
                    alt={`Product Image ${index + 1}`}
                    className='max-w-full h-auto' // Keep image aspect ratio and fit within container
                  />
                ))}
              </div>

              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[18px] rounded-lg'>
                {product.discount}%
              </span>

              {/* Back Button */}
              <button
                className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2'
                onClick={() => setActiveImageIndex((activeImageIndex - 1 + thumbnails.length) % thumbnails.length)}
              >
                <GrFormPrevious className='w-[35px] h-[35px]' />
              </button>

              {/* Next Button */}
              <button
                className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2'
                onClick={() => setActiveImageIndex((activeImageIndex + 1) % thumbnails.length)}
              >
                <GrFormNext className='w-[35px] h-[35px]' />
              </button>
            </div>
            {/* List of Thumbnails */}
            <div className='flex flex-wrap gap-2 flex-row mx-auto lg:hidden'>
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Product Thumbnail ${index + 1}`}
                  className='sm:w-16 sm:h-16 w-12 h-12 mb-[10px] cursor-pointer'
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
          </div>
          {/* Share Section */}
          <div className='share flex flex-row items-center justify-center xl:mr-24 mt-4'>
            <span className='font-light'>Chia sẻ:</span>
            <img src='/src/assets/images/share/fb.svg' className='w-[30px] h-[30px] ml-4' />
            <img src='/src/assets/images/share/mess.svg' className='w-[30px] h-[30px] ml-4' />
            <img src='/src/assets/images/share/twitter.svg' className='w-[30px] h-[30px] ml-4' />
            <img src='/src/assets/images/share/phone.svg' className='w-[35px] h-[35px] ml-4' />
            <img src='/src/assets/images/share/link.svg' className='w-[25px] h-[25px] ml-4' />
          </div>
        </div>
        <div className='col-span-1 lg:mt-0 mt-6'>
          <div className='product-heading'>
            <h1 className='text-[#fca120] font-semibold text-2xl'>{product.name}</h1>
            <div className='flex gap-[30px] mt-3'>
              <span id='pro_sku' className='text-sm font-light'>
                Mã sản phẩm: <span className='text-[#fca120] font-semibold ml-1'>2001256</span>
              </span>
              <span className='text-sm font-light'>
                Tình trạng: <span className='text-[#fca120] font-semibold ml-1'>Còn hàng</span>
              </span>
              <span className='text-sm font-light'>
                Thương hiệu:
                <span className='text-[#fca120] font-semibold ml-1'>{product.brand}</span>
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className='price flex justify-start items-center gap-3 mt-[30px]'>
            <span className='name-price text-[19px] font-semibold'>Giá:</span>
            <div className='pricedetail flex flex-row items-center gap-2 '>
              <span className='text-[#FF0000] font-semibold text-[24px]'>{product.price}</span>
              <span className='text-[#878c8f] font-light line-through text-[16px]'>1,250,000₫</span>

              {/* Phần Giảm Giá */}
              <span className='bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>{product.discount}%</span>
            </div>
          </div>

          {/* Quantity Section */}
          <div className='btn_1'>
            <div className='flex items-center gap-4 mt-4'>
              <h2 className='font-semibold'>Số lượng:</h2>
              <div className='flex items-center rounded gap-4'>
                <button className='text-[16px] size-6 rounded bg-gray-200' onClick={decrease}>
                  -
                </button>
                <span className='font-semibold'>{count}</span>
                <button className='text-[16px] size-6 rounded bg-gray-200' onClick={increase}>
                  +
                </button>
              </div>
            </div>
            <div className=''>
              <div className=' flex gap-[12px] mt-[22px]'>
                <Link
                  to=''
                  className='bg-[#fca120] text-white w-full py-[10px] border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300'
                >
                  <button className='w-full'>
                    <span className='relative z-10 text-[16px]'>Thêm Vào Giỏ</span>
                  </button>
                </Link>
                <Link
                  to='/cart'
                  className='bg-[#fca120] text-white w-full py-[10px] border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300'
                >
                  <button className='w-full'>
                    <span className='relative z-10'>Mua Ngay</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Delivery Section */}
          <div className='mt-4'>
            <div className='flex sm:flex-row flex-col 2xl:flex 2xl:flex-row gap-y-3 items-center justify-between lg:grid lg:grid-cols-2 lg:gap-y-4'>
              <div className='flex items-center'>
                <img
                  src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_1_ico.png?v=38'
                  alt='1 Năm Bảo Hành'
                  className='w-[30px] h-auto mr-[10px]'
                />
                1 Năm Bảo Hành
              </div>
              <div className='flex items-center'>
                <img
                  src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_2_ico.png?v=38'
                  alt='Hỗ trợ đổi trong 3 ngày'
                  className='w-[30px] h-auto mr-[10px]'
                />
                Hỗ trợ đổi trong 3 ngày
              </div>
              <div className='flex items-center'>
                <img
                  src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_3_ico.png?v=38'
                  alt='Hotline: 1900 63 64 76'
                  className='w-[30px] h-auto mr-[10px]'
                />
                Hotline: <span className='ml-1'>1900 63 64 76</span>
              </div>
            </div>
          </div>
          <hr className='h-[1px] bg-gray-400 border-none my-5' />

          {/* Coupon Section */}
          <div className='lg:flex lg:flex-wrap  lg:space-x-0  lg:gap-4 mt-[10px]'>
            <div className='coupon w-1/2,5 lg:w-[48%]'>
              <CouponCard
                couponCode={couponCode1}
                imageUrl='/src/assets/images/coupon/coupon_2_img.webp'
                expirationDate='10/10/2024'
                title='Miễn phí vận chuyển'
                description='Đơn hàng từ 300k'
                condition='Dành cho đơn hàng từ 300k'
              />
            </div>
            <div className='coupon w-1/2,5 lg:w-[48%]'>
              <CouponCard
                couponCode={couponCode2}
                imageUrl='/src/assets/images/coupon/coupon_1_img.webp'
                expirationDate='10/10/2024'
                title='Giảm 20%'
                description='Đơn hàng từ 200k'
                condition='Dành cho đơn hàng từ 200k'
              />
            </div>
            <div className='coupon w-1/2,5 lg:w-[48%]'>
              <CouponCard
                couponCode={couponCode3}
                imageUrl='/src/assets/images/coupon/coupon_3_img.webp'
                expirationDate='10/10/2024'
                title='Giảm 10%'
                description='Đơn hàng từ 100k'
                condition='Dành cho đơn hàng từ 100k'
              />
            </div>
          </div>
          <hr className='h-[1px] bg-black border-none my-5' />

          {/* Product Description */}
          <div
            className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'min-h-[230px]' : 'min-h-[420px]'}  overflow-hidden mt-[10px]`}
          >
            <div className='productDetail--navs mg-top mt-[15px]'>
              <div className='nav tab-title'>
                <b className='nav-item active text-[24px] text-[#fca120]'>Mô tả sản phẩm</b>
              </div>
              <hr className='mb-[20px]' />
              <div className={`tab-pane fade show active ${isCollapsed ? 'h-[250px]' : 'h-auto'} transition-all`}>
                <div
                  className={`description-productdetail overflow-hidden ${isCollapsed ? 'max-h-[180px]' : 'max-h-none'} transition-all`}
                >
                  <p>{product.description}</p>
                  <p>--------------</p>
                  {/* More product description details */}
                  <table className='table-auto w-full border-collapse mt-[10px]'>
                    <tbody>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Sản phẩm
                        </th>
                        <td className=''>{product.name}</td>
                      </tr>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Bộ sưu tập
                        </th>
                        <td className=''>{product.brand}</td>
                      </tr>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Kích cỡ
                        </th>
                        <td className=''>H6.5XDia12.5; L20xW11xH15 ∙ 6 cups</td>
                      </tr>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Màu sắc
                        </th>
                        <td className=''>Màu trắng/ màu đen</td>
                      </tr>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Chất liệu
                        </th>
                        <td className=''>Sứ</td>
                      </tr>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Xuất xứ
                        </th>
                        <td className=''>Trung Quốc</td>
                      </tr>
                      <tr>
                        <th scope='row' className='btn-th text-left align-top pr-12'>
                          Đơn vị
                        </th>
                        <td className=''>SET</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='description-btn flex justify-center mt-[10px]'>
                <button
                  className={`expandable-content_toggle ${isCollapsed ? 'border border-red-500 text-[#fca120]' : 'text-[#fca120]'} p-2 rounded-md`}
                  onClick={handleToggleCollapse}
                >
                  {isCollapsed ? '+ Xem thêm' : '- Rút gọn nội dung'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-20 container'>
        <RelatedProduct id={category._id} />

        <div className='mt-[60px]'>
          <h1 className='text-[#fca120] font-semibold text-[25px] mb-8'>Sản phẩm đã xem</h1>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5'>
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 bg-white'>
              <div className='relative'>
                <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                  <img src='/src/assets/images/product/sp1.webp' alt='' className='object-cover' />
                  <img src='/src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
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
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default ProductDetail
