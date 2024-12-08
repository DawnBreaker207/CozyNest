import instance from '@/configs/axios'
import { useMutation } from '@tanstack/react-query'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { useNavigate } from 'react-router-dom'
type FieldType = {
  email?: string
  password?: string
  confirmPass?: string
}
const Register = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return await instance.post(`/auth/register`, formData)
      } catch (error) {
        throw new Error('Đăng Ký Thất Bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Đăng Ký Thành Công'
      }),
        setTimeout(() => {
          navigate(`/login`)
        }, 600)
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  const onFinish = (values: FieldType) => {
    console.log('Form Values: ', values)
    mutate(values)
  }

  return (
    <div
      className='flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage:
          "url('https://nhaxinh.com/wp-content/uploads/2021/11/nha-xinh-banner-thiet-ke-noi-that-new.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {contextHolder}
      <div className='bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-lg shadow-md w-full  max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-opacity-60'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6'>Đăng ký</h2>
        <Form name='register' layout='vertical' onFinish={onFinish} autoComplete='off'>
          {/* Trường Username */}
          <Form.Item
            label='Tên đăng nhập'
            name='username'
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input className='p-2' />
          </Form.Item>

          {/* Trường Email */}
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input className='p-2' />
          </Form.Item>

          {/* Trường Mật khẩu */}
          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password className='p-2' />
          </Form.Item>

          {/* Trường Xác nhận Mật khẩu */}
          <Form.Item
            label='Xác nhận mật khẩu'
            name='confirmPass'
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'))
                }
              })
            ]}
          >
            <Input.Password className='p-2' />
          </Form.Item>

          {/* Checkbox Điều khoản */}
          <Form.Item
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với điều khoản!'))
              }
            ]}
          >
            <Checkbox>
              Tôi đồng ý với <a href='/'>Điều khoản và Dịch vụ</a>
            </Checkbox>
            <br />
            <span className='flex'>
              Bạn đã có tài khoản ?
              <p>
                <a className='text-blue-500 ml-1' href='/login'>
                  Đăng nhập
                </a>
              </p>
            </span>
          </Form.Item>

          {/* Nút Đăng ký */}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full bg-blue-500 hover:bg-blue-600'>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
