/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useCookie } from '@/hooks/useStorage'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Col, Pagination, Row, Spin, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Đối tượng ánh xạ trạng thái
const orderStatusMap: { [key: string]: string } = {
  Processing: 'Đang xử lý',
  Pending: 'Chờ xác nhận',
  Confirmed: 'Đã xác nhận',
  'Pending-Ship': 'Đang chờ bên vận chuyển',
  Delivering: 'Đang vận chuyển',
  Delivered: 'Giao hàng thành công',
  Canceled: 'Đã hủy đơn hàng',
  Completed: 'Đơn hàng hoàn thành',
  Returned: 'Hoàn trả đơn hàng',
  Refunded: 'Hoàn trả đơn hàng và hoàn tiền'
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
    return <Spin size='large' />
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
          <div className='bg-white p-6 shadow-md'>
            {currentOrders.map((order: any) => (
              <div
                key={order._id}
                className='border-b mb-4 pb-4'
                ref={(el) => (orderRefs.current[order._id] = el)} // Gán ref cho từng đơn hàng
                style={{ scrollMarginTop: '100px' }} // Đặt khoảng cách khi cuộn tới
              >
                <Title level={3} className='mt-2'>
                  Mã đơn hàng: {order._id}{' '}
                </Title>
                <div className='border-b py-4'>
                  <Text className='font-bold'>Thông tin sản phẩm</Text>
                  {order.order_details &&
                    Array.isArray(order.order_details) &&
                    order.order_details.map(
                      (orderDetail: any) =>
                        orderDetail.products &&
                        Array.isArray(orderDetail.products) &&
                        orderDetail.products.map((product: any) => (
                          <div key={product._id} className='flex items-center mt-2'>
                            {/* Kiểm tra trước khi truy cập vào image[0] */}
                            <img
                              src={
                                Array.isArray(orderDetail.image) && orderDetail.image.length > 0
                                  ? orderDetail.image[0]
                                  : '/path/to/default-image.jpg'
                              } // Sử dụng hình ảnh mặc định nếu không có ảnh
                              alt={orderDetail.name}
                              className='w-16 h-16 object-cover mr-4'
                            />
                            <span className='font-bold'>{orderDetail.name}</span>
                            <span className='ml-2'>x{product.quantity}</span>
                            <span className='ml-auto font-bold'>{product.price.toLocaleString('vi-VN')}₫</span>
                          </div>
                        ))
                    )}

                  <div className='mt-5'>
                    <Text className='font-bold'>Thông tin người nhận</Text>
                    <div className='flex justify-between mt-4'>
                      <Text>Ngày đặt hàng:</Text>
                      <Text className='font-bold'>{new Date(order.createdAt).toLocaleString('vi-VN')}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Tên người nhận:</Text>
                      <Text className='font-bold'>{order.customer_name}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>SĐT người nhận:</Text>
                      <Text className='font-bold'>{order.phone_number}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Địa chỉ giao hàng:</Text>
                      <Text className='font-bold'>{order.address}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Trạng thái:</Text>
                      <Text className='font-bold'>{orderStatusMap[order.status] || 'Chưa xác định'}</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Phương thức thanh toán:</Text>
                      <Text className='font-bold'>{order.payment_method[0]?.orderInfo || 'Chưa xác định'}</Text>
                    </div>
                    {/* Tính tổng giá sản phẩm */}
                    <div className='flex justify-between mt-4'>
                      <Text>Chi phí sản phẩm:</Text>
                      <Text className='font-bold'>
                        {order.order_details &&
                          Array.isArray(order.order_details) &&
                          order.order_details
                            .reduce((total: any, orderDetail: { products: any[] }) => {
                              return (
                                total +
                                  (orderDetail.products &&
                                    Array.isArray(orderDetail.products) &&
                                    orderDetail.products.reduce((productTotal, product) => {
                                      return productTotal + product.price * product.quantity
                                    }, 0)) || 0
                              )
                            }, 0)
                            .toLocaleString()}
                        ₫
                      </Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Chi phí lắp đặt tại nhà:</Text>
                      <Text className='font-bold'>{order.order_details[0].installation_fee.toLocaleString()}₫</Text>
                    </div>

                    <div className='flex justify-between '>
                      <Text>Chi phí vận chuyển:</Text>
                      <Text className='font-bold'>{(50000).toLocaleString()}₫</Text>
                    </div>
                    {/* Hiển thị mã giảm giá nếu có */}
                    {order.order_details[0].total > 0 && (
                      <div className='flex justify-between'>
                        <span>Mã Giảm Giá: {order.order_details[0].coupon}</span>
                        <span className='text-red-600'>- {order.order_details[0].total.toLocaleString()}₫</span>
                      </div>
                    )}
                    <div className='flex justify-between '>
                      <Text>Tổng cộng:</Text>
                      <Text className='font-bold'>{order.total_amount.toLocaleString()}₫</Text>
                    </div>
                    <Button type='primary' href={`/orders/orderdetail/?orderId=${order._id}`} className='mt-6'>
                      Xem tình trạng đơn hàng
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Phân trang */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={orders.length}
              onChange={(page) => setCurrentPage(page)}
              className='mt-4 text-center'
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
                <div key={order._id} className='mb-4'>
                  <div className='flex justify-between'>
                    <Text
                      className='font-bold cursor-pointer text-blue-600'
                      onClick={() => handleOrderClick(order._id)} // Thêm sự kiện nhấn
                    >
                      Mã đơn hàng: {order._id}
                    </Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Ngày:</Text>
                    <Text className='font-bold'>{new Date(order.createdAt).toLocaleString('vi-VN')}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Tên người nhận:</Text>
                    <Text className='font-bold'>{order.customer_name}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>SĐT người nhận:</Text>
                    <Text className='font-bold'>{order.phone_number}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Địa chỉ giao hàng:</Text>
                    <Text className='font-bold'>{order.address}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Tổng cộng:</Text>
                    <Text className='font-bold'>{order.total_amount.toLocaleString()} ₫</Text>
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
