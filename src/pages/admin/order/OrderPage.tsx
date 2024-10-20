/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, DatePicker, Form, Input, Modal, Space, Table } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
interface Values {
  title?: string
  description?: string
  modifier?: string
}
const { Search } = Input

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
    key: 'customer'
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total'
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <Link to='#'>
          {' '}
          <EditOutlined />
        </Link>
        <Link to='#'>
          {' '}
          <EyeOutlined />
        </Link>
        <Link to='#'>
          {' '}
          <DeleteOutlined />
        </Link>
      </Space>
    )
  }
]

// const menu = {
//   children: (
//     <>
//       <Menu.Item key='1'>Option 1</Menu.Item>
//       <Menu.Item key='2'>Option 2</Menu.Item>
//       <Menu.Item key='3'>Option 3</Menu.Item>
//     </>
//   )
// }

const AdminOrderPage = () => {
  const [form] = Form.useForm()
  const [, setFormValues] = useState<Values>()
  const [open, setOpen] = useState(false)

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values)
    setFormValues(values)
    setOpen(false)
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await instance.get(`/orders`)
      } catch (error) {
        throw new Error('Call api that bai')
      }
    }
  })

  // Chuyển đổi dữ liệu từ API thành định dạng mà dataSource cần
  const dataSource =
    data?.data?.res?.data.map((order: any, index: number) => ({
      key: index + 1,
      orderId: order.invoiceId,
      product: `${order.products.length} Product` || 'N/A',
      variants: `${order.products.length} variants`, // Số lượng biến thể
      date: new Date(order.createdAt).toLocaleDateString(), // Định dạng ngày
      customer: order.customerName,
      total: `${order.billTotals} VNĐ`,
      payment: order.paymentMethod,
      status: (
        <Button
          type={order.status === 'Pending' ? 'default' : order.status === 'Completed' ? 'primary' : 'dashed'}
          style={{
            borderColor:
              order.status === 'Pending'
                ? 'orange' // Màu viền cho Pending
                : order.status === 'Completed'
                  ? 'green' // Màu viền cho Completed
                  : order.status === 'Delivered'
                    ? 'red' // Màu viền cho Delivered
                    : 'inherit', // Mặc định
            color:
              order.status === 'Pending'
                ? 'black' // Màu chữ cho Pending
                : order.status === 'Completed'
                  ? 'green' // Màu chữ cho Completed
                  : order.status === 'Delivered'
                    ? 'white' // Màu chữ cho Delivered
                    : 'inherit', // Mặc định
            backgroundColor:
              order.status === 'Pending'
                ? 'yellow' // Màu nền cho Pending
                : order.status === 'Completed'
                  ? 'lightgreen' // Màu nền cho Completed
                  : order.status === 'Delivered'
                    ? 'lightcoral' // Màu nền cho Delivered
                    : 'inherit' // Mặc định
          }}
        >
          {order.status}
        </Button>
      )
    })) || []

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div className='mt-10'>
      <div className='flex items-center ml-6'>
        <Search placeholder='Search order...' />
        <Button type='default' icon={<DownloadOutlined />} className='ml-2'>
          Export
        </Button>
        <Button onClick={() => setOpen(true)} type='primary' icon={<PlusOutlined />} className='ml-2'>
          Add Order
        </Button>
      </div>
      <div className='p-6 bg-white-100 rounded-lg '>
        <div className='flex justify-end items-center mb-4'>
          <div className='mr-auto'>
            <Button type='dashed'>All Orders</Button>
          </div>
          <DatePicker placeholder='Select Date' className='mr-2' />
        </div>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
      </div>

      {/* add order */}
      <Modal
        open={open}
        title='Create New Order'
        okText='Create order'
        cancelText='Cancel'
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <Form
          layout='vertical'
          form={form}
          name='form_in_modal'
          initialValues={{ modifier: 'public' }}
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          {/* Thêm các trường trong form ở đây */}
        </Form>
      </Modal>
    </div>
  )
}

export default AdminOrderPage
