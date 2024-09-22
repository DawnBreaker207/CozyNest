import {
  ApartmentOutlined,
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  DownloadOutlined,
  DownOutlined,
  FilterOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Input, Layout, Menu, theme, Breadcrumb } from 'antd'
import React, { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'

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
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
      </>
    ),
  };
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
              icon: <OrderedListOutlined />,
              label: <NavLink to={`/admin/categories`}>Category Manager</NavLink>
            },
            {
              key: '3',
              icon: <ApartmentOutlined />,
              label: <NavLink to={`/admin/products`}>Product Manager</NavLink>
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/orders`}>Order Manager</NavLink>
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: <NavLink to={`/admin/customer`}>Customer Manager</NavLink>
            },
            {
              key: '6',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/reports`}>Reports</NavLink>
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
          {isAddProductPage && renderHeader('Add Product')}
          {isAddCategoryPage && renderHeader('Add Category')}
          {isEditProductPage && renderHeader('Edit Product')}
          {isEditCategoryPage && renderHeader('Edit Category')}
          <Content>
            {isCategoryPage && (
              <>
                <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
                  <div className='flex justify-between h-[60px] items-center'>
                    <div>
                      <span className='text-xl text-[#353535] ml-[25px]'>Category</span>
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
                <div className='flex items-center justify-between p-4 bg-white shadow-md'>
                  <Input className='w-3/4' placeholder='Search order...' prefix={<SearchOutlined />} size='large' />
                  <div className='flex items-center space-x-2'>
                    <Button
                      icon={<DownloadOutlined />}
                      size='large'
                      className='bg-blue-100 border-none text-blue-700 hover:bg-blue-200 '
                    >
                      Export
                    </Button>
                    <Button type='primary' icon={<PlusOutlined />} size='large'>
                      <Link to={`categories/add`}>Add Category</Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
            {isProductPage && (
              <>
                <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
                  <div className='flex justify-between h-[60px] items-center'>
                    <div>
                      <span className='text-xl text-[#353535] ml-[25px]'>Product</span>
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
                <div className='flex items-center justify-between p-4 bg-white shadow-md'>
                  <Input className='w-3/4' placeholder='Search order...' prefix={<SearchOutlined />} size='large' />
                  <div className='flex items-center space-x-2'>
                    <Button
                      icon={<DownloadOutlined />}
                      size='large'
                      className='bg-blue-100 border-none text-blue-700 hover:bg-blue-200 '
                    >
                      Export
                    </Button>
                    <Button type='primary' icon={<PlusOutlined />} size='large'>
                      <Link to={`products/add`}>Add Product</Link>
                    </Button>
                  </div>
                </div>
                <div className='flex items-center justify-between bg-white p-4 shadow-md '>
                  <div className='flex items-center space-x-4 border border-black-100 rounded-lg'>
                    <div className='flex space-x-4'>
                      <Button type='link' className='text-blue-500'>
                        All Product
                      </Button>
                      <Button type='link'>Published</Button>
                      <Button type='link'>Low Stock</Button>
                      <Button type='link'>Draft</Button>
                    </div>
                  </div>
                  <div className='flex items-center space-x-4 '>
                    <Input className='w-64' placeholder='Search product...' prefix={<SearchOutlined />} />
                    <div className='border border-black-100'>
                      <Button icon={<CalendarOutlined />} className='border-none shadow-none '>
                        Select Date
                      </Button>
                    </div>
                    <div className='border border-black-100'>
                      <Button icon={<FilterOutlined />} className='border-none shadow-none'>
                        Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
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
        </Content>
        {!isAddProductPage && (
          <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} Created by CozyNest</Footer>
        )}
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
