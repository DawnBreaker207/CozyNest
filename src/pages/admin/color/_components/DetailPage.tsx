import { useProductQuery } from '@/hooks/useProductQuery' // Import hook để lấy sản phẩm
import { deleteOption } from '@/services/product'
import { Variants } from '@/types/product'
import {
  BellOutlined,
  CalendarOutlined,
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Button, Input, Popconfirm, Space, Table } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Link, useParams } from 'react-router-dom'

const DetailPage = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useProductQuery({ _id: id })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  // Chuẩn bị dữ liệu cho bảng với cột tên sản phẩm và màu sắc
  const productName = data?.name || 'Không có tên' // Lấy tên sản phẩm hoặc hiển thị 'Không có tên'
  const variants = data?.variants || [] // Đảm bảo variants không undefined
  // console.log(variants)

  // Khi bạn lấy dữ liệu từ variants
  const colors = variants.map((variant: Variants) => ({
    key: variant.sku_id?._id,
    name: productName,
    color: variant.option_value_id?.value || 'Không có màu sắc',
    optionId: variant.option_id?._id, // Thêm ID option
    optionValueId: variant.option_value_id?._id, // Thêm ID option value
    skuId: variant.sku_id?._id
  }))

  // Cấu trúc các cột của bảng
  const columns = [
    {
      key: 'name',
      title: 'Tên sản phẩm',
      dataIndex: 'name'
    },
    {
      key: 'color',
      title: 'Màu sản phẩm',
      dataIndex: 'color'
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Partial<Variants>) => (
        <Space size='middle'>
          <Link
            to={`/admin/color/${id}/edit`}
            state={{
              optionId: record.option_id, // Chỉ truyền ID của option
              optionValueId: record.option_value_id, // Chỉ truyền ID của optional value
              variantId: record.sku_id // Giả sử key là ID của variant
            }}
          >
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title='Xóa màu này'
            description='Bạn có chắc chắn muốn xóa màu này?'
            onConfirm={() => deleteOption({ id: id || '', optionId: record?.option_id?._id })} // Truyền optionId vào hàm deleteProduct
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <Header style={{ padding: 0 }} className='bg-gray-50'>
        <div className='flex justify-between h-[60px] items-center'>
          <div>
            <span className='text-xl text-[#353535] ml-[25px]'>Color</span>
          </div>
          <div className='flex items-center space-x-4 mr-[14px]'>
            <button className='bg-[#FFCC91] px-4 py-2 rounded-lg h-[32px] flex items-center'>
              Nik Shop <DownOutlined className='ml-2' />
            </button>
            <Badge count={4} className='cursor-pointer'>
              <BellOutlined className='text-xl text-blue-500' />
            </Badge>
            <Avatar size='large' className='rounded-lg' src='https://picsum.photos/200/200' />
          </div>
        </div>
      </Header>
      <div className='flex items-center justify-between p-4 bg-white shadow-md'>
        <Input className='w-3/4' placeholder='Search order...' prefix={<SearchOutlined />} size='large' />
        <div className='flex items-center space-x-2'>
          <Button
            icon={<DownloadOutlined />}
            size='large'
            className='bg-blue-100 border-none text-blue-700 hover:bg-blue-200 '
          >
            Export
          </Button>
          <Button type='primary' icon={<PlusOutlined />} size='large'>
            Search
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md '>
        <div className='flex items-center space-x-4 border border-black-100 rounded-lg'>
          <div className='flex space-x-4'>
            <Button type='link' className='text-blue-500'>
              All Color
            </Button>
            <Button type='link'>Published</Button>
            <Button type='link'>Low Stock</Button>
            <Button type='link'>Draft</Button>
          </div>
        </div>
        <div className='flex items-center space-x-4 '>
          <Input className='w-64' placeholder='Search product...' prefix={<SearchOutlined />} />
          <div className='border border-black-100'>
            <Button icon={<CalendarOutlined />} className='border-none shadow-none '>
              Select Date
            </Button>
          </div>
          <div className='border border-black-100'>
            <Button icon={<FilterOutlined />} className='border-none shadow-none'>
              Filters
            </Button>
          </div>
        </div>
      </div>
      <Table dataSource={colors} columns={columns} />
    </>
  )
}

export default DetailPage
