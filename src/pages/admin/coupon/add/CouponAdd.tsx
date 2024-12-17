import instance from '@/configs/axios'
import { BackwardOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, message, Switch } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CouponAdd = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const { name, couponCode, couponValue, couponQuantity, couponStartDate, couponEndDate, status } = values

    const newCoupon = {
      name,
      couponCode,
      couponValue,
      couponQuantity,
      couponStartDate: couponStartDate ? couponStartDate.toISOString() : null,
      couponEndDate: couponEndDate ? couponEndDate.toISOString() : null,
      status
    }

    try {
      setLoading(true)
      await instance.post('/coupon', newCoupon)
      message.success('Mã giảm giá đã được tạo thành công!')
      form.resetFields()
    } catch (error) {
      message.error('Có lỗi xảy ra khi tạo mã giảm giá!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='flex item-center justify-between mb-5'>
        <h1 className='text-2xl font-bold'>Thêm mới mã giảm giá</h1>
        <Link to={`/admin/coupons`}>
          <Button>
            <BackwardOutlined />
            Quay lại
          </Button>
        </Link>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        initialValues={{
          status: true // Mặc định là active
        }}
        className='space-y-4'
      >
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
          rules={[
            { required: true, message: 'Vui lòng nhập giá trị coupon!' },
            {
              validator: (_, value) =>
                value > 200000 ? Promise.reject(new Error('Giá trị không được vượt quá 200,000!')) : Promise.resolve()
            }
          ]}
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
        <Form.Item
          label='Ngày bắt đầu'
          name='couponStartDate'
          className='w-1/2'
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
        >
          <DatePicker className='w-full' format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item
          label='Ngày kết thúc'
          name='couponEndDate'
          className='w-1/2'
          dependencies={['couponStartDate']}
          rules={[
            { required: true, message: 'Vui lòng chọn ngày kết thúc!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const startDate = getFieldValue('couponStartDate')
                if (value && startDate && new Date(value).getTime() <= new Date(startDate).getTime()) {
                  return Promise.reject(new Error('Ngày kết thúc phải lớn hơn ngày bắt đầu!'))
                }
                return Promise.resolve()
              }
            })
          ]}
        >
          <DatePicker className='w-full' format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item label='Trạng thái' name='status' valuePropName='checked'>
          <Switch checkedChildren='Hoạt động' unCheckedChildren='Không hoạt động' />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          Tạo mã giảm giá
        </Button>
      </Form>
    </div>
  )
}

export default CouponAdd
