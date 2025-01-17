import { forgotPassword } from '@/services/auth'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const onFinish = (values: { email: string }) => {
    mutate(values)
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Failed:', errorInfo)
  }

  const { mutate } = useMutation({
    mutationFn: async (formData: { email: string }) => {
      return await forgotPassword(formData)
    },
    onSuccess: () => {
      messageApi.success('Yêu cầu đặt lại mật khẩu đã được gửi!')
      setTimeout(() => {
        handleLogout()
      }, 5000)
    },
    onError: (error) => {
      messageApi.success('Yêu cầu đặt lại mật khẩu thất bại!')
      console.error(error)
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
  }
  return (
    <>
      {contextHolder}
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
        <div className='bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-opacity-60'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6'>Lấy lại mật khẩu</h2>
          <Form
            name='reset-password'
            layout='vertical'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
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

            {/* Nút Gửi yêu cầu */}
            <Form.Item>
              <Button type='primary' htmlType='submit' className='w-full bg-blue-500 hover:bg-blue-600'>
                Gửi yêu cầu
              </Button>
            </Form.Item>

            {/* Trở về trang đăng nhập */}
            <Form.Item>
              <div className='flex justify-center'>
                <a href='/login' className='text-blue-500'>
                  Trở về trang đăng nhập
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
