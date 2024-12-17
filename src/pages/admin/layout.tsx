import { useCookie } from '@/hooks/useStorage'
import { useUser } from '@/hooks/useUser'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  CommentOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import HeaderAdmin from './header/page'
const { Header, Content, Footer, Sider } = Layout

const LayoutAdmin: React.FC = () => {
  const navigate = useNavigate()
  const { Logout } = useUser()
  const userJson = useCookie('user', {})
  const role = userJson ? userJson?.[0].role : null
  console.log(role)
  // Trạng thái kiểm tra quyền
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (role === 'admin' || role === 'manager' || role === 'superAdmin') {
      setIsAuthorized(true)
      navigate('/admin') // Điều hướng vào trang admin
    } else {
      setIsAuthorized(false)
      navigate('/login') // Điều hướng về trang login
    }
  }, [role]) // Chỉ chạy lại khi role thay đổi
  useEffect(() => {
    if (role === 'shipper') {
      setIsAuthorized(true)
      navigate('/admin/order?status=Delivering')
    }
  }, [role])
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
  const [collapsed, setCollapsed] = useState(false)
  // const menu = (
  //   <Menu>
  //     <Menu.Item key='1'>1</Menu.Item>
  //     <Menu.Item key='2'>2</Menu.Item>
  //   </Menu>
  // )
  if (isAuthorized === null) {
    return null // Hoặc một spinner loading nếu cần
  }
  return (
    <Layout className='min-h-screen'>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className='sticky top-0 h-screen'
        theme='dark'
      >
        <div className='demo-logo-vertical' />
        <Menu theme='dark' mode='inline' className='mt-1' defaultSelectedKeys={['1']}>
          {/* Menu cho admin và superAdmin */}
          {(role === 'admin' || role === 'superAdmin') && (
            <>
              {/* <Menu.Item key='0'>
        <div className='-ml-5'>
          <img src='/src/assets/icon/cozynet.svg' alt='CozyNest' />
        </div>
      </Menu.Item> */}
              <Menu.Item key='1' icon={<AppstoreOutlined />}>
                <NavLink to='/admin'>Thống kê</NavLink>
              </Menu.Item>
              <Menu.Item key='2' icon={<ApartmentOutlined />}>
                <NavLink to='/admin/products'>Quản lý sản phẩm</NavLink>
              </Menu.Item>
              <Menu.Item key='3' icon={<OrderedListOutlined />}>
                <NavLink to='/admin/categories'>Quản lý danh mục</NavLink>
              </Menu.Item>
              <Menu.SubMenu key='4' icon={<UploadOutlined />} title='Quản lý đơn hàng'>
                <Menu.Item key='4-1'>
                  <NavLink to='/admin/order'>Danh sách đơn hàng</NavLink>
                </Menu.Item>
                <Menu.Item key='4-2'>
                  <NavLink to='/admin/order_returns'>Quản lý hoàn trả</NavLink>
                </Menu.Item>
                <Menu.Item key='4-3'>
                  <NavLink to='/admin/order_refunds'>Quản lý hoàn tiền</NavLink>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key='5' icon={<CalendarOutlined />}>
                <NavLink to='/admin/articles'>Bài viết</NavLink>
              </Menu.Item>
              <Menu.Item key='6' icon={<CommentOutlined />}>
                <NavLink to='/admin/reviews'>Đánh giá</NavLink>
              </Menu.Item>
              <Menu.Item key='7' icon={<UserOutlined />}>
                <NavLink to='/admin/customer'>Quản lý khách hàng</NavLink>
              </Menu.Item>
              <Menu.Item key='8' icon={<OrderedListOutlined />}>
                <NavLink to='/admin/coupons'>Mã giảm giá</NavLink>
              </Menu.Item>
            </>
          )}

          {/* Menu cho shipper */}
          {role === 'shipper' && (
            <Menu.Item key='4' icon={<UploadOutlined />}>
              <NavLink to='/admin/order'>Quản lý đơn hàng</NavLink>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout>
        <HeaderAdmin />
        <Content className='overflow-y-auto h-full px-6 py-3 bg-white'>
          <Outlet />
        </Content>
        <Footer className='bg-white' style={{ textAlign: 'center' }}>
          {new Date().getFullYear()} Nội thất CozyNest
        </Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
