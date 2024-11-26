import { useCookie } from '@/hooks/useStorage'
import { useUser } from '@/hooks/useUser'
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BellOutlined,
  CalendarOutlined,
  DownloadOutlined,
  DownOutlined,
  FilterOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Badge, Button, Input, Layout, Menu, Modal, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdOutlineColorLens } from 'react-icons/md'
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout

const LayoutAdmin: React.FC = () => {
  const navigate = useNavigate()
  const { Logout } = useUser()
  const userJson = useCookie('user', {})

  const role = userJson ? userJson?.[0].role : null
  console.log(role)
  useEffect(() => {
    navigate(role === 'admin' || role === 'manager' ? '/admin' : '/login')
  }, [navigate, role])
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
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const location = useLocation()

  // const menu = (
  //   <Menu>
  //     <Menu.Item key='1'>1</Menu.Item>
  //     <Menu.Item key='2'>2</Menu.Item>
  //   </Menu>
  // )
  const { id } = useParams()
  const renderHeader = (title: string) => (
    <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
      <div className='flex justify-between h-[60px] items-center'>
        <div>
          <span className='text-xl text-[#353535] ml-[25px]'>{title}</span>
        </div>
        <div className='flex items-center space-x-4 mr-[14px]'>
          <Avatar size='large' className='rounded-lg' src='https://picsum.photos/200/200' />
        </div>
      </div>
    </Header>
  )

  //TODO: ???????
  const isAddProductPage = location.pathname === '/admin/products/add'
  const isEditProductPage = location.pathname === `/admin/products/${id}/edit`
  const isAddCategoryPage = location.pathname === '/admin/categories/add'
  const isEditCategoryPage = location.pathname === `/admin/categories/${id}/edit`
  const isCategoryPage = location.pathname === `/admin/categories`
  const isProductPage = location.pathname === `/admin/products`
  const isColorPage = location.pathname === `/admin/colors`
  const isAddColorPage = location.pathname === `/admin/colors/${id}/add`
  const isEditColorPage = location.pathname === `/admin/colors/${id}/edit`
  const isDetailColorPage = location.pathname === `/admin/colors/${id}/detail_color`
  const isOrderPage = location.pathname === `/admin/order`
  const isCustomer = location.pathname === `/admin/customer`
  const isCoupon = location.pathname === `/admin/coupons`
  const isCouponAdd = location.pathname === `/admin/coupons/add`
  const isCouponEdit = location.pathname === `/admin/coupons/${id}/edit`
  const isArticles = location.pathname === `/admin/articles`
  const isVariantPage = location.pathname === `/admin/products/${id}/variants`

  console.log('🚀 ~ isVariantPage:', isVariantPage)
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
              icon: <ApartmentOutlined />,
              label: <NavLink to={`/admin/products`}>Product Manager</NavLink>
            },
            {
              key: '3',
              icon: <OrderedListOutlined />,
              label: <NavLink to={`/admin/categories`}>Category Manager</NavLink>
            },
            {
              key: '9',
              icon: <OrderedListOutlined />,
              label: <NavLink to={`/admin/coupons`}>Coupon Manager</NavLink>
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/order`}>Order Manager</NavLink>
            },
            {
              key: '5',
              icon: <CalendarOutlined />,
              label: <NavLink to={`/admin/articles`}>Articles</NavLink>
            },
            {
              key: '6',
              icon: <UserOutlined />,
              label: <NavLink to={`/admin/customer`}>Customer Manager</NavLink>
            },
            {
              key: '7',
              icon: <UploadOutlined />,
              label: <NavLink to={`/admin/report`}>Reports</NavLink>
            },
            {
              key: '8',
              icon: <LogoutOutlined />,
              label: (
                <NavLink to='#' onClick={handleLogout}>
                  Logout
                </NavLink>
              )
            }
          ]}
        />
      </Sider>
      <Layout>
        {isAddProductPage && renderHeader('Add Product')}
        {isOrderPage && renderHeader('Order')}
        {isCustomer && renderHeader('Customer')}
        {isAddCategoryPage && renderHeader('Add Category')}
        {isEditProductPage && renderHeader('Edit Product')}
        {isEditCategoryPage && renderHeader('Edit Category')}
        {isCoupon && renderHeader('Coupon')}
        {isCouponAdd && renderHeader('Coupon Add')}
        {isCouponEdit && renderHeader('Coupon Edit')}
        {isAddColorPage && renderHeader('Add Color')}
        {isEditColorPage && renderHeader('Edit Color')}
        {isDetailColorPage && renderHeader('Detail Color')}
        {isVariantPage && renderHeader('Variant')}
        <Content>
          {isCategoryPage && (
            <>
              <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
                <div className='flex justify-between h-[60px] items-center'>
                  <div>
                    <span className='text-xl text-[#353535] ml-[25px]'>Category</span>
                  </div>
                  <div className='flex items-center space-x-4 mr-[14px]'>
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
          {isArticles && (
            <>
              <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
                <div className='flex justify-between h-[60px] items-center'>
                  <div>
                    <span className='text-xl text-[#353535] ml-[25px]'>Articles</span>
                  </div>
                  <div className='flex items-center space-x-4 mr-[14px]'>
                    <Avatar size='large' className='rounded-lg' src='https://picsum.photos/200/200' />
                  </div>
                </div>
              </Header>
              <div className='flex items-center justify-between p-4 bg-white shadow-md'>
                <Input className='w-3/4' placeholder='Search articles...' prefix={<SearchOutlined />} size='large' />
                <div className='flex items-center space-x-2'>
                  <Button
                    icon={<DownloadOutlined />}
                    size='large'
                    className='bg-blue-100 border-none text-blue-700 hover:bg-blue-200 '
                  >
                    Export
                  </Button>
                  <Button type='primary' icon={<PlusOutlined />} size='large'>
                    <Link to={`articles/add`}>Add Articles</Link>
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
          {isColorPage && (
            <>
              <Header style={{ padding: 0, background: colorBgContainer }} className='border border-black-100'>
                <div className='flex justify-between h-[60px] items-center'>
                  <div>
                    <span className='text-xl text-[#353535] ml-[25px]'>Color</span>
                  </div>
                  <div className='flex items-center space-x-4 mr-[14px]'>
                    <button className='bg-[#FFCC91] px-4 py-2 rounded-lg h-[32px] flex items-center'>
                      Nik Shop <DownOutlined className='ml-2' />
                    </button>
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
                  <Button type='primary' icon={<MdOutlineColorLens className='text-xl' />} size='large'>
                    Color
                  </Button>
                </div>
              </div>
              <div className='flex items-center justify-between bg-white p-4 shadow-md '>
                <div className='flex items-center space-x-4 border border-black-100 rounded-lg'>
                  <div className='flex space-x-4'>
                    <Button type='link' className='text-blue-500'>
                      All Color
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
              padding: 16,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
        {!isAddProductPage && (
          <Footer style={{ textAlign: 'center' }}>{new Date().getFullYear()} Created by CozyNest</Footer>
        )}
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
