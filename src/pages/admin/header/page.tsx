import instance from '@/configs/axios'
import { useUser } from '@/hooks/useUser'
import { BellOutlined, LogoutOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Menu, MenuProps, Modal, Space } from 'antd'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const HeaderAdmin = () => {
  const navigate = useNavigate()
  const { Logout } = useUser()
  const [isVisible, setIsVisible] = useState(false)
  const { data: userData } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await instance.get(`/users`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })
  const handleLogout = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn đăng xuất không?',
      content: 'Thao tác này sẽ đưa bạn trở về màn hình đăng nhập.',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk: () => {
        // Thực hiện đăng xuất
        console.log('Đăng xuất thành công!')
        Logout()
        navigate('/login') // Điều hướng về trang login
      },
      onCancel: () => {
        console.log('Hủy thao tác đăng xuất')
      }
    })
  }
  const users: MenuProps['items'] = [
    {
      key: '1',
      label: <Link className='text-black ml-1' to='/'>Trang chủ</Link>
    },
    {
      key: '2',
      label: (
        <Menu.Item key='2' icon={<LogoutOutlined />}>
          <NavLink to='#' onClick={handleLogout}>
            Đăng xuất
          </NavLink>
        </Menu.Item>
      )
    }
  ]
  return (
    <div>
      <div className='flex items-center justify-between'>
        {/* Ảnh logo */}
        <Link to='/'>
          <img src='/src/assets/icon/cozynet.svg' alt='Logo' className='w-[160px]   ' />
        </Link>
        <div className='flex ml-[1630px] '>
          <Button shape='circle' icon={<BellOutlined />} />
        </div>
        {/* Ảnh với menu */}
        <Dropdown
          menu={{ items: users }}
          trigger={['click']}
          open={isVisible}
          onOpenChange={(visible) => setIsVisible(visible)}
        >
          <span onClick={(e) => e.preventDefault()}>
            <Space>
              <div className='flex'>
                <Button shape='circle' className='mt-1.5'>
                  <img src={userData?.data?.res[0].avatar} alt='user' className='w-[32px] h-[32px] rounded-full' />
                </Button>
              </div>
            </Space>
          </span>
        </Dropdown>
      </div>
      <hr />
    </div>
  )
}

export default HeaderAdmin
