import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { BackwardOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, InputNumber, message } from 'antd'
import { Link, useParams } from 'react-router-dom'

type Props = {}
type FieldType = {
  SKU: string
  name: string
  price?: number
  stock?: string
  price_before_discount?: number
  price_discount_percent?: number
}

const UpdateVariant = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const { product_id, sku_id } = useParams()
  const [form] = Form.useForm()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['variants', product_id, sku_id],
    queryFn: () => instance.get(`/variants/${product_id}/get/${sku_id}`)
  })

  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return instance.put(`/variants/${product_id}/${sku_id}`, formData)
      } catch (error) {
        throw new Error('Cập nhật biến thể thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật biến thể thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['variants']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
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
    <div>
      {contextHolder}
      <div className='flex item-center justify-between max-w-4xl mx-auto mb-8'>
        <h1 className='text-2xl font-bold'>Cập nhật biến thể</h1>
        <Link to={`/admin/products/${product_id}/variants`}>
          <Button>
            <BackwardOutlined />
            Quay lại
          </Button>
        </Link>
      </div>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...data?.data?.res }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType> label='SKU' name='SKU' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label='Tên biến thể'
          name='name'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label='Số lượng'
          name='stock'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá'
          name='price'
          rules={[
            { required: true, message: 'Không được bỏ trống!' },
            { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá cũ'
          name='price_before_discount'
          rules={[
            { required: true, message: 'Không được bỏ trống!' },
            { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType> label='Giảm giá' name='price_discount_percent'>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateVariant
