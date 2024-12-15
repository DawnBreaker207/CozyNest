import { useState } from 'react'
import { Input, Select, Space, Button, message, Table, Tag, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import HeaderAdmin from '../header/page'
import { useQueryClient } from '@tanstack/react-query'
import CustomLoadingPage from '@/components/Loading'
import { useProductQuery } from '@/hooks/useProductQuery'
import useProductMutation from '@/hooks/useProductMutation'
import { IProduct } from '@/types/product'


const AdminProductPage = () => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null)

  // Hàm loại bỏ dấu trong chuỗi
  const removeAccents = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  // Sử dụng useProductQuery để lấy danh sách sản phẩm
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts
  } = useProductQuery()

  // Mutation để xóa sản phẩm
  const { mutate, status: mutationStatus } = useProductMutation({
    action: 'DELETE',
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['PRODUCT_KEY']
      })
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công'
      })
    }
  })

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (value: string) => {
    setSortOrder(value as 'ascend' | 'descend')
  }

  // Lọc và sắp xếp sản phẩm theo tên và ngày
  let filteredProducts = productsData?.res?.filter((product: IProduct) =>
    removeAccents(product.name.toLowerCase()).includes(removeAccents(search.toLowerCase()))
  )

  if (sortOrder) {
    filteredProducts = filteredProducts?.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      if (sortOrder === 'ascend') {
        return dateA.getTime() - dateB.getTime() // Cũ nhất
      }
      return dateB.getTime() - dateA.getTime() // Mới nhất
    })
  }

  const dataSource = filteredProducts?.map((item: IProduct) => ({
    key: item._id,
    ...item
  }))

  const columns = [
    {
      key: 'name',
      title: 'Tên sản phẩm',
      dataIndex: 'name'
    },
    {
      key: 'categoryName',
      title: 'Tên danh mục',
      render: (product: IProduct) => <p>{product.category_id?.name}</p>
    },
    {
      key: 'SKU',
      title: 'SKU',
      dataIndex: 'SKU'
    },
    {
      key: 'isSale',
      title: 'Đang giảm giá',
      dataIndex: 'isSale',
      render: (isSale: boolean) => <Tag color={isSale ? 'green' : 'yellow'}>{isSale ? 'Có' : 'Không'}</Tag>
    },
    {
      key: 'is_hidden',
      title: 'Trạng thái hiển thị',
      dataIndex: 'is_hidden',
      render: (is_hidden: boolean) => <Tag color={is_hidden ? 'red' : 'green'}>{is_hidden ? 'Ẩn' : 'Hiển thị'}</Tag>
    },
    {
      key: 'createdAt',
      title: 'Ngày thêm',
      dataIndex: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString()
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (product: IProduct) => (
        <Space size='middle'>
          <Link to={`/admin/products/${product._id}/edit`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title='Xóa sản phẩm'
            description='Bạn có chắc chắn muốn xóa sản phẩm này?'
            onConfirm={() => mutate({ _id: product._id } as IProduct)}
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} danger loading={mutationStatus === 'pending'} />
          </Popconfirm>
          <Link to={`/admin/products/${product._id}/options`}>
            <Button>Thuộc tính</Button>
          </Link>
          <Link to={`/admin/products/${product._id}/variants`}>
            <Button>Biến thể</Button>
          </Link>
        </Space>
      )
    }
  ]

  // Xử lý khi loading hoặc có lỗi
  if (isLoadingProducts || mutationStatus === 'pending') return <CustomLoadingPage />
  if (isErrorProducts) return <div>{errorProducts.message}</div>

  return (
    <>
     <HeaderAdmin/>
     <div className='bg-white mt-4'>
      {contextHolder}
      <div className='mb-5'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý sản phẩm</h1>
        <Link to={`/admin/products/add`}>
          <Button type='primary'>
            <PlusOutlined />
            Thêm mới sản phẩm
          </Button>
        </Link>
      </div>

      <div className='mb-5 flex items-center justify-between'>
        <Input
          placeholder='Tìm kiếm theo tên sản phẩm'
          value={search}
          onChange={handleSearchChange}
          style={{ width: 500 }}
        />
        <Select placeholder='Sắp xếp theo' style={{ width: 150 }} onChange={handleSortChange} defaultValue={null}>
          <Select.Option value='descend'>Mới nhất</Select.Option>
          <Select.Option value='ascend'>Cũ nhất</Select.Option>
        </Select>
      </div>

      <Table dataSource={dataSource} columns={columns} />
    </div>
    </>
   
  )
}

export default AdminProductPage
