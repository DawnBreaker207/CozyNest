/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, Table, Tag, message, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useCouponQuery } from '@/hooks/useCouponQuery'
import { useState } from 'react'
import useCouponMutation from '@/hooks/useCouponMutation'
import { ICoupon } from '@/types/coupon'
import { useQueryClient } from '@tanstack/react-query'

const CouponPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useCouponQuery()
  const { mutate: removeCoupon } = useCouponMutation({
    action: 'DELETE',
    onSuccess: () => {
      messageApi.success('Xóa mã giảm giá thành công')
      // Refresh coupon list after deletion
      queryClient.invalidateQueries({
        queryKey: ['PRODUCT_KEY']
      })
    }
  })

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const columns = [
    {
      title: 'Tên mã giảm giá',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mã code',
      dataIndex: 'couponCode',
      key: 'couponCode'
    },
    {
      title: 'Giá trị',
      dataIndex: 'couponValue',
      key: 'couponValue',
      render: (value: any) => `${value} ₫`
    },
    {
      title: 'Số lượng',
      dataIndex: 'couponQuantity',
      key: 'couponQuantity'
    },
    {
      title: 'Thời gian áp dụng',
      key: 'duration',
      render: (record: any) => {
        const startDate = record.couponStartDate ? new Date(record.couponStartDate).toLocaleDateString() : 'N/A'
        const endDate = record.couponEndDate ? new Date(record.couponEndDate).toLocaleDateString() : 'N/A'
        return `${startDate} - ${endDate}`
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => <Tag color={status ? 'green' : 'red'}>{status ? 'Hoạt động' : 'Không hoạt động'}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (coupon: any) => (
        <Space size='middle'>
          <Link to={`/admin/coupons/${coupon._id}/edit`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button icon={<EyeOutlined />} />
          <Popconfirm
            title='Xóa mã giảm giá'
            description='Bạn có chắc chắn muốn xóa mã giảm giá này?'
            onConfirm={() => removeCoupon({ _id: coupon._id } as ICoupon)}
            okText='Có'
            cancelText='Không'
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleTableChange = (pagination: any) => {
    // Không cần thêm fetchCoupons nữa vì dùng hook đã tự động cập nhật
    setPagination(pagination)
  }

  return (
    <div className='p-4'>
      {contextHolder}

      {isLoading ? (
        <Spin tip='Đang tải dữ liệu...' />
      ) : isError ? (
        <div style={{ color: 'red' }}>Có lỗi xảy ra: {error.message}</div>
      ) : (
        <>
          <div className='mb-5'>
            <Link to='/admin/coupons/add'>
              <Button type='primary'>
                <PlusOutlined />
                Thêm mới mã giảm giá
              </Button>
            </Link>
          </div>

          <Table
            columns={columns}
            dataSource={data?.res?.docs || []}
            rowKey={(record: any) => record._id}
            loading={isLoading}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </>
      )}
    </div>
  )
}

export default CouponPage
