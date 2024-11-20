import { Modal, Form, Input, Button, Switch, message } from 'antd'
import PhoneInput from 'react-phone-input-2'
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { IUsers } from '@/types/user'
import { useEffect, useState } from 'react'
import CustomLoadingPage from '@/components/Loading'

interface CustomerModalProps {
  isModalVisible: boolean
  handleCancel: () => void
  handleToggle: (checked: boolean) => void
  formVisible: boolean
  validatePhoneNumber: (rule: any, value: string) => Promise<any>
}

const ProfileModal: React.FC<CustomerModalProps> = ({
  isModalVisible,
  handleCancel,
  handleToggle,
  formVisible,
  validatePhoneNumber
}) => {
  const [messageApi, contextHolder] = message.useMessage()

  const [userId, setUserId] = useState<number | string | null>(null) // Khai báo state cho userId

  useEffect(() => {
    const userDataString = localStorage.getItem('user')

    if (userDataString) {
      const userData = JSON.parse(userDataString)

      // Kiểm tra xem dữ liệu có hợp lệ không
      if (userData && Object.keys(userData).length > 0) {
        // Lấy ra ID người dùng từ thuộc tính `res`
        const retrievedUserId = userData.data.res._id
        // Gán userId vào state
        setUserId(retrievedUserId)
      }
    }
  }, []) // useEffect chỉ chạy 1 lần sau khi component mount
  const id = userId || null
  const { data, isLoading, isError, error } = useAdminUsersQuery({ id })

  const { mutate } = useAdminUsersMutations({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật thành công')
      setTimeout(() => {
        handleCancel()
      }, 600)
    }
  })

  const onFinish = (values: IUsers) => {
    const userId = id
    mutate({ ...data, ...values, _id: userId })
  }

  if (isLoading) return <div><CustomLoadingPage/></div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <Modal
        title={<h1 className='text-[#353535] font-medium text-xl mb-7'>Update Customer</h1>}
        open={isModalVisible}
        onCancel={handleCancel}
        okText='Update'
        centered
        width={900}
        footer={null}
      >
        <Form layout='vertical' autoComplete='off' onFinish={onFinish} initialValues={{ ...data?.res }}>
          {/* Thêm prop form vào đây */}
          <h2 className='text-[#8B8D97] font-medium mb-5'>Customer Information</h2>
          <Form.Item name='username' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
            <Input placeholder='Customer Name' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Không được bỏ trống!' },
              { type: 'email', message: 'Email không đúng định dạng' }
            ]}
          >
            <Input placeholder='Customer Email' />
          </Form.Item>
          <Form.Item
            name='phoneNumber'
            rules={[{ required: true, message: 'Không được bỏ trống!' }, { validator: validatePhoneNumber }]}
          >
            <PhoneInput country={'us'} countryCodeEditable={false} inputStyle={{ width: '100%' }} />
          </Form.Item>
          <div className='mb-6'>
            <label className='mr-4 text-[#8B8D97] text-sm'>Add Address</label>
            <Switch checked={formVisible} onChange={handleToggle} size='small' />
          </div>
          {formVisible && (
            <>
              <Form.Item name='address'>
                <Input placeholder='Building No., Street Address' />
              </Form.Item>
              <Form.Item name='city' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                <Input placeholder='City' />
              </Form.Item>
            </>
          )}
          <div className='flex text-left gap-2'>
            <Button key='cancel' onClick={handleCancel} className='py-4 px-10'>
              Cancel
            </Button>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='py-4 px-10'>
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ProfileModal
