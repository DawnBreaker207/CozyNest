import {
  ClockCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Button, DatePicker, Dropdown, Form, Input, Menu, Modal, Select, Space, Switch, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Option } from 'antd/es/mentions'
import { useState } from 'react'
import { Link } from 'react-router-dom'
interface Values {
  title?: string
  description?: string
  modifier?: string
}
const { Search } = Input

const dataSource = [
  {
    key: '1',
    orderId: '302012',
    product: 'Handmade Pouch',
    variants: '3 variants',
    date: '29 Dec 2022',
    customer: 'John Bushmill',
    total: '$121.00',
    payment: 'Mastercard',
    status: (
      <Button type='dashed' danger>
        Cancelled
      </Button>
    )
  },
  {
    key: '2',
    orderId: '302011',
    product: 'Smartwatch E2',
    variants: '2 variants',
    date: '24 Dec 2022',
    customer: 'Linda Blair',
    total: '$590.00',
    payment: 'Visa',
    status: (
      <Button type='default' style={{ borderColor: 'yellow', color: 'yellow' }}>
        Processing
      </Button>
    )
  },
  {
    key: '3',
    orderId: '302002',
    product: 'Smartwatch E1',
    variants: '3 variants',
    date: '12 Dec 2022',
    customer: 'M Karim',
    total: '$125.00',
    payment: 'Mastercard',
    status: (
      <Button type='primary' ghost>
        Delivered
      </Button>
    )
  },
  {
    key: '4',
    orderId: '302002',
    product: 'Smartwatch E1',
    variants: '3 variants',
    date: '12 Dec 2022',
    customer: 'M Karim',
    total: '$125.00',
    payment: 'Mastercard',
    status: (
      <Button type='dashed' danger>
        Cancelled
      </Button>
    )
  },
  {
    key: '5',
    orderId: '302002',
    product: 'Smartwatch E1',
    variants: '3 variants',
    date: '12 Dec 2022',
    customer: 'M Karim',
    total: '$125.00',
    payment: 'Mastercard',
    status: (
      <Button type='dashed' danger>
        Cancelled
      </Button>
    )
  },
  {
    key: '6',
    orderId: '302002',
    product: 'Smartwatch E1',
    variants: '3 variants',
    date: '12 Dec 2022',
    customer: 'M Karim',
    total: '$125.00',
    payment: 'Mastercard',
    status: (
      <Button type='default' style={{ borderColor: 'yellow', color: 'yellow' }}>
        Processing
      </Button>
    )
  },
  {
    key: '7',
    orderId: '302002',
    product: 'Smartwatch E1',
    variants: '3 variants',
    date: '12 Dec 2022',
    customer: 'M Karim',
    total: '$125.00',
    payment: 'Mastercard',
    status: (
      <Button type='primary' ghost>
        Processing
      </Button>
    )
  }
]
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

const menu = (
  <Menu>
    <Menu.Item key='1'>Option 1</Menu.Item>
    <Menu.Item key='2'>Option 2</Menu.Item>
  </Menu>
)

const OrderPage = () => {
  const [form] = Form.useForm()
  const [, setFormValues] = useState<Values>()
  const [open, setOpen] = useState(false)

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values)
    setFormValues(values)
    setOpen(false)
  }
  return (
    <>
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
          <Dropdown overlay={menu}>
            <Button>
              Filters <DownOutlined />
            </Button>
          </Dropdown>
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
          <Form.Item>
            <label className='text-sm mr-64'>Order Detail</label>
            New customer <Switch />
          </Form.Item>
          <Form.Item>
            <Select className='text-sm mr-64' placeholder='Select customer'>
              <Option value='jack'>Jack</Option>
              <Option value='mtp'>mtp</Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Select className='text-sm mr-64' placeholder='Payment Type'>
                <Option value='jack'>Jack</Option>
                <Option value='mtp'>mtp</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='month'
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
            >
              <Select className='text-sm mr-64' placeholder='Order Type'>
                <Option value='jack'>Jack</Option>
                <Option value='mtp'>mtp</Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item label='Order time & date' style={{ marginBottom: 0 }}>
            <Form.Item rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(30% - 8px)' }}>
              <DatePicker placeholder='Select Date' />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(70% - 8px)', margin: '0 8px' }}
            >
              <ClockCircleOutlined /> 12:00 PM
            </Form.Item>
          </Form.Item>
          <Form.Item label='Order Status'>
            <Select className='text-sm mr-64' placeholder='Pending'>
              <Option value='jack'>Jack</Option>
              <Option value='mtp'>mtp</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <TextArea rows={4} placeholder='Order Note' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default OrderPage
