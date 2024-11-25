/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileModal from './ProfileUpdate'
import UpdatePasswordModal from './UpdatePasswod'
import CustomLoadingPage from '@/components/Loading'
import Cookies from 'js-cookie'

const ProfilePage = () => {
  const [userId, setUserId] = useState<number | string | null>(null) // Khai báo state cho userId

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

  const validatePhoneNumber = (_rule: any, value: any) => {
    if (!value || value.replace(/\D/g, '').length === 10) {
      return Promise.resolve()
    }
    return Promise.reject('Số điện thoại không hợp lệ!')
  }

  const id = userId || null
  const { data: userData, isLoading, error } = useAdminUsersQuery({ id })

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
                  src={userDetail.avatar}
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
                  )}
                </div>
              </div>

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
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
