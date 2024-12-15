import CustomLoadingPage from '@/components/Loading'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import useProductMutation from '@/hooks/useProductMutation'
import { useProductQuery } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import HeaderAdmin from '../header/page'

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
  const { mutate, status: mutationStatus } = useProductMutation({
    action: 'DELETE',
    onSuccess: () => {
      // Sử dụng refetch ngay sau khi xóa
      queryClient.invalidateQueries({
        queryKey: ['PRODUCT_KEY']
      })
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công'
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
      key: 'categoryName',
      title: 'Tên danh mục',
      render: (product: IProduct) => <p>{product.category_id?.name}</p> // Thêm kiểm tra null cho category_id
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
            <Button
              icon={<EyeInvisibleOutlined />}
              danger
              loading={mutationStatus === 'pending'} // Thay vì 'isLoading', dùng 'status' để kiểm tra trạng thái pending
            />
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
  if (isLoadingProducts || isLoadingCategories || mutationStatus === 'pending')
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )

  if (isErrorProducts) return <div>{errorProducts.message}</div>
  if (isErrorCategories) return <div>{errorCategories.message}</div>

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
      <Table dataSource={dataSource} columns={columns} />
    </div>
    </>
   
  )
}

export default AdminProductPage
