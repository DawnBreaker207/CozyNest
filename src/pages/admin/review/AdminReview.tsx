import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { BackwardOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Rate, Space, Table } from 'antd'
import { Link, useParams } from 'react-router-dom'
import HeaderAdmin from '../header/page'

type Props = {}

const AdminReview = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        return await instance.get(`/reviews`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (id: any) => {
      try {
        return await instance.delete(`/reviews/${id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa đánh giá thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['reviews']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  const dataSource = data?.data?.data.map((review: any) => {
    return {
      key: review._id,
      username: review.user_id ? review.user_id.username : '',
      product_name: review.product_id ? review.product_id.name : 'Sản phẩm không tồn tại',
      ...review
    }
  })

  const columns = [
    {
      title: 'Tên người đánh giá',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name'
    },
    {
      title: 'Ảnh đánh giá',
      dataIndex: 'image',
      key: 'image',
      render: (image: any) => {
        return <img src={image} alt='' className={`${image ? 'size-28' : ''}`} />
      }
    },
    {
      title: 'Nội dung đánh giá',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment: any) => {
        return <p className='max-w-[450px]'>{comment}</p>
      }
    },
    {
      title: 'Số sao đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => {
        return (
          <div className='flex items-center'>
            <Rate disabled allowHalf value={rating} className='text-sm' />
          </div>
        )
      }
    }
    // {
    //   title: 'Hành động',
    //   key: 'action',
    //   render: (_: any, review: any) => {
    //     return (
    //       <Space size='middle'>
    //         <Popconfirm
    //           title='Xóa đánh giá'
    //           description='Bạn có chắc chắn muốn xóa đánh giá này?'
    //           onConfirm={() => mutate(review._id!)}
    //           okText='Có'
    //           cancelText='Không'
    //         >
    //           <Button icon={<DeleteOutlined />} danger />
    //         </Popconfirm>
    //       </Space>
    //     )
    //   }
    // }
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
      <HeaderAdmin/>
      <h1 className='text-2xl font-bold mb-4 mt-4'>Quản lý đánh giá sản phẩm</h1>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminReview
