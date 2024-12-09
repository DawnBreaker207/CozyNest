/* eslint-disable @typescript-eslint/no-explicit-any */
import { download, search } from '@/components/icons'
// import CustomLoadingPage from '@/components/Loading'
// import instance from '@/configs/axios'
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { message, Pagination, Switch } from 'antd'
import { useState } from 'react'
import { FaUsersCog } from 'react-icons/fa'
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router-dom'

const AdminCustomerPage = () => {
  const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
  const [pageSize] = useState(15) // Số lượng mục trên mỗi trang
  const { data, isLoading, error, refetch } = useAdminUsersQuery() // refetch data after mutation
  const users = Array.isArray(data?.res) ? data.res : []
  const [messageApi, contextHolder] = message.useMessage()

  const { mutate } = useAdminUsersMutations({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật thành công')
      refetch()
    }
  })

  if (isLoading) {
    return <div></div>
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

  const handleStatusChange = (userId: string, checked: boolean) => {
    const user = users.find((u) => u._id === userId)
    if (user) {
      // Kiểm tra nếu người dùng có vai trò là admin
      if (user.role === 'admin') {
        messageApi.warning('Không thể thay đổi trạng thái của tài khoản admin')
        return
      }

      const newStatus = checked ? true : false
      const updatedUser = { ...user, status: newStatus }
      mutate(updatedUser)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='font-poppin'>
        <div className='flex space-x-5 justify-between'>
          <div className='flex-1 relative'>
            <div className='flex items-center gap-1'>
              <img src={search} alt='' className='absolute w-[30px] pl-[14px]' />
              <input
                type='text'
                placeholder='Tìm kiếm. . .'
                className='w-full px-4 py-2 rounded-lg border border-[#E0E2E7] pl-10'
              />
            </div>
          </div>
          <div className='flex items-center gap-[18px]'>
            {/* <button className='px-[14px] py-[10px] flex items-center gap-[6px] text-[#3A5BFF] rounded-lg bg-customBlue text-sm'>
              <img src={download} alt='' />
              <span>Export</span>
            </button> */}
            <button className='px-[14px] py-[10px] flex items-center gap-[6px] text-white rounded-lg bg-[#3A5BFF] text-sm'>
              <FaUsersCog className='text-xl' />
              Quản lý người dùng
            </button>
          </div>
        </div>
        <section className='mt-6'>
          <table className='w-full border-collapse border border-gray-200'>
            <thead>
              <tr className='bg-gray-100 text-left'>
                <th className='px-4 py-2 border border-gray-200'>STT</th>
                <th className='px-4 py-2 border border-gray-200'>Họ tên</th>
                <th className='px-4 py-2 border border-gray-200'>Email</th>
                <th className='px-4 py-2 border border-gray-200'>Vai trò</th>
                <th className='px-4 py-2 border border-gray-200'>Ngày tạo</th>
                <th className='px-4 py-2 border border-gray-200 text-center'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user: any, index: number) => (
                <tr key={user._id} className='hover:bg-gray-50'>
                  {/* STT */}
                  <td className='px-4 py-2 border border-gray-200'>{index + 1 + (currentPage - 1) * pageSize}</td>

                  {/* Họ tên */}
                  <td className='px-4 py-2 border border-gray-200'>
                    <Link to={`/admin/customer/${user._id}`} className='text-blue-500'>
                      {user.username}
                    </Link>
                  </td>

                  {/* Email */}
                  <td className='px-4 py-2 border border-gray-200'>{user.email}</td>

                  {/* Vai trò */}
                  <td className='px-4 py-2 border border-gray-200'>{user.role}</td>

                  {/* Ngày tạo */}
                  <td className='px-4 py-2 border border-gray-200'>{new Date(user.createdAt).toLocaleDateString()}</td>

                  {/* Hành động */}
                  <td className='px-4 py-2 border border-gray-200 text-center'>
                    <Switch
                      checked={user.status} // Lấy trạng thái từ cơ sở dữ liệu (status)
                      onChange={(checked) => handleStatusChange(user._id, checked)}
                      checkedChildren='Bật'
                      unCheckedChildren='Tắt'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </>
  )
}

export default AdminCustomerPage
