import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import useCart from '@/hooks/useCart'
import { useProductCart } from '@/hooks/useProductQuery'
import { useUser } from '@/hooks/useUser'
import { useCartStore } from '@/stores/cart'
import { CartProduct } from '@/types/cart'
import {
  DownOutlined,
  MailOutlined,
  MehOutlined,
  MenuOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, Divider, Drawer, Dropdown, GetProps, Input, MenuProps, message, Space, theme } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { menu, menu1, menus } from './data/Header'

const { useToken } = theme

const Header = () => {
  const [, contextHolder] = message.useMessage()
  const { token } = useToken()
  const { data, calculateTotal, mutate } = useCart()
  const { handleLogout, user, userId } = useUser()
  const { increase, decrease } = useProductCart(data?.products || [], mutate)
  const products = useMemo(() => data?.res?.products || [], [data])
  const quantities = useCartStore((state) => state.quantities)
  const setQuantities = useCartStore((state) => state.setQuantities)
  const [isVisible, setIsVisible] = useState(true)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setVisible(true)
    // setOpen(true)
  }
  const show = () => {
    // setVisible(true)
    setOpen(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpen(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    // Dọn dẹp để xóa timer khi component unmount
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Chỉ thiết lập quantities khi sản phẩm có thay đổi
    if (products.length) {
      const initialQuantities = products.map((product: CartProduct) => product.quantity)
      setQuantities(initialQuantities)
    }
  }, [products, quantities.length, setQuantities])

  const { data: userData, isLoading, error } = useAdminUser(userId ?? '')

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    handleLogout()
    return window.location.reload()
  }

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary
  }
  type SearchProps = GetProps<typeof Input.Search>
  const { Search } = Input
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  if (error) {
    handleLogout()
    return window.location.reload()
  }
  const users: MenuProps['items'] = user
    ? [
        {
          label: <a href='/profile'>{user}</a>, // Hiển thị tên người dùng nếu đăng nhập
          key: '0'
        },
        {
          label: <a href='#'>Đơn hàng</a>, // Liên kết đến trang đơn hàng
          key: '1'
        },
        { type: 'divider' }, // Đường kẻ phân cách
        {
          label: (
            <a href='/' onClick={handleLogout}>
              Đăng xuất
            </a>
          ),
          key: '3'
        }
      ]
    : window.innerWidth < 800
      ? [
          {
            label: <NavLink to='/register'>Đăng ký</NavLink>,
            key: '1'
          },
          {
            label: <NavLink to='/login'>Đăng nhập</NavLink>,
            key: '2'
          }
        ]
      : [
          {
            label: <NavLink to='/register'>Đăng ký</NavLink>,
            key: '1'
          },
          {
            label: <NavLink to='/login'>Đăng nhập</NavLink>,
            key: '2'
          }
        ]

  return (
    <div className='sticky bg-white bg-while z-50 w-full top-0'>
      {contextHolder}
      {/* header */}
      <div className={`flex items-center justify-between bg-background shadow-md transition-all duration-500  `}>
        <nav className='flex items-center justify-between px-[4%] bg-background w-full  '>
          <a className=' md:w-[80%] md:h-[30%] sm:w-[50%] lg:w-[230px] w-[41%] ' href='/'>
            <img
              src='/src/assets/icon/cozynet.svg'
              className='w-full md:w-[94%]  sm:w-1/2 lg:w-[80%] lg:h-[50%] md:h-[74px]  '
              alt='Logo'
            />
          </a>
          <div className='hidden md:flex md:items-center space-x-8 mr-20 text-lg md:text-base md:mr-[5px]'>
            <NavLink to={'/'} className='text-muted hover:text-muted-foreground'>
              Trang chủ
            </NavLink>
            <Dropdown menu={{ items: menus }}>
              <NavLink to={'/products_page'} className='bg-white md:items-center md:flex md:justify-between '>
                Sản phẩm <DownOutlined className='text-xs max-w-[10px] w-[100%] h-auto ml-[3px]' />
              </NavLink>
            </Dropdown>
            <NavLink to={'/intro'} className='text-muted hover:text-muted-foreground'>
              Giới thiệu
            </NavLink>
            {/* <NavLink to={'/link'} className='text-muted hover:text-muted-foreground'>
              Cẩm nang
            </NavLink> */}
            <NavLink to={'/contact'} className='text-muted hover:text-muted-foreground'>
              Liên hệ
            </NavLink>
            <Dropdown menu={{ items: menu1 }}>
              <NavLink to={'#'} className='bg-white md:items-center md:flex md:justify-between '>
                Dịch vụ <DownOutlined className='text-xs max-w-[10px] w-[100%] h-auto ml-[3px]' />
              </NavLink>
            </Dropdown>
            <NavLink to={'/articles'} className='text-muted hover:text-muted-foreground'>
              Tin tức
            </NavLink>
          </div>
          <div className='flex items-center space-x-4'>
            <Dropdown
              trigger={['click']}
              dropdownRender={() => (
                <div style={contentStyle}>
                  <Divider style={{ margin: 0 }} />
                  <Space style={{ padding: 8 }}>
                    <Search
                      className=' w-full'
                      placeholder='tìm kiếm sản phẩm... '
                      onSearch={onSearch}
                      style={{ width: 200 }}
                    />
                  </Space>
                  <br />
                  <Space className=' px-16 py-2 rounded'>
                    <Button className='bg-yellow-500'>Tìm kiếm</Button>
                  </Space>
                </div>
              )}
            >
              <span onClick={(e) => e.preventDefault()}>
                <Space>
                  <Button shape='circle' icon={<SearchOutlined />} />
                </Space>
              </span>
            </Dropdown>

            <Dropdown
              menu={{ items: users }}
              trigger={['click']}
              visible={isVisible}
              onVisibleChange={(visible) => setIsVisible(visible)}
            >
              <span onClick={(e) => e.preventDefault()}>
                <Space>
                  {user ? (
                    <div className='flex'>
                      <Button shape='circle' className='mt-1.5'>
                        <img src={userData?.avatar} alt='user' className='w-[32px] h-[32px] rounded-full' />
                      </Button>
                      {isVisible && window.innerWidth >= 1025 && (
                        <h1 className='mt-3 text-center notification-section'>Xin chào {userData?.username}</h1>
                      )}
                    </div>
                  ) : // Nếu không có người dùng đăng nhập, hiển thị icon mặc định

                  window.innerWidth < 800 ? (
                    // <Link to={`login`}>
                    <Button shape='circle' icon={<UserOutlined />} />
                  ) : (
                    <Button shape='circle' icon={<UserOutlined />} />
                  )}
                </Space>
              </span>
            </Dropdown>
            {userId ? (
              <Button shape='circle' icon={<ShoppingCartOutlined />} className='relative ' onClick={show}>
                <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                  {data?.res?.products?.length || 0}
                </span>
              </Button>
            ) : (
              <Link to={`/login`}>
                <Button shape='circle' icon={<ShoppingCartOutlined />} className='relative ' onClick={show}>
                  {/* <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                    {data?.res?.products?.length || 0}
                  </span> */}
                </Button>
              </Link>
            )}

            <Button className='md:hidden' shape='circle' icon={<MenuOutlined />} onClick={showDrawer} />
          </div>
          <Drawer title='DANH MỤC' placement='right' onClose={onClose} open={visible} width={320}>
            <NavLink to={'/'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Trang chủ
            </NavLink>
            <div className='p-2  '>
              <Dropdown menu={{ items: menu }} trigger={['click']}>
                <span className='text-secondary hover:text-yellow-600'>
                  Sản phẩm mới <DownOutlined className='text-xs' />
                </span>
              </Dropdown>
            </div>
            <NavLink to={'/intro'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Giới thiệu
            </NavLink>
            <Dropdown menu={{ items: menu1 }} trigger={['click']}>
              <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4'>
                Dịch vụ <DownOutlined className='text-xs max-w-[10px] w-[100%] h-auto' />
              </NavLink>
            </Dropdown>
            {/* <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Cẩm nang trang trí
            </NavLink> */}
            <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Hệ thống cửa hàng
            </NavLink>
            <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              FAQs
            </NavLink>
            <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Landing page
            </NavLink>
            <hr />
            <span className='block  text-yellow-600 hover:text-muted-foreground mb-6 mt-4'>BẠN CẦN HỖ TRỢ ?</span>
            <Link to={`tel:19000091`}>
              <span className='block  text-black hover:text-yellow-600 mb-6 mt-2'>
                <PhoneOutlined /> 1900 0091
              </span>
            </Link>
            <Link to={`mailto:admin@gmail.com`}>
              <span className='block  text-black hover:text-yellow-600 mb-6 mt-2'>
                <MailOutlined /> admin@gmail.com
              </span>
            </Link>
          </Drawer>

          {/* giỏ hàng  */}

          {userId && (
            <Drawer width={320} title='GIỎ HÀNG' onClose={onClose} open={open}>
              {products.length > 0 ? (
                <div>
                  {/* TODO: Fix type */}
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {products.map((product: any, index: number) => (
                    <div key={product.productId._id} className='flex justify-between items-center mb-4 border-b pb-4'>
                      <div className='flex items-center'>
                        <img
                          src={product.productId.thumbnail}
                          alt={product.productId.name}
                          className='w-16 h-16 object-cover'
                        />
                        <div className='ml-2'>
                          <p className='font-semibold'>{product.productId.name}</p>
                          <div className='flex items-center'>
                            <button className='border px-2 py-1' onClick={() => decrease(index)}>
                              -
                            </button>
                            <input
                              title='Quantity'
                              type='number'
                              value={quantities[index]}
                              className='w-12 text-center border'
                              readOnly
                            />
                            <button className='border px-2 py-1' onClick={() => increase(index)}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className='font-bold'>{(product.price * quantities[index]).toLocaleString()}₫</span>
                      <button onClick={() => mutate({ action: 'REMOVE', productId: product.productId._id })}>
                        <img src='./src/assets/icon/delete.svg' alt='Remove' className='size-5 min-h-5 min-w-5' />
                      </button>
                    </div>
                  ))}
                  <Divider />
                  <div className='flex justify-between items-center font-bold'>
                    <span>Tổng tiền:</span>
                    <span>{calculateTotal().toLocaleString()}₫</span>
                  </div>
                  <Link to={`/cart`}>
                    {' '}
                    <Button type='primary' className='mt-4 w-full' onClick={() => onClose()}>
                      XEM GIỎ HÀNG
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className='text-center'>
                  <span>
                    <MehOutlined />
                  </span>
                  <br />
                  <span>Không có sản phẩm trong giỏ hàng</span>
                  <br />
                  <NavLink to={'#'} className='text-sm'>
                    trở về trang sản phẩm
                  </NavLink>
                </div>
              )}
            </Drawer>
          )}
        </nav>
      </div>
      <hr className='border border-[#E0E2E7]' />
    </div>
  )
}

export default Header
