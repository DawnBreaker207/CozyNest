/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import useCart from '@/hooks/useCart'
import { Button, Form, Radio, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentPage = () => {
  const { id } = useParams()
  const [orderData, setOrderData] = useState<any>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const navigate = useNavigate()
  const { data, calculateTotal } = useCart()
  console.log(orderData)

  // Fetch order data using orderId
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await instance.get(`/orders/${id}`)
        setOrderData(response.data.res)
        setSelectedPaymentMethod(response.data.paymentMethod)
      } catch (error: any) {
        notification.error({
          message: 'Lỗi',
          description: 'Không thể lấy thông tin đơn hàng!'
        })
      }
    }
    fetchOrder()
  }, [id])

  const handlePaymentMethodChange = (e: any) => {
    setSelectedPaymentMethod(e.target.value)
  }

  const handleRetryPayment = async () => {
    try {
      // Nếu phương thức thanh toán mới khác phương thức cũ, cập nhật lại
      if (selectedPaymentMethod !== orderData.paymentMethod) {
        await instance.put(`/orders/${id}`, {
          paymentMethod: selectedPaymentMethod
        })
      }

      // Tiến hành thanh toán
      if (selectedPaymentMethod === 'MoMo') {
        const response = await instance.post('/payment/create-momo', {
          amount: orderData.billTotals
        })
        window.location.href = response.data.res.payUrl
      } else if (selectedPaymentMethod === 'ZaloPay') {
        const response = await instance.post('/payment/create-zalopay', {
          amount: orderData.billTotals
        })
        window.location.href = response.data.res
      } else if (selectedPaymentMethod === 'VNPay') {
        const response = await instance.post('/payment/create-vnpay', {
          amount: orderData.billTotals
        })
        window.location.href = response.data.res
      } else {
        notification.success({
          message: 'Cập nhật thành công',
          description: 'Phương thức thanh toán đã được thay đổi.'
        })
        navigate(`/check_out_order?orderId=${id}`)
      }
    } catch (error: any) {
      notification.error({
        message: 'Lỗi',
        description: 'Thanh toán không thành công. Vui lòng thử lại!'
      })
    }
  }
  const totalAfterDiscount = orderData?.total_amount
  if (!orderData) {
    return <p>Đang tải thông tin đơn hàng...</p>
  }

  return (
    <>
      <div className='flex flex-col md:flex-row p-6 bg-background lg:px-28'>
        <div className='w-full md:w-1/2 pr-0 md:pr-6 px-4'>
          <div>
            <h2>Thanh toán đơn hàng</h2>
            <p>Mã đơn hàng: {orderData.invoiceId}</p>
          </div>
          <Form layout='vertical'>
            <h2 className='text-lg font-semibold mb-4 mt-7'>Phương thức thanh toán</h2>
            <div className='p-6 bg-white rounded-lg shadow-md'>
              <Form.Item name='payment' rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}>
                <Radio.Group
                  onChange={handlePaymentMethodChange}
                  value={selectedPaymentMethod}
                  className='flex flex-col space-y-4'
                >
                  <Radio className='flex items-center border border-2px p-4' value='cash'>
                    <div className='flex items-center w-10 space-x-1'>
                      <img
                        src='https://res.cloudinary.com/didbnrsmz/image/upload/v1730454239/CozyNest/cod_chqf7y.svg'
                        width={50}
                        alt='COD'
                        className='mr-2'
                      />
                      <p className='whitespace-nowrap'>Thanh toán khi giao hàng (COD)</p>
                    </div>
                  </Radio>
                  <Radio className='flex items-center border border-2px p-4' value='momo'>
                    <div className='flex items-center w-10 space-x-1'>
                      <img
                        src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/momo_iroppc.svg'
                        width={50}
                        alt='Ví MOMO'
                        className='mr-2'
                      />
                      <p className='whitespace-nowrap'>Thanh toán qua ví MoMo</p>
                    </div>
                  </Radio>
                  <Radio className='flex items-center border border-2px p-4' value='vnpay'>
                    <div className='flex items-center w-10 space-x-1'>
                      <img
                        src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/vnpay_new_lzopgz.svg'
                        width={50}
                        alt='Ví VNPAY'
                        className='mr-2'
                      />
                      <p className='whitespace-nowrap'>Thanh toán qua ví VNPay</p>
                    </div>
                  </Radio>
                  <Radio className='flex items-center border border-2px p-4' value='zalopay'>
                    <div className='flex items-center w-10 space-x-1'>
                      <img
                        src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/zalopay_qazloz.svg'
                        width={50}
                        alt='Ví ZALOPAY'
                        className='mr-2'
                      />
                      <p className='whitespace-nowrap'>Thanh toán qua ví ZaloPay</p>
                    </div>
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <Form.Item>
              <Button type='primary' className='mt-5' htmlType='submit' block>
                Hoàn Tất Đơn Hàng
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='lg:w-1/2'>
          <div className='bg-card p-6 rounded-lg mt-6 md:mt-0 shadow-lg'>
            <h2 className='text-xl font-semibold mb-5 text-[#252A2B]'>Tóm tắt đơn hàng</h2>

            {orderData?.res?.products?.map((product: any) => (
              <div key={product.sku_id._id} className='mb-5 flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <img
                    src={product.sku_id.product_id.thumbnail}
                    className='xl:w-20 lg:w-20 w-16 sm:w-20'
                    alt={product.name}
                  />
                  <span className='font-medium text-[#252A2B]'>{product.sku_id.product_id.name}</span>
                </div>
                <div className='text-right'>
                  <span className='block text-sm text-[#252A2B]'>× {product.quantity}</span>
                  <span className='text-xl font-semibold'>{(product.price * product.quantity).toLocaleString()}₫</span>
                </div>
              </div>
            ))}

            <hr className='my-5 border-t border-gray-200' />

            <div className='mt-4'>
              {/* <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Tạm tính:</span>
                <span className='font-semibold'>{data?.res?.totalPrice.toLocaleString()} ₫</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Chi phí vận chuyển:</span>
                <span className='font-semibold'>50,000 ₫</span>
              </div> */}

              <div className='mb-2 flex justify-between'>
                <span className='font-medium'>Tổng cộng:</span>
                <span className='text-xl font-semibold'>{totalAfterDiscount} ₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage
