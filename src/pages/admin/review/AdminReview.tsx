import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message, Rate, Select, Table } from 'antd'
import { useState } from 'react'

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

  const [ratingFilter, setRatingFilter] = useState<number | null>(null) // State for filtering by rating

  const dataSource = data?.data?.data
    .filter((review: any) => (ratingFilter ? review.rating === ratingFilter : true)) // Apply rating filter
    .map((review: any) => ({
      key: review._id,
      username: review.user_id ? review.user_id.username : '',
      product_name: review.product_id ? review.product_id.name : 'Sản phẩm không tồn tại',
      ...review
    }))
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

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

      <h1 className='text-2xl font-bold mb-3'>Quản lý đánh giá sản phẩm</h1>
      {/* Add Select above the table for filtering */}
      <div className='mb-4'>
        <Select
          value={ratingFilter ?? undefined}
          style={{ width: 150 }}
          placeholder='Lọc theo số sao'
          onChange={(value) => setRatingFilter(value)}
        >
          <Select.Option value={null}>Tất cả</Select.Option>
          <Select.Option value={1}>
            <Rate disabled allowHalf value={1} className='text-sm' />
          </Select.Option>
          <Select.Option value={2}>
            <Rate disabled allowHalf value={2} className='text-sm' />
          </Select.Option>
          <Select.Option value={3}>
            <Rate disabled allowHalf value={3} className='text-sm' />
          </Select.Option>
          <Select.Option value={4}>
            <Rate disabled allowHalf value={4} className='text-sm' />
          </Select.Option>
          <Select.Option value={5}>
            <Rate disabled allowHalf value={5} className='text-sm' />
          </Select.Option>
        </Select>
      </div>

      {/* Table displaying the reviews */}

      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}

export default AdminReview
