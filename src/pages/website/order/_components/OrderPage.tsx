/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useCookie } from '@/hooks/useStorage'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Pagination, Row, Spin, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../../../utils/formatCurrency'
import CustomLoadingPage from '@/components/Loading'

// Đối tượng ánh xạ trạng thái
const orderStatusMap: { [key: string]: string } = {
  Processing: 'Đang xử lý',
  Pending: 'Chờ xác nhận',
  Confirmed: 'Đã xác nhận',
  'Pending-Ship': 'Đang chờ bên vận chuyển',
  Delivering: 'Đang vận chuyển',
  Delivered: 'Giao hàng thành công',
  Cancelled: 'Đã hủy đơn hàng',
  Completed: 'Đơn hàng hoàn thành',
  Returned: 'Hoàn trả đơn hàng',
  Refunded: 'Hoàn trả đơn hàng và hoàn tiền'
}

const statusColorMap: { [key: string]: string } = {
  Processing: 'text-blue-500',
  Pending: 'text-yellow-500',
  Confirmed: 'text-yellow-500',
  'Pending-Ship': 'text-orange-500',
  Delivering: 'text-orange-500',
  Delivered: 'text-green-500',
  Cancelled: 'text-red-500',
  Completed: 'text-cyan-500',
  Returned: 'text-magenta-500',
  Refunded: 'text-purple-500'
}

// Sử dụng khi hiển thị trạng thái đơn hàng
const getStatusClass = (status: string) => {
  return statusColorMap[status] || 'bg-gray-300 text-gray-700' // Mặc định cho trạng thái không xác định
}

const fetchOrderByUserId = async (userId: any) => {
  const response = await instance.get(`orders/orderByUserId?id=${userId}`)
  console.log(response.data.res.items)

  return response.data.res.items
}

