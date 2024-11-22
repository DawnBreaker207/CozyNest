import instance from '@/configs/axios'
import { VariantType } from '@/types/variant'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'

const AdminVariantPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['variants'],
    queryFn: async () => {
      try {
        return await instance.get(`/variants/${id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })
  const dataVariants = data?.data?.res
  console.log('data', dataVariants)

  // Mutation để xóa sản phẩm
  const { mutate } = useMutation({
    mutationFn: async (id: number | string) => {
      try {
        return await instance.delete(`/variants/${id}/`);
      } catch (error) {
        throw new Error((error as any).message);
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  })

  const dataSource = data?.data?.res.map((variant: VariantType) => ({
    key: variant._id,
    ...variant
  }))

  const columns = [
    {
      title: 'Tên biến thể',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Giá sản phẩm',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU'
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, variant: VariantType) => (
        <Space size='middle'>
          <Link to={`#`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title='Xóa biến thể'
            description='Bạn có chắc chắn muốn xóa biến thể này?'
            onConfirm={() => mutate(variant._id!)}
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>
  return (
    <>
      {contextHolder}
      <div className='flex items-center justify-between mb-3'>
        <h1 className='text-2xl font-bold'>Quản lý biến thể sản phẩm</h1>
        <Button type='primary'>
          <Link to={`#`}>
            <PlusOutlined className='mr-1' />
            Thêm biến thể
          </Link>
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminVariantPage
