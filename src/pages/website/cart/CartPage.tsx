import React, { useState } from 'react'
import CouponCard from './_components/CouponCard'

type Props = {}

const CartPage = (props: Props) => {
  const [count, setCount] = useState(1)

  const increase = () => {
    if (count < 10) setCount(count + 1)
  }

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }

  const couponCode1 = 'A87TYRT55'
  const couponCode2 = 'QH5G8J0Y'
  const couponCode3 = 'A789UYT'

  return (
    <div className='mb-[50px] mt-[110px]'>
      <div className='lg:mx-20 md:mx-10 mx-4'>
        <span className='text-sm font-light text-[#252A2B]'>Trang chủ / Giỏ hàng <span className=''>(1)</span></span>
        <div className='flex flex-col lg:flex-row mt-5 gap-6 w-full'>
          <div className='lg:w-[70%] w-full p-3 border border-gray-300 rounded-xl h-min'>
            <h2 className='text-xl font-semibold mb-2 text-[#fca120]'>Giỏ hàng của bạn</h2>
            <hr />
            <p className='text-[#252A2B] my-3'>
              Bạn đang có <span className='font-semibold text-[#fca120]'>1 sản phẩm</span> trong giỏ hàng
            </p>
            {/* item cart */}
            <div className='border border-gray-300 rounded-xl p-4'>
              <ul>
                <li className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-4'>
                    <div className=''>
                      <img
                        src='https://picsum.photos/id/1/200/300'
                        alt=''
                        className='md:size-20 size-14 min-w-14 min-h-14'
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-base truncate sm:w-full w-40'>
                        Bộ ấm trà bằng sứ BLACK & WHITE hoa văn đen trắng
                      </h3>
                      <div className='flex items-center gap-[10px]'>
                        <span className='text-red-500 font-semibold'>516,000₫</span>
                        <span className='font-light line-through text-xs'>1,290,000₫</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 items-center'>
                    <span className='text-red-500 font-semibold text-end'>516,000₫</span>
                    <div className='flex items-center justify-center'>
                      <button
                        onClick={decrease}
                        className='bg-stone-200 px-2 py-1 rounded-md cursor-pointer size-6 flex items-center justify-center'
                      >
                        -
                      </button>
                      <span className='mx-3 text-[#252A2B]'>{count}</span>
                      <button
                        onClick={increase}
                        className='bg-stone-200 px-2 py-1 rounded-md cursor-pointer size-6 flex items-center justify-center'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button>
                    <img src='./src/assets/icon/delete.svg' alt='' className='size-5 min-h-5 min-w-5' />
                  </button>
                </li>
              </ul>
            </div>
            {/* End item cart */}
            <div className='mt-5'>
              <h3 className='font-semibold text-sm mb-3'>Ghi chú đơn hàng</h3>
              <textarea
                name=''
                id=''
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
                <span className='text-2xl font-semibold text-red-500'>516,000₫</span>
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
              <button className='bg-[#fca120] text-white w-full py-[10px] mt-3 border border-transparent hover:bg-white hover:text-[#fca120] hover:border-[#fca120] transition-all duration-300'>
                Thanh toán
              </button>
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
