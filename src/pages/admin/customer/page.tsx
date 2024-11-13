/* eslint-disable @typescript-eslint/no-explicit-any */
import { download, filters, search } from '@/components/icons'
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import { IUsers } from '@/types/user'
// import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
// import { IUsers } from '@/types/user'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, FormProps, Input, Modal, Pagination, Select, Switch } from 'antd'
import { Rule } from 'antd/es/form'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router-dom'

const AdminCustomerPage = () => {
  const [checkedId, setCheckedId] = useState<number[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
  const [pageSize] = useState(15) // Số lượng mục trên mỗi trang

  const showModal = () => {
    setIsModalVisible(true)
  }

  // const { mutate: addUser } = useAdminUsersMutations({
  //   action: 'CREATE'
  // })

  const onFinish: FormProps<IUsers>['onFinish'] = (values) => {
    console.log('Success:', values)
    // addUser(values)
    // handleCancel()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const validatePhoneNumber = (_rule: Rule, value: string) => {
    if (!value || value.replace(/\D/g, '').length === 10) {
      return Promise.resolve()
    }
    return Promise.reject('Số điện thoại không hợp lệ!')
  }
  const [formVisible, setFormVisible] = useState(false)

  const handleToggle = (checked: boolean) => {
    setFormVisible(checked)
  }
  const handleCheckbox = (_id: number) => {
    setCheckedId((prevId) =>
      prevId.includes(_id) ? prevId.filter((existingId) => existingId !== _id) : [...prevId, _id]
    )
  }
  const { data, isLoading, error } = useAdminUsersQuery()
  const users = data?.data || []
  // console.log(users)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  // Tính toán danh sách người dùng cho trang hiện tại
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentUsers = users.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className='font-poppin'>
      <div className='flex space-x-5 justify-between'>
        <div className='flex-1 relative'>
          <div className='flex items-center gap-1'>
            <img src={search} alt='' className='absolute w-[30px] pl-[14px]' />
            <input
              type='text'
              placeholder='Search order. . .'
              className='w-full px-4 py-2 rounded-lg border border-[#E0E2E7] pl-10'
            />
          </div>
        </div>
        <div className='flex items-center gap-[18px]'>
          <button className='px-[14px] py-[10px] flex items-center gap-[6px] text-[#3A5BFF] rounded-lg bg-customBlue text-sm'>
            <img src={download} alt='' />
            <span>Export</span>
          </button>
          <button
            className='px-[14px] py-[10px] flex items-center gap-[6px] text-white rounded-lg bg-[#3A5BFF] text-sm '
            onClick={showModal}
          >
            <PlusOutlined />
            Add Customer
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between mt-6'>
        <ul className='flex items-center p-1 cursor-pointer border border-[#E0E2E7] rounded-lg'>
          <li className='px-4 py-[6px] text-[#3A5BFF] bg-customBlue rounded-md'>All</li>
          <li className='px-4 py-[6px] text-[#6E7079] rounded-md'>Active</li>
          <li className='px-4 py-[6px] text-[#6E7079] rounded-md'>Blocked</li>
        </ul>
        <button className='flex item-center px-[14px] py-[10px] gap-2 rounded-lg border border-[#E0E2E7]'>
          <img src={filters} alt='' />
          <span className='text-[#667085] text-sm'>Filters</span>
        </button>
      </div>
      <section className='mt-6'>
        <div className='grid grid-cols-5 gap-6'>
          {currentUsers.map((user: any, index: any) => (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-shadowUser ${checkedId.includes(user._id) ? 'border border-[#3A5BFF]' : ''}`}
            >
              <div className='relative flex justify-center items-center'>
                <Checkbox className='absolute top-0 left-0' onClick={() => handleCheckbox(user._id)} />
                <div className='flex items-center justify-center'>
                  <img src={user.avatar} alt='' className='bg-cover bg-center size-20 rounded-full bg-[#E0E2E7]' />
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='4'
                  height='16'
                  viewBox='0 0 4 16'
                  fill='none'
                  className='absolute top-0 right-0'
                >
                  <path
                    d='M1.99999 2.66669C2.73638 2.66669 3.33334 2.06973 3.33334 1.33334C3.33334 0.596958 2.73638 0 1.99999 0C1.2636 0 0.666641 0.596958 0.666641 1.33334C0.666641 2.06973 1.2636 2.66669 1.99999 2.66669Z'
                    fill='#858D9D'
                  />
                  <path
                    d='M1.99999 9.3332C2.73638 9.3332 3.33334 8.73624 3.33334 7.99985C3.33334 7.26346 2.73638 6.6665 1.99999 6.6665C1.2636 6.6665 0.666641 7.26346 0.666641 7.99985C0.666641 8.73624 1.2636 9.3332 1.99999 9.3332Z'
                    fill='#858D9D'
                  />
                  <path
                    d='M1.99999 16.0002C2.73638 16.0002 3.33334 15.4032 3.33334 14.6669C3.33334 13.9305 2.73638 13.3335 1.99999 13.3335C1.2636 13.3335 0.666641 13.9305 0.666641 14.6669C0.666641 15.4032 1.2636 16.0002 1.99999 16.0002Z'
                    fill='#858D9D'
                  />
                </svg>
              </div>
              <div className='text-center mt-4'>
                <Link to={`/admin/customer/${user._id}`}>
                  <h3 className='font-medium text-sm text-[#353535] mb-1 cursor-pointer'>{user.username}</h3>
                </Link>
                {user.status ? (
                  <span className='text-[#3A5BFF] text-[12px] bg-customBlue px-2 py-[2px] rounded-md'>Active</span>
                ) : (
                  <span className='text-[#CC5F5F] text-[12px] bg-customWarning px-2 py-[2px] rounded-md'>Blocked</span>
                )}
              </div>
              <div className=' my-4'>
                <svg xmlns='http://www.w3.org/2000/svg' width='197' height='2' viewBox='0 0 197 2' fill='none'>
                  <path d='M0 1H197' stroke='#C2C6CE' strokeDasharray='2 5' />
                </svg>
              </div>
              <div className='grid grid-cols-2 item-center gap-3 text-center'>
                <div className='flex-col gap-y-1'>
                  <p className='text-[#667085] text-[12px]/[150%]'>Orders</p>
                  <p className='text-[#353535] text-sm'>{user.orders}</p>
                </div>
                <div className='flex-col gap-y-1'>
                  <p className='text-[#667085] text-[12px]/[150%]'>Balance</p>
                  <p className='text-[#353535] text-sm'>{user.balance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-end mt-4'>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </section>
      <Modal
        title={<h1 className='text-[#353535] font-medium text-xl mb-7'>Add a New Customer</h1>}
        open={isModalVisible}
        onCancel={handleCancel}
        okText='Add'
        centered
        width={900}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish} autoComplete='off'>
          <h2 className='text-[#8B8D97] font-medium mb-5'>Customer Information</h2>
          <Form.Item name='name' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
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
            name='phone'
            rules={[{ required: true, message: 'Không được bỏ trống!!' }, { validator: validatePhoneNumber }]}
          >
            <PhoneInput country={'us'} countryCodeEditable={false} inputStyle={{ width: '100%' }} />
          </Form.Item>
          <div className='mb-6'>
            <label htmlFor='' className='mr-4 text-[#8B8D97] text-sm '>
              Add Address
            </label>
            <Switch checked={formVisible} onChange={handleToggle} size='small' />
          </div>
          {formVisible && (
            <>
              <Form.Item name='address' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                <Input placeholder='Building No., Street Address' />
              </Form.Item>
              <Form.Item name='city' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                <Input placeholder='City' />
              </Form.Item>
              <div className='flex items-center gap-3 w-full'>
                <Form.Item name='country' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Country'
                    optionFilterProp='label'
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      {
                        value: '1',
                        label: 'Not Identified'
                      },
                      {
                        value: '2',
                        label: 'Closed'
                      },
                      {
                        value: '3',
                        label: 'Communicated'
                      },
                      {
                        value: '4',
                        label: 'Identified'
                      },
                      {
                        value: '5',
                        label: 'Resolved'
                      },
                      {
                        value: '6',
                        label: 'Cancelled'
                      }
                    ]}
                  />
                </Form.Item>
                <Form.Item name='state' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='State'
                    optionFilterProp='label'
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      {
                        value: '1',
                        label: 'Not Identified'
                      },
                      {
                        value: '2',
                        label: 'Closed'
                      },
                      {
                        value: '3',
                        label: 'Communicated'
                      },
                      {
                        value: '4',
                        label: 'Identified'
                      },
                      {
                        value: '5',
                        label: 'Resolved'
                      },
                      {
                        value: '6',
                        label: 'Cancelled'
                      }
                    ]}
                  />
                </Form.Item>
              </div>
              <h3 className='text-[#8B8D97] font-medium mb-2'>Billing Address</h3>
              <div className='flex items-center gap-5 mb-6'>
                <p className='text-[#83898C] text-sm'>Same as Customer Address</p>
                <div>
                  <Switch size='small' />
                </div>
              </div>
            </>
          )}
          <div className='flex item-center text-left gap-2'>
            <Button key='cancel' onClick={handleCancel} className='py-4 px-10'>
              Cancel
            </Button>
            <Form.Item>
              <Button type='primary' htmlType='submit' className='py-4 px-10'>
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminCustomerPage
