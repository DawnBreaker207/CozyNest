/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { Button, Card, Spin, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title } = Typography

const OrderDetail = () => {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isOrderNotFound, setIsOrderNotFound] = useState<boolean>(false) // Trạng thái để kiểm tra đơn hàng không tồn tại
  const params = new URLSearchParams(location.search)
  const orderId = params.get('orderId')
  const navigate = useNavigate()
  window.scrollTo({ top: 0, behavior: 'smooth' })

  useEffect(() => {
    if (orderId) {
      // Gọi API để lấy chi tiết đơn hàng theo orderId từ URL
      instance
        .get(`/orders/${orderId}`)
        .then((response) => {
          if (response?.data?.res) {
            setOrder(response?.data?.res)
            setLoading(false)
          } else {
            setIsOrderNotFound(true)
            setLoading(false)
          }
        })
        .catch((error) => {
          console.error('Error fetching order:', error)
          setIsOrderNotFound(true)
          setLoading(false)
        })
    }
  }, [orderId])

  useEffect(() => {
    if (isOrderNotFound) {
      // Sau 5 giây sẽ tự động quay về trang chủ
      const timer = setTimeout(() => {
        navigate('/')
      }, 5000)

      return () => clearTimeout(timer) // Dọn dẹp timer khi component unmount
    }
  }, [isOrderNotFound, navigate])

  if (loading) {
    return <Spin size='large' />
  }

  if (isOrderNotFound) {
    return (
      <div className='text-center mb-10 mt-20'>
        <Title level={2}>Đơn hàng không tồn tại</Title>
        <p>Vui lòng thử lại sau.</p>
        <Link to='/'>
          <Button type='primary'>Trở về trang chủ</Button>
        </Link>
      </div>
    )
  }

  // Định nghĩa các trạng thái đơn hàng
  const orderStatuses: { [key: string]: string } = {
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

  // Lấy trạng thái hiển thị từ orderStatuses
  const orderStatusDisplay = orderStatuses[order.status] || order.status

  // Định nghĩa các cột cho bảng sản phẩm
  const productColumns = [
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string) => (
        <img src={text} alt='Product Thumbnail' style={{ width: 50, height: 50, objectFit: 'cover' }} />
      )
    },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: "Số lượng", dataIndex: 'quantity', key: 'quantity' },
    { title: 'Giá', dataIndex: 'price', key: 'price' }
  ]

  return (
    <div className='lg:px-32 p-10'>
      <Card className='mb-6'>
        <Title level={2}>Mã đơn hàng: {order._id}</Title>
        <p>
          <strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Trạng thái đơn hàng:</strong> {orderStatusDisplay}
        </p>
      </Card>

      <Card title='Thông tin giao hàng' className='mb-6'>
        <p>
          <strong>Tên người nhận:</strong> {order.customer_name}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {order.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Địa chỉ nhận hàng:</strong> {order.addressShipping}
        </p>
      </Card>

      <Card title='Thông tin sản phẩm' className='mb-6'>
        <Table
          columns={productColumns}
          dataSource={order.order_details.map((product: any) => ({
            ...product,
            name: product.sku_id.name,
            thumbnail: product.sku_id.image,
            total: product.price * product.quantity
          }))}
          rowKey={(record) => record.productId}
          pagination={false}
          scroll={{ x: 'max-content' }} // Cho phép cuộn ngang khi cần thiết
        />
      </Card>

      <Card className='mb-6'>
        <p>
          <strong>Phí vận chuyển: 50,000 VNĐ</strong>
        </p>
        <p>
          <strong>Tổng tiền: {order.total_amount || 0} VNĐ</strong>
        </p>
        <p>
          <strong>Phương thức thanh toán: {order.payment_method[0].orderInfo}</strong>
        </p>
      </Card>
      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
        <Button type='primary' className='w-full sm:w-auto'>
          Liên hệ hỗ trợ
        </Button>
        <Button className='bg-red-400 text-white w-full sm:w-auto'>Hủy đơn hàng</Button>
        <Link to='/'>
          <Button className='bg-green-600 text-white w-full sm:w-auto'>Tiếp tục mua hàng</Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderDetail
