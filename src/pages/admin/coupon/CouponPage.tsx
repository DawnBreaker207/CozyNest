/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useCouponQuery } from '@/hooks/useCouponQuery'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Space, Table, Tag, Select } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const { Option } = Select

const CouponPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { data, isLoading, isError, error } = useCouponQuery()
  const queryClient = useQueryClient()
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend') // Trạng thái để lưu trữ lựa chọn sắp xếp

  const { mutate } = useMutation({
    mutationFn: async (coupon_id: any) => {
      try {
        return await instance.delete(`/coupon/${coupon_id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Xóa mã giảm giá thành công',
      })
      queryClient.invalidateQueries({
        queryKey: ['COUPON_KEY'],
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message,
      })
    },
  })

  // Hàm sắp xếp dữ liệu theo couponValue
  const handleSortChange = (value: 'ascend' | 'descend') => {
    setSortOrder(value)
  }

  // Sắp xếp dữ liệu khi sortOrder thay đổi
  const sortedData = data?.res?.docs
    .filter((coupon: any) => coupon.deleted === false)
    .sort((a: any, b: any) => {
      if (sortOrder === 'ascend') {
        return a.couponValue - b.couponValue
      } else {
        return b.couponValue - a.couponValue
      }
    })
    .map((coupon: any) => ({
      key: coupon._id,
      ...coupon,
    }))

  const columns = [
    {
      title: 'Tên mã giảm giá',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã code',
      dataIndex: 'couponCode',
      key: 'couponCode',
    },
    {
      title: 'Giá trị',
      dataIndex: 'couponValue',
      key: 'couponValue',
      render: (value: any) => `${value} ₫`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'couponQuantity',
      key: 'couponQuantity',
    },
    {
      title: 'Thời gian áp dụng',
      key: 'duration',
      render: (record: any) => {
        const startDate = record.couponStartDate ? new Date(record.couponStartDate).toLocaleDateString() : 'N/A'
        const endDate = record.couponEndDate ? new Date(record.couponEndDate).toLocaleDateString() : 'N/A'
        return `${startDate} - ${endDate}`
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => (
        <Tag color={status ? 'green' : 'red'}>{status ? 'Hoạt động' : 'Không hoạt động'}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (coupon: any) => {
        return (
          <Space size="middle">
            <Link to={`/admin/coupons/${coupon._id}/edit`}>
              <Button icon={<EditOutlined />} />
            </Link>
            <Popconfirm
              title="Xóa mã giảm giá"
              description="Bạn có chắc chắn muốn xóa mã giảm giá này?"
              onConfirm={() => mutate(coupon._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  if (isLoading) return <CustomLoadingPage />
  if (isError) return <div>{error.message}</div>

  return (
    <div>
      {contextHolder}
      <h1 className="text-2xl font-bold mb-5">Quản lý mã giảm giá</h1>
      <div className="mb-5">
        <Link to="/admin/coupons/add">
          <Button type="primary">
            <PlusOutlined />
            Thêm mới mã giảm giá
          </Button>
        </Link>
      </div>

      <div className="mb-5">
        <Select
          defaultValue="ascend"
          style={{ width: 200 }}
          onChange={handleSortChange}
        >
          <Option value="ascend">Giá trị thấp đến cao</Option>
          <Option value="descend">Giá trị cao đến thấp</Option>
        </Select>
      </div>

      {/* Hiển thị bảng với dữ liệu đã sắp xếp */}
      <Table dataSource={sortedData} columns={columns} />
    </div>
  )
}

export default CouponPage
