import CustomLoadingPage from '@/components/Loading'
import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import { validatePhoneNumber } from '@/utils/validatorPhoneNumber'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileModal from './ProfileUpdate'
import UpdatePasswordModal from './UpdatePasswod'

const ProfilePage = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined) // Khai báo state cho userId


  useEffect(() => {
    const userDataString = Cookies.get('user')

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString)
        const retrievedUserId = userData?._id
        if (retrievedUserId) {
          setUserId(retrievedUserId)
        } else {
          console.warn('Không tìm thấy ID người dùng trong dữ liệu')
        }
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu từ cookie:', error)
      }
    } else {
      console.log('Cookie "user" không tồn tại hoặc trống')
    }
  }, [])

  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false)
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  const showAccountModal = () => {
    setIsAccountModalVisible(true)
  }

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true)
  }

  const handleCancel = () => {
    setIsAccountModalVisible(false)
    setIsPasswordModalVisible(false)
  }

  const handleToggle = (checked: boolean) => {
    setFormVisible(checked)
  }

  // Sử dụng id từ state
  const id = userId || undefined
  const { data: userData, isLoading, error } = useAdminUser(id)


  if (isLoading) {
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  const userDetail = userData?.res
  return (
    <>
      <div
        className='flex justify-center items-start bg-gray-100 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage:
            "url('https://nhaxinh.com/wp-content/uploads/2021/11/nha-xinh-banner-thiet-ke-noi-that-new.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className='w-full max-w-7xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mt-10 mb-10'>
          <aside className='w-full md:w-1/4 bg-gray-100 p-6 border-b md:border-r'>
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>Menu</h2>
            <nav className='space-y-4'>
              <Link
                to=''
                className='block px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition duration-200'
              >
                Thông tin tài khoản
              </Link>
              <Link
                to='#orders'
                className='block px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition duration-200'
              >
                Đơn hàng
              </Link>
            </nav>
          </aside>

          <div className='w-full md:w-3/4 p-8 pt-10'>
            <div className='text-center mb-8'>
              <h1 className='text-3xl font-bold text-gray-800'>Thông tin tài khoản</h1>
              <p className='text-md text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>

            <div id='profile' className='flex flex-col md:flex-row items-start gap-6'>
              <div className='w-full md:w-1/3 text-center flex-shrink-0'>
                <img
                  src={userDetail?.avatar}
                  alt=''
                  className='w-40 h-40 mx-auto rounded-full border-4 border-pink-300'
                />
                <h1 className='text-2xl font-bold text-gray-800 mt-4'>{userDetail.username}</h1>
                <div className='text-center mt-3'>

                  {userDetail.status ? (
                    <span className='text-[#3A5BFF] text-[12px] bg-customBlue px-2 py-[2px] rounded-md'>Active</span>
                  ) : (
                    <span className='text-[#CC5F5F] text-[12px] bg-customWarning px-2 py-[2px] rounded-md'>
                      Blocked
                    </span>
                  )
                  }
                </div >
              </div >
              <hr className='border border-[#666666] my-5 mx-4' />
              <h1 className='text-center -mt-2 mb-2 text-2xl font-bold text-[#667085]'>Thông tin tài khoản</h1>
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
                    <span className='text-[#353535] text-sm'>{userDetail?.email}</span>
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
                    <span className='text-[#353535] text-sm'>{userDetail?.city}</span>
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
                    <span className='text-[#353535] text-sm'>{userDetail?.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div >
            <hr className='border border-[#666666] mb-5 mx-4' />
            <h1 className='text-center mb-5 text-2xl font-bold text-[#667085]'>Thay đổi thông tin</h1>
            <div className='flex flex-col gap-2 flex items-center justify-center'>
              <div>
                <button
                  onClick={showAccountModal}
                  className='px-[14px] py-[10px] flex items-center gap-[6px] text-white rounded-lg bg-[#3A5BFF] text-sm '
                >
                  Cập nhật tài khoản
                </button>
                <ProfileModal
                  isModalVisible={isAccountModalVisible}
                  handleCancel={handleCancel}
                  handleToggle={handleToggle}
                  formVisible={formVisible}
                  validatePhoneNumber={validatePhoneNumber}
                />
              </div>
              <div>
                <button
                  onClick={showPasswordModal}
                  className='px-[14px] py-[10px] flex items-center gap-[6px] text-white rounded-lg bg-[#3A5BFF] text-sm '
                >
                  Cập nhật mật khẩu
                </button>
                <UpdatePasswordModal
                  isModalVisible={isPasswordModalVisible}
                  handleCancel={handleCancel}
                  handleToggle={handleToggle}
                  formVisible={formVisible}
                />
              </div>
              <Link to={`/reset-password`}>
                <button
                  type='button'
                  className='px-[14px] py-[10px] flex items-center gap-[6px] text-white rounded-lg bg-[#3A5BFF] text-sm '
                >
                  Quên mật khẩu
                </button>
              </Link>
              <div className='w-full md:w-2/3 bg-gray-100 p-6 rounded-lg'>
                <h2 className='text-xl font-semibold text-gray-700 mb-4'>Thông tin cá nhân</h2>
                <div className='text-gray-600 space-y-3'>
                  <p>
                    <strong>Email:</strong> {userDetail.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userDetail.phoneNumber}
                  </p>
                  <p>
                    <strong>Address:</strong> {userDetail.city}
                  </p>
                </div>

                <div className='mt-6 flex flex-col md:flex-row md:w-full md:space-x-4 space-y-3 md:space-y-0 justify-between'>
                  <div className='flex-grow'>
                    <button
                      onClick={showAccountModal}
                      className='w-full md:w-[100%] px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    >
                      Cập nhật tài khoản
                    </button>
                    <ProfileModal
                      isModalVisible={isAccountModalVisible}
                      handleCancel={handleCancel}
                      handleToggle={handleToggle}
                      formVisible={formVisible}
                      validatePhoneNumber={validatePhoneNumber}
                    />
                  </div>
                  <div className='flex-grow'>
                    <button
                      onClick={showPasswordModal}
                      className='w-full md:w-[100%] px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    >
                      Cập nhật mật khẩu
                    </button>
                    <UpdatePasswordModal
                      isModalVisible={isPasswordModalVisible}
                      handleCancel={handleCancel}
                      handleToggle={handleToggle}
                      formVisible={formVisible}
                      userDetail={userDetail}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    </>
  )
}

export default ProfilePage
