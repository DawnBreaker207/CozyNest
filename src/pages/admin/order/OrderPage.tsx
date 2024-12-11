/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useCookie } from '@/hooks/useStorage'
import { EyeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Select, Space, Spin, Table, Tag } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminOrderPage = () => {
  const [user] = useCookie('user', {})
  const token = user?.data?.accessToken
  const [statusFilter, setStatusFilter] = useState<string | undefined>('') // Lưu trạng thái lọc
  const [dateFilter, setDateFilter] = useState<any | undefined>(null) // Lưu ngày lọc

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await instance.get('/orders?_sort=createdAt', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        throw new Error('Call API thất bại')
      }
    }
  })

  const dataSource =
    data?.data?.res?.items
      .map((order: any, index: number) => ({
        key: index + 1,
        orderId: order._id || order.invoiceId,
        product: `${order.products.length} Product` || 'N/A',
        date: new Date(order.createdAt).toLocaleDateString(), // Định dạng lại ngày
        customer: order.customer_name,
        total: `${order.total_amount.toLocaleString()} VNĐ`,
        payment: order.payment_method[0].orderInfo,
        status: order.status
      }))
      .filter((order: any) => {
        // Lọc theo trạng thái nếu có filter
        const isStatusMatch = statusFilter ? order.status === statusFilter : true

        const isDateMatch = dateFilter
          ? new Date(order.date).toLocaleDateString() === dateFilter.format('DD/MM/YYYY')
          : true
        console.log(isStatusMatch)
        console.log(isDateMatch)

        return isStatusMatch && isDateMatch
      }) || []

  const columns = [
    {
      title: 'Mã Đơn Hàng',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Số Lượng Sản Phẩm',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Thời Gian Đặt Hàng',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Người Đặt Hàng',
      dataIndex: 'customer',
      key: 'customer_name'
    },
    {
      title: 'Tổng Đơn Hàng',
      dataIndex: 'total',
      key: 'total_amount'
    },
    {
      title: 'Phương Thức Thanh Toán',
      dataIndex: 'payment',
      key: 'payment'
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
          Canceled: 'red',
          Completed: 'cyan',
          Returned: 'magenta',
          Refunded: 'purple'
        }
        return <Tag color={statusColors[status] || 'gray'}>{status.replace('-', ' ')}</Tag>
      }
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link to={`/admin/orderDetail/${record.orderId}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
        </Space>
      )
    }
  ]

  if (isLoading)
    return (
      <div>
        <Spin size='large' />
      </div>
    )
  if (isError) return <div>{error.message}</div>

  return (
    <div className='container mx-auto  px-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Danh Sách Đơn Hàng</h1>
      </div>

      {/* Filters */}
      <div className='bg-white p-4 rounded shadow mb-4'>
        <div className='flex justify-between items-center'>
          <Button
            type='dashed'
            onClick={() => {
              setStatusFilter('')
              setDateFilter(null)
            }}
          >
            Tất cả đơn hàng
          </Button>
          {/* <DatePicker placeholder='Chọn ngày' value={dateFilter} onChange={setDateFilter} format='DD/MM/YYYY' /> */}
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            placeholder='Chọn trạng thái'
            style={{ width: 200 }}
          >
            <Select.Option value=''>Tất cả trạng thái</Select.Option>
            <Select.Option value='Processing'>Processing</Select.Option>
            <Select.Option value='Pending'>Pending</Select.Option>
            <Select.Option value='Confirmed'>Confirmed</Select.Option>
            <Select.Option value='Pending-Ship'>Pending-Ship</Select.Option>
            <Select.Option value='Delivering'>Delivering</Select.Option>
            <Select.Option value='Delivered'>Delivered</Select.Option>
            <Select.Option value='Canceled'>Canceled</Select.Option>
            <Select.Option value='Completed'>Completed</Select.Option>
            <Select.Option value='Returned'>Returned</Select.Option>
            <Select.Option value='Refunded'>Refunded</Select.Option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white p-6 rounded shadow'>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} />
      </div>
    </div>
  )
}

export default AdminOrderPage
