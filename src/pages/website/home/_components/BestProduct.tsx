import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { getAllProducts } from '@/services/product'
import { IProduct } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
type Props = {}

const BestProduct = (props: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await instance.get(`/orders`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data.res)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])
  console.log(products);
  if (isLoading) return <CustomLoadingPage />
  if (isError) return <div>{error?.message}</div>
  return (
    <div>
      {/* {contextHolder} */}
      {/* Hiển thị danh sách sản phẩm */}
      <div className='mx-auto container mt-20'>
        <h2 className='text-center text-[25px] sm:text-[45px] mb-8 mt-10 md:mt-20 text-[#FCA120]'>
          Sản phẩm bán chạy
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
            .filter((product) => !product.is_hidden) // Lọc sản phẩm không ẩn
            .sort((a, b) => {
              // Sắp xếp theo số lượng sold giảm dần
              const soldA = a?.variants?.[0]?.sku_id?.sold || 0
              const soldB = b?.variants?.[0]?.sku_id?.sold || 0
              return soldB - soldA
            })
            .slice(0, 5) // Lấy 5 sản phẩm đầu tiên
            .map((product) => {
              const firstVariant = product?.variants?.[0]
              const price = firstVariant?.sku_id?.price || 0

              return (
                <div key={product._id} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
                  <Link to={`/detail/${product._id}`}>
                    <div className='relative'>
                      <div className='flex transition-transform ease-in-out duration-500'>
                        <img
                          src={
                            // hoveredImages[product._id] || // Ảnh hiện tại được hover
                            product?.variants?.[0]?.sku_id?.image?.[0] || 'default-image.jpg' // Ảnh mặc định ban đầu // Ảnh mặc định nếu không có
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
                          {(price).toLocaleString()}₫
                        </span>
                        {/* {hoveredPrices[product._id] ? (
                        <span className='text-[#878c8f] font-light line-through text-[13px]'>
                          {product?.variants?.[0]?.sku_id?.price.toLocaleString()}₫
                        </span>
                      ) : null} */}
                      </div>
                      {/* <div className='flex space-x-4'>
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
                    </div> */}
                      <Button>xem chi tiết</Button>
                    </div>
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default BestProduct
