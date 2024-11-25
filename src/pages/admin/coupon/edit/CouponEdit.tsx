import useCouponMutation from '@/hooks/useCouponMutation'
import { useCouponQuery } from '@/hooks/useCouponQuery'
import { ICoupon } from '@/types/coupon'
import { CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Switch } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const CouponEdit = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams()

  // Lấy dữ liệu coupon
  const { data, isLoading, isError, error } = useCouponQuery({ id })

  // Mutation để cập nhật coupon
  const { mutate } = useCouponMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật mã giảm giá thành công')
      setTimeout(() => {
        navigate(`/admin/coupons`)
      }, 900)
    }
  })

  // Hàm xử lý khi form submit
  const onFinish = (values: ICoupon) => {
    console.log('Form Values:', values)
    if (data) {
      mutate({ ...data, ...values })
    } else {
      console.error('Data not available')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish} initialValues={data?.res || {}}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Coupon</span> <CaretRightOutlined /> <span>Edit Coupon</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                icon={<CloseOutlined />}
                className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'
                onClick={() => navigate(`/admin/coupons`)}
              >
                Cancel
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Edit Coupon
              </Button>
            </div>
          </div>

          <Form.Item
            label='Tên Mã Giảm Giá'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên mã giảm giá!' }]}
          >
            <Input placeholder='Nhập tên mã giảm giá' />
          </Form.Item>

          <Form.Item
            label='Mã Coupon'
            name='couponCode'
            rules={[{ required: true, message: 'Vui lòng nhập mã coupon!' }]}
          >
            <Input placeholder='Nhập mã coupon' />
          </Form.Item>

          <Form.Item
            label='Giá trị'
            name='couponValue'
            rules={[{ required: true, message: 'Vui lòng nhập giá trị coupon!' }]}
          >
            <InputNumber
              placeholder='Nhập giá trị coupon'
              min={0}
              className='w-full'
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item
            label='Số lượng'
            name='couponQuantity'
            rules={[{ required: true, message: 'Vui lòng nhập số lượng coupon!' }]}
          >
            <InputNumber min={0} className='w-full' />
          </Form.Item>

          <Form.Item label='Trạng thái' name='status' valuePropName='checked'>
            <Switch checkedChildren='Hoạt động' unCheckedChildren='Không hoạt động' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full'>
              Tạo Mã Giảm Giá
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default CouponEdit
