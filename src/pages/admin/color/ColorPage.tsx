import { useCategoryQuery } from '@/hooks/useCategoryQuery' // Import hook để lấy danh mục
import { useProductQuery } from '@/hooks/useProductQuery' // Import hook để lấy sản phẩm
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { Button, Skeleton, Space, Table } from 'antd'
import { Link } from 'react-router-dom'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'

const ColorPage = () => {
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

  // Chuẩn bị dữ liệu cho bảng với cột màu sắc
  const dataSource: IProduct[] = productsData?.map((item: IProduct) => {
    const color =
      item.variants && item.variants.length > 0
        ? item.variants.map((variant) => variant.option_value_id.value).join(', ')
        : 'Không có màu sắc' // Trường hợp không có màu

    return {
      key: item._id,
      ...item,
      color // Thêm thuộc tính color vào mỗi sản phẩm
    }
  })

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
      render: (_text: string, product: IProduct) => {
        if (Array.isArray(product.categoryId) && product.categoryId.length) {
          const categoryIds = product.categoryId.map((category: { _id: string }) => category._id)

          const categoryNames = categoryIds
            .map((categoryId) => {
              const category = categoriesData?.res?.find((category: ICategory) => category._id === categoryId)
              return category ? category.name : 'Không xác định'
            })
            .join(', ')
          return categoryNames || 'Không xác định'
        } else {
          return 'Không xác định'
        }
      }
    },
    {
      key: 'color',
      title: 'Màu sản phẩm',
      dataIndex: 'color'
    },
    {
      title: 'Action',
      key: 'action',
      render: (product: IProduct) => (
        <Space size='middle'>
          <Link to={`/admin/color/${product._id}/add`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Link to={`/admin/color/${product._id}/detail_color`}>
            <Button icon={<EyeOutlined />} />
          </Link>
        </Space>
      )
    }
  ]

  // Xử lý trạng thái khi loading hoặc error
  if (isLoadingProducts || isLoadingCategories)
    return (
      <div>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    )
  if (isErrorProducts) return <div>{errorProducts.message}</div>
  if (isErrorCategories) return <div>{errorCategories.message}</div>

  return <Table dataSource={dataSource} columns={columns} />
}

export default ColorPage
