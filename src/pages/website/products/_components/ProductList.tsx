/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCartStoreHeader } from '@/hooks/store/cartStore'
import useCart from '@/hooks/useCart'
import { useCookie } from '@/hooks/useStorage'
import { IProduct } from '@/types/product'
import { CloseOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { Link } from 'react-router-dom'

type ProductListProps = {
  products?: IProduct[]
  pagination?: {
    currentPage?: number
    totalPages?: number
    totalItems?: number
  }
}

interface Color {
  id: string | number
  value: string
}

const ProductList = ({ products = [] }: ProductListProps) => {
  // Sử dụng Zustand store thay vì useState
  const {
    quantity,
    setQuantity,
    activeImageIndex,
    setActiveImageIndex,
    selectedColorId,
    setSelectedColorId,
    isCartVisible,
    setIsCartVisible,
    colors,
    setColors,
    selectedProduct,
    setSelectedProduct,
    selectedSkuId,
    setSelectedSkuId
  } = useCartStoreHeader()
  // State để theo dõi variant được chọn

  const [messageApi, contextHolder] = message.useMessage()
  const [user] = useCookie('user', {})
  const userId = user?._id
  const { addToCart } = useCart() // Zustand store để thêm vào giỏ hàng
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: number }>({})
  const [hoveredImages, setHoveredImages] = useState({})
  const [hoveredPrices, setHoveredPrices] = useState({})
  useEffect(() => {
    // Mặc định chọn màu đầu tiên cho mỗi sản phẩm khi render
    const defaultVariants = products.reduce((acc, product) => {
      acc[product._id] = 0 // Chọn màu đầu tiên
      return acc
    }, {})
    setSelectedVariants(defaultVariants)
  }, [products])
  const increase = () => {
    if (quantity < 10) setQuantity(quantity + 1)
  }

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }
  // Cập nhật hàm addtoCart để sử dụng selectedSkuId
  const addtoCart = (selectedSkuId: string | null, quantity: number) => {
    if (!userId) {
      messageApi.warning('Bạn chưa đăng nhập.') // Thông báo khi chưa đăng nhập
      return // Dừng thêm vào giỏ hàng nếu không có userId
    }

    if (!selectedSkuId) {
      messageApi.error('Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng.')
      return // Dừng nếu chưa chọn màu sắc
    }

    // Thực hiện thêm sản phẩm vào giỏ hàng với selectedSkuId
    addToCart(selectedSkuId, quantity)
    messageApi.success('Thêm vào giỏ hàng thành công')
    setIsCartVisible(false)
    setSelectedSkuId(null)
    setSelectedColorId(null)
  }

  const handleAddToCart = (productId: string) => {
    if (!userId) {
      messageApi.warning('Bạn chưa đăng nhập.')
      return
    }
    const foundProduct = products ? products.find((product) => product._id === productId) : undefined

    if (foundProduct) {
      setSelectedProduct(foundProduct)
      setQuantity(1)
      const productColors =
        foundProduct.variants?.map((variant: any) => ({
          id: variant?.sku_id?._id,
          value: variant?.option_value_id?.value
        })) || []

      setColors(productColors?.filter((color: Color) => color.value)) // Lọc các màu sắc
      if (foundProduct?.variants.length === 1) {
        const singleVariant = foundProduct.variants[0]
        const singleSkuId = singleVariant.sku_id._id
        addToCart(singleSkuId, 1)
        messageApi.success('Thêm vào giỏ hàng thành công') // Thêm sản phẩm vào giỏ hàng ngay lập tức nếu chỉ có 1 biến thể
      } else {
        setIsCartVisible(true) // Mở giỏ hàng để người dùng chọn màu sắc
      }
    } else {
      messageApi.error('Sản phẩm không tồn tại!')
    }
  }

  const handleColorSelect = (id: any) => {
    setSelectedColorId(id)
    const selectedVariant = selectedProduct?.variants?.find(
      (variant: { sku_id: { _id: any } }) => variant.sku_id._id === id
    )
    if (selectedVariant) {
      setSelectedSkuId(selectedVariant.sku_id._id)
    }
  }

  const thumbnails = [selectedProduct?.thumbnail] // Giả sử chỉ có một thumbnail, có thể mở rộng sau nếu có thêm

  return (
    <>
      {/* Data cart */}
      {selectedProduct && ( // Đảm bảo chỉ render nếu selectedProduct tồn tại
        <div
          className={`fixed lg:p-60 inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center transform duration-200 ease-in-out ${
            isCartVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className='bg-white p-5 rounded-lg'>
            <div className='float-right'>
              <button className='' onClick={() => setIsCartVisible(false)}>
                <CloseOutlined />
              </button>
            </div>

            <div className='lg:grid lg:grid-cols-2 space-x-5 flex flex-col mt-10 container xl:gap-0 lg:gap-6'>
              <div className='flex flex-col'>
                <div className='flex lg:flex-row flex-col col-span-1 gap-4 lg:mx-0 mx-auto'>
                  <div className='lg:flex flex-wrap  flex-col hidden'>
                    {thumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Product Thumbnail ${index + 1}`}
                        className='lg:w-16 w-10 lg:h-12 h-1 mb-3 cursor-pointer'
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                    {thumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Product Thumbnail ${index + 1}`}
                        className='lg:w-16 w-10 lg:h-12 h-1 mb-3 cursor-pointer'
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                    {thumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Product Thumbnail ${index + 1}`}
                        className='lg:w-16 w-10 lg:h-12 h-1 mb-3 cursor-pointer'
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                    {thumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Product Thumbnail ${index + 1}`}
                        className='lg:w-16 w-10 lg:h-12 h-1 mb-3 cursor-pointer'
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                    {thumbnails.map((thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Product Thumbnail ${index + 1}`}
                        className='lg:w-16 w-10 lg:h-12 h-1 mb-3 cursor-pointer'
                        onClick={() => setActiveImageIndex(index)}
                      />
                    ))}
                  </div>

                  <div className='relative lg:mx-0  h-auto w-full overflow-hidden'>
                    <div
                      className='flex lg:mx-auto transition-transform duration-1000 ease-in-out'
                      style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
                    >
                      {thumbnails.map((thumbnail, index) => (
                        <img
                          key={index}
                          src={thumbnail}
                          alt={`Product Image ${index + 1}`}
                          className='max-w-full h-auto'
                        />
                      ))}
                    </div>

                    <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[18px] rounded-lg'>
                      {selectedProduct.discount}%
                    </span>

                    <button
                      title='Prev'
                      className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2'
                      onClick={() =>
                        setActiveImageIndex((activeImageIndex - 1 + thumbnails.length) % thumbnails.length)
                      }
                    >
                      <GrFormPrevious className='w-[35px] h-[35px]' />
                    </button>

                    <button
                      title='Next'
                      className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2'
                      onClick={() => setActiveImageIndex((activeImageIndex + 1) % thumbnails.length)}
                    >
                      <GrFormNext className='w-[35px] h-[35px]' />
                    </button>
                  </div>
                </div>

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

              <div className='col-span-1  lg:mt-0 mt-6'>
                <div className='product-heading'>
                  <h1 className='text-[#fca120] font-semibold text-2xl'>{selectedProduct.name}</h1>
                  <div className='flex gap-[30px] mt-3'>
                    <span id='pro_sku' className='text-sm font-light'>
                      Mã sản phẩm: <span className='text-[#fca120] font-semibold ml-1'>2001256</span>
                    </span>
                    <span className='text-sm font-light'>
                      Tình trạng: <span className='text-[#fca120] font-semibold ml-1'>Còn hàng</span>
                    </span>
                    <span className='text-sm font-light'>
                      Thương hiệu:
                      <Link to={'/product/brand'} className='text-[#fca120] font-semibold ml-1'>
                        {selectedProduct.brand}
                      </Link>
                    </span>
                  </div>
                </div>

                <div className='price flex justify-start items-center gap-3 mt-[30px]'>
                  <span className='name-price text-[19px] font-semibold'>Giá:</span>
                  <div className='pricedetail flex flex-row items-center gap-2 '>
                    <span className='text-[#FF0000] font-semibold text-[24px]'>
                      {selectedProduct?.price - selectedProduct?.price * (selectedProduct?.discount / 100)}đ
                    </span>
                    <span className='text-[15px] text-[#878c8f] font-light line-through'>{selectedProduct.price}đ</span>
                  </div>
                </div>
                <div className='flex flex-wrap items-center gap-3'>
                  <h2 className='font-semibold'>Màu sắc:</h2>
                  {colors.map((color: any) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color.id)}
                      className={`p-2 border rounded ${selectedColorId === color.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                      {color.value}
                    </button>
                  ))}
                </div>
                {/* Quantity Section */}
                <div className='btn_1'>
                  <div className='flex items-center gap-4 mt-4'>
                    <h2 className='font-semibold'>Số lượng:</h2>
                    <div className='flex items-center rounded gap-4'>
                      <button className='text-[16px] size-6 rounded bg-gray-200' onClick={decrease}>
                        -
                      </button>
                      <span className='font-semibold'>{quantity}</span>
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
                        <button className='w-full' onClick={() => addtoCart(selectedSkuId as string, quantity)}>
                          <span className='relative z-10 text-[16px]'>Thêm Vào Giỏ</span>
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
              </div>
            </div>
          </div>
        </div>
      )}
      {contextHolder}
      {/* Hiển thị danh sách sản phẩm */}
      <div className='mx-auto container mt-20'>
        <h2 className='text-center text-[25px] sm:text-[45px] mb-8 mt-10 md:mt-20 text-[#FCA120]'>
          Sản phẩm mới ra mắt
          {/* <button
                    className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'
                    onClick={() => handleAddToCart(String(product._id))}
                  >
                    <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                    <div className='p-[6px] bg-[#FCA120] rounded-full'>
                      <Cart />
                    </div>
                  </button> */}
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 lg:mx-[40px] mt-4 mb-8'>
          {products
            .filter((product: any) => !product.is_hidden)
            .map((product: any) => {
              // Kiểm tra các variant và lấy giá trị từ sku_id
              const firstVariant = product?.variants?.[0]
              console.log('firstVariant', firstVariant)

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
                          <h3>{firstVariant?.sku_id?.name}</h3>
                          <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                            {/* Hiển thị giá thay đổi khi hover */}
                            <span className='text-[#FF0000] font-semibold'>
                              {firstVariant?.sku_id?.price?.toLocaleString()}₫
                            </span>
                            <span className='text-gray-500 line-through font-medium text-sm'>
                              {firstVariant?.sku_id?.price_before_discount?.toLocaleString()}₫
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
    </>
  )
}

export default ProductList
