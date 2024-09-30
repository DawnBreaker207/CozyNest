import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Checkbox, Image, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
interface ProductRecord {
  id: number
  productName: string
  variants: number
  sku: string
  category: string
  stock: number
  price: number
  status: string
  added: string
}
const columns = [
  {
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    render: (_: string, record: ProductRecord) => (
      <>
        <Space size='middle'>
          <Checkbox />
          <Image
            width={40}
            preview={{
              destroyOnClose: true,
              imageRender: () => (
                <video
                  muted
                  width='100%'
                  controls
                  src='https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ'
                />
              ),
              toolbarRender: () => null
            }}
            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          />
          <div>
            <div>{record.productName}</div>
            <div style={{ color: 'gray' }}>{record.variants} Variants</div>
          </div>
        </Space>
      </>
    )
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => `$${price.toFixed(2)}`
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Tag color={status === 'Low Stock' ? 'red' : 'green'}>{status}</Tag>
  },
  {
    title: 'Added',
    dataIndex: 'added',
    key: 'added'
  },
  {
    title: 'Action',
    key: 'action',
    render: (data: ProductRecord) => (
      <Space size='middle'>
        <Link to={`${data.id}/edit`}>
          <Button icon={<EditOutlined />} />
        </Link>
        <Button icon={<EyeOutlined />} />
        <Button icon={<DeleteOutlined />} />
      </Space>
    )
  }
]

const data: ProductRecord[] = [
  {
    id: 1,
    productName: 'Handmade Pouch',
    variants: 3,
    sku: '302012',
    category: 'Bag & Pouch',
    stock: 10,
    price: 121.0,
    status: 'Low Stock',
    added: '29 Dec 2022'
  },
  {
    id: 1,
    productName: 'Handmade Pouch',
    variants: 3,
    sku: '302012',
    category: 'Bag & Pouch',
    stock: 10,
    price: 121.0,
    status: 'Published',
    added: '29 Dec 2022'
  },
  {
    id: 1,
    productName: 'Handmade Pouch',
    variants: 3,
    sku: '302012',
    category: 'Bag & Pouch',
    stock: 10,
    price: 121.0,
    status: 'Draft',
    added: '29 Dec 2022'
  }

  // Add more data here if needed
]

const AdminProductPage = () => <Table columns={columns} dataSource={data} pagination={false} />

export default AdminProductPage
