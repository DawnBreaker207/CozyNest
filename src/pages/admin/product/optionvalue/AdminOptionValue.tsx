import instance from '@/configs/axios'
import { VariantType } from '@/types/variant'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'

type Props = {}

const AdminOptionValue = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const {product_id, option_id} = useParams();
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
  console.log('data', data?.data?.res)

  const { mutate } = useMutation({
    mutationFn: async (id: number | string) => {
      try {
        return await instance.delete(`/options/${id}/`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa thành công'
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
      title: 'Action',
      key: 'action',
      render: (_: any, variant: any) => {
        return (
          <Space size='middle'>
            <Link to={``}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title='Xóa giá trị thuộc tính'
              description='Bạn có chắc chắn muốn xóa thuộc giá trị tính này?'
              onConfirm={() => mutate(variant._id!)}
              okText='Có'
              cancelText='Không'
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>
  return (
    <>
      {contextHolder}
      <div className='flex items-center justify-between mb-3'>
        <h1 className='text-2xl font-bold'>Quản lý giá trị thuộc tính</h1>
        <div>
          <Link to={`/admin/products/${product_id}/options_value/${option_id}/add`}>
            <Button type='primary'>
              <PlusOutlined className='mr-1' />
              Thêm giá trị
            </Button>
          </Link>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminOptionValue
