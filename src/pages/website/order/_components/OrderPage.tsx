/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useLocalStorage } from '@/hooks/useStorage'
import { useQuery } from '@tanstack/react-query'
import { Card, Typography, Row, Col, Spin, Table, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const fetchOrderByUserId = async (userId: any) => {
  const response = await instance.get(`orders/orderByUserId?userId=${userId}`)
  return response.data.res.orders
}

const OrderPage = () => {
  const { Title, Text } = Typography
  const navigate = useNavigate() // Dùng để điều hướng

  // Lấy userId từ localStorage
  const [user] = useLocalStorage('user', {})
  const userId = user?.data?.res?._id

  // Call API với react-query
  const {
    data: orders,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => fetchOrderByUserId(userId),
    enabled: !!userId
  })
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
  if (isLoading) {
    return <Spin size='large' />
  }

  if (isError) {
    return <div>Đã xảy ra lỗi khi lấy dữ liệu đơn hàng!</div>
  }

  // Kiểm tra nếu không có đơn hàng nào
  console.log(orders)

  return (
    <div className='container mx-auto mt-10 mb-10'>
      <Row gutter={16}>
        {/* Chi tiết đơn hàng bên trái */}
        <Col xs={24} md={16}>
          <div className='bg-white p-6 shadow-md'>
            {/* Lặp qua từng đơn hàng và hiển thị thông tin */}
            {orders.map((order: any) => (
              <div key={order._id}>
                <Title level={2} className='mt-2'>
                  Chi tiết đơn hàng: {order.invoiceId}
                </Title>
                <div className='border-b py-4'>
                  <Text className='font-bold'>Thông tin sản phẩm</Text>
                  {order.products.length > 0 && (
                    <Table
                      dataSource={order.products}
                      pagination={false} // Tắt phân trang nếu không cần
                      rowKey={(product: any) => product._id} // Đặt _id làm key
                    >
                      <Table.Column
                        title='Sản phẩm'
                        dataIndex='productName'
                        key='productName'
                        render={(text: any, product: any) => (
                          <div className='flex items-center'>
                            <img
                              src={product.thumbnail}
                              alt={product.productName}
                              className='w-20 h-20 object-cover mr-4'
                            />
                            <span>{text}</span>
                          </div>
                        )}
                      />
                      <Table.Column
                        title='Giá'
                        key='total'
                        render={(product: any) => <span>{product.price.toLocaleString('vi-VN')}₫</span>}
                      />
                    </Table>
                  )}
                  <div className='flex justify-between'>
                    <Text>Ngày đặt hàng:</Text>
                    <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Trạng thái:</Text>
                    <Text>{order.status}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Phương thức thanh toán:</Text>
                    <Text>{order.paymentMethod}</Text>
                  </div>

                  {/* Thông tin tổng hợp cho từng đơn hàng */}
                  <div className='border-t pt-4'>
                    <div className='flex justify-between'>
                      <Text>Thành tiền:</Text>
                      <Text>{order.billTotals.toLocaleString('vi-VN')}₫</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Shipping:</Text>
                      <Text>20,000 đ</Text>
                    </div>
                    <div className='flex justify-between'>
                      <Text>Tổng cộng:</Text>
                      <Text>{(order.billTotals + 20000).toLocaleString('vi-VN')}₫</Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Thông tin đơn hàng bên phải */}
        <Col xs={24} md={8}>
          <Card className='bg-gray-100 shadow-md '>
            <Title level={4} className='text-green-600'>
              Cảm ơn. Đơn hàng của bạn đã được tiếp nhận
            </Title>
            <div className='mt-4'>
              {orders.map((order: any) => (
                <div key={order._id} className='mb-4'>
                  <div className='flex justify-between'>
                    <Text>Mã đơn hàng:</Text>
                    <Text className='font-bold'>{order.invoiceId}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Ngày:</Text>
                    <Text className='font-bold'>{new Date(order.createdAt).toLocaleDateString()}</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Tổng cộng:</Text>
                    <Text className='font-bold'>{order.billTotals.toLocaleString('vi-VN')}₫</Text>
                  </div>
                  <div className='flex justify-between'>
                    <Text>Phương thức thanh toán:</Text>
                    <Text className='font-bold'>{order.paymentMethod}</Text>
                  </div>
                  <div className='flex justify-between border-b-4'>
                    <Text>Trạng thái đơn hàng:</Text>
                    <Text className='font-bold'>{order.status}</Text>
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
