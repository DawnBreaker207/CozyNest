/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useAdminUsersQuery } from '@/hooks/useAdminUsersQuery'
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

import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const { useToken } = theme

const Header = () => {
  const [user, setUser] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()
  const { data, calculateTotal, mutate } = useCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const products = data?.res?.products || []
  const [quantities, setQuantities] = useState<number[]>([])

  const [isVisible, setIsVisible] = useState(true)

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
      const initialQuantities = products.map((product: any) => product.quantity)
      setQuantities(initialQuantities)
    }
  }, [products])

  const increase = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      if (newQuantities[index] < 10) {
        newQuantities[index]++
        mutate({ action: 'INCREMENT', productId: products[index].productId._id })
      }
      return newQuantities
    })
  }

  const decrease = (index: number) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities]
      if (newQuantities[index] > 1) {
        newQuantities[index]--
        mutate({ action: 'DECREMENT', productId: products[index].productId._id })
      }
      return newQuantities
    })
  }

  useEffect(() => {
    // Cập nhật lại tổng tiền khi quantities thay đổi
    calculateTotal()
  }, [quantities, calculateTotal])

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser?.data?.res?.username || null)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
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
    },
    {
      key: '3',
      label: <span className='text-muted-foreground'>Chương trình khuyến mãi</span>
    }
  ]

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
    },
    {
      key: 'sub3',
      label: 'Chương trình khuyến mãi',
      children: [
        { key: '7', label: 'Giảm giá mùa hè' },
        { key: '8', label: 'Sale lớn lên tới 49%' }
      ]
    },
    {
      key: '9',
      label: (
        <div className='bg-accent text-accent-foreground p-4 rounded-lg'>
          <h3 className='text-xl font-bold'>SPRING SALE</h3>
          <p className='text-lg'>HÀNG HIỆU NGẬP TRÀN GIÁ NGÀN YÊU THƯƠNG</p>
          <p className='text-2xl font-bold'>
            Chỉ từ <span className='text-red-500'>99.000đ</span>
          </p>
          <p className='text-sm'>1-31.03 | Áp dụng hàng ngàn sản phẩm</p>
        </div>
      )
    }
  ]
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
    : [
        {
          label: <NavLink to='/login'>Đăng nhập</NavLink>, // Hiển thị nút đăng nhập nếu chưa đăng nhập
          key: '1'
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

  // Lấy dữ liệu từ localStorage khi component render
  useEffect(() => {
    const userDataString = localStorage.getItem('user')

    if (userDataString) {
      const userData = JSON.parse(userDataString)

      // Kiểm tra xem dữ liệu có hợp lệ không
      if (userData && Object.keys(userData).length > 0) {
        // Lấy ra ID người dùng từ thuộc tính `res`
        const retrievedUserId = userData.data.res._id
        // Gán userId vào state
        setUserId(retrievedUserId)
      }
    }
  }, []) // useEffect chỉ chạy 1 lần sau khi component mount

  // Sử dụng id từ state
  const id = userId || null
  const { data: userData, isLoading, error } = useAdminUsersQuery({ id })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  const userDetail = userData.res
  // console.log(userDetail.username)

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
            <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
              Trang chủ
            </NavLink>
            <Dropdown menu={{ items: menus }}>
              <NavLink to={'#'} className='bg-white md:items-center md:flex md:justify-between '>
                Sản phẩm <DownOutlined className='text-xs max-w-[8px] w-[100%] h-auto' />
              </NavLink>
            </Dropdown>
            <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
              Giới thiệu
            </NavLink>
            <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
              Cẩm nang
            </NavLink>
            <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
              Liên hệ
            </NavLink>
            <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
              Thông báo
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

            <Dropdown menu={{ items: users }} trigger={['click']}>
              <span onClick={(e) => e.preventDefault()}>
                <Space>
                  {user ? (
                    <div className='flex'>
                      <img src={userDetail.avatar} alt='user' className='w-[32px] h-[32px] rounded-full' />
                      {isVisible && <h1 className={`ml-2 mt-1`}>Xin chào {userDetail.username}</h1>}
                    </div>
                  ) : (
                    // Nếu không có người dùng đăng nhập, hiển thị icon mặc định
                    <Button shape='circle' icon={<UserOutlined />} />
                  )}
                </Space>
              </span>
            </Dropdown>
            <Button shape='circle' icon={<ShoppingCartOutlined />} className='relative ' onClick={show}>
              <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                {data?.res?.products?.length || 0}
              </span>
            </Button>
            <Button className='md:hidden' shape='circle' icon={<MenuOutlined />} onClick={showDrawer} />
          </div>
          <Drawer title='DANH MỤC' placement='right' onClose={onClose} open={visible} width={320}>
            <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Trang chủ
            </NavLink>
            <div className='p-2  '>
              <Dropdown menu={{ items: menu }} trigger={['click']}>
                <span className='text-secondary hover:text-yellow-600'>
                  Sản phẩm mới <DownOutlined className='text-xs' />
                </span>
              </Dropdown>
            </div>
            <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Giới thiệu
            </NavLink>
            <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Cẩm nang trang trí
            </NavLink>
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
            <span className='block  text-black hover:text-yellow-600 mb-6 mt-2'>
              <PhoneOutlined /> 1900 0091
            </span>
            <span className='block  text-black hover:text-yellow-600 mb-6 mt-2'>
              <MailOutlined /> admin@gmail.com
            </span>
          </Drawer>
          {/* giỏ hàng  */}
          <Drawer width={320} title='GIỎ HÀNG' onClose={onClose} open={open}>
            {products.length > 0 ? (
              <div>
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
                          <input type='number' value={quantities[index]} className='w-12 text-center border' readOnly />
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
        </nav>
      </div>
      <hr className='border border-[#E0E2E7]' />
    </div>
  )
}

export default Header
