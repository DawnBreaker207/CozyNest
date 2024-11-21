import { useCartStore } from '@/hooks/store/cartStore'
import useCart from '@/hooks/useCart'
import { message, Modal } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import CouponCard from './_components/CouponCard'

const CartPage = () => {
  const { products, quantities, setQuantity } = useCartStore()
  const { data, calculateTotal, mutate, deleteCart } = useCart()
  const navigate = useNavigate()

  // Tăng số lượng sản phẩm
  const increase = (index: number) => {
    if (quantities[index] < 10) {
      setQuantity(index, quantities[index] + 1)
      mutate({ action: 'INCREMENT', sku_id: products[index].sku_id._id })
    }
  }

  // Giảm số lượng sản phẩm
  const decrease = (index: number) => {
    if (quantities[index] > 1) {
      setQuantity(index, quantities[index] - 1)
      mutate({ action: 'DECREMENT', sku_id: products[index].sku_id._id })
    }
  }
  const handleDeleteCart = () => {
    const cartId = data?.res?.cartId // Lấy cartId từ dữ liệu giỏ hàng
    if (cartId) {
      deleteCart(cartId) // Gọi deleteCart với cartId
      message.success('Toàn bộ Sản phẩm đã được xóa khỏi giỏ hàng')
    } else {
      console.error('Không tìm thấy cartId')
    }
  }

  const couponCode1 = 'EORI9894'
  const couponCode2 = 'EORI9894'
  const couponCode3 = 'EORI9894'

  return (
    <div className='mb-14 mt-5'>
      <div className='container'>
        <span className='text-sm font-light text-[#252A2B]'>
          Trang chủ / Giỏ hàng <span className=''>({products.length})</span>
        </span>
        <div className='flex flex-col lg:flex-row mt-5 gap-6 w-full'>
          <div className='lg:w-[70%] w-full p-3 border border-gray-300 rounded-xl h-min'>
            <div className='flex items-center'>
              <h2 className='text-xl font-semibold mb-2 text-[#fca120]'>Giỏ hàng của bạn</h2>
              {products.length === 0 ? (
                <button
                  onClick={() => navigate('/products')} // Điều hướng về trang sản phẩm
                  className='bg-[#fca120] text-white py-[10px] px-[10px] border rounded-lg mb-3 border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300 ml-auto'
                >
                  Trở lại trang sản phẩm
                </button>
              ) : (
                <button
                  onClick={() => {
                    Modal.confirm({
                      title: 'Xác nhận xóa giỏ hàng',
                      content: 'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm trong giỏ hàng?',
                      okText: 'Có',
                      cancelText: 'Không',
                      onOk: handleDeleteCart // Gọi handleDeleteCart khi xóa giỏ hàng
                    })
                  }}
                  className='bg-[#fca120] text-white py-[10px] px-[10px] border rounded-lg mb-3 border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300 ml-auto'
                >
                  Xóa giỏ hàng
                </button>
              )}
            </div>

            <hr />
            <p className='text-[#252A2B] my-3'>
              Bạn đang có <span className='font-semibold text-[#fca120]'>{products.length} sản phẩm</span> trong giỏ
              hàng
            </p>
            {/* item cart */}
            <div className='border border-gray-300 rounded-xl p-4'>
              <ul className='space-y-6'>
                {products.map((product, index) => (
                  <li key={product.sku_id._id} className='flex items-center justify-between cursor-pointer'>
                    <div className='flex items-center gap-4'>
                      <div className=''>
                        <img
                          src={product.sku_id.product_id.thumbnail} // Sử dụng thumbnail từ dữ liệu
                          alt={product.sku_id.product_id.name} // Sử dụng tên sản phẩm cho alt
                          className='md:size-20 size-14 min-w-14 min-h-14'
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h3 className='text-base truncate sm:w-full w-40'>
                          {product.sku_id.product_id.name} {/* Sử dụng tên sản phẩm */}
                        </h3>
                        <h3 className='text-base truncate sm:w-full w-40'>
                          {product.sku_id.slug} {/* Sử dụng tên sản phẩm */}
                        </h3>
                        <div className='flex items-center gap-[10px]'>
                          <span className='text-red-500 font-semibold'>
                            {product.price}₫ {/* Giá thay đổi theo số lượng */}
                          </span>
                          <span className='font-light line-through text-xs'>{product.price}₫</span> {/* Giá gốc */}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                      <span className='text-red-500 font-semibold text-end'>{product.price * quantities[index]}₫</span>
                      <div className='flex items-center justify-center'>
                        <button
                          onClick={() => decrease(index)} // Truyền index để giảm số lượng
                          className='bg-gray-200 px-2 py-1 rounded-md cursor-pointer size-6 flex items-center justify-center'
                        >
                          -
                        </button>
                        <span className='mx-3 text-[#252A2B]'>{quantities[index]}</span>{' '}
                        {/* Sử dụng số lượng từ store */}
                        <button
                          onClick={() => increase(index)} // Truyền index để tăng số lượng
                          className='bg-gray-200 px-2 py-1 rounded-md cursor-pointer size-6 flex items-center justify-center'
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        Modal.confirm({
                          title: 'Xác nhận xóa',
                          content: `Bạn có chắc chắn muốn xóa sản phẩm ${product.sku_id.product_id.name} khỏi giỏ hàng?`,
                          okText: 'Có',
                          cancelText: 'Không',
                          onOk: () => {
                            mutate(
                              {
                                action: 'REMOVE',
                                sku_id: product.sku_id._id
                              },
                              {
                                onSuccess: () => {
                                  message.success('Sản phẩm đã được xóa khỏi giỏ hàng')
                                },
                                onError: (error) => {
                                  message.error(`Xóa sản phẩm thất bại: ${error.message}`)
                                }
                              }
                            )
                          }
                        })
                      }}
                    >
                      <img src='./src/assets/icon/delete.svg' alt='' className='size-5 min-h-5 min-w-5' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* End item cart */}
            <div className='mt-5'>
              <h3 className='font-semibold text-sm mb-3'>Ghi chú đơn hàng</h3>
              <textarea
                className='w-full border border-gray-300 focus:border-gray-500 rounded-xl focus:outline-none p-3'
                rows={5}
              ></textarea>
            </div>
          </div>
          <div className='lg:w-[30%] w-full p-3 border border-gray-300 rounded-xl'>
            <div>
              <h3 className='text-xl font-semibold mb-2 text-[#fca120]'>Thông tin đơn hàng</h3>
              <hr />
              <div className='flex items-center justify-between my-3'>
                <span className='font-medium'>Tổng tiền:</span>
                <span className='text-2xl font-semibold text-red-500'>{calculateTotal().toLocaleString()}₫</span>
              </div>
              <hr />
              <ul className='mt-3 space-y-1'>
                <li className='text-sm flex items-center'>
                  <div className='w-[6px] h-[6px] bg-[#252A2B] rounded-full mr-2'></div>
                  Phí vận chuyển sẽ được tính ở trang Thanh toán.
                </li>
                <li className='text-sm flex items-center'>
                  <div className='w-[6px] h-[6px] bg-[#252A2B] rounded-full mr-2'></div>
                  Mã giảm giá được nhập ở trang Thanh toán
                </li>
              </ul>

              {calculateTotal() === 0 ? (
                <div className='text-center text-red-500'>Không có sản phẩm nào trong giỏ hàng</div>
              ) : (
                <Link to={`check_out_form`}>
                  <button className='bg-[#fca120] text-white w-full py-[10px] mt-3 border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300'>
                    Thanh toán
                  </button>
                </Link>
              )}
            </div>

            <div className='mt-6'>
              <CouponCard
                couponCode={couponCode2}
                imageUrl='./src/assets/images/coupon/coupon_1_img.webp'
                expirationDate='10/10/2024'
                title='Giảm 100k'
                description='Đơn hàng từ 500k'
                condition='Dành cho đơn hàng từ 500k'
              />
              <CouponCard
                couponCode={couponCode1}
                imageUrl='./src/assets/images/coupon/coupon_2_img.webp'
                expirationDate='10/10/2024'
                title='Miễn phí vận chuyển'
                description='Đơn hàng từ 300k'
                condition='Dành cho đơn hàng từ 300k'
              />
              <CouponCard
                couponCode={couponCode3}
                imageUrl='./src/assets/images/coupon/coupon_3_img.webp'
                expirationDate='10/10/2024'
                title='Giảm 10%'
                description='Đơn hàng từ 100k'
                condition='Dành cho đơn hàng từ 100k'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
