import { Button, Form, Input, message } from 'antd'
import { Rule } from 'antd/es/form'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
// import PhoneInput from 'react-phone-input-2'
import CustomLoadingPage from '@/components/Loading'
import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { IUsers } from '@/types/user'

interface ProfileProps {
  formVisible: boolean
  handleToggle: (checked: boolean) => void
  validatePhoneNumber: (rule: Rule, value: string) => Promise<void>
}

const ProfilePage: React.FC<ProfileProps> = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [form] = Form.useForm()

  useEffect(() => {
    const userDataString = Cookies.get('user')
    if (userDataString) {
      const userData = JSON.parse(userDataString)
      if (userData && Object.keys(userData).length > 0) {
        const retrievedUserId = userData?._id
        setUserId(retrievedUserId)
      }
    }
  }, [])

  const id = userId || undefined
  const { data, isLoading, error } = useAdminUser(id)

  const { mutate } = useAdminUsersMutations({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật thành công')
    }
  })

  const onFinish = (values: Partial<IUsers>) => {
    mutate({ ...data, ...values, _id: userId })
  }

  const handleCancel = () => {
    form.resetFields()
  }

  if (isLoading) {
    return <CustomLoadingPage />
  }

  if (error) {
    return <div>{error?.message || 'Có lỗi xảy ra'}</div>
  }

  return (
    <>
      {contextHolder}
      <div>
        <Form form={form} layout='vertical' autoComplete='off' onFinish={onFinish} initialValues={{ ...data }}>
          <Form.Item
            name='username'
            label='Tên khách hàng'
            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
          >
            <Input
              className='w-full py-3 px-4 border border-gray-300 rounded-md text-sm'
              placeholder='Tên khách hàng'
            />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email khách hàng'
            rules={[
              { required: true, message: 'Không được bỏ trống!' },
              { type: 'email', message: 'Email không đúng định dạng' }
            ]}
          >
            <Input
              className='w-full py-3 px-4 border border-gray-300 rounded-md text-sm'
              placeholder='Email khách hàng'
            />
          </Form.Item>
          <Form.Item
            name='phoneNumber'
            label='Số điện thoại khách hàng'
            rules={[
              { required: true, message: 'Không được bỏ trống!' },
              {
                pattern: /^0\d{9}$/,
                message: 'Số điện thoại phải bắt đầu bằng 0 và gồm 10 chữ số'
              }
            ]}
          >
            <Input className='w-full py-3 px-4 border border-gray-300 rounded-md text-sm' placeholder='Số điện thoại' />
          </Form.Item>

          <div className='flex gap-4'>
            <Button
              key='cancel'
              onClick={handleCancel}
              className='py-2 px-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
            >
              Cancel
            </Button>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              >
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ProfilePage
