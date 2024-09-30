import React, { useState } from 'react'
import {
  AppstoreOutlined,
  BellOutlined,
  DownOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Breadcrumb, Button, Dropdown, Layout, Menu, theme } from 'antd'
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout
const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const location = useLocation()

  const menu = {
    children: (
      <>
        <Menu.Item key='1'>Option 1</Menu.Item>
        <Menu.Item key='2'>Option 2</Menu.Item>
        <Menu.Item key='3'>Option 3</Menu.Item>
      </>
    )
  }
  const { id } = useParams()
  const renderHeader = (title: string) => (
    <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
      <div className='flex justify-between h-[60px] items-center'>
        <div>
          <span className='text-xl text-[#353535] ml-[25px]'>{title}</span>
        </div>
        <div className='flex items-center space-x-4 mr-[14px]'>
          <Dropdown menu={menu} trigger={['click']}>
            <button className='bg-[#FFCC91] px-4 py-2 rounded-lg h-[32px] flex items-center'>
              Nik Shop <DownOutlined className='ml-2' />
            </button>
          </Dropdown>
          <Badge count={4} className='cursor-pointer'>
            <BellOutlined className='text-xl text-blue-500' />
          </Badge>
          <Avatar size='large' className='rounded-lg' src='https://picsum.photos/200/200' />
        </div>
      </div>
    </Header>
  )
  const isAddProductPage = location.pathname === '/admin/products/add'
  const isEditProductPage = location.pathname === `/admin/products/${id}/edit`
  const isAddCategoryPage = location.pathname === '/admin/categories/add'
  const isEditCategoryPage = location.pathname === `/admin/categories/${id}/edit`
  const isCategoryPage = location.pathname === `/admin/categories`
  const isProductPage = location.pathname === `/admin/products`

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <AppstoreOutlined />,
              label: <NavLink to={`/admin`}>Dashboard</NavLink>
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: <NavLink to={`/admin/products`}>Product Manager</NavLink>
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/`}>Order Manager</NavLink>
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <NavLink to={`/admin/`}>Customer Manager</NavLink>
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/`}>Reports</NavLink>
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='flex justify-between items-center px-4 mt-4'>
            <div className='text-xl font-semibold '>Dashboard</div>
            <div className='flex items-center '>
              <Button className='mr-4'>
                Nik Shop
                <DownOutlined className='text-sm ' />
              </Button>
              <Badge count={4}>
                <BellOutlined style={{ fontSize: '20px' }} />
              </Badge>
              <UserOutlined style={{ fontSize: '20px', marginLeft: '20px' }} />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Controller' }, { title: '' }]}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} Created by CozyNest</Footer>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
