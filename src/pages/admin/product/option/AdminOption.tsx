import instance from '@/configs/axios'
import { VariantType } from '@/types/variant'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'

type Props = {}

const AdminOption = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['options'],
    queryFn: async () => {
      try {
        return await instance.get(`/options/${id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })
  // const dataVariants = data?.data?.res
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
    const optionValues = option.option_values?.map((value: any) => value.value).join(', ')

    return {
      key: option._id,
      name: option.name,
      optionValues,
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
      title: 'Giá trị thuộc tính',
      dataIndex: 'optionValues',
      key: 'optionValues'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, option: any) => {
        return (
          <Space size='middle'>
            <Link to={``}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title='Xóa thuộc tính'
              description='Bạn có chắc chắn muốn xóa thuộc tính này?'
              onConfirm={() => mutate(option.option_id!)}
              okText='Có'
              cancelText='Không'
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
            <Link to={`/admin/products/${id}/options_value/${option.option_id}`}>
              <Button>Chi tiết</Button>
            </Link>
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
        <h1 className='text-2xl font-bold'>Quản lý thuộc tính sản phẩm</h1>
        <div>
          <Link to={`/admin/products/${id}/options/add`}>
            <Button type='primary'>
              <PlusOutlined className='mr-1' />
              Thêm thuộc tính
            </Button>
          </Link>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminOption
