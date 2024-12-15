import { Cart } from '@/components/icons/index'
import { useProduct } from '@/hooks/useProductQuery'
import { Variants } from '@/types/product'
import { useEffect, useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CouponCard from '../../cart/_components/CouponCard'
import RelatedProduct from '../_components/RelatedProduct'
import ReviewComponent from './_components/Review'
import useCart from '@/hooks/useCart'
import { Button, message, Spin } from 'antd'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import Cookies from 'js-cookie'
const ProductDetail = () => {
  const [count, setCount] = useState(1) // State để giữ số lượng sản phẩm
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0) // Quản lý trạng thái ảnh hiện tại
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null) // State để lưu id màu sắc được chọn
  const [priceVar, setPriceVar] = useState<number | 0>(0) // State để lưu id màu sắc được chọn
  const [hoveredColorId, setHoveredColorId] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams() // Lấy productId từ URL
  const { data, isLoading, error } = useProduct(id)
  const [loading, setLoading] = useState(false) // Khai báo trạng thái loading
  const { addToCart } = useCart() // Lấy hàm addToCart từ hook
  // Lấy tất cả các màu sắc từ variants
  const variants = data?.variants || [] // Đảm bảo variants không undefined
  console.log(variants)

  const colors = variants
    .map((variant: Variants) => ({
      id: variant?.sku_id?._id, // Lưu id của màu sắc
      price: variant?.sku_id?.price,
      value: variant?.sku_id?.name // Lưu giá trị của màu sắc
    }))
    .filter((color) => color.value) // Lọc các màu sắc hợp lệ
  console.log(colors)
  // Đảm bảo khi `colors` có dữ liệu, chọn màu đầu tiên mặc định
  useEffect(() => {
    // Nếu không có màu nào được chọn, chọn màu đầu tiên trong danh sách màu sắc
    if (colors.length > 0 && !selectedColorId) {
      setSelectedColorId(colors[0].id) // Chọn màu đầu tiên mặc định
      setPriceVar(colors[0].price) // Cập nhật giá của màu sắc đầu tiên
    }
  }, [colors, selectedColorId]) // Chạy lại khi colors thay đổi

  const handleAddToCart = () => {
    // Lấy thông tin user từ cookie
    const user = Cookies.get('user')

    // Kiểm tra trạng thái đăng nhập
    if (!user || Object.keys(JSON.parse(user)).length === 0) {
      message.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.')
      setTimeout(() => {
        navigate('/login')
      }, 3500)
      return
    }

    if (selectedColorId && count > 0) {
      // Lấy thông tin sản phẩm và SKU dựa trên `selectedColorId`
      const selectedVariant = product.variants?.find((variant) => variant.sku_id._id === selectedColorId)

      if (!selectedVariant) {
        message.error('Không tìm thấy thông tin sản phẩm.')
        return
      }

      // Kiểm tra tồn kho
      if (count > selectedVariant?.sku_id.stock) {
        message.error('Sản phẩm bạn vừa mua đã vượt quá số lượng tồn kho.')
        return
      }

      // Thêm vào giỏ hàng nếu đủ tồn kho
      message.success('Thêm vào giỏ hàng thành công')
      addToCart(selectedColorId, count) // Gọi hàm thêm sản phẩm vào giỏ hàng
    } else {
      message.error('Vui lòng chọn số lượng hợp lệ.')
    }
  }

  const handleBuyNow = async () => {
    setLoading(true) // Hiển thị trạng thái loading ngay khi nhấn nút

    try {
      if (selectedColorId && count > 0) {
        const selectedVariant = product.variants?.find((variant) => variant.sku_id._id === selectedColorId)

        if (!selectedVariant) {
          message.error('Không tìm thấy thông tin sản phẩm.')
          setLoading(false) // Tắt loading khi có lỗi
          return
        }

        if (count > selectedVariant?.sku_id.stock) {
          message.error('Sản phẩm bạn vừa mua đã vượt quá số lượng tồn kho.')
          setLoading(false) // Tắt loading khi có lỗi
          return
        }

        // Gọi API thêm sản phẩm vào giỏ hàng
        addToCart(selectedColorId, count) // Thêm await để đảm bảo API hoàn tất trước khi chuyển hướng

        // Hiển thị thông báo

        // Chờ chuyển hướng
        setTimeout(() => {
          navigate(`/cart`) // Chuyển hướng
          setLoading(false) // Tắt loading sau khi chuyển hướng
        }, 1000) // 1 giây delay
      } else {
        message.error('Vui lòng chọn số lượng hợp lệ.')
        setLoading(false) // Tắt loading khi có lỗi
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.')
      console.error(error)
      setLoading(false) // Tắt loading khi có lỗi
    }
  }

  const handleColorSelect = (id: string, price: number) => {
    setSelectedColorId(id) // Cập nhật id màu sắc được chọn
    setPriceVar(price)
  }
  const selectedVariant = variants.find((variant: any) => variant.sku_id._id === selectedColorId)
  //Kiểm tra dữ liệu product
  if (!data || !data) return <Spin size='large' />
  const product = data
  console.log(product)

  const category = product?.category_id?._id

  const increase = () => {
    if (count) setCount(count + 1)
  }

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }

  // Hàm tính toán chiều cao của phần mô tả
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (isLoading) {
    return (
      <div>
        <Spin size='large' />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  console.log(product)

  return (
    <div>
      <div className='lg:grid lg:grid-cols-2 flex flex-col mt-10 container xl:gap-0 lg:gap-6'>
        <div className='flex flex-col h-min'>
          {/* Thumbnails và Images */}
          <div className='flex lg:flex-row flex-col col-span-1 gap-4 lg:mx-10 mx-auto'>
            {/* List of Thumbnails */}
            <div className='lg:flex flex-wrap flex-col hidden'>
              {product?.variants
                .find((variant) => variant.sku_id._id === selectedColorId) // Lọc variant dựa trên màu đã chọn
                ?.sku_id?.image?.map((image, index) => (
                  <img
                    key={index}
                    src={image} // Sử dụng URL ảnh từ variant tương ứng với màu đã chọn
                    alt={`Ảnh thu nhỏ sản phẩm ${index + 1}`}
                    className='w-16 h-16 mb-3 cursor-pointer'
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
            </div>

            <div className='relative lg:mx-0 md:w-[520px] md:h-[520px] h-auto w-full overflow-hidden'>
              <div
                className='flex lg:mx-auto transition-transform duration-1000 ease-in-out'
                style={{
                  transform: `translateX(-${activeImageIndex * 100}%)`
                }}
              >
                {product?.variants
                  .find((variant) => variant.sku_id._id === selectedColorId) // Lọc variant dựa trên màu đã chọn
                  ?.sku_id?.image?.map((image, index) => (
                    <img
                      key={index}
                      src={image} // Sử dụng URL ảnh từ variant tương ứng với màu đã chọn
                      alt={`Ảnh sản phẩm ${index + 1}`}
                      className='max-w-full h-auto' // Giữ tỷ lệ ảnh và phù hợp với container
                    />
                  ))}
              </div>

              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[18px] rounded-lg'>
                {product.discount}%
              </span>

              {/* Nút quay lại */}
              <button
                title='Quay lại'
                className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2'
                onClick={() =>
                  setActiveImageIndex(
                    (activeImageIndex -
                      1 +
                      product?.variants?.find((variant) => variant.sku_id._id === selectedColorId)?.sku_id?.image
                        ?.length) %
                      product?.variants?.find((variant) => variant.sku_id._id === selectedColorId)?.sku_id?.image
                        ?.length
                  )
                }
              >
                <GrFormPrevious className='w-[35px] h-[35px]' />
              </button>

              {/* Nút tiếp theo */}
              <button
                title='Tiếp theo'
                className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2'
                onClick={() =>
                  setActiveImageIndex(
                    (activeImageIndex + 1) %
                      product?.variants?.find((variant) => variant.sku_id._id === selectedColorId)?.sku_id?.image
                        ?.length
                  )
                }
              >
                <GrFormNext className='w-[35px] h-[35px]' />
              </button>
            </div>
          </div>
        </div>

        <div className='col-span-1 lg:mt-0 mt-6'>
          <div className='product-heading'>
            <h1 className=' font-bold text-2xl'>{product.name}</h1>
            <div className='flex gap-[30px] mt-3'>
              <span id='pro_sku' className='text-sm font-light'>
                Mã sản phẩm: <span className='text-[#fca120] font-semibold ml-1'>{selectedVariant?.sku_id?.SKU}</span>
              </span>
              <span className='text-sm font-light'>
                Số lượng kho:{' '}
                <span className='text-[#fca120] font-semibold ml-1'>{selectedVariant?.sku_id?.stock}</span>
              </span>
              <span className='text-sm font-light'>
                Thương hiệu:
                <span className='text-[#fca120] font-semibold ml-1'>{product?.category_id?.name}</span>
              </span>
            </div>
          </div>

          {/* Price Section */}
          <div className='price flex justify-start items-center gap-3 mt-[30px]'>
            <span className='name-price text-[19px] font-semibold'>Giá:</span>
            <div className='pricedetail flex flex-row items-center gap-2'>
              {/* Hiển thị giá sau khi giảm */}
              <span className='text-[#FF0000] font-semibold text-[24px]'>{priceVar.toLocaleString()}₫</span>
              {/* Kiểm tra nếu có giảm giá và hiển thị giá cũ bị gạch ngang */}
              {product.variants[0]?.sku_id?.price_discount_percent > 0 && (
                <>
                  {/* <span className='bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                    {product.variants[0]?.sku_id?.price_discount_percent}%
                  </span> */}
                  {/* Giá trước khi giảm */}
                  <span className='text-gray-500 line-through text-[18px]'>
                    {product.variants[0]?.sku_id?.price.toLocaleString()}₫
                  </span>
                </>
              )}
            </div>
          </div>
          {/* Màu sắc Section */}
          <div className='flex flex-wrap items-center mt-6 gap-3'>
            <h2 className='font-semibold'>Màu sắc:</h2>
            {variants.map((variant: any) => {
              const color = variant.option_value_id
              const isSelected = selectedColorId === variant.sku_id._id
              const isHovered = hoveredColorId === variant._id
              const bgColor =
                color.value === 'Nâu' ? 'bg-[#A0522D]' : color.value === 'Màu Tự Nhiên' ? 'bg-[#F5DEB3]' : 'bg-gray-200'

              // Tên màu hiển thị khi hover hoặc select
              const displayName =
                isSelected || isHovered ? color.label || color.value : variants[0]?.option_value_id.value

              return (
                <button
                  key={variant.sku_id._id}
                  onClick={() => {
                    handleColorSelect(variant.sku_id._id, variant.sku_id.price)
                  }}
                  onMouseEnter={() => setHoveredColorId(variant._id)}
                  onMouseLeave={() => setHoveredColorId(null)}
                  className={`relative p-3 border-2 rounded-full ${bgColor}`}
                  style={{
                    outline: isSelected ? '1px solid black' : 'none',
                    outlineOffset: '3px'
                  }}
                >
                  {/* Hiển thị tên màu khi hover hoặc select */}
                  {(isSelected || isHovered) && (
                    <span
                      className='absolute top-[-30px] right-7 transform translate-x-[10px] text-sm font-semibold'
                      style={{
                        padding: '2px 10px',
                        borderRadius: '5px',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        maxWidth: '80%'
                      }}
                    >
                      {displayName}
                    </span>
                  )}
                </button>
              )
            })}
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
              <div className='flex gap-[12px] mt-[22px]'>
                <Link
                  to=''
                  className='bg-[#fca120] text-white w-full py-[10px] border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300'
                >
                  <button onClick={handleAddToCart} className='w-full'>
                    <span className='relative z-10 text-[16px]'>Thêm Vào Giỏ</span>
                  </button>
                </Link>
                {/* Hiển thị overlay loading bên trong nút */}
                <button
                  onClick={handleBuyNow}
                  disabled={loading} // Disable nút khi đang loading
                  className={`bg-[#fca120] text-white w-full py-[10px] border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? <Spin size='small' /> : <span className='relative z-10'>Mua Ngay</span>}
                </button>
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
          <div className='productDetail--navs mg-top mt-[15px]'>
            <div className='nav tab-title'>
              <b className='nav-item active text-[24px] text-[#fca120]'>Mô tả sản phẩm</b>
            </div>
            <hr className='mb-[20px]' />
            <div className={`tab-pane fade show active ${isCollapsed ? 'h-[250px]' : 'h-auto'} transition-all`}>
              <div
                className={`description-productdetail overflow-hidden ${isCollapsed ? 'max-h-[180px]' : 'max-h-none'} transition-all`}
              >
                <ReactQuill
                  value={product.description}
                  readOnly
                  theme='bubble' // Sử dụng theme bubble cho chế độ chỉ đọc
                />
                <p className='-mt-[10px]'>--------------</p>
                {/* More product description details */}
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
        {/* Product Description */}

        <div
          className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'min-h-[230px]' : 'min-h-[420px]'}  overflow-hidden lg:-mt-[350px] `}
        >
          {' '}
          <div className='review lg:-mt-[90px] xl:mt-[280px] '>
            <ReviewComponent product={product} />{' '}
          </div>
        </div>
      </div>

      <div className='mb-20 container'>
        <RelatedProduct id={category} />
        {/* <div className='mt-[60px]'>
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
        </div> */}
      </div>
    </div>
  )
}

export default ProductDetail