const OrderPage = () => {
  const { Title, Text } = Typography
  const navigate = useNavigate()

  const [user] = useCookie('user', {})
  const userId = user?._id

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5 // Số đơn hàng mỗi trang

  const {
    data: orders,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => fetchOrderByUserId(userId),
    enabled: !!userId
  })

  const orderRefs = useRef<{ [key: string]: any }>({}) // Lưu các ref cho từng đơn hàng

  useEffect(() => {
    // Tự động cuộn lên đầu trang khi chuyển trang
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  if (!userId) {
    return (
      <div className='container mx-auto mt-10 mb-10 text-center'>
        <Title level={3}>Bạn chưa đăng nhập</Title>
        <Button type='primary' size='large' onClick={() => navigate('/login')}>
          Đăng nhập ngay
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return <CustomLoadingPage />
  }

  if (isError) {
    return <div>Đã xảy ra lỗi khi lấy dữ liệu đơn hàng!</div>
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='container mx-auto mt-10 mb-10 text-center'>
        <Title level={3}>Bạn chưa có đơn hàng nào</Title>
        <Button type='primary' size='large' onClick={() => navigate('/')}>
          Tiếp tục mua hàng
        </Button>
      </div>
    )
  }

  // Sắp xếp đơn hàng theo thời gian mới nhất
  const sortedOrders = orders.sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Xác định đơn hàng hiển thị theo trang
  const startIndex = (currentPage - 1) * pageSize
  const currentOrders = sortedOrders.slice(startIndex, startIndex + pageSize)
  console.log(currentOrders)

  const handleOrderClick = (orderId: string) => {
    const orderRef = orderRefs.current[orderId]
    if (orderRef) {
      orderRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className='container mx-auto mt-10 mb-10'>
      <Row gutter={16}>
        {/* Chi tiết đơn hàng bên trái */}
        <Col xs={24} md={16}>
          <div className='bg-white p-6 shadow-md rounded-md'>
            <div className='space-y-6'>
              {currentOrders.map((order: any) => (
                <div
                  key={order?._id}
                  className='border border-gray-200 rounded-lg p-4 shadow-sm'
                  ref={(el) => (orderRefs.current[order._id] = el)}
                  style={{ scrollMarginTop: '100px' }}
                >
                  {/* Mã đơn hàng */}
                  <Title level={4} className='text-blue-600 mb-4'>
                    Mã đơn hàng: {order?._id}
                  </Title>

                  {/* Thông tin sản phẩm */}
                  <div className='mb-6'>
                    <Text className='font-bold text-lg mb-2 block'>Thông tin sản phẩm</Text>
                    <table className='w-full border-collapse border border-gray-200'>
                      <thead>
                        <tr className='bg-gray-100 text-left'>
                          <th className='border border-gray-200 px-4 py-2'>Hình ảnh</th>
                          <th className='border border-gray-200 px-4 py-2'>Tên sản phẩm</th>
                          <th className='border border-gray-200 px-4 py-2 text-right'>Số lượng</th>
                          <th className='border border-gray-200 px-4 py-2 text-right'>Giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.order_details?.map((orderDetail: any) =>
                          orderDetail?.products?.map((product: any) => (
                            <tr key={product?.sku_id?._id} className='hover:bg-gray-50'>
                              <td className='border border-gray-200 px-4 py-2'>
                                <img
                                  src={
                                    Array.isArray(product?.sku_id?.image) && product?.sku_id?.image?.length > 0
                                      ? product?.sku_id?.image[0]
                                      : '/path/to/default-image.jpg'
                                  }
                                  alt={product?.sku_id?.name || 'Sản phẩm'}
                                  className='w-16 h-16 object-cover'
                                />
                              </td>
                              <td className='border border-gray-200 px-4 py-2'>{product?.sku_id?.name}</td>
                              <td className='border border-gray-200 px-4 py-2 text-right'>x{product?.quantity}</td>
                              <td className='border border-gray-200 px-4 py-2 text-right'>
                                {formatCurrency(product?.price)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Thông tin người nhận */}
                  <div className='space-y-2 border-b border-gray-300 pb-4'>
                    <Text className='block text-lg font-bold text-gray-800'>Thông tin người nhận</Text>
                    <div className='flex justify-between'>
                      <Text>Ngày đặt hàng:</Text>
                      <Text className='font-bold'>{new Date(order?.createdAt).toLocaleString('vi-VN')}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Tên người nhận:</Text>
                      <Text className='font-bold'>{order?.customer_name}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>SĐT người nhận:</Text>
                      <Text className='font-bold'>{order?.phone_number}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Địa chỉ giao hàng:</Text>
                      <Text className='font-bold'>{order?.address}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Trạng thái:</Text>
                      <Text className={`p-2 font-bold rounded-full ${getStatusClass(order?.status)}`}>
                        {orderStatusMap[order?.status] || 'Chưa xác định'}
                      </Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Phương thức thanh toán:</Text>
                      <Text className='font-bold'>{order?.payment_method[0]?.orderInfo || 'Chưa xác định'}</Text>
                    </div>
                  </div>

                  {/* Chi phí */}
                  <div className='space-y-3 border-b border-gray-300 pb-4'>
                    <Text className='block text-lg font-bold text-gray-800'>Chi phí</Text>
                    <div className='flex justify-between'>
                      <Text>Chi phí sản phẩm:</Text>
                      <Text className='font-bold text-black'>{formatCurrency(order?.total_amount)}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Chi phí lắp đặt tại nhà:</Text>
                      <Text className='font-bold text-black'>
                        {formatCurrency(order?.order_details[0]?.installation_fee)}
                      </Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Chi phí vận chuyển:</Text>
                      <Text className='font-bold text-black'>{formatCurrency(50000)}</Text>
                    </div>
                    {order?.order_details[0]?.coupon && (
                      <div className='flex justify-between text-red-600'>
                        <Text>Mã giảm giá:</Text>
                        <Text className='font-bold text-red-500'>
                          -{formatCurrency(order?.order_details[0]?.total)}
                        </Text>
                      </div>
                    )}
                    <div className='flex justify-between border-t border-gray-300 pt-2'>
                      <Text className='font-bold text-xl'>Tổng cộng:</Text>
                      <Text className='font-bold text-xl text-red-600'>{formatCurrency(order?.total_amount)}</Text>
                    </div>
                  </div>

                  <Button
                    type='primary'
                    href={`/orders/orderdetail/?orderId=${order?._id}`}
                    className='mt-6 w-full bg-blue-600 hover:bg-blue-700'
                  >
                    Xem tình trạng đơn hàng
                  </Button>
                </div>
              ))}
            </div>

            {/* Phân trang */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={orders.length}
              onChange={(page) => setCurrentPage(page)}
              className='mt-6 text-center'
            />
          </div>
        </Col>

        {/* Thông tin đơn hàng bên phải */}
        <Col xs={24} md={8}>
          <Card className='bg-gray-100 shadow-md'>
            <Title level={4} className='text-green-600'>
              Cảm ơn. Đơn hàng của bạn đã được tiếp nhận
            </Title>
            <div className='mt-4'>
              {currentOrders.map((order: any) => (
                <div key={order?._id} className='mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-300'>
                  <div className='flex justify-between mb-2'>
                    <Text
                      className='font-bold cursor-pointer text-blue-600 hover:text-blue-800'
                      onClick={() => handleOrderClick(order?._id)} // Thêm sự kiện nhấn
                    >
                      Mã đơn hàng: {order?._id}
                    </Text>
                  </div>

                  <div className='flex justify-between'>
                    <Text>Ngày:</Text>
                    <Text className='font-bold'>{new Date(order?.createdAt).toLocaleString('vi-VN')}</Text>
                  </div>

                  <div className='flex justify-between mt-2'>
                    <Text>Tên người nhận:</Text>
                    <Text className='font-bold'>{order?.customer_name}</Text>
                  </div>

                  <div className='flex justify-between mt-2'>
                    <Text>SĐT người nhận:</Text>
                    <Text className='font-bold'>{order?.phone_number}</Text>
                  </div>

                  <div className='flex justify-between mt-2'>
                    <Text>Địa chỉ giao hàng:</Text>
                    <Text className='font-bold'>{order?.address}</Text>
                  </div>

                  <div className='flex justify-between mt-2'>
                    <Text>Tổng cộng:</Text>
                    <Text className='font-bold text-red-600'>{formatCurrency(order?.total_amount)} VNĐ</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default OrderPage
