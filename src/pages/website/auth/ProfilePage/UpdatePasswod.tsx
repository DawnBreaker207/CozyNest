/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useMutation } from '@tanstack/react-query'
import { Modal, Form, Input, Button, message } from 'antd'

interface CustomerModalProps {
  isModalVisible: boolean
  handleCancel: () => void
  handleToggle: (checked: boolean) => void
  formVisible: boolean
}

type FieldType = {
  email?: string
  currentPassword?: string
  password?: string
}

const UpdatePasswordModal: React.FC<CustomerModalProps> = ({ isModalVisible, handleCancel }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = (values: FieldType) => {
    mutate(values)
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }

  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      const { data } = await instance.post(`/users/changePassword`, formData)
      return data
    },
    onSuccess: () => {
      handleCancel()
      messageApi.success('Đổi mật khẩu thành công!')
    },
    onError: (error) => {
      messageApi.error('Email hoặc mật khẩu không chính xác!')
      console.log(error)
    }
  })

  return (
    <>
      {contextHolder}
      <Modal
        title={<h1 className='text-[#353535] font-medium text-xl mb-7'>Thay đổi mật khẩu</h1>}
        open={isModalVisible}
        onCancel={handleCancel}
        okText='Update'
        centered
        width={900}
        footer={null}
      >
        <Form layout='vertical' autoComplete='off' onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {/* Thêm prop form vào đây */}
          <h2 className='text-[#8B8D97] font-medium mb-5'>Thông tin cần thiết</h2>
          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng' }
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item name='currentPassword' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password placeholder='Mật khẩu cũ' className='p-2' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password placeholder='Mật khẩu mới' className='p-2' />
          </Form.Item>
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

export default UpdatePasswordModal
