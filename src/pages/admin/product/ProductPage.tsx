import CustomLoadingPage from '@/components/Loading'
import { useCategoryQuery } from '@/hooks/useCategoryQuery' // Import hook để lấy danh mục
import useProductMutation from '@/hooks/useProductMutation'
import { useProductQuery } from '@/hooks/useProductQuery' // Import hook để lấy sản phẩm
import { IProduct } from '@/types/product'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

const AdminProductPage = () => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  // Sử dụng useProductQuery để lấy danh sách sản phẩm
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts
  } = useProductQuery()
  // Sử dụng useCategoryQuery để lấy danh sách danh mục
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories
  } = useCategoryQuery()
  // Mutation để xóa sản phẩm
  const { mutate: deleteProduct } = useProductMutation({
    action: 'DELETE',
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['PRODUCT_KEY']
      })
    }
  })
  // Chuẩn bị dữ liệu cho bảng
  const dataSource = productsData?.res?.map((item: IProduct) => ({
    key: item._id,
    ...item
  }))

  // Cấu trúc các cột của bảng
  const columns = [
    {
      key: 'name',
      title: 'Tên sản phẩm',
      dataIndex: 'name'
    },
    {
      key: 'categoryName', // Sử dụng key là 'categoryName'
      title: 'Tên danh mục',
      render: (product: IProduct) => <p>{product.category_id.name}</p>
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
            onConfirm={() => deleteProduct({ _id: product._id } as IProduct)}
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} danger />
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

  // Xử lý trạng thái khi loading hoặc error
  if (isLoadingProducts || isLoadingCategories)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isErrorProducts) return <div>{errorProducts.message}</div>
  if (isErrorCategories) return <div>{errorCategories.message}</div>

  return (
    <>
      {contextHolder}
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminProductPage
