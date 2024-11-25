import instance from '@/configs/axios'
import { Button, DatePicker, Form, Input, InputNumber, message, Switch } from 'antd'
import { useState } from 'react'

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
    <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Thêm Mã Giảm Giá</h1>
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

        <Form.Item
          label='Ngày bắt đầu'
          name='couponStartDate'
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
        >
          <DatePicker className='w-full' format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item
          label='Ngày kết thúc'
          name='couponEndDate'
          rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
        >
          <DatePicker className='w-full' format='YYYY-MM-DD' />
        </Form.Item>

        <Form.Item label='Trạng thái' name='status' valuePropName='checked'>
          <Switch checkedChildren='Hoạt động' unCheckedChildren='Không hoạt động' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} className='w-full'>
            Tạo Mã Giảm Giá
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CouponAdd
