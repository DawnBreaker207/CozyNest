import instance from '@/configs/axios'
import { vietnameseTitlePattern } from '@/validations/validate'
import { BackwardOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, InputNumber, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
type FieldType = {
  name: string
  position?: number
}
const AdminOptionAdd = () => {
  const { product_id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return instance.post(`/options/${product_id}`, formData)
      } catch (error) {
        throw new Error('Thêm thuộc tính thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Bạn đã thêm thuộc tính thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['options']
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
        <h1 className='text-2xl font-bold'>Thêm thuộc tính</h1>
        <Link to={`/admin/products/${product_id}/options`}>
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
          label='Tên thuộc tính'
          name='name'
          className='w-1/2'
          rules={[
            {
              required: true,
              message: 'Tên thuộc tính là bắt buộc'
            },
            {
              validator: (_, value) => {
                if (!value || vietnameseTitlePattern.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Chữ cái đầu tiên phải là chữ và không được là ký tự đặc biệt hoặc số'))
              }
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label='Vị trí'
          name='position'
          rules={[
            { required: true, message: 'Không được bỏ trống!' },
            {
              type: 'number',
              min: 0,
              message: 'Vị trí phải là số và không được là số âm'
            },
            {
              pattern: /^[1-9][0-9]*$/,
              message: 'Vị trí phải bắt đầu bằng số và không được chứa chữ hoặc ký tự đặc biệt'
            }
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Thêm thuộc tính
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminOptionAdd
