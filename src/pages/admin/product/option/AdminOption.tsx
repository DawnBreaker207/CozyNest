import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { BackwardOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'

type Props = {}

const AdminOption = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { product_id } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['options'],
    queryFn: async () => {
      try {
        return await instance.get(`/options/${product_id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (option_id: any) => {
      try {
        return await instance.delete(`/options/${product_id}/${option_id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa thuộc tính thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['options']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  const dataSource = data?.data?.res.map((option: any) => {
    return {
      key: option.option_id,
      name: option.name,
      ...option
    }
  })

  const columns = [
    {
      title: 'Tên thuộc tính',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, option: any) => {
        return (
          <Space size='middle'>
            <Link to={`/admin/products/${product_id}/options/${option.option_id}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Link to={`/admin/products/${product_id}/options_value/${option.option_id}`}>
              <Button icon={<EyeOutlined />} />
            </Link>
            <Popconfirm
              title='Xóa thuộc tính'
              description='Bạn có chắc chắn muốn xóa thuộc tính này?'
              onConfirm={() => mutate(option.option_id!)}
              okText='Có'
              cancelText='Không'
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error.message}</div>
  return (
    <>
      {contextHolder}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Quản lý thuộc tính sản phẩm</h1>
        <Link to={`/admin/products`}>
          <Button>
            <BackwardOutlined />
            Quay lại
          </Button>
        </Link>
      </div>
      <div className='my-4'>
        <Link to={`/admin/products/${product_id}/options/add`}>
          <Button type='primary'>
            <PlusOutlined className='mr-1' />
            Thêm thuộc tính
          </Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminOption
