/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
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
      couponCode,
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
      const response = await instance.get(`/coupon/couponValue`, {
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

  // Tính tổng sau khi áp dụng giảm giá và chi phí lắp đặt
  const totalAfterDiscount = calculateTotal() + 50000 + installationFee - couponValue

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
          />
        )}
      </div>
      <div className='lg:w-1/2'>
        <div className='bg-card p-4 rounded-lg mt-6 md:mt-0 border border-slate-500'>
          <h2 className='text-lg font-semibold mb-4'>Tóm tắt đơn hàng</h2>
          {data?.res?.products?.map((product: any) => (
            <div key={product.sku_id._id} className='mb-4 flex justify-between lg:gap-4'>
              <span className='flex items-center'>
                <img
                  src={product.sku_id.product_id.thumbnail}
                  className='xl:w-20 lg:w-20 w-12 sm:w-[100%]'
                  alt={product.name}
                />
              </span>
              <span className='font-medium'>{product.sku_id.product_id.name}</span>
              <span className='float-right'>× {product.quantity}</span>
              <span className='float-right'>{(product.price * product.quantity).toLocaleString()}₫</span>
            </div>
          ))}
          <hr className='mb-4' />
          <div className='flex mb-4'>
            <input
              type='text'
              placeholder='Nhập mã giảm giá'
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className='border p-2 mr-2 w-full'
            />
            <Button type='primary' onClick={handleApplyCoupon} className='bg-primary text-white px-4 py-2 rounded'>
              Áp dụng
            </Button>
          </div>

          <div className='mb-2'>
            <span className='font-medium'>Tạm tính:</span>
            <span className='float-right'>{calculateTotal().toLocaleString()} ₫</span>
          </div>
          <div className='mb-2'>
            <span className='font-medium'>Chi phí vận chuyển:</span>
            <span className='float-right'>50,000 ₫</span>
          </div>
          {installationFee > 0 && (
            <div className='mb-2'>
              <span className='font-medium'>Chi phí lắp đặt:</span>
              <span className='float-right'>{installationFee.toLocaleString()} ₫</span>
            </div>
          )}
          {couponName && couponValue > 0 && (
            <div className='mb-2'>
              {/* Hiển thị chữ "Mã giảm giá" */}
              <span className='font-medium'>Mã giảm giá: </span>
              {/* Nền áp dụng cho tên mã giảm giá với nút "x" */}
              <span className='bg-green-100 text-green-700 px-2 py-3 rounded relative inline-block'>
                {couponName}
                <CloseOutlined
                  onClick={() => {
                    setCouponName('')
                    setCouponValue(0)
                    setCouponCode('')
                  }}
                  className='absolute  top-0 right-0 mt-1 mr-0.5  text-red-500 hover:text-red-700 text-xs cursor-pointer'
                  aria-label='Xóa mã giảm giá'
                />
              </span>
              {/* Hiển thị giá trị giảm giá */}
              <span className='float-right text-red-500'>-{couponValue.toLocaleString()} ₫</span>
            </div>
          )}
          <div className='mb-2'>
            <span className='font-medium'>Tổng cộng:</span>
            <span className='float-right'>{totalAfterDiscount.toLocaleString()} ₫</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
