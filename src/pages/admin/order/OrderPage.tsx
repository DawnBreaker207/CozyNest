/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useCookie } from '@/hooks/useStorage'
import { EyeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Select, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const AdminOrderPage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const initialStatusFilter = searchParams.get('status') || ''
  const [user] = useCookie('user', {})
  const token = user?.data?.accessToken
  const [statusFilter, setStatusFilter] = useState<string | undefined>(initialStatusFilter) // Lưu trạng thái lọc
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
  const dataSource =
    data?.data?.res?.items
      .map((order: any, index: number) => ({
        key: index + 1,
        orderId: order._id || order.invoiceId,
        product: `${order?.products[0]?.products?.length}`,
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
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error.message}</div>

  return (
    <>
      <div className='container mx-auto  px-6'>
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-2xl font-bold'>Danh sách đơn hàng</h1>
        </div>

        {/* Filters */}
        <div className='mb-4'>
          <div className='flex justify-between items-center'>
            {/* <DatePicker placeholder='Chọn ngày' value={dateFilter} onChange={setDateFilter} format='DD/MM/YYYY' /> */}
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              placeholder='Chọn trạng thái'
              style={{ width: 200 }}
            >
              <Select.Option value=''>Tất cả trạng thái</Select.Option>
              <Select.Option value='Processing'>Đang xử lý</Select.Option>
              <Select.Option value='Pending'>Chờ xác nhận</Select.Option>
              <Select.Option value='Confirmed'>Đã xác nhận</Select.Option>
              <Select.Option value='Pending-Ship'>Đang chờ bên vận chuyển</Select.Option>
              <Select.Option value='Delivering'>Đang vận chuyển</Select.Option>
              <Select.Option value='Delivered'>Giao hàng thành công</Select.Option>
              <Select.Option value='Completed'>Đơn hàng hoàn thành</Select.Option>
              <Select.Option value='Cancelled'>Đã hủy đơn hàng</Select.Option>
              <Select.Option value='Returned'>Hoàn trả đơn hàng</Select.Option>
              <Select.Option value='Returning'>Tiến hành hoàn trả đơn hàng</Select.Option>
              <Select.Option value='Rejected'>Từ chối hoàn trả</Select.Option>
              <Select.Option value='Refunding'>Tiến hành Hoàn tiền đơn hàng</Select.Option>
              <Select.Option value='Refunded'>Hoàn tiền đơn hàng</Select.Option>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className='bg-white p-6 rounded shadow'>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  )
}

export default AdminOrderPage
