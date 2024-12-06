/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useLocalStorage } from '@/hooks/useStorage'
import { EyeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, DatePicker, Space, Table, Tag } from 'antd'
import Search from 'antd/es/transfer/search'
import { Link } from 'react-router-dom'

const AdminOrderPage = () => {
  const [user] = useLocalStorage('user', {})
  const token = user?.data?.accessToken

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await instance.get('/orders', {
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
    data?.data?.res?.items.map((order: any, index: number) => ({
      key: index + 1,
      orderId: order._id || order.invoiceId, // Make sure you're using the correct field for the order ID
      product: `${order.products.length} Product` || 'N/A',
      date: new Date(order.createdAt).toLocaleDateString(),
      customer: order.customer_name,
      total: `${order.total_amount.toLocaleString()} VNĐ`,
      payment: order.payment_method[0].orderInfo,
      status: order.status
    })) || []

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer_name'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total_amount'
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment'
    },
    {
      title: 'Status',
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
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render: (_: any, record: any) => (
        <Space size='middle'>
          {/* <Link to='#'>
            <Button icon={<EditOutlined />} />
          </Link> */}
          <Link to={`/admin/orderDetail/${record.orderId}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
          {/* <Link to='#'>
            <DeleteOutlined />
          </Link> */}
        </Space>
      )
    }
  ]

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div className='container mx-auto mt-10 px-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Admin Orders</h1>
        <div className='flex items-center'>
          <Search placeholder='Search order...' />
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white p-4 rounded shadow mb-4'>
        <div className='flex justify-between items-center'>
          <Button type='dashed'>All Orders</Button>
          <DatePicker placeholder='Select Date' />
        </div>
      </div>

      {/* Table */}
      <div className='bg-white p-6 rounded shadow'>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
      </div>
    </div>
  )
}

export default AdminOrderPage
