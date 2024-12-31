/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { Empty, message, Table, Tag } from 'antd'
import { useMemo } from 'react'

export interface Order {
  _id: string
  customer_name: string
  total_amount: number
  email: string
  status: string
  user_id: string
  createdAt: string
  order_details: OrderDetailType[]
}
interface OrderDetailType {
  product_id: string
  name: string
  quantity: number
}
const RecentOrder = () => {
  const [, contextHolder] = message.useMessage()
  const getAllOrder = async () => {
    const { data } = await instance.get('/orders')
    if (!Array.isArray(data.res.items)) {
      throw new Error('Invalid data format: `items` is not an array')
    }
    return data.data.res.items
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      return await getAllOrder()
    }
  })
  const orders = data?.data?.res?.items
  const sortedOrders = orders?.sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  const statuses = [
    { label: 'Đang xử lý', value: 'Processing' },
    { label: 'Chờ xác nhận', value: 'Pending' },
    { label: 'Đã xác nhận', value: 'Confirmed' },
    { label: 'Đang chờ bên vận chuyển', value: 'Pending-Ship' },
    { label: 'Đang vận chuyển', value: 'Delivering' },
    { label: 'Giao hàng thành công', value: 'Delivered' },
    { label: 'Đơn hàng hoàn thành', value: 'Completed' },
    { label: 'Tiến hành hoàn trả', value: 'Returning' },
    { label: 'Từ chối hoàn trả', value: 'Rejected' },
    { label: 'Hoàn trả đơn hàng', value: 'Returned' },
    { label: 'Tiến hành hoàn tiền', value: 'Refunding' },
    { label: 'Hoàn tiền đơn hàng', value: 'Refunded' },
    { label: 'Đã hủy đơn hàng', value: 'Cancelled' }
  ]
  //* Lấy 5 đơn hàng gần nhất
  const latestOrders = sortedOrders?.slice(0, 5)
  const columns = useMemo(
    () => [
      {
        title: 'Mã đơn hàng',
        dataIndex: '_id',
        key: '_id'
      },
      {
        title: 'Thời gian đặt hàng',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => new Date(text).toLocaleString()
      },
      {
        title: 'Người đặt hàng',
        dataIndex: 'customer_name',
        key: 'customer_name'
      },
      {
        title: 'Trạng Thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => {
          const statusColors: { [key in typeof status]: string } = {
            Processing: 'blue',
            Pending: 'yellow',
            Confirmed: 'gold',
            'Pending-Ship': 'orange',
            Delivering: 'orange',
            Delivered: 'green',
            Cancelled: 'red',
            Completed: 'cyan',
            Returning: 'orange',
            Rejected: 'red',
            Returned: 'red',
            Refunding: 'orange',
            Refunded: 'purple'
          }

          // Tìm trạng thái trong mảng statuses và lấy label tiếng Việt
          const statusLabel = statuses.find((s) => s.value === status)?.label || status

          return <Tag color={statusColors[status] || 'gray'}>{statusLabel}</Tag>
        }
      }
    ],
    []
  )

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <CustomLoadingPage />
      ) : isError ? (
        <Empty description='Không thể tải dữ liệu' className='mt-10' />
      ) : latestOrders.length === 0 ? (
        <Empty description='Không có đơn hàng nào gần đây' className='mt-10' />
      ) : (
        <div className='flex flex-col'>
          <h2 className='text-2xl font-semibold mb-5 text-center'>Đơn hàng gần đây</h2>

          <Table
            columns={columns}
            dataSource={latestOrders}
            rowKey='_id'
            pagination={false} // Tắt phân trang
          />
        </div>
      )}
    </>
  )
}

export default RecentOrder
