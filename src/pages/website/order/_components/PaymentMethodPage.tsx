/* eslint-disable @typescript-eslint/no-explicit-any */
/* PaymentMethodPage.tsx */

import instance from '@/configs/axios'
import { useCartStore } from '@/hooks/store/cartStore'
import useCart from '@/hooks/useCart'
import { useCookie } from '@/hooks/useStorage'
import { RightOutlined } from '@ant-design/icons'
import { Button, Form, message, notification, Radio } from 'antd'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
interface PaymentMethodPageProps {
  orderData: any
  onSubmit: (paymentMethod: string) => Promise<void>
  totalAfterDiscount: number
  onInstallationCostChange: (cost: number) => void
  couponName: string
  couponValue: number
}

const PaymentMethodPage: React.FC<PaymentMethodPageProps> = ({
  orderData,
  totalAfterDiscount,
  onInstallationCostChange,
  couponName,
  couponValue
}) => {
  const [user] = useCookie('user', {})
  // const token = user?.data?.accessToken
  const userId = user?._id
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash')
  const [installationFee, setInstallationFee] = useState(0)
  const navigate = useNavigate()
  const { data } = useCart()
  const { products, quantities } = useCartStore()
  const cartId = data?.res?.cart_id
  const handleChange = (e: any) => {
    setSelectedPaymentMethod(e.target.value)
  }

  const handleShippingChange = (e: any) => {
    const shippingMethod = e.target.value
    if (shippingMethod === 'home_install') {
      setInstallationFee(100000) // Phí lắp đặt tại nhà
    } else if (shippingMethod === 'self_install') {
      setInstallationFee(0) // Phí lắp đặt là 0 khi tự lắp đặt
    }
    onInstallationCostChange(installationFee)

    if (shippingMethod === 'standard') {
      onInstallationCostChange(50000) // Giao hàng tiêu chuẩn
    } else if (shippingMethod === 'express') {
      onInstallationCostChange(80000) // Giao hàng nhanh
    }
  }

  useEffect(() => {
    onInstallationCostChange(installationFee)
  }, [installationFee, onInstallationCostChange])
  const handlePayment = async () => {
    const cartItems = products.map((product, index) => {
      return {
        productId: product.sku_id.product_id._id, // Đảm bảo _id là một thuộc tính hợp lệ
        skuId: product.sku_id._id, // Đảm bảo sku_id._id là hợp lệ
        quantity: quantities[index] // Kiểm tra số lượng
      }
    })
    try {
      // Gọi API kiểm tra tồn kho
      const response = await instance.post('/stock/checkStock', { cartItems })

      if (response.status === 200) {
        // Nếu tồn kho đủ, chuyển hướng đến trang thanh toán
        navigate('/check_out')
      }
    } catch (error: any) {
      // Nếu có lỗi, tức là có sản phẩm vượt quá số lượng tồn kho
      if (error.response && error.response.status === 400) {
        const unavailableProducts = error.response.data.res
        // Lưu dữ liệu sản phẩm không đủ số lượng vào localStorage
        localStorage.setItem('unavailableProducts', JSON.stringify(unavailableProducts))

        // Chuyển hướng sang trang vấn đề tồn kho
        navigate('/stock_propblem')
        return
      } else {
        // Hiển thị thông báo lỗi khác
        message.error('Đã có lỗi xảy ra khi kiểm tra tồn kho')
      }
    }
    const finalOrderData = {
      ...orderData,
      cart_id: cartId,
      user_id: userId,
      total_amount: totalAfterDiscount,
      payment_method: selectedPaymentMethod,
      receivedDate: null,
      total: couponValue,
      coupon: couponName,
      installation_fee: installationFee,
      status: 'Processing',
      payment_status: 'Unpaid',
      products:
        data?.res?.products.map((product: any) => {
          // Tìm variant phù hợp với sku_id của sản phẩm
          const currentVariant = product?.sku_id?.product_id?.variants.find(
            (variant: any) => variant?.sku_id === product?.sku_id?._id
          )

          return {
            productId: product.sku_id.product_id._id,
            originName: product.sku_id.product_id.name,
            productName: product.sku_id.product_id.name,
            price: product.price * product.quantity,
            quantity: product.quantity,
            sku_id: product.sku_id._id, // Variant ID
            name: product.sku_id.name, // Variant Name
            variant_label: currentVariant ? currentVariant.option_value_id.label : 'Không xác định' // Thêm thông tin biến thể
          }
        }) || []
    }

    try {
      const orderResponse = await instance.post('/orders', finalOrderData)
      const orderId = orderResponse.data?.res?._id

      Cookies.set('orderId', orderId, { expires: 1 / 24 })
      // Kiểm tra phương thức thanh toán và thực hiện chuyển hướng
      if (selectedPaymentMethod === 'momo') {
        window.location.href = orderResponse.data.res.payment_url
      } else if (selectedPaymentMethod === 'zalopay') {
        // const response = await instance.post('/payment/create-zalopay', { amount: finalOrderData.billTotals })
        window.location.href = orderResponse.data.res.payment_url
        // response.data.res.order_url
      } else if (selectedPaymentMethod === 'vnpay') {
        // const response = await instance.post('/payment/create-vnpay', { amount: finalOrderData.billTotals })
        window.location.href = orderResponse.data.res.payment_url
        // response.data.res
      } else {
        // Với COD, không cần chuyển hướng
        navigate(`/check_out_order?orderId=${orderId}`)
      }
    } catch (error: any) {
      notification.error({ message: 'Lỗi thanh toán', description: error.message })
    }
  }

  return (
    <div>
      <p className='text-sm space-x-2'>
        <Link to={`/cart`}>Giỏ hàng</Link> <RightOutlined /> <Link to={`/check_out`}>Thông tin giao hàng</Link>{' '}
        <RightOutlined /> <Link to={``}>Phương thức thanh toán</Link>
      </p>
      <Form layout='vertical' onFinish={handlePayment}>
        <h2 className='text-lg font-semibold mb-4 mt-7'>Dịch vụ lắp đặt</h2>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <Form.Item name='service'>
            <Radio.Group onChange={handleShippingChange} className='flex flex-col space-y-4'>
              <Radio className='flex items-center border border-2px p-4' value='home_install'>
                Lắp đặt tại nhà
              </Radio>
              <Radio className='flex items-center border border-2px p-4' value='self_install'>
                Tự lắp đặt
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <h2 className='text-lg font-semibold mb-4 mt-7'>Phương thức thanh toán</h2>
        <div className='p-6 bg-white rounded-lg shadow-md'>
          <Form.Item name='payment' rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}>
            <Radio.Group onChange={handleChange} value={selectedPaymentMethod} className='flex flex-col space-y-4'>
              <Radio
                className='flex items-center border border-2px p-4'
                value='cash'
                disabled={false} // Luôn bật COD
              >
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
              <Radio
                className='flex items-center border border-2px p-4'
                value='momo'
                disabled={totalAfterDiscount === 0} // Chỉ bật nếu tổng tiền > 0
              >
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
              <Radio
                className='flex items-center border border-2px p-4'
                value='vnpay'
                disabled={totalAfterDiscount === 0} // Chỉ bật nếu tổng tiền > 0
              >
                <div className='flex items-center w-10 space-x-1'>
                  <img
                    src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/vnpay_new_lzopgz.svg'
                    width={50}
                    alt='Ví VNPAY'
                    className='mr-2'
                  />
                  <p className='whitespace-nowrap'>Thanh toán qua ví VnPay</p>
                </div>
              </Radio>
              <Radio
                className='flex items-center border border-2px p-4'
                value='zalopay'
                disabled={totalAfterDiscount === 0} // Chỉ bật nếu tổng tiền > 0
              >
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

          {/* <h2 className='text-lg font-semibold mb-4 mt-7'>Phương thức vận chuyển</h2>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <Form.Item name='shipping' rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển!' }]} >
              <Radio.Group className='flex flex-col space-y-4' onChange={handleShippingChange}>
                <Radio className='flex items-center border border-2px p-4' value='standard'>
                  Giao hàng tiêu chuẩn
                </Radio>
                <Radio className='flex items-center border border-2px p-4' value='express'>
                  Giao hàng nhanh
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div> */}
        </div>
        <Form.Item>
          <Button type='primary' className='mt-5' htmlType='submit' block>
            Hoàn Tất Đơn Hàng
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default PaymentMethodPage
