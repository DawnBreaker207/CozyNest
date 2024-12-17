/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import useCart from '@/hooks/useCart'
import { CloseOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentMethodPage from './_components/PaymentMethodPage'
import ShippingAddressPage from './_components/ShippingAddressPage'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  // const [user] = useLocalStorage('user', {})
  // const accessToken = user?.data?.accessToken
  const [orderData, setOrderData] = useState<any>(null)
  const [couponCode, setCouponCode] = useState<string>('')
  const [couponValue, setCouponValue] = useState<number>(0)
  const [couponName, setCouponName] = useState<string>('')
  const [installationFee, setInstallationFee] = useState<number>(0)
  const { data, calculateTotal } = useCart()
  const [coupons, setCoupons] = useState<any[]>([])
  if (data?.res?.products.length == 0) {
    navigate(`/`)
  }
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await instance.get('/coupon')
        console.log("🚀 ~ fetchCoupons ~ response:", response)

        // Lọc các mã giảm giá
        const filteredCoupons = response.data?.res?.docs.filter((coupon: any) => {
          const currentDate = new Date() // Ngày hiện tại
          const couponStartDate = new Date(coupon.couponStartDate)
          const couponEndDate = new Date(coupon.couponEndDate)

          return (
            coupon.status === true && // Trạng thái phải là true
            coupon.deleted === false && // Mã giảm giá không bị xóa
            currentDate >= couponStartDate && // Ngày hiện tại phải lớn hơn hoặc bằng ngày bắt đầu
            currentDate <= couponEndDate // Ngày hiện tại phải nhỏ hơn hoặc bằng ngày kết thúc
          )
        })

        setCoupons(filteredCoupons) // Lưu các mã giảm giá đã lọc vào state
      } catch (error) {
        console.error('Không thể lấy danh sách mã giảm giá:', error)
      }
    }
    fetchCoupons()
  }, [])

  // Lọc sản phẩm không bị ẩn ngay khi nhận dữ liệu
  const visibleProducts = (data?.res?.products || []).filter((product: any) => !product.sku_id.product_id.is_hidden)

  const handleNextStep = (data: any) => {
    setOrderData((prevData: any) => ({ ...prevData, ...data }))
    setStep(2)
  }

  const handleSubmitOrder = async (paymentMethod: string) => {
    const finalOrderData = {
      ...orderData,
      paymentMethod,
      couponName,
      discount: couponValue
    }

    try {
      const response = await instance.post('/orders', finalOrderData)
      navigate(`/check_out_order?orderId=${response.data?.res?._id}`)
    } catch (error) {
      console.error('Có lỗi xảy ra:', error)
    }
  }

  const handleSelectCoupon = (coupon: any) => {
    console.log('Coupon selected:', coupon)
    setCouponCode(coupon.couponCode)
    setCouponName(coupon.name)
    setCouponValue(coupon.couponValue)
  }

  let totalAfterDiscount = calculateTotal() + 50000 + installationFee - couponValue
  if (totalAfterDiscount < 0) {
    totalAfterDiscount = 0
  }
  // useEffect(() => {
  //   // Hàm chặn điều hướng khi người dùng tắt trang hoặc tải lại trang
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (data) {
  //       const message = 'Bạn có chắc muốn rời khỏi trang? Thông tin đơn hàng chưa được lưu.'
  //       event.returnValue = message // Cảnh báo khi người dùng cố gắng đóng tab
  //       return message // Cho phép trình duyệt hiển thị cảnh báo
  //     }
  //   }

  //   // Đăng ký sự kiện 'beforeunload' để cảnh báo khi người dùng đóng tab hoặc chuyển trang
  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   // Hàm chặn điều hướng khi quay lại trang trước
  //   const handlePopState = (event: PopStateEvent) => {
  //     if (data) {
  //       const confirmation = window.confirm('Bạn có chắc muốn quay lại? Thông tin đơn hàng chưa được lưu.')
  //       if (!confirmation) {
  //         // Ngừng điều hướng nếu người dùng không xác nhận
  //         event.preventDefault()
  //         // Đảm bảo rằng trạng thái không thay đổi
  //         window.history.pushState(null, '', location.pathname)
  //       }
  //     }
  //   }

  //   // Thêm trạng thái giả vào lịch sử trình duyệt khi người dùng vào trang
  //   if (!window.history.state) {
  //     window.history.pushState(null, '', location.pathname)
  //   }

  //   // Đăng ký sự kiện popstate để can thiệp vào điều hướng khi quay lại trang trước
  //   window.addEventListener('popstate', handlePopState)

  //   return () => {
  //     // Dọn dẹp sự kiện khi component bị unmount
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //     window.removeEventListener('popstate', handlePopState)
  //   }
  // }, [data]) // Điều kiện cập nhật lại khi `data` hoặc `location.p

  return (
    <div className='flex flex-col md:flex-row p-6 bg-background lg:px-28'>
      <div className='w-full md:w-2/3 pr-0 md:pr-6 px-4'>
        {step === 1 ? (
          <ShippingAddressPage onNext={handleNextStep} />
        ) : (
          <PaymentMethodPage
            orderData={orderData}
            onSubmit={handleSubmitOrder}
            totalAfterDiscount={totalAfterDiscount}
            onInstallationCostChange={(cost: number) => setInstallationFee(cost)}
            couponName={couponName}
            couponValue={couponValue}
          />
        )}
      </div>
      <div className='lg:w-1/2'>
        <div className='bg-card p-6 rounded-lg mt-6 md:mt-0 shadow-lg'>
          <h2 className='text-xl font-semibold mb-5 text-[#252A2B]'>Tóm tắt đơn hàng</h2>

          {visibleProducts.length === 0 ? (
            <div className='text-center text-gray-500'>Không có sản phẩm nào để hiển thị.</div>
          ) : (
            visibleProducts.map((product: any) => {
              const currentVariant = product.sku_id.product_id.variants.find(
                (variant: any) => variant.sku_id === product.sku_id._id
              )

              return (
                <div key={product.sku_id._id} className='mb-5 flex justify-between items-center'>
                  <div className='flex items-center gap-3'>
                    <img src={product.sku_id.image[0]} className='xl:w-20 lg:w-20 w-16 sm:w-20' alt={product.name} />
                    <div className='flex flex-col'>
                      <span className='font-semibold text-[#252A2B] text-sm md:text-base'>{product.sku_id.product_id.name}</span>
                      <span className='font-medium text-[#252A2B] bg-gray-200 w-fit px-2 text-sm md:text-base'>
                        {currentVariant?.option_value_id?.label || 'Không có màu'}
                      </span>
                      <span className='text-xl font-semibold'>{product.price.toLocaleString()}₫</span>
                    </div>
                  </div>

                  <div className='text-right'>
                    <span className='block text-sm text-[#252A2B]'>× {product.quantity}</span>
                    <span className='text-xl font-semibold'>
                      {(product.price * product.quantity).toLocaleString()}₫
                    </span>
                  </div>
                </div>
              )
            })
          )}

          <hr className='my-5 border-t border-gray-200' />

          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              {coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  onClick={() => handleSelectCoupon(coupon)} // Gọi hàm chọn coupon
                  className={`cursor-pointer p-2 md:p-3 rounded-lg border ${
                    coupon.couponCode === couponCode ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <span className='font-medium text-sm'>{coupon.name}</span>
                  <br />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-4'>
            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Tạm tính:</span>
              <span className='font-semibold'>{calculateTotal().toLocaleString()} ₫</span>
            </div>
            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Chi phí vận chuyển:</span>
              <span className='font-semibold'>50,000 ₫</span>
            </div>

            {installationFee > 0 && (
              <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Chi phí lắp đặt:</span>
                <span className='font-semibold'>{installationFee.toLocaleString()} ₫</span>
              </div>
            )}

            {couponName && couponValue > 0 && (
              <div className='mb-2'>
                <span className='font-medium'>Mã giảm giá: </span>
                <span className='bg-green-100 text-green-700 py-2 px-1 md:px-2 md:py-3 rounded relative inline-block'>
                  {couponName}
                  <CloseOutlined
                    onClick={() => {
                      setCouponName('')
                      setCouponValue(0)
                      setCouponCode('')
                    }}
                    className='absolute top-0 right-0 md:mt-1 mr-0.5 text-red-500 hover:text-red-700 text-xs cursor-pointer'
                    aria-label='Xóa mã giảm giá'
                  />
                </span>
                <span className='float-right text-red-500'>-{couponValue.toLocaleString()} ₫</span>
              </div>
            )}
            <hr className='my-5 border-t border-gray-200' />

            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Tổng cộng:</span>
              <span className='text-xl font-semibold text-red-500'>{totalAfterDiscount.toLocaleString()} ₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
