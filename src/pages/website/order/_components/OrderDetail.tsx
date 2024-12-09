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
      render: (text, record) => {
        // Sử dụng trực tiếp từ `record` đã được map
        const image = record.thumbnail // Lấy hình ảnh từ `record.thumbnail`

        return (
          <img
            src={image || 'default-image.jpg'} // Kiểm tra nếu không có ảnh thì sử dụng ảnh mặc định
            alt={record.name || 'product'}
            className='w-16 h-16'
          />
        )
      }
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
            thumbnail: product.sku_id.image[0],
            total: product.price * product.quantity
          }))}
          rowKey={(record) => record.productId}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Card className='mb-6'>
        <div className='border-t mt-4 pt-4'>
          <div className='flex flex-col mt-4 font-bold text-base'>
            {/* Hiển thị chi phí sản phẩm */}
            <div className='flex justify-between'>
              <span>Chi Phí Sản Phẩm</span>
              <span>
                {order.order_details.products
                  .reduce((total: any, product: { total_money: any }) => total + product.total_money, 0)
                  .toLocaleString()}
                ₫
              </span>
            </div>
            {/* Hiển thị chi phí vận chuyển */}
            <div className='flex justify-between'>
              <span>Chi Phí Vận chuyển</span>
              <span>{(50000).toLocaleString()}₫</span>
            </div>

            {/* Hiển thị chi phí lắp đặt nếu có */}
            {order.order_details.installation_fee > 0 && (
              <div className='flex justify-between'>
                <span>Chi Phí lắp đặt tại nhà</span>
                <span>{order.order_details.installation_fee.toLocaleString()}₫</span>
              </div>
            )}

            {/* Hiển thị mã giảm giá nếu có */}
            {order.order_details.total > 0 && (
              <div className='flex justify-between'>
                <span>Mã Giảm Giá: {order.order_details.coupon}</span>
                <span className='text-red-600'>- {order.order_details.total.toLocaleString()}₫</span>
              </div>
            )}

            {/* Hiển thị tổng cộng đơn hàng */}
            <div className='flex justify-between'>
              <span>Tổng cộng đơn hàng</span>
              <span>{order.total_amount.toLocaleString()}₫</span>
            </div>
          </div>
          <p>
            <strong>Phương thức thanh toán: {order.payment_method[0].orderInfo}</strong>
          </p>
        </div>
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
