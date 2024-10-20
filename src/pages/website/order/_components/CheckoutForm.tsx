/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import useCart from '@/hooks/useCart'
import { Button, Checkbox, Form, Input, Radio, notification } from 'antd'
import { useState } from 'react'

const CheckoutPage = () => {
  const { data, calculateTotal } = useCart()

  const userId = JSON.parse(localStorage.getItem('user') || '{}').data?.res?._id || null

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD')

  const handleChange = (e: any) => {
    setSelectedPaymentMethod(e.target.value)
  }

  // Hàm xử lý khi submit form thành công
  const onFinish = async (values: any) => {
    const orderData = {
      userId,
      billTotals: calculateTotal(),
      paymentMethod: selectedPaymentMethod,
      customerName: values.customerName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      note: values.note || null,
      addressShipping: values.address || '',
      receivedDate: null,
      paid: false,
      status: 'Pending',
      products:
        data?.res?.products.map((product: any) => {
          return {
            productId: product.productId._id,
            originName: product.productId.name,
            productName: product.productId.name,
            thumbnail: product.productId.thumbnail,
            quantity: product.quantity,
            price: product.price * product.quantity
          }
        }) || []
    }

    // Xử lý thanh toán MoMo
    if (selectedPaymentMethod === 'MoMo') {
      const momoRequestData = {
        partnerCode: 'MOMO',
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId: `MOMO${Date.now()}`,
        amount: orderData.billTotals,
        orderId: `MOMO${Date.now()}`,
        orderInfo: 'pay with MoMo',
        redirectUrl: '{redirectUrl của bạn}',
        ipnUrl: '{ipnUrl của bạn}',
        lang: 'vi',
        requestType: 'payWithMethod',
        autoCapture: true,
        extraData: '',
        orderGroupId: '',
        signature: '{signature đã ký HMAC SHA256}'
      }

      try {
        const response = await instance.post('/payment/create-momo', momoRequestData)
        // const payload = {
        //   orderId: response.data.orderId,
        //   partnerCode: response.data.partnerCode,
        //   requestId: response.data.requestId,
        //   lang: response.data.lang
        // }

        // const checkPaymentStatus = async (payload: any) => {
        //   try {
        //     const response2 = await instance.get('/payment/transaction-status', payload)

        //     if (response2?.data?.resultCode === 0 && response2?.data?.message === 'Thành công.') {
        //       console.log('Trạng thái thanh toán MoMo thành công')
        //       clearInterval(paymentStatusInterval)
        //       instance
        //         .post('/orders', orderData)
        //         .then((response) => {
        //           window.location.href = `/check_out_order?orderId=${response.data?.res?._id}`
        //         })
        //         .catch((error) => {
        //           console.error('Error:', error)
        //         })
        //     } else {
        //       console.log('Trạng thái thanh toán MoMo không thành công:', response2?.data?.message)
        //     }
        //   } catch (error) {
        //     console.error('Lỗi kiểm tra trạng thái thanh toán MoMo:', error)
        //   }
        // }

        window.open(`${response.data.payUrl}`, '_blank')

        // const paymentStatusInterval = setInterval(() => {
        //   checkPaymentStatus(payload)
        // }, 5000)
      } catch (error) {
        console.error('MoMo Payment Error:', error)
        notification.error({ message: 'Lỗi thanh toán với MoMo' })
      }

      // Xử lý thanh toán ZaloPay
    } else if (selectedPaymentMethod === 'ZaloPay') {
      const zaloPayRequestData = {
        app_id: 'ZALOPAY_APP_ID',
        app_trans_id: `ZALOPAY${Date.now()}`,
        app_time: Date.now(),
        amount: orderData.billTotals,
        app_user: userId,
        embed_data: JSON.stringify({}),
        item: JSON.stringify(orderData.products),
        description: `Thanh toán đơn hàng ZaloPay ${Date.now()}`,
        bank_code: ''
      }

      try {
        const response = await instance.post('/payment/create-zalopay', zaloPayRequestData)
        // const payload = {
        //   app_trans_id: response.data.app_trans_id
        // }

        // const checkPaymentStatus = async (payload: any) => {
        //   try {
        //     const response2 = await instance.post('/payment/transaction-status', payload)
        //     if (response2?.data?.return_code === 1) {
        //       console.log('Trạng thái thanh toán ZaloPay thành công')
        //       clearInterval(paymentStatusInterval)
        //       instance
        //         .post('/orders', orderData)
        //         .then((response) => {
        //           window.location.href = `/check_out_order?orderId=${response.data?.res?._id}`
        //         })
        //         .catch((error) => {
        //           console.error('Error:', error)
        //         })
        //     } else {
        //       console.log('Trạng thái thanh toán ZaloPay không thành công:', response2?.data?.message)
        //     }
        //   } catch (error) {
        //     console.error('Lỗi kiểm tra trạng thái thanh toán ZaloPay:', error)
        //   }
        // }

        window.open(`${response.data.order_url}`, '_blank')

        // const paymentStatusInterval = setInterval(() => {
        //   checkPaymentStatus(payload)
        // }, 5000)
      } catch (error) {
        console.error('ZaloPay Payment Error:', error)
        notification.error({ message: 'Lỗi thanh toán với ZaloPay' })
      }
    } else if (selectedPaymentMethod === 'VnPay') {
      // Xử lý thanh toán VNPAY
      const vnPayRequestData = {
        amount: orderData.billTotals,
        orderInfo: 'Thanh toán đơn hàng qua VNPAY',
        orderType: 'billpayment',
        locale: 'vn',
        bankCode: '',
        returnUrl: '{returnUrl của bạn}',
        ipnUrl: '{ipnUrl của bạn}',
        txnRef: `VNPAY${Date.now()}`,
        createDate: new Date().toISOString(),
        currCode: 'VND'
      }

      try {
        const response = await instance.post('/payment/create-vnpay', vnPayRequestData)
        window.open(`${response.data.res}`, '_blank')
      } catch (error) {
        console.error('VNPAY Payment Error:', error)
        notification.error({ message: 'Lỗi thanh toán với VNPAY' })
      }
      // Thanh toán khi nhận hàng (COD)
    } else {
      instance
        .post('/orders', orderData)
        .then((response) => {
          window.location.href = `/check_out_order?orderId=${response.data?.res?._id}`
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  return (
    <div className='flex flex-col md:flex-row p-6 bg-background lg:px-28  '>
      {/* Form nhập địa chỉ giao hàng */}
      <div className='w-full md:w-2/3 pr-0 md:pr-6 px-4'>
        <h2 className='text-lg font-semibold mb-4'>Địa chỉ giao hàng</h2>
        <Form
          layout='vertical'
          onFinish={onFinish} // Tích hợp hàm onFinish
          initialValues={{
            customerName: '', // Có thể lấy từ localStorage hoặc API
            phoneNumber: '',
            email: '',
            city: '',
            district: '',
            address: '',
            note: ''
          }}
        >
          <Form.Item label='Họ và tên' name='customerName' rules={[{ required: true }]}>
            <Input placeholder='Nhập họ và tên' />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='phoneNumber' rules={[{ required: true }]}>
            <Input placeholder='Nhập số điện thoại của bạn' />
          </Form.Item>
          <Form.Item label='Địa chỉ email' name='email' rules={[{ required: true }]}>
            <Input type='email' placeholder='Nhập email' />
          </Form.Item>
          {/* <div className='flex flex-col md:flex-row'>
            <Form.Item
              className='w-full md:w-1/2 md:pr-2'
              label='Tỉnh / Thành phố'
              name='city'
              rules={[{ required: true }]}
            >
              <Select placeholder='Chọn tỉnh / thành phố'>
                <Option value='hanoi'>Hà Nội</Option>
                <Option value='hcm'>TP. Hồ Chí Minh</Option>
              </Select>
            </Form.Item>
            <Form.Item
              className='w-full md:w-1/2 md:pl-2'
              label='Quận / Huyện'
              name='district'
              rules={[{ required: true }]}
            >
              <Select placeholder='Chọn quận / huyện'>
                <Option value='district1'>Quận 1</Option>
                <Option value='district2'>Quận 2</Option>
              </Select>
            </Form.Item>
          </div> */}
          <Form.Item label='Địa chỉ' name='address' rules={[{ required: true }]}>
            <Input placeholder='Nhập địa chỉ' />
          </Form.Item>
          <Form.Item label='Thông tin thêm' name='note'>
            <Input.TextArea placeholder='Viết các lưu ý cho đơn hàng của bạn' rows={3} />
          </Form.Item>
          <h2 className='text-lg font-semibold mb-4 '>Phương thức thanh toán</h2>
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <Radio.Group onChange={handleChange} value={selectedPaymentMethod} className='flex flex-col space-y-4'>
              <Radio className='flex items-center border border-2px p-4' value='COD'>
                <img src='/path/to/icon1.png' alt='' className='mr-2' /> {/* Thay thế bằng icon thích hợp */}
                Thanh toán khi giao hàng (COD)
              </Radio>
              <Radio className='flex items-center border border-2px p-4' value='MoMo'>
                <div className='flex items-center w-10 space-x-1'>
                  <img
                    src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/momo_iroppc.svg'
                    width={50} // Giảm kích thước hình ảnh nếu cần
                    alt='Ví MOMO'
                    className='mr-2'
                  />
                  <p className='whitespace-nowrap'>Ví MoMo</p> {/* Thêm thuộc tính này nếu cần */}
                </div>
              </Radio>
              <Radio className='flex items-center border border-2px p-4' value='VnPay'>
                <div className='flex items-center w-10 space-x-1'>
                  <img
                    src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/vnpay_new_lzopgz.svg'
                    width={50}
                    alt='Ví VNPAY'
                    className='mr-2'
                  />
                  <p className='whitespace-nowrap'>Ví Vn Pay</p>
                </div>
              </Radio>
              <Radio className='flex items-center border border-2px p-4' value='ZaloPay'>
                <div className='flex items-center w-10 space-x-1'>
                  <img
                    src='https://res.cloudinary.com/didbnrsmz/image/upload/v1728645343/CozyNest/zalopay_qazloz.svg'
                    width={50} // Giảm kích thước hình ảnh nếu cần
                    alt='Ví ZALOPAY'
                    className='mr-2'
                  />
                  <p className='whitespace-nowrap'>Ví Zalo Pay</p> {/* Thêm thuộc tính này nếu cần */}
                </div>
              </Radio>
            </Radio.Group>
          </div>
          <Form.Item>
            <Button type='primary' className='mt-5' htmlType='submit' block>
              Hoàn Tất Đơn Hàng
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Tóm tắt đơn hàng */}
      <div className='w-full md:w-1/3 bg-card p-4 rounded-lg mt-6 md:mt-0 border border-slate-500'>
        <h2 className='text-lg font-semibold mb-4'>Tóm tắt đơn hàng</h2>
        <div className='mb-2'>
          <span className='font-medium'>Thành tiền:</span>
          <span className='float-right'>{calculateTotal().toLocaleString()}₫</span>
        </div>
        <div className='mb-2'>
          <span className='font-medium'>Vận chuyển:</span>
          <span className='float-right'>Liên hệ phí vận chuyển sau</span>
        </div>
        <div className='mb-2'>
          <span className='font-medium'>Tổng cộng:</span>
          <span className='float-right'>{calculateTotal().toLocaleString()}₫</span>
        </div>
        <div className='mb-4'>
          <span className='font-medium'>Sản phẩm:</span>
        </div>
        <hr className='mb-4' />
        {data?.res?.products?.map((product: any) => (
          <div key={product.productId._id} className='mb-4 flex justify-between lg:gap-4'>
            <span className='flex items-center'>
              <img
                src={product.productId.thumbnail}
                className='xl:w-20 lg:w-20 w-12 sm:w-[100%]'
                alt={product.productId.name}
              />
            </span>
            <span className='font-medium'>{product.productId.name}</span>
            <span className='float-right'>× {product.quantity}</span>
            <span className='float-right'>{(product.price * product.quantity).toLocaleString()}₫</span>
          </div>
        ))}
        <hr className='mb-4' />
        <h2 className='text-lg font-semibold mb-4'>Chính sách bán hàng</h2>
        <p className='text-sm mb-2'>
          CozyNest chỉ áp dụng duy nhất một hình thức thanh toán online qua thẻ tín dụng, chuyển khoản, cụ thể:
        </p>
        <ol className='list-decimal pl-5 mb-4'>
          <li>Khách hàng tìm hiểu thông tin về sản phẩm.</li>
        </ol>
        <Form>
          <Form.Item name='terms' valuePropName='checked'>
            <Checkbox>
              Tôi đã đọc và đồng ý điều kiện đổi trả hàng, giao hàng, chính sách bảo mật, điều khoản dịch vụ mua hàng
              online *
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default CheckoutPage
