/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLoadingPage from '@/components/Loading'
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import useAdminUsersMutations from '@/hooks/userAdminUsersMutations'
import { message, Popconfirm, Switch, Table, Select, Input } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderAdmin from '../header/page'
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
const AdminCustomerPage = () => {
  const { data, isLoading, error, isError, refetch } = useAdminUsersQuery() // refetch data after mutation
  const [messageApi, contextHolder] = message.useMessage()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const query = useQuery()
  const roleFilter = query.get('role') || ''
  const [filterRole, setFilterRole] = useState<string>(roleFilter)

  const { mutate } = useAdminUsersMutations({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật trạng thái tài khoản thành công')
      refetch()
    }
  })

  // Hàm để thay đổi trạng thái tài khoản
  const handleStatusChange = (userId: string, checked: boolean) => {
    const user = data?.res.find((u) => u._id === userId)
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

  // Bộ lọc theo vai trò
  const handleRoleFilterChange = (value: string) => {
    setFilterRole(value) // Cập nhật giá trị bộ lọc khi người dùng thay đổi
  }

  // Cập nhật từ khóa tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value) // Cập nhật từ khóa tìm kiếm
  }

  // Dữ liệu sau khi lọc theo vai trò và tìm kiếm
  const dataSource = data?.res
    .filter((user: any) => {
      // Lọc theo role
      if (filterRole && user.role !== filterRole) {
        return false
      }

      // Lọc theo từ khóa tìm kiếm (tìm trong email và tên người dùng)
      if (
        searchTerm &&
        !user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .map((user: any) => {
      return {
        key: user._id,
        ...user
      }
    })

  // Các cột của bảng
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (createdAt: any) => <span>{new Date(createdAt).toLocaleDateString()}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: boolean, user: any) => {
        // Nếu là tài khoản admin, không hiển thị Popconfirm, và hiển thị cảnh báo thay đổi trạng thái
        if (user.role === 'admin') {
          return (
            <Switch
              checked={status}
              onChange={(checked) => handleStatusChange(user._id, checked)}
              checkedChildren='Hoạt động'
              unCheckedChildren='Khóa'
            />
          )
        }

        // Nếu không phải tài khoản admin, hiển thị Popconfirm để xác nhận
        return (
          <Popconfirm
            title='Khóa tài khoản'
            description='Bạn có chắc muốn khóa tài khoản này không?'
            onConfirm={() => handleStatusChange(user._id, !status)} // Chỉ thay đổi khi xác nhận
            okText='Có'
            cancelText='Không'
          >
            <Switch checked={status} onChange={(checked) => {}} checkedChildren='Hoạt động' unCheckedChildren='Khóa' />
          </Popconfirm>
        )
      }
    }
  ]

  // Hiển thị trang loading hoặc lỗi
  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <HeaderAdmin/>
      <div>
        <h1 className='text-2xl font-bold mb-5 mt-4'>Quản lý người dùng</h1>
        <div className='flex items-center justify-between '>
          <Input
            placeholder='Tìm kiếm người dùng theo tên hoặc email'
            style={{ width: 300, marginBottom: 16 }}
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <Select
            placeholder='Chọn vai trò'
            style={{ width: 160, marginBottom: 16 }}
            onChange={handleRoleFilterChange}
            value={filterRole}
          >
            <Select.Option value=''>Tất cả người dùng</Select.Option>
            <Select.Option value='admin'>Admin</Select.Option>
            <Select.Option value='member'>Member</Select.Option>
            <Select.Option value='shipper'>Shipper</Select.Option>
          </Select>
        </div>

        <Table dataSource={dataSource} columns={columns} rowKey='key' />
      </div>
    </>
  )
}

export default AdminCustomerPage
