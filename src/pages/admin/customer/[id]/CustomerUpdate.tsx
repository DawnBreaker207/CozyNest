import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { IUsers } from '@/types/user'
import { Button, Form, Input, Modal, Select, Switch, message } from 'antd'
import { Rule } from 'antd/es/form'
import PhoneInput from 'react-phone-input-2'
import { useParams } from 'react-router-dom'

interface CustomerModalProps {
  isModalVisible: boolean
  handleCancel: () => void
  handleToggle: (checked: boolean) => void
  formVisible: boolean
  validatePhoneNumber: (rule: Rule, value: string) => Promise<void>
}

const CustomerModal: React.FC<CustomerModalProps> = ({
  isModalVisible,
  handleCancel,
  handleToggle,
  formVisible,
  validatePhoneNumber
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams() // Lấy ID của danh mục từ URL

  const { data, isLoading, isError, error } = useAdminUser(id)

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

  if (isLoading) return <div>Loading...</div>
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
        <Form layout='vertical' autoComplete='off' onFinish={onFinish} initialValues={{ ...data }}>
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
              <div className='flex items-center gap-3 w-full'>
                <Form.Item name='country'>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Country'
                    optionFilterProp='label'
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      { value: '1', label: 'Not Identified' },
                      { value: '2', label: 'Closed' },
                      { value: '3', label: 'Communicated' },
                      { value: '4', label: 'Identified' },
                      { value: '5', label: 'Resolved' },
                      { value: '6', label: 'Cancelled' }
                    ]}
                  />
                </Form.Item>
                <Form.Item name='status' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='State'
                    optionFilterProp='label'
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      { value: 'true', label: 'Active' },
                      { value: 'false', label: 'Blocked' }
                    ]}
                  />
                </Form.Item>
              </div>
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

export default CustomerModal
