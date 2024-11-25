import { filters } from '@/components/icons'
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
// import { PlusOutlined } from '@ant-design/icons'
import { validatePhoneNumber } from '@/utils/validatorPhoneNumber'
import { Select, Table } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomerModal from './CustomerUpdate'

const AdminCustomerDetailPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleToggle = (checked: boolean) => {
    setFormVisible(checked)
  }

  const { id } = useParams() // Lấy productId từ URL
  const { data, isLoading, error } = useAdminUsersQuery({ _id: id })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data || !data) return <p>Product not found</p>
  const user = data

  // console.log(users.password)
  const dataSource = [
    {
      key: '1',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customYellow px-3 py-1 rounded-lg text-[#FFCC91]'>Processing</span>,
      date: '12 Dec 2023'
    },
    {
      key: '2',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customYellow px-3 py-1 rounded-lg text-[#FFCC91]'>Processing</span>,
      date: '12 Dec 2023'
    },
    {
      key: '3',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customBlue px-3 py-1 rounded-lg text-[#3A5BFF]'>Delivered</span>,
      date: '12 Dec 2023'
    },
    {
      key: '4',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customBlue px-3 py-1 rounded-lg text-[#3A5BFF]'>Delivered</span>,
      date: '12 Dec 2023'
    },
    {
      key: '5',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customYellow px-3 py-1 rounded-lg text-[#FFCC91]'>Processing</span>,
      date: '12 Dec 2023'
    },
    {
      key: '4',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customBlue px-3 py-1 rounded-lg text-[#3A5BFF]'>Delivered</span>,
      date: '12 Dec 2023'
    },
    {
      key: '5',
      id: <span className='text-[#3A5BFF]'>302002</span>,
      product: (
        <div className='flex items-center gap-2'>
          <div className='size-11 rounded-lg bg-[#E0E2E7]'>
            <img src='' alt='' />
          </div>
          <div>
            <h4 className='text-[#353535] text-sm '>Handmade Pouch</h4>
            <span className='text-[#667085] text-[12px]'>+3 other products</span>
          </div>
        </div>
      ),
      total: <span className='text-[14px]'>$121.00</span>,
      status: <span className='bg-customYellow px-3 py-1 rounded-lg text-[#FFCC91]'>Processing</span>,
      date: '12 Dec 2023'
    }
  ]
  // TODO : Move to another file
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    }
  ]

  return (
    <>
      <div className='grid grid-cols-[360px,auto] gap-6'>
        <section className='p-2'>
          <div className='flex flex-col'>
            <div className='bg-customBlue w-[full] h-[148px] rounded'></div>
            <div className='mx-auto relative -mt-24'>
              <img src={user.avatar} alt='' className='bg-cover bg-center size-[148px] rounded-full bg-[#E0E2E7]' />
              <div className='text-center mt-3'>
                <h3 className='font-medium text-[#353535] mb-2 cursor-pointer'>{user.username}</h3>
                {user.status ? (
                  <span className='text-[#3A5BFF] text-[12px] bg-customBlue px-2 py-[2px] rounded-md'>Active</span>
                ) : (
                  <span className='text-[#CC5F5F] text-[12px] bg-customWarning px-2 py-[2px] rounded-md'>Blocked</span>
                )}
              </div>
            </div>
            <hr className='border border-[#E0E2E7] my-6 mx-4' />
            <div className='px-4 mb-[18px]'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center size-10 p-2 bg-[#F0F1F3] rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_31_6708)'>
                      <path
                        d='M14.25 3H11.25V2.25C11.25 1.65326 11.0129 1.08097 10.591 0.65901C10.169 0.237053 9.59674 0 9 0C8.40326 0 7.83097 0.237053 7.40901 0.65901C6.98705 1.08097 6.75 1.65326 6.75 2.25V3H3.75C2.7558 3.00119 1.80267 3.39666 1.09966 4.09966C0.396661 4.80267 0.00119089 5.7558 0 6.75L0 14.25C0.00119089 15.2442 0.396661 16.1973 1.09966 16.9003C1.80267 17.6033 2.7558 17.9988 3.75 18H14.25C15.2442 17.9988 16.1973 17.6033 16.9003 16.9003C17.6033 16.1973 17.9988 15.2442 18 14.25V6.75C17.9988 5.7558 17.6033 4.80267 16.9003 4.09966C16.1973 3.39666 15.2442 3.00119 14.25 3ZM7.5 13.5C7.5 13.6989 7.42098 13.8897 7.28033 14.0303C7.13968 14.171 6.94891 14.25 6.75 14.25H3C2.80109 14.25 2.61032 14.171 2.46967 14.0303C2.32902 13.8897 2.25 13.6989 2.25 13.5V7.5C2.25 7.30109 2.32902 7.11032 2.46967 6.96967C2.61032 6.82902 2.80109 6.75 3 6.75H6.75C6.94891 6.75 7.13968 6.82902 7.28033 6.96967C7.42098 7.11032 7.5 7.30109 7.5 7.5V13.5ZM9 4.5C8.80109 4.5 8.61032 4.42098 8.46967 4.28033C8.32902 4.13968 8.25 3.94891 8.25 3.75V2.25C8.25 2.05109 8.32902 1.86032 8.46967 1.71967C8.61032 1.57902 8.80109 1.5 9 1.5C9.19891 1.5 9.38968 1.57902 9.53033 1.71967C9.67098 1.86032 9.75 2.05109 9.75 2.25V3.75C9.75 3.94891 9.67098 4.13968 9.53033 4.28033C9.38968 4.42098 9.19891 4.5 9 4.5ZM13.5 14.25H10.5C10.3011 14.25 10.1103 14.171 9.96967 14.0303C9.82902 13.8897 9.75 13.6989 9.75 13.5C9.75 13.3011 9.82902 13.1103 9.96967 12.9697C10.1103 12.829 10.3011 12.75 10.5 12.75H13.5C13.6989 12.75 13.8897 12.829 14.0303 12.9697C14.171 13.1103 14.25 13.3011 14.25 13.5C14.25 13.6989 14.171 13.8897 14.0303 14.0303C13.8897 14.171 13.6989 14.25 13.5 14.25ZM15 11.25H10.5C10.3011 11.25 10.1103 11.171 9.96967 11.0303C9.82902 10.8897 9.75 10.6989 9.75 10.5C9.75 10.3011 9.82902 10.1103 9.96967 9.96967C10.1103 9.82902 10.3011 9.75 10.5 9.75H15C15.1989 9.75 15.3897 9.82902 15.5303 9.96967C15.671 10.1103 15.75 10.3011 15.75 10.5C15.75 10.6989 15.671 10.8897 15.5303 11.0303C15.3897 11.171 15.1989 11.25 15 11.25ZM15 8.25H10.5C10.3011 8.25 10.1103 8.17098 9.96967 8.03033C9.82902 7.88968 9.75 7.69891 9.75 7.5C9.75 7.30109 9.82902 7.11032 9.96967 6.96967C10.1103 6.82902 10.3011 6.75 10.5 6.75H15C15.1989 6.75 15.3897 6.82902 15.5303 6.96967C15.671 7.11032 15.75 7.30109 15.75 7.5C15.75 7.69891 15.671 7.88968 15.5303 8.03033C15.3897 8.17098 15.1989 8.25 15 8.25ZM3.75 8.25H6V12.75H3.75V8.25Z'
                        fill='#667085'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6708'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className='text-[#667085] text-sm mb-1'>Customer ID</h4>
                  <span className='text-[#353535] text-sm'>ID-011221</span>
                </div>
              </div>
            </div>
            <div className='px-4 mb-[18px]'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center size-10 p-2 bg-[#F0F1F3] rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_31_6714)'>
                      <path
                        d='M17.9655 4.15625L11.652 10.4698C10.948 11.1719 9.99431 11.5663 9 11.5663C8.00569 11.5663 7.05197 11.1719 6.348 10.4698L0.0345 4.15625C0.024 4.27475 0 4.382 0 4.49975V13.4998C0.00119089 14.4939 0.396661 15.4471 1.09966 16.1501C1.80267 16.8531 2.7558 17.2486 3.75 17.2498H14.25C15.2442 17.2486 16.1973 16.8531 16.9003 16.1501C17.6033 15.4471 17.9988 14.4939 18 13.4998V4.49975C18 4.382 17.976 4.27475 17.9655 4.15625Z'
                        fill='#667085'
                      />
                      <path
                        d='M10.5915 9.4095L17.442 2.55825C17.1101 2.00799 16.6421 1.55253 16.083 1.2358C15.5239 0.919067 14.8926 0.751755 14.25 0.75H3.74998C3.1074 0.751755 2.47611 0.919067 1.917 1.2358C1.3579 1.55253 0.889842 2.00799 0.557983 2.55825L7.40848 9.4095C7.83116 9.83048 8.40342 10.0669 8.99998 10.0669C9.59655 10.0669 10.1688 9.83048 10.5915 9.4095Z'
                        fill='#667085'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6714'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className='text-[#667085] text-sm mb-1'>E-mail</h4>
                  <span className='text-[#353535] text-sm'>{user.email}</span>
                </div>
              </div>
            </div>
            <div className='px-4 mb-[18px]'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center size-10 p-3 bg-[#F0F1F3] rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_31_6720)'>
                      <path
                        d='M9.00003 0.0317383C7.01549 0.0339216 5.11284 0.823195 3.70948 2.22641C2.30613 3.62963 1.51666 5.53219 1.51428 7.51674C1.51428 9.44424 3.00678 12.4607 5.95053 16.4822C6.30098 16.9623 6.75983 17.3529 7.28973 17.6222C7.81964 17.8914 8.40564 18.0318 9.00003 18.0318C9.59443 18.0318 10.1804 17.8914 10.7103 17.6222C11.2402 17.3529 11.6991 16.9623 12.0495 16.4822C14.9933 12.4607 16.4858 9.44424 16.4858 7.51674C16.4834 5.53219 15.6939 3.62963 14.2906 2.22641C12.8872 0.823195 10.9846 0.0339216 9.00003 0.0317383ZM9.00003 10.5002C8.40669 10.5002 7.82667 10.3243 7.33332 9.99465C6.83997 9.665 6.45546 9.19647 6.22839 8.64829C6.00133 8.10011 5.94192 7.49691 6.05768 6.91497C6.17343 6.33302 6.45915 5.79848 6.87871 5.37892C7.29827 4.95936 7.83282 4.67364 8.41476 4.55788C8.99671 4.44213 9.59991 4.50154 10.1481 4.7286C10.6963 4.95566 11.1648 5.34018 11.4944 5.83353C11.8241 6.32688 12 6.90689 12 7.50024C12 8.29589 11.684 9.05895 11.1214 9.62156C10.5587 10.1842 9.79568 10.5002 9.00003 10.5002Z'
                        fill='#667085'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6720'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className='text-[#667085] text-sm mb-1'>Address</h4>
                  <span className='text-[#353535] text-sm'>{user.city}</span>
                </div>
              </div>
            </div>
            <div className='px-4 mb-[18px]'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center size-10 p-2 bg-[#F0F1F3] rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_31_6726)'>
                      <path
                        d='M11.25 0H6.75C5.7558 0.00119089 4.80267 0.396661 4.09966 1.09966C3.39666 1.80267 3.00119 2.7558 3 3.75V12H15V3.75C14.9988 2.7558 14.6033 1.80267 13.9003 1.09966C13.1973 0.396661 12.2442 0.00119089 11.25 0V0Z'
                        fill='#667085'
                      />
                      <path
                        d='M3 14.25C3.00119 15.2442 3.39666 16.1973 4.09966 16.9003C4.80267 17.6033 5.7558 17.9988 6.75 18H11.25C12.2442 17.9988 13.1973 17.6033 13.9003 16.9003C14.6033 16.1973 14.9988 15.2442 15 14.25V13.5H3V14.25ZM9 15C9.14834 15 9.29334 15.044 9.41668 15.1264C9.54001 15.2088 9.63614 15.3259 9.69291 15.463C9.74968 15.6 9.76453 15.7508 9.73559 15.8963C9.70665 16.0418 9.63522 16.1754 9.53033 16.2803C9.42544 16.3852 9.2918 16.4567 9.14632 16.4856C9.00083 16.5145 8.85003 16.4997 8.71299 16.4429C8.57594 16.3861 8.45881 16.29 8.3764 16.1667C8.29399 16.0433 8.25 15.8983 8.25 15.75C8.25 15.5511 8.32902 15.3603 8.46967 15.2197C8.61032 15.079 8.80109 15 9 15Z'
                        fill='#667085'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6726'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className='text-[#667085] text-sm mb-1'>Phone Number</h4>
                  <span className='text-[#353535] text-sm'>{user.phoneNumber}</span>
                </div>
              </div>
            </div>
            <div className='px-4 mb-[18px]'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center size-10 p-2 bg-[#F0F1F3] rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_31_6732)'>
                      <path
                        d='M13.5 9C12.7098 9.00092 11.9333 8.7935 11.2488 8.39865C10.5643 8.0038 9.99604 7.43547 9.60123 6.75096C9.20642 6.06645 8.99904 5.28995 9.00001 4.49974C9.00098 3.70953 9.21026 2.93354 9.60675 2.25H3.1815L3.15 1.986C3.08537 1.43895 2.82229 0.934615 2.41064 0.568578C1.99899 0.202541 1.46736 0.000234627 0.9165 0L0.75 0C0.551088 0 0.360322 0.0790176 0.21967 0.21967C0.0790176 0.360322 0 0.551088 0 0.75C0 0.948912 0.0790176 1.13968 0.21967 1.28033C0.360322 1.42098 0.551088 1.5 0.75 1.5H0.9165C1.1002 1.50002 1.2775 1.56747 1.41478 1.68954C1.55206 1.81161 1.63976 1.97981 1.66125 2.16225L2.69325 10.9373C2.80039 11.8498 3.23886 12.6913 3.92543 13.302C4.612 13.9127 5.49889 14.25 6.41775 14.25H14.25C14.4489 14.25 14.6397 14.171 14.7803 14.0303C14.921 13.8897 15 13.6989 15 13.5C15 13.3011 14.921 13.1103 14.7803 12.9697C14.6397 12.829 14.4489 12.75 14.25 12.75H6.41775C5.95341 12.7488 5.5008 12.6041 5.12201 12.3355C4.74321 12.067 4.45678 11.6878 4.302 11.25H13.2428C14.122 11.2501 14.9733 10.9412 15.6479 10.3773C16.3225 9.81348 16.7775 9.03052 16.9335 8.16525L17.112 7.176C16.6948 7.74162 16.1506 8.20136 15.5232 8.51817C14.8959 8.83499 14.2028 9.00003 13.5 9Z'
                        fill='#667085'
                      />
                      <path
                        d='M5.25 18.0005C6.07842 18.0005 6.74999 17.3289 6.74999 16.5005C6.74999 15.6721 6.07842 15.0005 5.25 15.0005C4.42157 15.0005 3.75 15.6721 3.75 16.5005C3.75 17.3289 4.42157 18.0005 5.25 18.0005Z'
                        fill='#667085'
                      />
                      <path
                        d='M12.75 18.0005C13.5784 18.0005 14.25 17.3289 14.25 16.5005C14.25 15.6721 13.5784 15.0005 12.75 15.0005C11.9216 15.0005 11.25 15.6721 11.25 16.5005C11.25 17.3289 11.9216 18.0005 12.75 18.0005Z'
                        fill='#667085'
                      />
                      <path
                        d='M11.7998 6.70931C11.9288 6.84863 12.0847 6.96033 12.2581 7.03768C12.4315 7.11503 12.6187 7.1564 12.8086 7.15931H12.8333C13.0194 7.15992 13.2037 7.12358 13.3756 7.05238C13.5474 6.98118 13.7035 6.87655 13.8346 6.74456L17.0386 3.54056C17.1799 3.39953 17.2594 3.20814 17.2596 3.00848C17.2598 2.80883 17.1807 2.61726 17.0397 2.47594C16.8987 2.33461 16.7073 2.25509 16.5076 2.25488C16.308 2.25467 16.1164 2.33378 15.9751 2.47481L12.8348 5.62031L11.9093 4.62731C11.7735 4.48181 11.5854 4.39623 11.3864 4.38941C11.1875 4.38259 10.994 4.45508 10.8485 4.59094C10.7029 4.72679 10.6174 4.91489 10.6105 5.11384C10.6037 5.31279 10.6762 5.50631 10.8121 5.65181L11.7998 6.70931Z'
                        fill='#667085'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6732'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className='text-[#667085] text-sm mb-1'>Last Transaction</h4>
                  <span className='text-[#353535] text-sm'>12 December 2022</span>
                </div>
              </div>
            </div>
            <div className='px-4 mb-[18px]'>
              <div className='flex gap-2'>
                <div className='flex items-center justify-center size-10 p-2 bg-[#F0F1F3] rounded-full'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'>
                    <g clipPath='url(#clip0_31_6738)'>
                      <path
                        d='M14.2131 17.2507H14.1884C13.8051 17.2447 13.4406 17.0819 13.1804 16.8007L11.7419 15.3899C11.4539 15.0922 11.4606 14.6174 11.7584 14.3294C11.7591 14.3287 11.7599 14.3279 11.7606 14.3272C12.0584 14.0414 12.5309 14.0497 12.8181 14.3452L14.2139 15.7124L16.7196 13.2067C17.0121 12.9142 17.4876 12.9142 17.7801 13.2067C18.0726 13.4992 18.0726 13.9747 17.7801 14.2672L15.2144 16.8329C14.9504 17.1007 14.5896 17.2514 14.2131 17.2507Z'
                        fill='#667085'
                      />
                      <path
                        d='M10.5262 15.0114C10.5232 12.5386 12.525 10.5316 14.997 10.5279C15.9592 10.5264 16.8967 10.8354 17.6692 11.4091C18.999 6.6204 16.1947 1.66065 11.4067 0.330897C6.61874 -0.998853 1.65974 1.80465 0.32999 6.5934C-0.99976 11.3821 1.80449 16.3426 6.59249 17.6724C8.16749 18.1096 9.83174 18.1096 11.4067 17.6724C10.8352 16.9029 10.5262 15.9699 10.5262 15.0114ZM9.74999 9.01665C9.74999 9.21615 9.67049 9.40665 9.52949 9.54765L7.27574 11.8021C6.97724 12.0901 6.50174 12.0819 6.21374 11.7834C5.93249 11.4924 5.93249 11.0304 6.21374 10.7394L8.24774 8.7054V5.2599C8.24774 4.84515 8.58374 4.5084 8.99924 4.5084C9.41399 4.5084 9.74999 4.84515 9.74999 5.2599V9.01665Z'
                        fill='#667085'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6738'>
                        <rect width='18' height='18' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <h4 className='text-[#667085] text-sm mb-1'>Last Online</h4>
                  <span className='text-[#353535] text-sm'>1 Day Ago</span>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={showModal}
                className='px-[14px] py-[10px] flex items-center gap-[6px] text-white rounded-lg bg-[#3A5BFF] text-sm '
              >
                Update Customer
              </button>
              <CustomerModal
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                handleToggle={handleToggle}
                formVisible={formVisible}
                validatePhoneNumber={validatePhoneNumber}
              />
            </div>
          </div>
        </section>
        <section className=''>
          <div className='grid grid-cols-2 gap-4'>
            <div className='px-4 py-3 rounded-xl shadow-md'>
              <div className='flex item-center justify-between '>
                <div className='p-2 bg-customBlue rounded-lg flex items-center justify-center'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <g clipPath='url(#clip0_5240_706)'>
                      <path
                        d='M17.6751 13.2417C17.1449 14.4955 16.3157 15.6002 15.2599 16.4595C14.2042 17.3187 12.954 17.9063 11.6187 18.1707C10.2835 18.4352 8.90374 18.3685 7.60017 17.9766C6.29661 17.5846 5.10891 16.8793 4.1409 15.9223C3.1729 14.9653 2.45406 13.7857 2.04725 12.4867C1.64043 11.1877 1.55802 9.8088 1.80722 8.47059C2.05641 7.13238 2.62963 5.87559 3.47676 4.81009C4.32388 3.74459 5.41912 2.90283 6.66672 2.3584'
                        stroke='#3A5BFF'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M18.3333 9.99984C18.3333 8.90549 18.1178 7.82185 17.699 6.81081C17.2802 5.79976 16.6664 4.8811 15.8926 4.10728C15.1187 3.33346 14.2001 2.71963 13.189 2.30084C12.178 1.88205 11.0943 1.6665 10 1.6665V9.99984H18.3333Z'
                        stroke='#3A5BFF'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_5240_706'>
                        <rect width='20' height='20' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <Select
                  defaultValue='alltime'
                  style={{ width: 85 }}
                  // onChange={handleChange}
                  options={[
                    { value: 'alltime', label: <span className='text-[12px]'>All-time</span> },
                    { value: 'time', label: <span className='text-[12px]'>time</span> }
                  ]}
                />
              </div>
              <div className='mt-7'>
                <h3 className='text-[#8B8D97] text-[14px]'>Total Orders</h3>
                <span className='text-[#353535] text-xl font-medium mt-2'>25,00.00</span>
              </div>
            </div>
            <div className='px-4 py-3 rounded-xl shadow-md'>
              <div className='flex item-center justify-between'>
                <div className='p-2 bg-customYellow rounded-lg flex items-center justify-center'>
                  {/* TODO: Move to another file */}
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
                    <g clipPath='url(#clip0_5240_1043)'>
                      <path
                        d='M16.6667 18.3332C17.1269 18.3332 17.5 17.9601 17.5 17.4998C17.5 17.0396 17.1269 16.6665 16.6667 16.6665C16.2065 16.6665 15.8334 17.0396 15.8334 17.4998C15.8334 17.9601 16.2065 18.3332 16.6667 18.3332Z'
                        stroke='#353535'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M7.49996 18.3332C7.9602 18.3332 8.33329 17.9601 8.33329 17.4998C8.33329 17.0396 7.9602 16.6665 7.49996 16.6665C7.03972 16.6665 6.66663 17.0396 6.66663 17.4998C6.66663 17.9601 7.03972 18.3332 7.49996 18.3332Z'
                        stroke='#353535'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M0.833374 0.833496H4.16671L6.40004 11.9918C6.47624 12.3755 6.68496 12.7201 6.98966 12.9654C7.29436 13.2107 7.67562 13.341 8.06671 13.3335H16.1667C16.5578 13.341 16.9391 13.2107 17.2438 12.9654C17.5484 12.7201 17.7572 12.3755 17.8334 11.9918L19.1667 5.00016H5.00004'
                        stroke='#353535'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_5240_1043'>
                        <rect width='20' height='20' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className='mt-7'>
                <h3 className='text-[#CC5F5F] text-[14px]'>Abandoned Cart</h3>
                <span className='text-[#353535] text-xl font-medium mt-2'>2</span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-5'>
            <div className='px-4 py-3 rounded-xl shadow-md'>
              <div className='flex item-center justify-between '>
                <div className='p-2 bg-customYellow rounded-lg flex items-center justify-center'>
                  {/* TODO: Move to another file */}
                  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M11.7615 16.9166H4.80495C2.24965 16.9166 0.289314 15.9936 0.84614 12.2789L1.4945 7.24457C1.83775 5.39102 3.02005 4.68164 4.05743 4.68164H12.5395C13.5921 4.68164 14.7058 5.44442 15.1024 7.24457L15.7508 12.2789C16.2237 15.5741 14.3168 16.9166 11.7615 16.9166Z'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M11.8759 4.49877C11.8759 2.51038 10.264 0.89847 8.27559 0.89847V0.89847C7.31809 0.894413 6.39842 1.27194 5.71993 1.94757C5.04144 2.62319 4.66003 3.54127 4.66003 4.49877H4.66003'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10.747 8.25151H10.7089'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M5.88813 8.25151H5.84999'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <Select
                  defaultValue='alltime'
                  style={{ width: 85 }}
                  // onChange={handleChange}
                  options={[
                    { value: 'alltime', label: <span className='text-[12px]'>All-time</span> },
                    { value: 'time', label: <span className='text-[12px]'>time</span> }
                  ]}
                />
              </div>
              <div className='mt-7 grid grid-cols-3 gap-14'>
                <div>
                  <h3 className='text-[#8B8D97] text-[14px]'>All Orders</h3>
                  <span className='text-[#353535] text-xl font-medium mt-2'>10</span>
                </div>
                <div>
                  <h3 className='text-[#8B8D97] text-[14px]'>Pending</h3>
                  <span className='text-[#353535] text-xl font-medium mt-2'>2</span>
                </div>
                <div>
                  <h3 className='text-[#8B8D97] text-[14px]'>Completed</h3>
                  <span className='text-[#353535] text-xl font-medium mt-2'>8</span>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 rounded-xl shadow-md'>
              <div className='flex item-center justify-between '>
                <div className='p-2 bg-customYellow rounded-lg flex items-center justify-center'>
                  {/* TODO: Move to another file */}
                  <svg xmlns='http://www.w3.org/2000/svg' width='17' height='18' viewBox='0 0 17 18' fill='none'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M11.7615 16.9166H4.80495C2.24965 16.9166 0.289314 15.9936 0.84614 12.2789L1.4945 7.24457C1.83775 5.39102 3.02005 4.68164 4.05743 4.68164H12.5395C13.5921 4.68164 14.7058 5.44442 15.1024 7.24457L15.7508 12.2789C16.2237 15.5741 14.3168 16.9166 11.7615 16.9166Z'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M11.8759 4.49877C11.8759 2.51038 10.264 0.89847 8.27559 0.89847V0.89847C7.31809 0.894413 6.39842 1.27194 5.71993 1.94757C5.04144 2.62319 4.66003 3.54127 4.66003 4.49877H4.66003'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10.747 8.25151H10.7089'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M5.88813 8.25151H5.84999'
                      stroke='#353535'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <Select
                  defaultValue='alltime'
                  style={{ width: 85 }}
                  // onChange={handleChange}
                  options={[
                    { value: 'alltime', label: <span className='text-[12px]'>All-time</span> },
                    { value: 'time', label: <span className='text-[12px]'>time</span> }
                  ]}
                />
              </div>
              <div className='mt-7 grid grid-cols-3 gap-14'>
                <div>
                  <h3 className='text-[#8B8D97] text-[14px]'>Canceled</h3>
                  <span className='text-[#353535] text-xl font-medium mt-2'>0</span>
                </div>
                <div>
                  <h3 className='text-[#8B8D97] text-[14px]'>Returned</h3>
                  <span className='text-[#353535] text-xl font-medium mt-2'>0</span>
                </div>
                <div>
                  <h3 className='text-[#8B8D97] text-[14px]'>Damaged</h3>
                  <span className='text-[#353535] text-xl font-medium mt-2'>0</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-10 mb-5 flex items-center justify-between'>
            <h2 className='text-[#1D1F2C] text-xl font-semibold'>Transaction History</h2>
            <div className='flex items-center gap-3'>
              <div className='py-[10px] px-[14px] flex item-center gap-2 border border-[#E0E2E7] rounded-lg'>
                <div className='flex items-center justify-center'>
                  {/* TODO: Move to another file */}
                  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
                    <g clipPath='url(#clip0_31_6786)'>
                      <path
                        d='M0 12.6665C0.00105857 13.5502 0.352588 14.3975 0.97748 15.0224C1.60237 15.6472 2.4496 15.9988 3.33333 15.9998H12.6667C13.5504 15.9988 14.3976 15.6472 15.0225 15.0224C15.6474 14.3975 15.9989 13.5502 16 12.6665V6.6665H0V12.6665ZM11.3333 9.6665C11.5311 9.6665 11.7245 9.72515 11.8889 9.83503C12.0534 9.94492 12.1815 10.1011 12.2572 10.2838C12.3329 10.4665 12.3527 10.6676 12.3141 10.8616C12.2755 11.0556 12.1803 11.2338 12.0404 11.3736C11.9006 11.5135 11.7224 11.6087 11.5284 11.6473C11.3344 11.6859 11.1334 11.6661 10.9507 11.5904C10.7679 11.5147 10.6117 11.3865 10.5019 11.2221C10.392 11.0576 10.3333 10.8643 10.3333 10.6665C10.3333 10.4013 10.4387 10.1469 10.6262 9.9594C10.8138 9.77186 11.0681 9.6665 11.3333 9.6665ZM8 9.6665C8.19778 9.6665 8.39112 9.72515 8.55557 9.83503C8.72002 9.94492 8.84819 10.1011 8.92388 10.2838C8.99957 10.4665 9.01937 10.6676 8.98079 10.8616C8.9422 11.0556 8.84696 11.2338 8.70711 11.3736C8.56726 11.5135 8.38907 11.6087 8.19509 11.6473C8.00111 11.6859 7.80004 11.6661 7.61732 11.5904C7.43459 11.5147 7.27841 11.3865 7.16853 11.2221C7.05865 11.0576 7 10.8643 7 10.6665C7 10.4013 7.10536 10.1469 7.29289 9.9594C7.48043 9.77186 7.73478 9.6665 8 9.6665ZM4.66667 9.6665C4.86445 9.6665 5.05779 9.72515 5.22224 9.83503C5.38669 9.94492 5.51486 10.1011 5.59055 10.2838C5.66623 10.4665 5.68604 10.6676 5.64745 10.8616C5.60887 11.0556 5.51363 11.2338 5.37377 11.3736C5.23392 11.5135 5.05574 11.6087 4.86176 11.6473C4.66778 11.6859 4.46671 11.6661 4.28398 11.5904C4.10126 11.5147 3.94508 11.3865 3.8352 11.2221C3.72532 11.0576 3.66667 10.8643 3.66667 10.6665C3.66667 10.4013 3.77202 10.1469 3.95956 9.9594C4.1471 9.77186 4.40145 9.6665 4.66667 9.6665Z'
                        fill='#858D9D'
                      />
                      <path
                        d='M12.6667 1.33333H12V0.666667C12 0.489856 11.9298 0.320286 11.8047 0.195262C11.6797 0.0702379 11.5101 0 11.3333 0C11.1565 0 10.987 0.0702379 10.8619 0.195262C10.7369 0.320286 10.6667 0.489856 10.6667 0.666667V1.33333H5.33333V0.666667C5.33333 0.489856 5.2631 0.320286 5.13807 0.195262C5.01305 0.0702379 4.84348 0 4.66667 0C4.48986 0 4.32029 0.0702379 4.19526 0.195262C4.07024 0.320286 4 0.489856 4 0.666667V1.33333H3.33333C2.4496 1.33439 1.60237 1.68592 0.97748 2.31081C0.352588 2.93571 0.00105857 3.78294 0 4.66667L0 5.33333H16V4.66667C15.9989 3.78294 15.6474 2.93571 15.0225 2.31081C14.3976 1.68592 13.5504 1.33439 12.6667 1.33333Z'
                        fill='#858D9D'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_31_6786'>
                        <rect width='16' height='16' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className='text-[#858D9D] text-[14px]'>Select Date</span>
              </div>
              <div className='py-[10px] px-[14px] flex item-center gap-2 border border-[#E0E2E7] rounded-lg'>
                <div className='flex items-center justify-center'>
                  <img src={filters} alt='' />
                </div>
                <span className='text-[#858D9D] text-[14px]'>Filters</span>
              </div>
            </div>
          </div>
          <div>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{
                pageSize: 5
              }}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default AdminCustomerDetailPage
