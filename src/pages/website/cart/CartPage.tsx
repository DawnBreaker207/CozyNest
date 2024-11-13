/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import CouponCard from './_components/CouponCard'
import useCart from '@/hooks/useCart'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { data, calculateTotal, mutate } = useCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products = data?.res?.products || [] // Cập nhật để lấy sản phẩm
  // Mảng để lưu số lượng của từng sản phẩm
  const [quantities, setQuantities] = useState<number[]>([])

  useEffect(() => {
    // Cập nhật số lượng ban đầu từ products
    const initialQuantities = products.map((product: any) => product.quantity)
    setQuantities(initialQuantities)
  }, [products])

  const increase = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      if (newQuantities[index] < 10) {
        newQuantities[index]++
        mutate({ action: 'INCREMENT', productId: products[index].productId._id })
      }
      return newQuantities // Trả về mảng mới với số lượng đã được cập nhật
    })
  }

  const decrease = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      if (newQuantities[index] > 1) {
        newQuantities[index]--
        mutate({ action: 'DECREMENT', productId: products[index].productId._id })
      }
      return newQuantities // Trả về mảng mới với số lượng đã được cập nhật
    })
  }

  useEffect(() => {
    // Cập nhật lại tổng tiền khi quantities thay đổi
    calculateTotal()
  }, [quantities, calculateTotal]) // Theo dõi sự thay đổi của quantities

  const couponCode1 = 'A87TYRT55'
  const couponCode2 = 'QH5G8J0Y'
  const couponCode3 = 'A789UYT'

  return (
    <div className='mb-14 mt-5'>
      <div className='container'>
        <span className='text-sm font-light text-[#252A2B]'>
          Trang chủ / Giỏ hàng <span className=''>({products.length})</span>
        </span>
        <div className='flex flex-col lg:flex-row mt-5 gap-6 w-full'>
          <div className='lg:w-[70%] w-full p-3 border border-gray-300 rounded-xl h-min'>
            <h2 className='text-xl font-semibold mb-2 text-[#fca120]'>Giỏ hàng của bạn</h2>
            <hr />
            <p className='text-[#252A2B] my-3'>
              Bạn đang có <span className='font-semibold text-[#fca120]'>{products.length} sản phẩm</span> trong giỏ
              hàng
            </p>
            {/* item cart */}
            <div className='border border-gray-300 rounded-xl p-4'>
              <ul className='space-y-6'>
                {products.map((product: any, index: number) => (
                  <li key={product.productId._id} className='flex items-center justify-between cursor-pointer'>
                    <div className='flex items-center gap-4'>
                      <div className=''>
                        <img
                          src={product.productId.thumbnail} // Sử dụng thumbnail từ dữ liệu
                          alt={product.productId.name} // Sử dụng tên sản phẩm cho alt
                          className='md:size-20 size-14 min-w-14 min-h-14'
                        />
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h3 className='text-base truncate sm:w-full w-40'>
                          {product.productId.name} {/* Sử dụng tên sản phẩm */}
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
                        {/* Sử dụng số lượng từ state */}
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
                        console.log(product.productId._id) // Kiểm tra lại giá trị _id
                        mutate({
                          action: 'REMOVE',
                          productId: product.productId._id
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
                <span className='text-2xl font-semibold text-red-500'>{calculateTotal()}₫</span>
              </div>
              <hr />
              <ul className='mt-3 space-y-1'>
                <li className='text-sm flex items-center'>
                  <div className='w-[6px] h-[6px] bg-[#252A2B] rounded-full mr-2'></div>Phí vận chuyển sẽ được tính ở
                  trang Thanh toán.
                </li>
                <li className='text-sm flex items-center'>
                  <div className='w-[6px] h-[6px] bg-[#252A2B] rounded-full mr-2'></div>Mã giảm giá được nhập ở trang
                  Thanh toán
                </li>
              </ul>
              <Link to={`check_out_form`}>
                <button className='bg-[#fca120] text-white w-full py-[10px] mt-3 border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300'>
                  Thanh toán
                </button>
              </Link>
            </div>
            <div className='mt-6'>
              <CouponCard
                couponCode={couponCode1}
                imageUrl='./src/assets/images/coupon/coupon_2_img.webp'
                expirationDate='10/10/2024'
                title='Miễn phí vận chuyển'
                description='Đơn hàng từ 300k'
                condition='Dành cho đơn hàng từ 300k'
              />
              <CouponCard
                couponCode={couponCode2}
                imageUrl='./src/assets/images/coupon/coupon_1_img.webp'
                expirationDate='10/10/2024'
                title='Giảm 20%'
                description='Đơn hàng từ 200k'
                condition='Dành cho đơn hàng từ 200k'
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
