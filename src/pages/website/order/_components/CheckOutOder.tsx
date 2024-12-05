/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import useCart from '@/hooks/useCart'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Spin, Table, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const fetchOrder = async (orderId: string) => {
  const { data } = await instance.get(`/orders/${orderId}`)
  return data
}

const CheckOutOrder = () => {
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false)
  const [hasDeletedCart, setHasDeletedCart] = useState(false)
  const location = useLocation()
  const { data: cartData, removeAllProductsFromCart } = useCart()
  const params = new URLSearchParams(location.search)
  const orderId = params.get('orderId')
  const navigate = useNavigate()
  const { Title } = Typography

  const {
    data: order,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId as string),
    enabled: !!orderId
  })

  const orderData = order?.res

  useEffect(() => {
    if (orderData && cartData?.res?.cart_id && !hasDeletedCart) {
      removeAllProductsFromCart()
      setHasDeletedCart(true) // Đánh dấu đã xóa giỏ hàng
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [orderData, cartData, removeAllProductsFromCart, hasDeletedCart])

  // Xử lý khi có lỗi hoặc không có orderId
  useEffect(() => {
    if (isError) {
      message.error('Đơn hàng không hợp lệ hoặc không tồn tại!')
      setTimeout(() => {
        navigate(`/`)
      }, 5000)
    }
  }, [isError, navigate])

  if (isLoading) return <Spin size='large' />
  if (isError)
    return (
      <div className='text-center mb-10 mt-20'>
        <Title level={2}>Đơn hàng không tồn tại</Title>
        <p>Vui lòng thử lại sau.</p>
        <Link to='/'>
          <Button type='primary'>Trở về trang chủ</Button>
        </Link>
      </div>
    )

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string) => <img src={text} alt='product' className='w-16 h-16' />
    },
    { title: 'Mô tả', dataIndex: 'productName', key: 'productName' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (price: number) => `${price}₫` }
  ]

  const data = orderData?.products?.map((product: any, index: number) => ({
    key: index,
    thumbnail: product.thumbnail,
    productName: product.originName,
    quantity: product.quantity,
    price: product.price
  }))

  return (
    <div className='mx-auto'>
      <div className='flex flex-col lg:flex-row justify-between pt-10'>
        <div className='lg:w-1/2 lg:p-[66px] px-4 lg:pl-[66px] mb-8 lg:mb-0'>
          <h1 className='text-3xl font-bold'>CozyNest</h1>

          {/* Trạng thái đơn hàng */}
          <div className='flex items-center mt-4'>
            <div>
              {orderData.paid ? (
                <>
                  <h2 className='text-xl font-semibold'>Đặt hàng thành công</h2>
                  <p className='text-gray-600'>Mã đơn hàng #{orderData.invoiceId}</p>
                  <p className='text-gray-600'>Cảm ơn bạn đã mua hàng!</p>
                </>
              ) : (
                <>
                  <h2 className='text-xl font-semibold text-red-500'>Thanh toán đang chờ xử lý</h2>
                  <p className='text-gray-600'>Mã đơn hàng #{orderData.invoiceId}</p>
                </>
              )}
            </div>
            <div
              className={`flex justify-center items-center w-12 h-12 border-2 mx-5 my-4 ${
                orderData.paid ? 'border-green-500' : 'border-red-500'
              } rounded-full bg-white cursor-pointer`}
            >
              {orderData.paid ? (
                <CheckOutlined className='text-green-500 text-xl' />
              ) : (
                <CloseOutlined className='text-red-500 text-xl' />
              )}
            </div>
          </div>

          {/* Thông tin giao hàng */}
          <div className='my-4 border-[2px]'>
            <div className='px-2 mt-2'>
              <h3 className='text-xl font-semibold'>Thông tin giao hàng</h3>
            </div>
            <div className='px-2'>
              <p>{orderData.customerName}</p>
              <p>{orderData.phoneNumber}</p>
              <p>{orderData.addressShipping}</p>

              <h3 className='text-lg font-semibold mt-4'>Phương thức thanh toán</h3>
              {orderData.paymentMethod === 'COD' ? (
                <p>Thanh toán khi giao hàng (COD)</p>
              ) : orderData.paid ? (
                <p>Thanh toán online đã hoàn tất</p>
              ) : (
                <>
                  <p>Thanh toán online qua {orderData.payment_method[0]?.method}</p>

                  <p className='text-red-500 mb-6 mt-6'>
                    Thanh toán chưa thành công. Vui lòng thanh toán lại để hoàn tất đơn hàng.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Các nút hành động */}
          <div className='space-x-3'>
            <Button type='primary' href='/' className='mt-6'>
              Tiếp tục mua hàng
            </Button>
            <Button type='primary' href={`/orders/orderdetail/?orderId=${orderId}`} className='mt-6'>
              Xem tình trạng đơn hàng
            </Button>
            {!orderData.paid && orderData.paymentMethod !== 'COD' && (
              <Button
                type='primary'
                danger
                className='mt-6'
                // onClick={() => navigate(`/checkouts/payment?orderId=${orderId}`)}
              >
                Thanh toán lại
              </Button>
            )}
          </div>

          {/* Hỗ trợ */}
          <div className='text-gray-500 mt-4'>
            <p>
              Cần hỗ trợ?{' '}
              <a href='mailto:hminh0555@gmail.com' className='text-blue-500'>
                Liên hệ chúng tôi
              </a>
            </p>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className='lg:w-1/2 border-l mb-10 px-6'>
          <h2 className='text-lg font-semibold'>Thông tin đơn hàng</h2>

          <div className='block lg:hidden mt-4'>
            <button
              className='w-full text-left bg-gray-200 p-2 rounded'
              onClick={() => setIsOrderDetailsVisible(!isOrderDetailsVisible)}
            >
              {isOrderDetailsVisible ? 'Ẩn chi tiết đơn hàng' : 'Hiện chi tiết đơn hàng'}
            </button>
          </div>

          <div className='hidden lg:block'>
            <Table columns={columns} dataSource={data} pagination={false} className='my-4' />
            <div className='border-t mt-4 pt-4'>
              <div className='flex justify-between mt-4 font-bold text-lg'>
                <span>Tổng cộng đơn hàng</span>
                <span>{orderData.total_amount.toLocaleString()}₫</span>
              </div>
            </div>
          </div>

          {isOrderDetailsVisible && (
            <div className='lg:hidden'>
              <Table columns={columns} dataSource={data} pagination={false} className='my-4' />
              <div className='border-t mt-4 pt-4'>
                <div className='flex justify-between mt-4 font-bold text-lg'>
                  <span>Tổng cộng đơn hàng</span>
                  <span>{orderData.billTotals.toLocaleString()}₫</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOutOrder
