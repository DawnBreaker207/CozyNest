import useCouponMutation from '@/hooks/useCouponMutation'
import { useCouponQuery } from '@/hooks/useCouponQuery'
import { ICoupon } from '@/types/coupon'
import { BackwardOutlined, CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, message, Switch } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

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
      <div className='rounded-lg'>
        <div className='flex item-center justify-between mb-5'>
          <h1 className='text-2xl font-bold'>Cập nhật mã giảm giá</h1>
          <Link to={`/admin/coupons`}>
            <Button>
              <BackwardOutlined />
              Quay lại
            </Button>
          </Link>
        </div>
        <Form layout='vertical' onFinish={onFinish} initialValues={data?.res || {}}>
          <Form.Item
            label='Tên Mã Giảm Giá'
            name='name'
            className='w-1/2'
            rules={[{ required: true, message: 'Vui lòng nhập tên mã giảm giá!' }]}
          >
            <Input placeholder='Nhập tên mã giảm giá' />
          </Form.Item>

          <Form.Item
            label='Mã Coupon'
            name='couponCode'
            className='w-1/2'
            rules={[{ required: true, message: 'Vui lòng nhập mã coupon!' }]}
          >
            <Input placeholder='Nhập mã coupon' />
          </Form.Item>

          <Form.Item
            label='Giá trị'
            name='couponValue'
            className='w-1/2'
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
            className='w-1/2'
            rules={[{ required: true, message: 'Vui lòng nhập số lượng coupon!' }]}
          >
            <InputNumber min={0} className='w-full' />
          </Form.Item>

          <Form.Item label='Trạng thái' name='status' valuePropName='checked'>
            <Switch checkedChildren='Hoạt động' unCheckedChildren='Không hoạt động' />
          </Form.Item>

          <Button type='primary' htmlType='submit'>
            Cập nhật mã giảm giá
          </Button>
        </Form>
      </div>
    </>
  )
}

export default CouponEdit
