/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, Input, message, Popconfirm, Select, Table, Modal } from 'antd'
import instance from '@/configs/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import CustomLoadingPage from '@/components/Loading'

const ReturnOrdersAdmin = () => {
  const queryClient = useQueryClient()
  const [reasonCancel, setReasonCancel] = useState<string>('') // Lý do từ chối
  const [isRejecting, setIsRejecting] = useState<string | null>(null) // Trạng thái để kiểm tra đơn hàng nào đang bị từ chối
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['returnOrders'],
    queryFn: async () => {
      const res = await instance.get('/orders/return?_sort=createdAt')
      return res.data.res.items
    },
    refetchOnWindowFocus: false
  })

  // Mutation xác nhận trả lại đơn hàng
  const { mutate: confirmReturn } = useMutation({
    mutationFn: async (id: string) => {
      await instance.put(`/orders/return/${id}`)
    },
    onSuccess: () => {
      message.success('Xác nhận yêu cầu hoàn trả đơn hàng thành công')
      queryClient.refetchQueries({ queryKey: ['returnOrders'] })
    },
    onError: () => {
      message.error('Có lỗi xảy ra khi xác nhận yêu cầu hoàn trả')
    }
  })

  // Mutation từ chối trả lại đơn hàng
  const { mutate: rejectReturn } = useMutation({
    mutationFn: async (params: { id: string; reasonCancel: string }) => {
      const { id, reasonCancel } = params
      if (reasonCancel.trim() === '') {
        message.error('Vui lòng nhập lý do từ chối')
        return
      }
      await instance.put(`/orders/return/${id}/reject`, { reasonCancel })
    },
    onSuccess: () => {
      message.success('Từ chối yêu cầu hoàn trả thành công')
      queryClient.refetchQueries({ queryKey: ['returnOrders'] })
    },
    onError: () => {
      message.error('Có lỗi xảy ra khi từ chối yêu cầu hoàn trả')
    }
  })

  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'unconfirmed'>('all')

  const filteredData = data?.filter((order: any) => {
    if (statusFilter === 'all') return true
    if (statusFilter === 'confirmed') return order.is_confirm
    if (statusFilter === 'unconfirmed') return !order.is_confirm
    return true
  })

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'order_id'
    },
    {
      title: 'Thời gian hoàn',
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
      title: 'Lý do hoàn',
      dataIndex: 'reason'
    },
    {
      title: 'Ảnh phản hồi',
      dataIndex: 'images',
      render: (images: string[]) =>
        images.length > 0 ? (
          <img
            src={images[0]}
            alt='Product'
            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : (
          'Không có ảnh'
        )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_confirm',
      render: (is_confirm: string) => is_confirm
    },
    {
      title: 'Hành động',
      render: (record: any) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Popconfirm title='Bạn có chắc chắn xác nhận yêu cầu này?' onConfirm={() => confirmReturn(record._id)}>
            <Button type='primary' disabled={record.is_confirm === 'Đã xác nhận' || record.is_confirm === 'Đã từ chối'}>
              Xác nhận
            </Button>
          </Popconfirm>

          {/* Modal khi nhấn Từ chối */}
          <Button
            danger
            disabled={record.is_confirm !== 'Chờ xác nhận'}
            onClick={() => setIsRejecting(record._id)} // Mở modal khi nhấn Từ chối
          >
            Từ chối
          </Button>

          {/* Modal nhập lý do từ chối */}
          <Modal
            title='Nhập lý do từ chối'
            visible={isRejecting === record._id} // Chỉ hiển thị modal nếu đơn hàng trùng với `isRejecting`
            onCancel={() => setIsRejecting(null)} // Đóng modal khi nhấn Cancel
            onOk={() => {
              if (reasonCancel.trim() !== '') {
                rejectReturn({ id: record._id, reasonCancel }) // Gửi lý do từ chối khi xác nhận
                setIsRejecting(null) // Đặt lại trạng thái khi từ chối xong
              } else {
                message.error('Vui lòng nhập lý do từ chối')
              }
            }}
          >
            <Input.TextArea
              value={reasonCancel}
              onChange={(e) => setReasonCancel(e.target.value)}
              placeholder='Nhập lý do từ chối'
              rows={4}
            />
          </Modal>
        </div>
      )
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
    <div>
      <div className='mb-5'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý hoàn trả</h1>
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

export default ReturnOrdersAdmin
