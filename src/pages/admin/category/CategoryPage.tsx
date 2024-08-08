import { Table, Tag, Space, Button } from 'antd'
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

interface CategoryRecord {
  id: number
  name: string
  thumbnail: string
  isHidden: boolean
  products: number
  createdAt: string
}

const columns = [
  {
    title: 'Product Name',
    dataIndex: 'name',
    key: 'name',
    render: (_: string, record: CategoryRecord) => (
      <Space size='middle'>
        <div>
          <div>{record.name}</div>
          <div style={{ color: 'gray' }}>{record.products} Products</div>
        </div>
      </Space>
    )
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    render: (thumbnail: string) => <img src={thumbnail} alt=' thumbnail ' style={{ width: '50px' }} />
  },
  {
    title: 'Visibility',
    dataIndex: 'isHidden',
    key: 'isHidden',
    render: (isHidden: boolean) => <Tag color={isHidden ? 'red' : 'green'}>{isHidden ? 'Hidden' : 'Visible'}</Tag>
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: CategoryRecord) => (
      <Space size='middle'>
        <Link to={`${record.id}/edit`}>
          <Button icon={<EditOutlined />} />
        </Link>
        <Button icon={<EyeOutlined />} />
        <Button icon={<DeleteOutlined />} />
      </Space>
    )
  }
]

const data: CategoryRecord[] = [
  {
    id: 1,
    name: 'Category 1',
    thumbnail: 'https://picsum.photos/200/300',
    isHidden: false,
    products: 10,
    createdAt: '01 Jan 2023'
  },
  {
    id: 2,
    name: 'Category 2',
    thumbnail: 'https://picsum.photos/200/300',
    isHidden: true,
    products: 5,
    createdAt: '15 Jan 2023'
  }
  // Add more data here if needed
]

const CategoryPage = () => <Table columns={columns} dataSource={data} pagination={false} />

export default CategoryPage
