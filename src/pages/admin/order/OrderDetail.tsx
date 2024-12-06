/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, Modal, Row, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [currentStatus, setCurrentStatus] = useState<string>('Processing')

  const queryClient = useQueryClient()

  // Lấy chi tiết đơn hàng
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orderDetail', id],
    queryFn: async () => {
      const response = await instance.get(`/orders/${id}`)
      return response.data
    }
  })

  // Trạng thái hiện tại
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
  // Khi dữ liệu đơn hàng đã được lấy xong, cập nhật lại trạng thái
  useEffect(() => {
    if (data?.res) {
      if (data.res.status) {
        setCurrentStatus(data.res.status)
      }
    }
  }, [data])

  // Mutation để cập nhật trạng thái
  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      // Cập nhật trạng thái đơn hàng trên server
      await instance.put(`/orders/updateStatusOrder/${id}`, { status: newStatus })
      console.log(`Order ${id} updated to ${newStatus}`)

      // Cập nhật lại trạng thái trong state
      setCurrentStatus(newStatus)

      // Invalidate query để lấy lại dữ liệu mới nhất
      queryClient.invalidateQueries({
        queryKey: ['orderDetail', id]
      })
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log('Order ID:', orderId) // Debugging log

    Modal.confirm({
      title: 'Are you sure you want to change the status?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => updateOrderStatus(orderId, newStatus)
    })
  }

  if (isLoading) return <div>Đang tải...</div>
  if (isError) return <div>Lỗi khi tải chi tiết đơn hàng</div>

  const order = data?.res

  // Danh sách các trạng thái

  return (
    <div className='container mx-auto mt-10 px-6'>
      <h1 className='text-2xl font-bold mb-6'>Chi tiết đơn hàng</h1>

      {/* Lịch sử trạng thái */}
      <div className='mb-6'>
        <h3 className='font-semibold'>Lịch sử trạng thái đơn hàng</h3>
        <div className='flex flex-wrap gap-4 mt-10'>
          {statuses.map((status, index) => {
            const isPastStatus =
              statuses.findIndex((s) => s.value === status.value) < statuses.findIndex((s) => s.value === currentStatus)
            const isDisabled = isPastStatus // Chỉ disable các trạng thái đã qua
            const btnType = status.value === currentStatus ? 'primary' : 'default'

            return (
              <Button
                key={index}
                onClick={() => {
                  if (id && !isDisabled) {
                    handleStatusChange(id, status.value)
                  }
                }}
                disabled={isDisabled}
                className={`px-4 py-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : ''} flex-shrink-0`}
                type={btnType}
              >
                {status.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Thông tin giao hàng */}
      <div className='bg-white p-6 rounded shadow mb-6'>
        <h3 className='font-semibold mb-4'>Thông tin giao hàng</h3>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <div className='p-3 border rounded'>
              <strong>Khách hàng</strong>: {order.customer_name || 'Không có'}
            </div>
            <div className='p-3 border rounded mt-2'>
              <strong>Địa chỉ giao hàng</strong>: {order.shipping_info || 'Không có'}
            </div>
            <div className='p-3 border rounded mt-2'>
              <strong>Số điện thoại</strong>: {order.phone_number}
            </div>
            <div className='p-3 border rounded mt-2'>
              <strong>Email</strong>: {order.email}
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='p-3 border rounded'>
              <strong>Mã đơn hàng</strong>: {order._id}
            </div>
            <div className='p-3 border rounded mt-2'>
              <strong>Phương thức giao hàng</strong>: {order.shipping_method}
            </div>
            <div className='p-3 border rounded mt-2'>
              <strong>Phương thức thanh toán</strong>: {order.payment_method[0]?.method || 'Không có'}
            </div>
            <div className='p-3 border rounded mt-2'>
              <strong>Trạng thái</strong>: <Tag color='blue'>{order.status}</Tag>
            </div>
          </Col>
        </Row>
      </div>

      {/* Thông tin sản phẩm */}
      <div className='bg-white p-6 rounded shadow mb-6'>
        <h3 className='font-semibold mb-4'>Thông tin sản phẩm</h3>
        <Table
          dataSource={order?.order_details || []}
          pagination={false}
          rowKey={(record: any) => record._id}
          columns={[
            {
              title: 'Ảnh sản phẩm',
              dataIndex: 'sku_id',
              key: 'image',
              render: (sku) => (
                <img
                  src={sku?.image || 'https://picsum.photos/seed/picsum/200/300'}
                  alt={sku?.name || 'Product Image'}
                  style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 4 }}
                />
              )
            },
            {
              title: 'Tên sản phẩm',
              dataIndex: 'sku_id',
              key: 'name',
              render: (sku) => sku?.name || 'N/A'
            },
            {
              title: 'Số lượng',
              dataIndex: 'quantity',
              key: 'quantity'
            },
            {
              title: 'Giá',
              dataIndex: 'price',
              key: 'price',
              render: (price) => `${price.toLocaleString()} VNĐ`
            },
            {
              title: 'Tổng Giá',
              key: 'total_money',
              render: (record) => {
                const total = record.price * record.quantity
                return `${total.toLocaleString()} VNĐ`
              }
            }
          ]}
        />
      </div>

      {/* Hóa đơn */}
      <div className='bg-white p-6 rounded shadow mb-6'>
        <h3 className='font-semibold mb-4'>Hóa đơn</h3>
        <Table
          dataSource={[
            {
              shippingFee: order.shipping_fee,
              couponCode: order.coupon_code || 'Không có',
              totalAmount: order.total_amount
            }
          ]}
          columns={[
            {
              title: 'Phí giao hàng',
              dataIndex: 'shippingFee',
              key: 'shippingFee',
              render: () => `50.000 VNĐ`
            },
            {
              title: 'Mã giảm giá',
              dataIndex: 'couponCode',
              key: 'couponCode'
            },
            {
              title: 'Tổng thanh toán',
              dataIndex: 'totalAmount',
              key: 'totalAmount',
              render: (value) => `${value.toLocaleString()} VNĐ`
            }
          ]}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default AdminOrderDetail
