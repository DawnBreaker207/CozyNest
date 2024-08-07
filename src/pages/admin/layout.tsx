import React, { useState } from 'react'
import { AppstoreOutlined, BellOutlined, DownOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import { Badge, Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import { NavLink, Outlet } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout
const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

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
        <Header style={{ padding: 0, background: colorBgContainer  }} >
          <div className="flex justify-between items-center px-4 mt-4">
            <div className='text-xl font-semibold '>Dashboard</div>
            <div className="flex items-center ">
              <Button className='mr-4'>Nik Shop< DownOutlined  className='text-sm '/></Button>
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
