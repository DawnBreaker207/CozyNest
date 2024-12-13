import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { BackwardOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
type Props = {}
type FieldType = {
  name: string
  position?: number
}
const AdminOptionEdit = (props: Props) => {
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
  console.log('🚀 ~ AdminOptionEdit ~ data:', data)

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
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...data?.data?.res }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Tên'
          name='name'
          rules={[
            { required: true, message: 'Tên thuộc tính là bắt buộc' },
            {
              validator: (_, value) => {
                if (
                  !value ||
                  /^[a-zA-ZÀÁÂÃẢẠẮẶẲẨẦẬẪẤÈÉẺẸÊỀỆẾỂỄÌÍÒÓÔÕỎÙỤŨÚĂĐĨŨƠàáảạâãắằặẳẩầậấèéêềếểệễìíòóôõỏùụũúăđĩũơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ]+([a-zA-ZÀÁÂÃẢẠẮẶẲẨẦẬẪẤÈÉẺẸÊỀỆẾỂỄÌÍÒÓÔÕỎÙỤŨÚĂĐĨŨƠàáảạâãắằặẳẩầậấèéêềếểệễìíòóôõỏùụũúăđĩũơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ\s]*[a-zA-ZÀÁÂÃẢẠẮẶẲẨẦẬẪẤÈÉẺẸÊỀỆẾỂỄÌÍÒÓÔÕỎÙỤŨÚĂĐĨŨƠàáảạâãắằặẳẩầậấèéêềếểệễìíòóôõỏùụũúăđĩũơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ]+)$/.test(
                    value
                  )
                ) {
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
              pattern: /^[0-9]+$/,
              message: 'Vị trí phải là số và không được chứa ký tự khác'
            },
            {
              validator: (_, value) => (value < 0 ? Promise.reject('Vị trí không được là số âm!') : Promise.resolve())
            }
          ]}
        >
          <Input style={{ width: '20%' }} />
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

export default AdminOptionEdit
