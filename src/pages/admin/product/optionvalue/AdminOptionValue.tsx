import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { BackwardOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'

type Props = {}

const AdminOptionValue = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { product_id, option_id } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['options_value'],
    queryFn: async () => {
      try {
        return await instance.get(`/optionValue/${product_id}/options/${option_id}/values`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (value_id: any) => {
      try {
        return await instance.delete(`/optionValue/${product_id}/options/${option_id}/${value_id}/values`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công giá trị thuộc tính'
      })
      queryClient.invalidateQueries({
        queryKey: ['options_value']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  const dataSource = data?.data?.res.map((option_value: any) => {
    return {
      key: option_value._id,
      ...option_value
    }
  })

  const columns = [
    {
      title: 'Giá trị thuộc tính',
      dataIndex: 'value',
      key: 'value'
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, option_value: any) => {
        return (
          <Space size='middle'>
            <Link to={`/admin/products/${product_id}/options_value/${option_id}/${option_value._id!}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title='Xóa giá trị thuộc tính'
              description='Bạn có chắc chắn muốn xóa thuộc giá trị tính này?'
              onConfirm={() => mutate(option_value._id!)}
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
        <h1 className='text-2xl font-bold'>Quản lý giá trị thuộc tính</h1>
        <div>
          <Link to={`/admin/products/${product_id}/options`}>
            <Button>
              <BackwardOutlined />
              Quay lại
            </Button>
          </Link>
        </div>
      </div>
      <div className='my-4'>
        <Link to={`/admin/products/${product_id}/options_value/${option_id}/add`}>
          <Button type='primary'>
            <PlusOutlined className='mr-1' />
            Thêm giá trị
          </Button>
        </Link>
      </div>

      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminOptionValue
