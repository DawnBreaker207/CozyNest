import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { ResAPI } from '@/types/responseApi'
import { useQuery } from '@tanstack/react-query'
import { Empty, message, Spin, Table, Tag } from 'antd'
import { useEffect, useMemo, useState } from 'react'

interface Order {
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
  const sortedOrders = orders?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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
        render: (
          status:
            | 'Processing'
            | 'Pending'
            | 'Confirmed'
            | 'Pending-Ship'
            | 'Delivering'
            | 'Delivered'
            | 'Canceled'
            | 'Completed'
            | 'Returned'
            | 'Refunded'
        ) => {
          // Ánh xạ trạng thái với màu tương ứng
          const statusColors: { [key in typeof status]: string } = {
            Processing: 'blue',
            Pending: 'yellow',
            Confirmed: 'gold',
            'Pending-Ship': 'orange',
            Delivering: 'orange',
            Delivered: 'green',
            Canceled: 'red',
            Completed: 'cyan',
            Returned: 'magenta',
            Refunded: 'purple'
          }
          return <Tag color={statusColors[status] || 'gray'}>{status.replace('-', ' ')}</Tag>
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
