/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { Button, Card, Col, message, Modal, notification, Row, Spin, Table, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RefundOrderButton from './RefundOrderButton'
import ReturnOrderButton from './ReturnOrderButton '
import { StatusType } from '@/types/status'

const { Title } = Typography

const OrderDetail = () => {
  const [order, setOrder] = useState<any>(null)
  const [returnOrder, setReturnOrder] = useState<any>(null) // Thêm state cho đơn hàng hoàn trả
  const [refundOrder, setRefundOrder] = useState<any>(null) // Thêm state cho đơn hàng hoàn trả
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
    if (orderId) {
      instance
        .get(`/orders/return?search=${orderId}`)
        .then((response) => {
          if (response?.data?.res) {
            setReturnOrder(response?.data?.res)
          } else {
            setReturnOrder(null)
          }
        })
        .catch((error) => {
          console.error('Error fetching return order:', error)
          message.error('Có lỗi xảy ra khi lấy thông tin đơn hàng hoàn trả.')
        })
    }
  }, [orderId])
  console.log(returnOrder)
  useEffect(() => {
    if (orderId) {
      instance
        .get(`/orders/refund?search=${orderId}`)
        .then((response) => {
          if (response?.data?.res) {
            setRefundOrder(response?.data?.res)
          } else {
            setRefundOrder(null)
          }
        })
        .catch((error) => {
          console.error('Error fetching return order:', error)
          message.error('Có lỗi xảy ra khi lấy thông tin đơn hàng hoàn trả.')
        })
    }
  }, [orderId])
  console.log(refundOrder)
  useEffect(() => {
    if (isOrderNotFound) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOrderNotFound, navigate])
  const cancelOrder = () => {
    // Hiển thị Modal xác nhận
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      content: 'Sau khi hủy, bạn sẽ không thể hoàn tác hành động này.',
      onOk: async () => {
        try {
          // Bước 1: Lấy thông tin đơn hàng hiện tại

          const { data: currentOrder } = await instance.get(`/orders/${orderId}`)
          if (!currentOrder) {
            console.error('Đơn hàng không tồn tại')
            return
          }
          if (currentOrder?.res?.status !== 'Processing' && currentOrder?.res?.status !== 'Pending') {
            // Hiển thị thông báo bằng Ant Design
            notification.error({
              message: 'Thông báo',
              description: 'Trạng thái đơn hàng hiện tại không thể hủy.',
              duration: 2 // Thời gian hiển thị thông báo (2 giây)
            })
            // Reload lại trang sau 1,5 giây
            setTimeout(() => {
              window.location.reload()
            }, 1500) // 1500ms = 1,5 giây
            return
          }
          // Bước 2: Cập nhật trạng thái của đơn hàng thành "Canceled"
          //* Update: Sửa lại api hủy đơn
          const response = await instance.patch(`/orders/cancel/${orderId}`, {
            ...order, // Giữ lại dữ liệu cũ
            status: 'cancelled' // Cập nhật trạng thái hủy
          })

          // Hiển thị thông báo thành công
          message.success(`Bạn đã hủy đơn hàng ${response?.data?.res?._id} thành công`)
          setTimeout(() => {
            window.location.reload() // Tự động làm mới trang
          }, 1500) // Đợi 1.5 giây trước khi làm mới trang
          // Làm mới trang để người dùng thấy tình trạng đơn hàng đã thay đổi
        } catch (error) {
          console.error('Lỗi khi hủy đơn hàng:', error)
          message.error('Có lỗi xảy ra khi hủy đơn hàng')
        }
      }
    })
  }
  const confirmOrder = () => {
    // Hiển thị Modal xác nhận
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xác nhận đơn hàng này?',
      content: 'Hãy chắc chắn khi thực sự nhận được hàng',
      onOk: async () => {
        try {
          if (!order) {
            console.error('Đơn hàng không tồn tại')
            return
          }
          if (order.status !== 'Delivered') {
            // Hiển thị thông báo bằng Ant Design
            notification.error({
              message: 'Thông báo',
              description: 'Trạng thái đơn hàng hiện tại không thể xác nhận.',
              duration: 2 // Thời gian hiển thị thông báo (2 giây)
            })

            // Reload lại trang sau 1,5 giây
            setTimeout(() => {
              window.location.reload()
            }, 1500)
            return
          }

          // Bước 2: Cập nhật trạng thái của đơn hàng thành "Confirmed"
          const response = await instance.put(`/orders/updateStatusOrder/${orderId}`, {
            ...order, // Giữ lại dữ liệu cũ
            status: 'Completed' // Cập nhật trạng thái xác nhận
          })

          // Hiển thị thông báo thành công
          message.success(`Đơn hàng ${response?.data?.res?._id} đã được xác nhận thành công`)
          setTimeout(() => {
            window.location.reload() // Tự động làm mới trang
          }, 1500) // Đợi 1.5 giây trước khi làm mới trang
        } catch (error) {
          console.error('Lỗi khi xác nhận đơn hàng:', error)
          message.error('Có lỗi xảy ra khi xác nhận đơn hàng')
        }
      }
    })
  }
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
  console.log(order)

  // Định nghĩa các trạng thái đơn hàng
  const statuses = [
    { label: 'Đang xử lý', value: 'Processing' },
    { label: 'Chờ xác nhận', value: 'Pending' },
    { label: 'Đã xác nhận', value: 'Confirmed' },
    { label: 'Đang chờ bên vận chuyển', value: 'Pending-Ship' },
    { label: 'Đang vận chuyển', value: 'Delivering' },
    { label: 'Giao hàng thành công', value: 'Delivered' },
    { label: 'Đơn hàng hoàn thành', value: 'Completed' },
    { label: 'Tiến hành hoàn trả đơn hàng', value: 'Returning' },
    { label: 'Hoàn trả đơn hàng', value: 'Returned' },
    { label: 'Tiến hành hoàn Tiền', value: 'Refunding' },
    { label: 'Hoàn tiền đơn hàng', value: 'Refunded' },
    { label: 'Đã hủy đơn hàng', value: 'cancelled' }
  ]

  // Tìm trạng thái hiện tại
  const currentStatus =
    returnOrder?.items?.[0]?.is_confirm === false
      ? 'Returning'
      : refundOrder?.items?.[0]?.is_confirm === false
        ? 'Refunding'
        : order?.status

  const productColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (
        _text: any,
        record: {
          sku_id: any
          thumbnail: any
          name: any
        }
      ) => {
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
  const statusColors = {
    Processing: 'blue',
    Pending: 'orange',
    Confirmed: 'green',
    'Pending-Ship': 'cyan',
    Delivering: 'purple',
    Delivered: 'green',
    Completed: 'gold',
    Returned: 'red',
    Refunded: 'red',
    cancelled: 'gray'
  }
  return (
    <div className='lg:px-32 p-10'>
      <Card className='mb-6'>
        <Title level={2}>Mã đơn hàng: {order._id}</Title>
        <p>
          <strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Trạng thái đơn hàng hiện tại:</strong>{' '}
          <Tag color='green'>{statuses.find((s) => s.value === currentStatus)?.label || currentStatus}</Tag>
        </p>
      </Card>

      {/* Hiển thị hành trình trạng thái */}
      <Card title='Lịch sử trạng thái' className='mb-6'>
        <div className='mt-4 flex space-x-4'>
          {order.status_detail.length > 0 &&
            order.status_detail.map((item: any, index: number) => (
              <div key={index} className='detail'>
                <p>
                  <Tag color={statusColors[item.status as StatusType] || 'default'}>
                    {statuses.find((status) => status.value === item.status)?.label || 'Không xác định'}
                  </Tag>
                </p>
                <p>{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
        </div>
        <div className='mt-4'>
          {/* Hiển thị trạng thái của đơn hàng hiện tại */}
          <div>
            <strong>Trạng thái: </strong>
            <Tag color='green'>
              {statuses.find((status) => status.value === currentStatus)?.label || 'Không xác định'}
            </Tag>
          </div>
          <div>
            <strong>Thời gian: </strong>
            {new Date(returnOrder?.items?.[0]?.updatedAt || order?.updatedAt).toLocaleString()}
          </div>
        </div>
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
      {/* Nếu có thông tin hoàn trả đơn hàng, hiển thị một Cart riêng biệt */}
      {(returnOrder?.items?.length > 0 || refundOrder?.items?.length > 0) && (
        <Row gutter={16}>
          {/* Cột 1: Thông tin hoàn trả */}
          {returnOrder?.items?.length > 0 && (
            <Col xs={24} md={12}>
              <Card title='Thông Tin Hoàn Trả Đơn Hàng' className='mb-6'>
                <Title level={3}>Mã đơn hàng hoàn trả: {returnOrder?.items?.[0]?.order_id}</Title>
                <p>
                  <strong>Ngày tạo yêu cầu hoàn trả:</strong>{' '}
                  {new Date(returnOrder?.items?.[0]?.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Lý do hoàn trả:</strong> {returnOrder?.items?.[0]?.reason}
                </p>
                <p>
                  <strong>Trạng thái hoàn trả:</strong>{' '}
                  {returnOrder?.items?.[0]?.is_confirm ? 'Đã xác nhận' : 'Chưa xác nhận'}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {returnOrder?.items?.[0]?.phone_number}
                </p>
                <p>
                  <strong>Tên khách hàng:</strong> {returnOrder?.items?.[0]?.customer_name}
                </p>
                <div>
                  <strong>Hình ảnh minh chứng:</strong>
                  <div>
                    {returnOrder?.items?.[0]?.images.map((image: string, index: number) => (
                      <img key={index} src={image} alt='Sản phẩm hoàn trả' style={{ width: '100px', margin: '5px' }} />
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          )}

          {/* Cột 2: Thông tin hoàn tiền */}
          {refundOrder?.items?.length > 0 && (
            <Col xs={24} md={12}>
              <Card title='Thông Tin Hoàn Tiền Đơn Hàng' className='mb-6'>
                <Title level={3}>Mã đơn hàng hoàn tiền: {refundOrder?.items?.[0]?.order_id}</Title>
                <p>
                  <strong>Ngày tạo yêu cầu hoàn tiền:</strong>{' '}
                  {new Date(refundOrder?.items?.[0]?.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Số tài khoản ngân hàng:</strong> {refundOrder?.items?.[0]?.bank_number}
                </p>
                <p>
                  <strong>Tên ngân hàng thụ hưởng:</strong> {refundOrder?.items?.[0]?.bank_name}
                </p>
                <p>
                  <strong>Trạng thái hoàn tiền:</strong>{' '}
                  {refundOrder?.items?.[0]?.is_confirm ? 'Đã hoàn tiền' : 'Chưa hoàn tiền'}
                </p>
                <p>
                  <strong>Tên khách hàng:</strong> {refundOrder?.items?.[0]?.customer_name}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {refundOrder?.items?.[0]?.phone_number}
                </p>
                <div>
                  <strong>Hình ảnh QR ngân hàng:</strong>
                  <div>
                    {refundOrder?.items?.[0]?.images.map((image: string, index: number) => (
                      <img key={index} src={image} alt='Sản phẩm hoàn trả' style={{ width: '100px', margin: '5px' }} />
                    ))}
                  </div>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      )}
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
          dataSource={order?.order_details?.products.map((product: any) => ({
            ...product,
            name: product?.sku_id?.name,
            thumbnail: product?.sku_id?.image[0],
            total: product?.price * product?.quantity
          }))}
          rowKey={(record) => record?.sku_id?._id}
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
                {order?.order_details?.products
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
            {order?.order_details?.installation_fee > 0 && (
              <div className='flex justify-between'>
                <span>Chi Phí lắp đặt tại nhà</span>
                <span>{order?.order_details?.installation_fee.toLocaleString()}₫</span>
              </div>
            )}

            {/* Hiển thị mã giảm giá nếu có */}
            {order?.order_details?.total > 0 && (
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
          <p>
            <strong>
              Trạng thái thanh toán: {order.payment_status === 'Unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán'}
            </strong>
          </p>
        </div>
      </Card>

      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
        <Button type='primary' className='w-full sm:w-auto'>
          Liên hệ hỗ trợ
        </Button>

        <Button
          className='bg-red-400 text-white w-full sm:w-auto'
          onClick={cancelOrder} // Khi nhấn Hủy đơn hàng
          disabled={order.status !== 'Processing' && order.status !== 'Pending'}
        >
          Hủy đơn hàng
        </Button>

        <Button
          className='bg-blue-500 text-white w-full sm:w-auto'
          onClick={confirmOrder} // Khi nhấn Xác nhận đơn hàng
          disabled={order.status !== 'Delivered' || currentStatus === 'Returning'}
        >
          Xác nhận đơn hàng
        </Button>

        <ReturnOrderButton order={order} currentStatus={currentStatus} />

        <RefundOrderButton order={order} currentStatus={currentStatus} />

        <Link to='/'>
          <Button className='bg-green-600 text-white w-full sm:w-auto'>Tiếp tục mua hàng</Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderDetail
