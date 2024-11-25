/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import { useCartStore } from '@/hooks/store/cartStore'
import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
import useCart from '@/hooks/useCart'
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
import Cookies from 'js-cookie'

import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const { useToken } = theme

const Header = () => {
  const [user, setUser] = useState(null)
  // console.log(user)
  const [messageApi, contextHolder] = message.useMessage()
  const { data, calculateTotal, mutate } = useCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { products, quantities, setQuantity } = useCartStore()

  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false) // Ẩn menu khi scroll
    }

    // Gắn sự kiện scroll
    window.addEventListener('scroll', handleScroll)

    return () => {
      // Gỡ sự kiện khi component bị unmount
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    // Dọn dẹp để xóa timer khi component unmount
    return () => clearTimeout(timer)
  }, [])

  // Tăng số lượng sản phẩm
  const increase = (index: number) => {
    if (quantities[index] < 10) {
      setQuantity(index, quantities[index] + 1)
      mutate({ action: 'INCREMENT', sku_id: products[index].sku_id._id })
    }
  }

  // Giảm số lượng sản phẩm
  const decrease = (index: number) => {
    if (quantities[index] > 1) {
      setQuantity(index, quantities[index] - 1)
      mutate({ action: 'DECREMENT', sku_id: products[index].sku_id._id })
    }
  }
  useEffect(() => {
    // Cập nhật lại tổng tiền khi quantities thay đổi
    calculateTotal()
  }, [quantities, calculateTotal])

  useEffect(() => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser?.username || null)
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove('user')
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    messageApi.success('Đăng xuất thành công!')
    setUser(null)
  }
  const menu: MenuProps['items'] = [
    {
      key: '1',
      label: <span className='text-muted-foreground'>Sản phẩm mới</span>
    },
    {
      key: '2',
      label: <span className='text-muted-foreground'>Sản phẩm nổi bật</span>
    }
  ]
  const menu1: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to={`/policy/chinh-sach-ban-hang`} className='text-muted-foreground'>
          Chính sách bán hàng
        </Link>
      )
    },
    {
      key: '2',
      label: (
        <Link to={`/policy/giao-hang-va-lap-dat`} className='text-muted-foreground'>
          Chính sách giao hàng & Lắp đặt
        </Link>
      )
    },
    {
      key: '3',
      label: (
        <Link to={`/policy/chinh-sach-doi-tra`} className='text-muted-foreground'>
          Chính sách đổi trả
        </Link>
      )
    },
    {
      key: '4',
      label: (
        <Link to={`/policy/bao-hanh-va-bao-tri`} className='text-muted-foreground'>
          Chính sách bảo hành và bảo trì
        </Link>
      )
    },
    {
      key: '5',
      label: (
        <Link to={`/policy/khach-hang-than-thiet`} className='text-muted-foreground'>
          Khách hàng thân thiết
        </Link>
      )
    }
  ]

  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setVisible(true)
    // setOpen(true)
  }
  const show = () => {
    if (!userId) {
      // Nếu không có userId, chuyển hướng đến trang đăng nhập
      window.location.href = '/login'
    } else {
      setOpen(true) // Mở Drawer nếu đã đăng nhập
    }
  }
  const onClose = () => {
    setVisible(false)
    setOpen(false)
  }

  const menus: MenuProps['items'] = [
    {
      key: 'sub1',
      label: 'Sản phẩm mới',
      children: [
        { key: '1', label: 'Nội thất theo yêu cầu' },
        { key: '2', label: 'Sản phẩm đặc biệt 2023' },
        { key: '3', label: 'Trang trí bếp' }
      ]
    },
    {
      key: 'sub2',
      label: 'Sản phẩm nổi bật',
      children: [
        { key: '4', label: 'Trang trí phòng khách' },
        { key: '5', label: 'Trang trí phòng ngủ' },
        { key: '6', label: 'Sân vườn thoải mái' }
      ]
    }
  ]
  const users: MenuProps['items'] = user
    ? [
      {
        label: <a href='/profile'>Thông tin tài khoản</a>,
        key: '0'
      },
      {
        label: <a href='/orders'>Đơn hàng</a>, // Liên kết đến trang đơn hàng
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

  const { token } = useToken()

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary
  }
  type SearchProps = GetProps<typeof Input.Search>
  const { Search } = Input
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  const [userId, setUserId] = useState<number | string | null>(null) // Khai báo state cho userId

  // Lấy dữ liệu từ Cookies khi component render
  useEffect(() => {
    const userDataString = Cookies.get('user')
    // console.log(userDataString)

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString)
        // console.log(userData)

        // Kiểm tra tính hợp lệ của dữ liệu
        if (userData && userData?._id) {
          const retrievedUserId = userData?._id
          // console.log(retrievedUserId)
          setUserId(retrievedUserId)
        }
      } catch (error) {
        console.error('Error parsing user data from cookie:', error)
      }
    }
  }, []) // useEffect chỉ chạy 1 lần sau khi component mount

  // Sử dụng id từ state
  const id = userId || null
  // console.log(id);

  const { data: userData, isLoading, error } = useAdminUsersQuery({ id })
  // console.log(data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    handleLogout()
    return window.location.reload()
  }
  const userDetail = userData?.res
  // console.log(userDetail.avatar)

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
                        <img src={userDetail.avatar} alt='user' className='w-[32px] h-[32px] rounded-full' />
                      </Button>
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
          <Drawer width={320} title='GIỎ HÀNG' onClose={onClose} open={open}>
            {products.length > 0 ? (
              <div>
                {products.map((product: any, index: number) => (
                  <div key={product.sku_id._id} className='flex justify-between items-center mb-4 border-b pb-4'>
                    {/* Hình ảnh và thông tin sản phẩm */}
                    <div className='flex items-center'>
                      <img
                        src={product.sku_id.product_id.thumbnail}
                        alt={product.sku_id.name}
                        className='w-16 h-16 object-cover'
                      />
                      <div className='ml-2 flex flex-col justify-between'>
                        <p className='font-semibold'>{product.sku_id.name}</p>
                        <div className='flex items-center justify-center mt-2'>
                          <button
                            onClick={() => decrease(index)} // Truyền index để giảm số lượng
                            className='bg-gray-200 px-2 py-1 rounded-md cursor-pointer size-6 flex items-center justify-center'
                          >
                            -
                          </button>
                          <span className='mx-3 text-[#252A2B]'>{quantities[index]}</span>{' '}
                          <button
                            onClick={() => increase(index)} // Truyền index để tăng số lượng
                            className='bg-gray-200 px-2 py-1 rounded-md cursor-pointer size-6 flex items-center justify-center'
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <span className='font-bold'>{(product.price * quantities[index]).toLocaleString()}₫</span>
                      <button onClick={() => mutate({ action: 'REMOVE', productId: product.productId._id })}>
                        <img src='./src/assets/icon/delete.svg' alt='Remove' className='size-5 min-h-5 min-w-5' />
                      </button>
                    </div>

                    {/* Giá sản phẩm */}
                    <div className='flex flex-col items-end'>
                      <button onClick={() => mutate({ action: 'REMOVE', sku_id: product.sku_id._id })}>
                        <img src='./src/assets/icon/delete.svg' alt='Remove' className='size-5 min-h-5 min-w-5' />
                      </button>
                      <span className='mt-4 font-semibold text-sm '>{product.price.toLocaleString()}₫</span>
                    </div>
                  </div>
                ))}
                {/* Tổng tiền */}
                <div className='mt-4'>
                  <div className='flex justify-between font-semibold'>
                    <span>Tổng tiền:</span>
                    <span className='text-red-500'>{calculateTotal().toLocaleString()}₫</span>
                  </div>
                  <Link to={`/cart`}>
                    <button
                      className='mt-4 bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded'
                      onClick={() => onClose()}
                    >
                      XEM GIỎ HÀNG
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className='text-center'>
                <span className='text-gray-400 text-2xl'>
                  <MehOutlined />
                </span>
                <p className='mt-2'>Không có sản phẩm trong giỏ hàng</p>
                <NavLink to='/products' className='text-blue-500 hover:underline text-sm mt-2 block'>
                  Trở về trang sản phẩm
                </NavLink>
              </div>
            )}
          </Drawer>
        </nav>
      </div>
      <hr className='border border-[#E0E2E7]' />
    </div>
  )
}

export default Header
