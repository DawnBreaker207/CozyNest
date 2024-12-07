import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { IUsers } from '@/types/user'
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import CustomLoadingPage from '@/components/Loading'
import Cookies from 'js-cookie'

interface ProfileProps {
  formVisible: boolean
  handleToggle: (checked: boolean) => void
}

const ProfileUpdateAddress: React.FC<ProfileProps> = () => {
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

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data })
    }
  }, [data, form])

  if (isLoading) {
    return <CustomLoadingPage />
  }

  if (error) {
    return <div>{error?.message || 'Có lỗi xảy ra'}</div>
  }

  return (
    <>
      {contextHolder}
      <Form form={form} layout='vertical' autoComplete='off' onFinish={onFinish} initialValues={{ ...data }}>
        <Form.Item name='address' label='Địa chỉ chi tiết'>
          <Input placeholder='Building No., Street Address' />
        </Form.Item>
        <Form.Item name='city' label='Thành phố' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
          <Input placeholder='Thành phố' />
        </Form.Item>

        <div className='flex text-left gap-2'>
          <Button
            key='cancel'
            onClick={handleCancel}
            className='py-2 px-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400'
          >
            Cancel
          </Button>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='py-4 px-10'>
              Update
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}

export default ProfileUpdateAddress
