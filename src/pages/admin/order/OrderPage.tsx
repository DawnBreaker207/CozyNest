import instance from '@/configs/axios'
import { useLocalStorage } from '@/hooks/useStorage'
import { ProductItem } from '@/types/productItem'
import { DeleteOutlined, DownloadOutlined, EditOutlined, ExclamationCircleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, DatePicker, Form, Input, Modal, Select, Space, Table, Tag } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Values {
  title?: string
  description?: string
  modifier?: string
}

const { Search } = Input

interface Order {
  _id: string
  customer_name: string
  total_amount: number
  payment_method: string
  date: string
  status: 'Processing' | 'Pending' | 'Confirmed' | 'Pending-Ship' | 'Delivering' | 'Delivered' | 'Canceled' | 'Completed' | 'Returned' | 'Refunded'
  products: ProductItem[]
}

const AdminOrderPage = () => {
  const [form] = Form.useForm()
  const [, setFormValues] = useState<Values>()
  const [open, setOpen] = useState(false)
  const [user] = useLocalStorage('user', {})
  const token = user?.data?.accessToken

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values)
    setFormValues(values)
    setOpen(false)
  }

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

  const updateOrderStatus = async (id: string, newStatus: Order['status']) => {
    try {
      await instance.put(`/orders/updateStatus/${id}`, { status: newStatus })
      console.log(`Order ${id} updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    console.log('Order ID:', orderId); // Debugging log
    Modal.confirm({
      title: 'Are you sure you want to change the status?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => updateOrderStatus(orderId, newStatus),
    })
  }

  const dataSource = data?.data?.res?.items.map((order: any, index: number) => ({
    key: index + 1,
    orderId: order._id || order.invoiceId, // Make sure you're using the correct field for the order ID
    product: `${order.products.length} Product` || 'N/A',
    date: new Date(order.createdAt).toLocaleDateString(),
    customer: order.customerName,
    total: `${order.billTotals} VNĐ`,
    payment: order.paymentMethod,
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
        key: 'status',
        render: (status: Order['status'], record: any) => (
          <Select
            defaultValue={status}
            onChange={(newStatus) => handleStatusChange(record.orderId, newStatus as Order['status'])}
            className="w-full"
          >
            <Select.Option value="Processing">
              <Tag color="blue">Processing</Tag>
            </Select.Option>
            <Select.Option value="Pending">
              <Tag color="yellow">Pending</Tag>
            </Select.Option>
            <Select.Option value="Confirmed">
              <Tag color="yellow">Confirmed</Tag>
            </Select.Option>
            <Select.Option value="Pending-Ship">
              <Tag color="orange">Pending-Ship</Tag>
            </Select.Option>
            <Select.Option value="Delivering">
              <Tag color="orange">Delivering</Tag>
            </Select.Option>
            <Select.Option value="Delivered">
              <Tag color="green">Delivered</Tag>
            </Select.Option>
            <Select.Option value="Canceled">
              <Tag color="red">Canceled</Tag>
            </Select.Option>
          </Select>
        )
      },
      {
        title: 'Action',
        key: 'action',
        render: () => (
          <Space size="middle">
            <Link to="#">
              <EditOutlined />
            </Link>
            <Link to="#">
              <EyeOutlined />
            </Link>
            <Link to="#">
              <DeleteOutlined />
            </Link>
          </Space>
        )
      }
    ]
    

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <div className="mt-10">
      <div className="flex items-center ml-6">
        <Search placeholder="Search order..." />
        {/* <Button type="default" icon={<DownloadOutlined />} className="ml-2">
          Export
        </Button> */}
        <Button onClick={() => setOpen(true)} type="primary" icon={<PlusOutlined />} className="ml-2">
          Add Order
        </Button>
      </div>
      <div className="p-6 bg-white-100 rounded-lg ">
        <div className="flex justify-end items-center mb-4">
          <div className="mr-auto">
            <Button type="dashed">All Orders</Button>
          </div>
          {/* <DatePicker placeholder="Select Date" className="mr-2" /> */}
        </div>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
      </div>

      {/* add order */}
      <Modal
        open={open}
        title="Create New Order"
        okText="Create order"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
          clearOnDestroy
          onFinish={(values) => onCreate(values)}
        >
          <Form.Item
            label="Customer Name"
            name="customer_name"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Amount"
            name="total_amount"
            rules={[{ required: true, message: 'Please input total amount!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Payment Method"
            name="payment_method"
            rules={[{ required: true, message: 'Please input payment method!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Processing">Processing</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminOrderPage
