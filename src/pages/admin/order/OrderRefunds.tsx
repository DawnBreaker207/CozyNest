/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, Button, Popconfirm, message } from 'antd'
import instance from '@/configs/axios'

const RefundOrdersAdmin = () => {
  const queryClient = useQueryClient() // Lấy queryClient từ React Query

  const { data, isLoading, isError } = useQuery({
    queryKey: ['refundOrders'],
    queryFn: async () => {
      const res = await instance.get('/orders/refund?_sort=createdAt')
      return res.data.res.items
    },
    refetchOnWindowFocus: false // Tắt việc refetch dữ liệu khi chuyển tab
  })

  // Mutation cho việc xác nhận trả lại đơn hàng
  const { mutate: confirmRefund } = useMutation({
    mutationFn: async (id: string) => {
      await instance.put(`/orders/refund/${id}`)
    },
    onSuccess: () => {
      message.success('Xác nhận yêu cầu hoàn trả đơn hàng thành công')
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.refetchQueries({ queryKey: ['refundOrders'] }) // Refetch thay vì invalidate
    },
    onError: (error) => {
      console.log('Error confirming return: ', error)
      message.error('Có lỗi xảy ra khi xác nhận yêu cầu hoàn tiền')
    }
  })

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'order_id'
    },
    {
      title: 'Thời gian yêu cầu',
      dataIndex: 'createdAt',
      render: (createdAt: string) => new Date(createdAt).toLocaleString('vi-VN')
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer_name'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number'
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'bank_number'
    },
    {
      title: 'Tên ngân hàng',
      dataIndex: 'bank_name'
    },
    {
      title: 'QR ngân hàng',
      dataIndex: 'images',
      render: (images: string[]) =>
        images.length > 0 ? (
          <img
            src={images[0]}
            alt='QR'
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          'Không có ảnh'
        )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_confirm',
      render: (is_confirm: boolean) => (is_confirm ? 'Đã xác nhận' : 'Chưa xác nhận')
    },
    {
      title: 'Hành động',
      render: (record: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Popconfirm title='Bạn có chắc chắn xác nhận yêu cầu này?' onConfirm={() => confirmRefund(record._id)}>
            <Button type='primary' disabled={record.is_confirm}>
              Xác nhận
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  if (isLoading) return <div>Đang tải dữ liệu...</div>
  if (isError) return <div>Đã có lỗi xảy ra khi tải dữ liệu</div>

  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý hoàn tiền</h1>
      </div>
      <Table columns={columns} dataSource={data} rowKey={(record: any) => record?._id} />
    </div>
  )
}

export default RefundOrdersAdmin
