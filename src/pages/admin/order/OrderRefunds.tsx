import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Table, Button, Popconfirm, message, Select } from 'antd'
import { useState } from 'react' // Import useState for handling the filter state
import instance from '@/configs/axios'
import CustomLoadingPage from '@/components/Loading'

const RefundOrdersAdmin = () => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['refundOrders'],
    queryFn: async () => {
      const res = await instance.get('/orders/refund?_sort=createdAt')
      return res.data.res.items
    },
    refetchOnWindowFocus: false
  })

  const [statusFilter, setStatusFilter] = useState('all') // State for the filter

  const { mutate: confirmRefund } = useMutation({
    mutationFn: async (id: string) => {
      await instance.put(`/orders/refund/${id}`)
    },
    onSuccess: () => {
      message.success('Xác nhận yêu cầu hoàn trả đơn hàng thành công')
      queryClient.refetchQueries({ queryKey: ['refundOrders'] })
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

  // Filter data based on status filter
  const filteredData =
    statusFilter === 'all'
      ? data
      : data.filter((item: any) => {
          return statusFilter === 'confirmed' ? item.is_confirm : !item.is_confirm
        })

  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error.message}</div>

  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý hoàn tiền</h1>

        {/* Status Filter Select */}
        <Select
          value={statusFilter}
          style={{ width: 200 }}
          onChange={(value) => setStatusFilter(value)}
          placeholder='Chọn trạng thái'
          className='mb-4'
        >
          <Select.Option value='all'>Tất cả trạng thái</Select.Option>
          <Select.Option value='confirmed'>Đã xác nhận</Select.Option>
          <Select.Option value='unconfirmed'>Chưa xác nhận</Select.Option>
        </Select>
      </div>

      <Table columns={columns} dataSource={filteredData} rowKey={(record: any) => record?._id} />
    </div>
  )
}

export default RefundOrdersAdmin
