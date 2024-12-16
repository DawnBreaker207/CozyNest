import moment from 'moment'
import CustomLoadingPage from '@/components/Loading'
import useCouponMutation from '@/hooks/useCouponMutation'
import { useCouponQuery } from '@/hooks/useCouponQuery'
import { ICoupon } from '@/types/coupon'
import { BackwardOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, message, Switch } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import instance from '@/configs/axios'

const CouponEdit = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const [form] = Form.useForm()

  // Lấy dữ liệu coupon
  const { data, isLoading, isError, error } = useCouponQuery({ id })

  // Mutation để cập nhật coupon
  const { mutate } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        return instance.put(`/coupon/${id}`, formData)
      } catch (error) {
        throw new Error('Cập nhật mã giảm giá thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật mã giảm giá thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['COUPON_KEY']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })
  const getFormattedDate = (date: string | null) => {
    return date ? moment(date) : null
  }
  // Hàm xử lý khi form submit
  const onFinish = (values: ICoupon) => {
    mutate(values)
  }

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
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            ...data?.res,
            couponStartDate: getFormattedDate(data?.res?.couponStartDate),
            couponEndDate: getFormattedDate(data?.res?.couponEndDate),
            status: data?.res?.status || false
          }}
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
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
          >
            <DatePicker className='w-full' format='YYYY-MM-DD' />
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
