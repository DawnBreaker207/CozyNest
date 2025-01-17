import instance from '@/configs/axios'
import { vietnameseTitlePattern } from '@/validations/validate'
import { BackwardOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, message } from 'antd'
import { Link, useParams } from 'react-router-dom'

type FieldType = {
  label: string
  value: string
}
const AdminOptionValueAdd = () => {
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
    mutate(values)
    form.resetFields()
  }
  return (
    <div>
      {contextHolder}
      <div className='flex item-center justify-between mb-5'>
        <h1 className='text-2xl font-bold'>Thêm giá trị thuộc tính</h1>
        <Link to={`/admin/products/${product_id}/options_value/${option_id}`}>
          <Button>
            <BackwardOutlined />
            Quay lại
          </Button>
        </Link>
      </div>
      <Form
        form={form}
        name='basic'
        layout='vertical'
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Tiêu đề'
          name='label'
          className='w-1/2'
          rules={[
            { required: true, message: 'Tiêu đề không được bỏ trống!' },
            {
              pattern: vietnameseTitlePattern,
              message: 'Tiêu đề không được chứa ký tự đặc biệt và phải bắt đầu bằng chữ!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá trị'
          name='value'
          className='w-1/2'
          rules={[
            { required: true, message: 'Giá trị không được bỏ trống!' },
            {
              pattern: vietnameseTitlePattern,
              message: 'Giá trị không được chứa ký tự đặc biệt và phải bắt đầu bằng chữ!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminOptionValueAdd
