import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { vietnameseTitlePattern } from '@/validations/validate'
import { BackwardOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, InputNumber, message } from 'antd'
import { Link, useParams } from 'react-router-dom'

type FieldType = {
  name: string
  position?: number
}
const AdminOptionEdit = () => {
  const { product_id, option_id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const [form] = Form.useForm()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['options', option_id],
    queryFn: async () => {
      try {
        return await instance.get(`/options/${product_id}/get/${option_id}`)
      } catch (error) {
        throw new Error('Lấy dữ liệu thuộc tính thất bại')
      }
    }
  })

  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return instance.put(`/options/${product_id}/${option_id}`, formData)
      } catch (error) {
        throw new Error('Cập nhật thuộc tính thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Bạn đã cập nhật thuộc tính thành công'
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
      <div className='flex item-center justify-between mb-5'>
        <h1 className='text-2xl font-bold'>Cập nhật thuộc tính</h1>
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
        initialValues={{ ...data?.data?.res }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Tên thuộc tính'
          className='w-1/2'
          name='name'
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
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AdminOptionEdit
