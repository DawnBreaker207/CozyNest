/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import instance from '@/configs/axios'
import { useNavigate } from 'react-router-dom'
import useCart from '@/hooks/useCart'
import ShippingAddressPage from './_components/ShippingAddressPage'
import PaymentMethodPage from './_components/PaymentMethodPage'
import { Button } from 'antd'
import { useLocalStorage } from '@/hooks/useStorage'
import { CloseOutlined } from '@ant-design/icons'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [user] = useLocalStorage('user', {})
  const accessToken = user?.data?.accessToken
  const [orderData, setOrderData] = useState<any>(null)
  const [couponCode, setCouponCode] = useState<string>('')
  const [couponValue, setCouponValue] = useState<number>(0)
  const [couponName, setCouponName] = useState<string>('')
  const [installationFee, setInstallationFee] = useState<number>(0) // Biến lưu chi phí lắp đặt
  const { data, calculateTotal } = useCart()
  const [coupons, setCoupons] = useState<any[]>([]) // Danh sách mã giảm giá
  console.log(data)

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await instance.get('/coupon')
        setCoupons(response.data?.res?.docs || [])
      } catch (error) {
        console.error('Không thể lấy danh sách mã giảm giá:', error)
      }
    }
    fetchCoupons()
  }, [])
  // Hàm xử lý khi chuyển sang bước tiếp theo
  const handleNextStep = (data: any) => {
    setOrderData((prevData: any) => ({ ...prevData, ...data }))
    setStep(2)
  }

  // Hàm xử lý gửi đơn hàng
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

  // Hàm xử lý áp dụng mã giảm giá
  const handleApplyCoupon = async () => {
    try {
      const response = await instance.get('/coupon/couponValue', {
        headers: { Authorization: accessToken },
        params: { coupon_code: couponCode }
      })
      const nameCoupon = response?.data?.name
      setCouponName(nameCoupon)
      const discountValue = response?.data?.couponValue || 0
      setCouponValue(discountValue)
    } catch (error) {
      console.error('Mã giảm giá không hợp lệ:', error)
      setCouponValue(0)
    }
  }
  const handleSelectCoupon = (coupon: any) => {
    setCouponName(coupon.name)
    setCouponCode(coupon.code)
    setCouponValue(coupon.couponValue)
  }
  // Tính tổng sau khi áp dụng giảm giá và chi phí lắp đặt
  const totalAfterDiscount = calculateTotal() + 50000 + installationFee - couponValue

  const isEligibleForDiscount = totalAfterDiscount >= 500000

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
            couponName={couponName} // Chuyển couponName đến PaymentMethodPage
            couponValue={couponValue} // Chuyển couponValue đến PaymentMethodPage
          />
        )}
      </div>
      <div className='lg:w-1/2'>
        <div className='bg-card p-6 rounded-lg mt-6 md:mt-0 shadow-lg'>
          <h2 className='text-xl font-semibold mb-5 text-[#252A2B]'>Tóm tắt đơn hàng</h2>

          {data?.res?.products?.map((product: any) => {
            // Tìm variant phù hợp với sku_id của sản phẩm
            const currentVariant = product.sku_id.product_id.variants.find(
              (variant: any) => variant.sku_id === product.sku_id._id
            )

            return (
              <div key={product.sku_id._id} className='mb-5 flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <img
                    src={product.sku_id.product_id.images[0].url}
                    className='xl:w-20 lg:w-20 w-16 sm:w-20'
                    alt={product.name}
                  />
                  <div className='flex flex-col'>
                    <span className='font-semibold text-[#252A2B]'>{product.sku_id.product_id.name}</span>

                    {/* Hiển thị biến thể của sản phẩm */}
                    <span className='font-medium text-[#252A2B] bg-gray-200 w-fit px-2'>
                      {currentVariant?.option_value_id?.value || 'Không có màu'}
                    </span>

                    {/* Hiển thị giá sản phẩm */}
                    <span className='text-xl font-semibold'>{product.price.toLocaleString()}₫</span>
                  </div>
                </div>

                <div className='text-right'>
                  <span className='block text-sm text-[#252A2B]'>× {product.quantity}</span>
                  <span className='text-xl font-semibold'>{(product.price * product.quantity).toLocaleString()}₫</span>
                </div>
              </div>
            )
          })}

          <hr className='my-5 border-t border-gray-200' />

          <div className='mb-4'>
            <input
              type='text'
              placeholder='Nhập mã giảm giá'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
          {/* Danh sách mã giảm giá hiển thị hạng ngang */}
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              {coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  onClick={() => handleSelectCoupon(coupon)}
                  className={`cursor-pointer p-3 rounded-lg border ${
                    coupon.code === couponCode ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'
                  }`}
                >
                  <span className='font-medium text-sm'>{coupon.name}</span>
                  <br />
                </div>
              ))}
            </div>
          </div>
          <div className='text-center mt-6'>
            <Button
              type='primary'
              onClick={handleApplyCoupon}
              className='bg-primary text-white px-5 py-3 rounded-lg w-full'
            >
              Áp dụng
            </Button>
          </div>
          {!isEligibleForDiscount && couponCode && (
            <div className='text-center text-red-500 mt-3'>
              Tổng đơn hàng cần tối thiểu 500.000₫ để áp dụng mã giảm giá
            </div>
          )}
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
                <span className='bg-green-100 text-green-700 px-2 py-3 rounded relative inline-block'>
                  {couponName}
                  <CloseOutlined
                    onClick={() => {
                      setCouponName('')
                      setCouponValue(0)
                      setCouponCode('')
                    }}
                    className='absolute top-0 right-0 mt-1 mr-0.5 text-red-500 hover:text-red-700 text-xs cursor-pointer'
                    aria-label='Xóa mã giảm giá'
                  />
                </span>
                <span className='float-right text-red-500'>-{couponValue.toLocaleString()} ₫</span>
              </div>
            )}

            <div className='mb-2 flex justify-between'>
              <span className='font-medium'>Tổng cộng:</span>
              <span className='text-xl font-semibold'>{totalAfterDiscount.toLocaleString()} ₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
