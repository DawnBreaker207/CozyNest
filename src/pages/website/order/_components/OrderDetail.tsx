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
      const timer = setTimeout(() => {
        navigate('/')
      }, 5000)

      return () => clearTimeout(timer)
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
  const statuses = [
    { label: 'Đang xử lý', value: 'Processing' },
    { label: 'Chờ xác nhận', value: 'Pending' },
    { label: 'Đã xác nhận', value: 'Confirmed' },
    { label: 'Đang chờ bên vận chuyển', value: 'Pending-Ship' },
    { label: 'Đang vận chuyển', value: 'Delivering' },
    { label: 'Giao hàng thành công', value: 'Delivered' },
    { label: 'Đơn hàng hoàn thành', value: 'Completed' },
    { label: 'Hoàn trả đơn hàng', value: 'Returned' },
    { label: 'Hoàn trả đơn hàng và hoàn tiền', value: 'Refunded' },
    { label: 'Đã hủy đơn hàng', value: 'Canceled' }
  ]

  // Tìm trạng thái hiện tại
  const currentStatus = order.status

  const productColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: () => (
        <img
          src='https://res.cloudinary.com/didbnrsmz/image/upload/v1732811019/CozyNest/T%E1%BB%A7_Gi%C3%A0y_T%E1%BB%A7_Trang_Tr%C3%AD_G%E1%BB%97_MOHO_VIENNA_203_qwp3uh.webp'
          alt='product'
          className='w-16 h-16'
        />
      )
    },
    { title: 'Mô tả', dataIndex: 'name', key: 'name' },
    { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (price: number) => `${price.toLocaleString()}₫` },
    {
      title: 'Tổng giá',
      key: 'totalPrice',
      render: (record: any) => `${(record.price * record.quantity).toLocaleString()}₫`
    }
  ]

  return (
    <div className='lg:px-32 p-10'>
      <Card className='mb-6'>
        <Title level={2}>Mã đơn hàng: {order._id}</Title>
        <p>
          <strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Trạng thái đơn hàng:</strong>{' '}
          {statuses.find((s) => s.value === currentStatus)?.label || currentStatus}
        </p>
      </Card>

      {/* Hiển thị hành trình trạng thái */}
      <Card title='Lịch sử trạng thái' className='mb-6'>
        <div className='flex flex-wrap gap-4 mt-4'>
          {statuses.map((status, index) => {
            const normalizedCurrentStatus = currentStatus.trim().toLowerCase()
            const normalizedStatusValue = status.value.trim().toLowerCase()

            const isPast = index < statuses.findIndex((s) => s.value.trim().toLowerCase() === normalizedCurrentStatus)
            const isCurrent = normalizedStatusValue === normalizedCurrentStatus

            let btnType: 'default' | 'primary' | 'dashed' = 'default'
            if (isPast) {
              btnType = 'dashed'
            } else if (isCurrent) {
              btnType = 'primary'
            }

            console.log(`Status: ${status.label}, isPast: ${isPast}, isCurrent: ${isCurrent}, btnType: ${btnType}`)

            return (
              <Button
                key={index}
                type={btnType}
                disabled
                style={isCurrent ? { backgroundColor: '#1890ff', color: '#fff' } : {}}
              >
                {status.label}
              </Button>
            )
          })}
        </div>
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
          <strong>Địa chỉ nhận hàng:</strong> {order.address}
        </p>
      </Card>

      <Card title='Thông tin sản phẩm' className='mb-6'>
        <Table
          columns={productColumns}
          dataSource={order.order_details.products.map((product: any) => ({
            ...product,
            name: product.sku_id.name,
            thumbnail: product.sku_id.image,
            total: product.price * product.quantity
          }))}
          rowKey={(record) => record.productId}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Card className='mb-6'>
        <p>
          <strong>Phí vận chuyển: 50,000 VNĐ</strong>
        </p>
        <p>
          <strong>Phí lắp đặt : {order.order_details.installation_fee.toLocaleString() || 0} VNĐ</strong>
        </p>
        <p>
          <strong>Tổng tiền: {order.total_amount.toLocaleString() || 0} VNĐ</strong>
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
