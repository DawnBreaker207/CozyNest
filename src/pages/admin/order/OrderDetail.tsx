/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useCookie } from '@/hooks/useStorage'
import { BackwardOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Col, Modal, Row, Spin, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HeaderAdmin from '../header/page'

const AdminOrderDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [currentStatus, setCurrentStatus] = useState<string>('Processing')
  const queryClient = useQueryClient()
  const [user] = useCookie('user', {})
  const username = user?.username
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
    { label: 'Đã hủy đơn hàng', value: 'cancelled' }
  ]
  // Khi dữ liệu đơn hàng đã được lấy xong, cập nhật lại trạng thái
  useEffect(() => {
    if (data?.res) {
      if (data.res.status) {
        setCurrentStatus(data.res.status)
      }

      // Lấy tên người xác nhận từ cookie

      // Cập nhật lịch sử trạng thái nếu có thông tin thời gian
      const history = []
      if (data.res.updatedAt) {
        history.push({
          label: statuses.find((s) => s.value === data.res.status)?.label,
          time: new Date(data.res.updatedAt).toLocaleString(), // Hiển thị thời gian đúng định dạng
          confirmedBy: username // Thêm tên người xác nhận
        })
      }
    }
  }, [data])

  // Mutation để cập nhật trạng thái
  // API hủy đơn hàng
  const cancelOrder = async (id: string) => {
    try {
      // Gọi API hủy đơn hàng
      const response = await instance.patch(`/orders/cancel/${id}`)

      if (response.data.res) {
        console.log('Hủy đơn hàng thành công', response.data.res)
        setCurrentStatus('cancelled') // Cập nhật trạng thái là "Canceled"
        queryClient.invalidateQueries({
          queryKey: ['orderDetail', id]
        })
      }
    } catch (error) {
      console.error('Có lỗi khi hủy đơn hàng:', error)
    }
  }
  const updateOrderStatus = async (id: string, newStatus: string) => {
    try {
      // Cập nhật trạng thái đơn hàng trên server
      await instance.put(`/orders/updateStatusOrder/${id}`, { status: newStatus })

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
      title: 'Bạn có chắc chắn muốn cập nhật trạng thái? Sau khi cập nhật không thể hoàn tác.',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        // Kiểm tra nếu trạng thái là "Hủy đơn hàng", gọi API hủy đơn hàng
        if (newStatus === 'cancelled') {
          cancelOrder(orderId) // Gọi hàm hủy đơn hàng
        } else {
          updateOrderStatus(orderId, newStatus) // Cập nhật trạng thái cho các trạng thái khác
        }
      }
    })
  }
  if (isLoading)
    return (
      <div>
        <Spin size='large' />
      </div>
    )
  if (isError) return <div>Lỗi khi tải chi tiết đơn hàng</div>
  console.log(data)
  const order = data?.res

  // Danh sách các trạng thái
  return (
    <>
    <HeaderAdmin/>
     <div className='container mx-auto px-6 mt-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold mb-6'>Chi tiết đơn hàng</h1>
        <div className='flex items-center space-x-2'>
          <Button>
            <BackwardOutlined />
            <Link to={`/admin/order`}>Quay lại</Link>
          </Button>
        </div>
      </div>

      {/* Lịch sử trạng thái */}
      <div className='mb-6'>
        <h3 className='font-semibold'>Lịch sử trạng thái đơn hàng</h3>
        <div className='mt-4 flex space-x-4'>
          {order.status_detail.length > 0 &&
            order.status_detail.map((item: any, index: number) => (
              <div key={index} className='detail'>
                <p>Trạng thái: {item.status}</p>
                <p>Thời gian: {new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
        </div>

        <div className='flex flex-wrap gap-4 mt-10'>
          {statuses.map((status, index) => {
            const isProcessing = currentStatus === 'Processing'
            const isPending = currentStatus === 'Pending'

            const currentIndex = statuses.findIndex((s) => s.value === currentStatus)
            const targetIndex = statuses.findIndex((s) => s.value === status.value)

            let isDisabled = true

            // Kiểm tra nếu trạng thái hiện tại là "Canceled", vô hiệu hóa tất cả các nút
            if (currentStatus === 'cancelled') {
              isDisabled = true
            } else {
              if (status.value === 'cancelled') {
                // "Hủy đơn hàng" chỉ được phép khi đang xử lý hoặc đang chờ
                isDisabled = !(isProcessing || isPending)
              } else if (status.value === 'Returned' || status.value === 'Refunded') {
                // "Hoàn trả đơn hàng" và "Hoàn tiền" luôn bị vô hiệu hóa
                isDisabled = true
              } else {
                // Các trạng thái khác: chỉ cho phép chuyển liền kề
                isDisabled =
                  targetIndex !== currentIndex + 1 && // Chỉ cho phép trạng thái kế tiếp
                  !(targetIndex === currentIndex - 1 && isProcessing) // Hoặc quay lại nếu đang xử lý
              }
            }

            // Luôn vô hiệu hóa trạng thái hiện tại (currentStatus)
            if (status.value === currentStatus.trim()) {
              isDisabled = true
            }

            const btnType = 'default'

            return (
              <Button
                key={index}
                onClick={() => {
                  if (id && !isDisabled) {
                    // Nếu trạng thái là "Hủy đơn hàng", gọi API cancelOrder
                    if (status.value === 'cancelled') {
                      handleStatusChange(id, status.value) // Sử dụng confirm trước khi hủy
                    } else {
                      handleStatusChange(id, status.value) // Gửi yêu cầu thay đổi trạng thái cho các trạng thái khác
                    }
                  }
                }}
                className={`px-4 py-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}
      ${status.value === currentStatus ? 'border border-blue-500 bg-blue-500 text-white' : ''} flex-shrink-0`}
                type={btnType}
              >
                {status.label} {/* Hiển thị tên trạng thái */}
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
              <strong>Địa chỉ giao hàng</strong>: {order.address || 'Không có'}
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
          dataSource={Array.isArray(order?.order_details?.products) ? order.order_details.products : []} // Đảm bảo là mảng
          pagination={false}
          rowKey={(record: any) => record._id}
          columns={[
            {
              title: 'Ảnh sản phẩm',
              dataIndex: 'sku_id',
              key: 'image',
              render: (sku) => {
                // Lấy ảnh đầu tiên trong mảng image của sku_id
                const imageUrl = sku?.image?.[0] || 'https://picsum.photos/seed/picsum/200/300' // Ảnh mặc định nếu không có
                return (
                  <img
                    src={imageUrl}
                    alt={sku?.name || 'Product Image'}
                    style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 4 }}
                  />
                )
              }
            },
            {
              title: 'Tên sản phẩm',
              dataIndex: 'sku_id',
              key: 'name',
              render: (sku) => sku?.name || 'N/A' // Truy xuất tên sản phẩm từ sku_id
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
              // Tính tổng giá sản phẩm từ `products`
              totalProductPrice:
                order?.order_details?.products?.reduce(
                  (acc: number, product: { price: number; quantity: number }) => acc + product.price * product.quantity,
                  0
                ) || 0,
              shippingFee: order?.shipping_fee || 50000, // Lấy phí vận chuyển từ order
              installationFee: order?.order_details?.installation_fee || 0, // Lấy phí lắp đặt
              totalAmount: order?.total_amount || 0, // Tổng thanh toán
              couponValue: order?.order_details?.total || 0
            }
          ]}
          columns={[
            {
              title: 'Tổng giá sản phẩm',
              dataIndex: 'totalProductPrice',
              key: 'totalProductPrice',
              render: (value) => `${value.toLocaleString()} VNĐ`
            },
            {
              title: 'Phí vận chuyển',
              dataIndex: 'shippingFee',
              key: 'shippingFee',
              render: (value) => `${value.toLocaleString()} VNĐ`
            },
            {
              title: 'Phí lắp đặt',
              dataIndex: 'installationFee',
              key: 'installationFee',
              render: (value) => `${value.toLocaleString()} VNĐ`
            },
            {
              title: 'Giảm Giá',
              dataIndex: 'couponValue',
              key: 'couponValue',
              render: (value) => `${value.toLocaleString()} VNĐ`
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
      <div className='border-t mt-4 pt-4'>
        <div className='flex flex-col mt-4 font-bold text-base'>
          {/* Tiêu đề "Thông tin thanh toán" */}
          <div className='text-xl font-semibold mb-4'>Thông tin thanh toán</div>

          {/* Hiển thị thông tin phương thức thanh toán */}
          <div className='flex space-x-3 mb-2'>
            <span>Phương thức thanh toán:</span>
            <span>{order?.payment_method[0]?.orderInfo}</span>
          </div>

          {/* Hiển thị trạng thái thanh toán, kiểm tra để hiển thị "Chưa thanh toán" hoặc "Đã thanh toán" */}
          <div className='flex space-x-3'>
            <span>Trạng thái thanh toán:</span>
            <span>{order?.payment_status === 'Unpaid' ? 'Chưa thanh toán' : 'Đã thanh toán'}</span>
          </div>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default AdminOrderDetail
