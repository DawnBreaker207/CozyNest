import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { ICategory } from '@/types/category'
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd'
import { Link } from 'react-router-dom'

const CategoryPage = () => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()

  // Fetch data categories using custom hook
  const { data, isLoading, isError, error } = useCategoryQuery()

  const { mutate } = useMutation({
    mutationFn: async (cate_id: any) => {
      try {
        return await instance.delete(`/categories/${cate_id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa danh mục thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['CATEGORY_KEY']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  // Chuẩn bị dữ liệu cho bảng
  const dataSource =
    data?.res?.map((item: ICategory) => ({
      key: item._id,
      ...item
    })) || []

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
            <div style={{ color: 'gray' }}>{record.products.length} Sản phẩm</div>
          </div>
        </Space>
      )
    },
    {
      key: 'thumbnail',
      title: 'Ảnh danh mục',
      dataIndex: 'thumbnail',
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt='Category Thumbnail'
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
        />
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
      render: (category: ICategory) => {
        console.log('🚀 ~ CategoryPage ~ category:', category)
        return (
          <Space size='middle'>
            <Link to={`/admin/categories/${category._id}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title='Xóa danh mục'
              description='Bạn có chắc chắn muốn xóa danh mục này không?'
              onConfirm={() => {
                if (category.type === 'default') {
                  messageApi.open({
                    type: 'error',
                    content: 'Danh mục mặc định không thể xóa!'
                  })
                } else {
                  mutate(category._id)
                }
              }}
              okText='Có'
              cancelText='Không'
            >
              <Button icon={<EyeInvisibleOutlined />} danger />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // Xử lý trạng thái khi loading hoặc error
  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error?.message}</div>

  return (
    <>
      {contextHolder}
      <div className='mb-5'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý danh mục</h1>
        <Link to={`/admin/categories/add`}>
          <Button type='primary'>
            <PlusOutlined />
            Thêm mới danh mục
          </Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default CategoryPage
