import CustomLoadingPage from '@/components/Loading'
import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { validatePhoneNumber } from '@/utils/validatorPhoneNumber'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Modal, Upload, message } from 'antd'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { LiaUserEditSolid } from 'react-icons/lia'
import { TbHomeEdit, TbPasswordUser } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import ProfileModal from './ProfileUpdate'
import ProfileUpdateAddress from './ProfileUpdateAddress'
import UpdatePasswordModal from './UpdatePassword'

const ProfilePage = () => {
  const [userId, setUserId] = useState<string | undefined>(undefined)
  const [messageApi, contextHolder] = message.useMessage()
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false)
  const [avatar, setAvatar] = useState<string | null>(null) // Ảnh tải lên mới
  const [prevAvatar, setPrevAvatar] = useState<string | null>(null)
  const handleAvatarClick = () => setIsAvatarModalVisible(true)

  const handleUpload = (file: File) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    if (!validImageTypes.includes(file.type)) {
      message.error('Chỉ cho phép tải lên các định dạng ảnh: JPG, PNG, GIF!')
      return false
    }

    if (file.size > 10 * 1024 * 1024) {
      message.error('Ảnh tải lên không được lớn hơn 2MB!')
      return false
    }
    const reader = new FileReader()
    reader.onload = () => {
      // Lưu ảnh cũ trước khi cập nhật ảnh mới
      setPrevAvatar(avatar)
      setAvatar(reader.result as string)
      message.success('Tải ảnh lên thành công!')
    }
    reader.readAsDataURL(file)
    return false
  }

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

  const [formVisible, setFormVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('account')

  const handleToggle = (checked: boolean) => {
    setFormVisible(checked)
  }

  const id = userId || undefined
  const { data: userData, isLoading, error } = useAdminUser(id)

  const { mutate } = useAdminUsersMutations({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật ảnh thành công')
    }
  })

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
  const userDetail = userData

  return (
    <>
      {contextHolder}
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
            <div className='text-center mb-6'>
              <img
                src={avatar || userDetail.avatar}
                alt='Avatar'
                className='w-24 h-24 mx-auto rounded-full border-4 border-pink-300 cursor-pointer'
                onClick={handleAvatarClick}
              />
              <h1 className='text-2xl font-semibold text-gray-700 mt-2'>{userDetail.username}</h1>
              <div className='mt-2'>
                {userDetail.status ? (
                  <span className='text-[#3A5BFF] text-[12px] bg-customBlue px-2 py-[2px] rounded-md'>Active</span>
                ) : (
                  <span className='text-[#CC5F5F] text-[12px] bg-customWarning px-2 py-[2px] rounded-md'>Blocked</span>
                )}
              </div>
            </div>

            {/* Menu phần bên trái */}
            <nav className='space-y-4'>
              <Link
                to='#'
                className={`block px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-blue-400 hover:text-black focus:bg-blue-400 focus:text-black transition duration-200 ${activeTab === 'account' ? 'bg-blue-400 text-black' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                <div className='flex items-center space-x-2'>
                  <LiaUserEditSolid className='text-xl' />
                  <span>Thông tin tài khoản</span>
                </div>
              </Link>
              <Link
                to='#updateAddress'
                className={`block px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-blue-400 hover:text-black focus:bg-blue-400 focus:text-black transition duration-200 ${activeTab === 'address' ? 'bg-blue-400 text-black' : ''}`}
                onClick={() => setActiveTab('address')}
              >
                <div className='flex items-center space-x-2'>
                  <TbHomeEdit className='text-xl' />
                  <span>Cập nhật địa chỉ</span>
                </div>
              </Link>
              <Link
                to='#updatePassword'
                className={`block px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-blue-400 hover:text-black focus:bg-blue-400 focus:text-black transition duration-200 ${activeTab === 'password' ? 'bg-blue-400 text-black' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <div className='flex items-center space-x-2'>
                  <TbPasswordUser className='text-xl' />
                  <span>Cập nhật mật khẩu</span>
                </div>
              </Link>
            </nav>
          </aside>

          <div className='w-full md:w-3/4 p-8 pt-10'>
            {activeTab === 'account' && (
              <div className='text-gray-700'>
                <h2 className='text-xl font-semibold mb-6'>Thông tin cá nhân</h2>
                <ProfileModal
                  handleToggle={handleToggle}
                  formVisible={formVisible}
                  validatePhoneNumber={validatePhoneNumber}
                />
              </div>
            )}
            {activeTab === 'address' && (
              <div className='text-gray-700'>
                <h2 className='text-xl font-semibold mb-6'>Địa chỉ</h2>
                <ProfileUpdateAddress handleToggle={handleToggle} formVisible={formVisible} />
              </div>
            )}
            {activeTab === 'password' && (
              <div id='updatePassword' className='mt-10'>
                <UpdatePasswordModal userDetail={userDetail} />
              </div>
            )}
          </div>
        </div>
        <Modal
          title='Cập nhật ảnh đại diện'
          open={isAvatarModalVisible}
          onCancel={() => setIsAvatarModalVisible(false)}
          footer={[
            <Button
              key='cancel'
              onClick={() => {
                setAvatar(prevAvatar)
                setIsAvatarModalVisible(false)
              }}
            >
              Hủy
            </Button>,
            <Button
              key='save'
              type='primary'
              onClick={() => {
                // Kiểm tra xem có dữ liệu người dùng và ảnh đại diện không
                if (userData && avatar) {
                  const updatedUserData = { ...userData, avatar }
                  console.log('Dữ liệu sau khi cập nhật avatar:', updatedUserData)

                  // Gọi mutation để cập nhật ảnh đại diện
                  mutate(updatedUserData, {
                    onSuccess: () => {
                      setIsAvatarModalVisible(false)
                    },
                    onError: () => {
                      setAvatar(prevAvatar)
                      message.error(`Cập nhật ảnh đại diện thất bại do quá dung lượng cho phép`)
                      setIsAvatarModalVisible(false)
                    }
                  })
                } else {
                  message.error('Ảnh đại diện không hợp lệ!')
                }
              }}
            >
              Lưu
            </Button>
          ]}
        >
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
          {avatar && (
            <div style={{ marginTop: 10 }}>
              <h3>Ảnh đã chọn:</h3>
              <img src={avatar} alt='Avatar' style={{ width: '100%', height: 'auto', maxWidth: 200, marginTop: 10 }} />
            </div>
          )}
        </Modal>
      </div>
    </>
  )
}

export default ProfilePage
