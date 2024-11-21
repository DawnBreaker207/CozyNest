import { login } from '@/services/auth'
import { IUsers } from '@/types/user'
import { openNotify } from '@/utils/notification'
import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, message } from 'antd'
import Cookies from 'js-cookie'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const [, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: async (formData: Partial<IUsers>) => {
      return await login(formData)
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken, res } = data // Giả sử response trả về chứa accessToken, refreshToken, và res
      console.log('Access Token:', accessToken)
      console.log('Refresh Token:', refreshToken) // Kiểm tra giá trị refresh token

      openNotify('Success', 'Đăng nhập thành công!')
      // Lưu trữ token vào cookie
      Cookies.set('accessToken', accessToken, { expires: 1 })
      Cookies.set('refreshToken', refreshToken, { expires: 1 })
      Cookies.set('user', JSON.stringify(res), { expires: 1 }) // Lưu thông tin người dùng

      // Điều hướng và làm mới trang

      setTimeout(() => {
        navigate(`/`)
        window.location.reload()
      }, 600)
    },
    onError: (error) => {
      openNotify('Error', error.message)
    }
  })

  const onFinish = (values: Partial<IUsers>) => {
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
      <div className='bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-opacity-60'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6'>Đăng nhập</h2>
        <Form name='login' layout='vertical' onFinish={onFinish} autoComplete='off'>
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
          <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password className='p-2' />
          </Form.Item>

          {/* Ghi nhớ tài khoản */}
          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>Ghi nhớ tài khoản</Checkbox>
          </Form.Item>

          {/* Nút Đăng nhập */}
          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full bg-blue-500 hover:bg-blue-600'>
              Đăng nhập
            </Button>
          </Form.Item>

          {/* Quên mật khẩu và Đăng ký */}
          <Form.Item>
            <div className='flex justify-between'>
              <NavLink to={'/reset-password'} className='text-blue-500'>
                Quên mật khẩu?
              </NavLink>
              <p>
                Bạn chưa có tài khoản?
                <a href='/register' className='text-blue-500'>
                  {' '}
                  Đăng ký
                </a>
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
