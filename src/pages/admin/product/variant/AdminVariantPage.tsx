import instance from '@/configs/axios'
import { VariantType } from '@/types/variant'
import { BackwardOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'

const AdminVariantPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { product_id } = useParams()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['variants'],
    queryFn: async () => {
      try {
        return await instance.get(`/variants/${product_id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (product_id: number | string) => {
      try {
        return await instance.delete(`/variants/${product_id}`)
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
        queryKey: ['variants']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  const { mutate: mutateVariantAdd } = useMutation({
    mutationFn: async () => {
      try {
        return instance.post(`/variants/${product_id}`)
      } catch (error) {
        throw new Error('Cập nhật các biến thể thất bại ')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật các biến thể thành công'
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })
  const handleUpdate = () => {
    mutateVariantAdd()
    queryClient.invalidateQueries({
      queryKey: ['variants']
    })
  }

  const dataSource = data?.data?.res.map((variant: VariantType) => ({
    key: variant._id,
    ...variant
  }))
  console.log('🚀 ~ dataSource ~ dataSource:', dataSource)

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
      title: 'Giá cũ sản phẩm',
      dataIndex: 'price_before_discount',
      key: 'price_before_discount'
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, variant: any) => {
        // const sku_id = variant.option_value[0].sku_id
        return (
          <Space size='middle'>
            {/* <Link to={`/admin/products/${product_id}/variants/${sku_id}/update`}>
              <Button icon={<EditOutlined />} />
            </Link> */}
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
    }
  ]
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>
  return (
    <>
      {contextHolder}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Quản lý biến thể sản phẩm</h1>
        <Link to={`/admin/products`}>
          <Button>
            <BackwardOutlined />
            Quay lại
          </Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <div>
        <Button type='primary' onClick={handleUpdate}>
          <PlusOutlined className='mr-1' />
          Cập nhật lại biến thể
        </Button>
      </div>
    </>
  )
}

export default AdminVariantPage
