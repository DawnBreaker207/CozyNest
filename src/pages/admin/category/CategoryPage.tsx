import useCategoryMutation from '@/hooks/useCategoryMutations'
import { ICategory } from '@/types/category'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'

const CategoryPage = () => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  // Fetch data categories using custom hook
  const { data, isLoading, isError, error } = useCategoryQuery()

  // Sử dụng hook cho xóa danh mục
  const { mutate: deleteCategory } = useCategoryMutation({
    action: 'DELETE',
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['CATEGORY_KEY']
      })
    }
  })

  // Chuẩn bị dữ liệu cho bảng
  const dataSource = data?.res.map((item: ICategory) => ({
    key: item._id,
    ...item
  }))

  // Cấu trúc các cột của bảng
  const columns = [
    {
      key: 'name',
      title: 'Tên danh mục',
      dataIndex: 'name',
      render: (name: string, record: ICategory) => (
        <Space size='middle'>
          <div>
            <div>{name}</div>
            <div style={{ color: 'gray' }}>{record.products.length} Products</div>
          </div>
        </Space>
      )
    },
    {
      key: 'isHidden',
      title: 'Trạng thái hiển thị',
      dataIndex: 'isHidden',
      render: (isHidden: boolean) => <Tag color={isHidden ? 'red' : 'green'}>{isHidden ? 'Ẩn' : 'Hiển thị'}</Tag>
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
      render: (category: ICategory) => (
        <Space size='middle'>
          <Link to={`/admin/categories/${category._id}/edit`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button icon={<EyeOutlined />} />
          <Popconfirm
            title='Xóa danh mục'
            description='Bạn có chắc chắn muốn xóa danh mục này không?'
            onConfirm={() => deleteCategory({ _id: category._id } as ICategory)}
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ]

  // Xử lý trạng thái khi loading hoặc error
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error?.message}</div>

  return (
    <>
      {contextHolder}
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default CategoryPage
