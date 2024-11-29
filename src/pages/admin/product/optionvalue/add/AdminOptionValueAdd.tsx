import instance from '@/configs/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, InputNumber, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
type Props = {}
type FieldType = {
  label: string
  value: string
}
const AdminOptionValueAdd = (props: Props) => {
  const { product_id, option_id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return instance.post(`/optionValue/${product_id}/options/${option_id}/values`, formData)
      } catch (error) {
        throw new Error('Thêm giá trị thuộc tính thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Bạn đã thêm giá trị thuộc tính thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['options_value']
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
    form.resetFields()
  }
  return (
    <div>
      {contextHolder}
      <div className='flex item-center justify-between max-w-4xl mx-auto mb-8'>
        <h1 className='text-2xl font-bold'>Thêm giá trị thuộc tính</h1>
        <Link to={`/admin/products/${product_id}/options_value/${option_id}`}>
          <Button>Quay lại</Button>
        </Link>
      </div>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Tiêu để'
          name='label'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá trị'
          name='value'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminOptionValueAdd
