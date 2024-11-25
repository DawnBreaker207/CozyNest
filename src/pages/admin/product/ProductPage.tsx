import CustomLoadingPage from '@/components/Loading'
import { useCategoryQuery } from '@/hooks/useCategoryQuery' // Import hook để lấy danh mục
import useProductMutation from '@/hooks/useProductMutation'
import { useProductQuery } from '@/hooks/useProductQuery' // Import hook để lấy sản phẩm
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
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
      key: 'thumbnail',
      title: 'Ảnh sản phẩm',
      dataIndex: 'thumbnail',
      render: (text: string) => <img src={text} alt='Product' style={{ width: 100, height: 100 }} />
    },
    {
      key: 'brand',
      title: 'Thương hiệu',
      dataIndex: 'brand'
    },
    {
      key: 'categoryName', // Sử dụng key là 'categoryName'
      title: 'Tên danh mục',
      render: (_text: string, product: IProduct) => {
        // Kiểm tra xem categoryId có phải là một mảng và có ít nhất một phần tử
        if (Array.isArray(product.categoryId) && product.categoryId.length) {
          // Lấy các categoryId từ product.categoryId
          const categoryIds = product.categoryId.map((category: { _id: string }) => category._id)

          const categoryNames = categoryIds
            .map((categoryId) => {
              const category = categoriesData?.res?.find((category: ICategory) => category._id === categoryId)
              return category ? category.name : 'Không xác định' // Đảm bảo trả về tên danh mục
            })
            .join(', ') // Ghép các tên danh mục thành chuỗi
          return categoryNames || 'Không xác định'
        } else {
          // Nếu không có categoryId
          return 'Không xác định'
        }
      }
    },
    {
      key: 'price',
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      render: (price: number) => `$${price.toFixed(2)}`
    },
    {
      key: 'discount',
      title: 'Giá khuyến mãi',
      dataIndex: 'discount'
    },
    {
      key: 'isSale',
      title: 'Đang giảm giá',
      dataIndex: 'isSale',
      render: (isSale: boolean) => (isSale ? 'Có' : 'Không')
    },
    {
      key: 'isHidden',
      title: 'Trạng thái hiển thị',
      dataIndex: 'isHidden',
      render: (isHidden: boolean) => <span>{isHidden ? 'Ẩn' : 'Hiển thị'}</span>
    },
    {
      key: 'createdAt',
      title: 'Ngày thêm',
      dataIndex: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString()
    },
    {
      title: 'Action',
      key: 'action',
      render: (product: IProduct) => (
        <Space size='middle'>
          <Link to={`/admin/products/${product._id}/edit`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button icon={<EyeOutlined />} />
          <Popconfirm
            title='Xóa sản phẩm'
            description='Bạn có chắc chắn muốn xóa sản phẩm này?'
            onConfirm={() => deleteProduct({ _id: product._id } as IProduct)}
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
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
