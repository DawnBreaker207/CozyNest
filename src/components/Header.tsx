import {
  BellOutlined,
  DownOutlined,
  MailOutlined,
  MehOutlined,
  MenuOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons'

import {
  Badge,
  Button,
  Carousel,
  Divider,
  Drawer,
  Dropdown,
  GetProps,
  Input,
  Menu,
  MenuProps,
  Space,
  theme
} from 'antd'

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const { useToken } = theme

const Header = () => {
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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <span className='text-sm text-yellow-600'>Thiết kế nội thất chung cư cho đôi vợ chồng trẻ</span>
          <br />
          <span className='text-blue-500'>xem chi tiết</span>
          <hr />
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <span className='text-sm text-yellow-600'>
            Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn
          </span>
          <br />
          <span className='text-blue-500'>xem chi tiết</span>
          <hr />
        </a>
      )
    },
    {
      key: '3',
      label: (
        <a href='#' target='_blank' rel='noopener noreferrer'>
          <span className='text-sm text-yellow-600'>Mua sofa giường mang cả thiên đường đến những căn hộ nhỏ</span>
          <br />
          <span className='text-blue-500'>xem chi tiết</span>
          <hr />
        </a>
      )
    }
  ]
  const users: MenuProps['items'] = [
    {
      label: <a href='#'>Tên người dùng</a>,
      key: '0'
    },
    {
      label: <a href='#'>Đơn hàng</a>,
      key: '1'
    },
    {
      type: 'divider'
    },
    {
      label: <a href='#'>Đăng xuất</a>,
      key: '3'
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

  return (
    <div>
      <div className='bg-black p-1 text-center '>
        <Carousel autoplay effect='fade' dots={false}>
          <div>
            <span className='text-yellow-50'>Miễn phí vận chuyển cho đơn trên 500k</span>
          </div>
          <div>
            <span className='text-yellow-50'>Khuyến mãi khủng giảm tới 35% cho tất cả sản phẩm</span>
          </div>
          <div>
            <span className='text-yellow-50'>Sale hot chào lương về - Freeship đơn từ 0đ</span>
          </div>
        </Carousel>
      </div>
      {/* <div className='hidden md:block'>
        <div className='bg-black text-foreground flex p-2 flex-col md:flex-row  justify-between items-center text-white'>
          <div className='flex flex-row mb-4 md:mb-0'>
            <span className='text-sm ml-2'>Hotline: 1900.636.000 </span>
            <span className='text-sm ml-2'> | Liên hệ </span>
          </div>
          <NavLink to={'#'} className='flex items-center mr-2'>
            <span className='mx-4 hidden md:block'>|</span>
            <Dropdown menu={{ items }} placement='bottomRight' arrow > 
              <span className='bg-accent text-accent-foreground rounded-lg hidden md:inline-block'>
                <Badge count={5} className='text-sm'>
                  <BellOutlined className='text-sm rounded bg-white' />
                </Badge>
                Thông báo của tôi
              </span>
            </Dropdown>
          </NavLink>
        </div>
      </div> */}
      <hr />
      {/* header */}
      <nav className='flex items-center justify-between p-1 bg-background'>
        <div className='text-2xl font-bold text-foreground'>
          <img src='src/assets/icon/logo.jpg' alt='' width={210} />
        </div>
        <div className='hidden md:flex space-x-8'>
          <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
            Trang chủ
          </NavLink>
          <Dropdown menu={{ items: menus }}>
            <NavLink to={'#'} className='bg-white'>
              Sản phẩm <DownOutlined className='text-xs ' />
            </NavLink>
          </Dropdown>
          <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
            Giới thiệu
          </NavLink>
          <NavLink to={'#'} className='text-muted hover:text-muted-foreground'>
            Cẩm nang trang trí
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
                <Button shape='circle' icon={<UserOutlined />} />
              </Space>
            </span>
          </Dropdown>
          <Button shape='circle' icon={<ShoppingCartOutlined />} className='relative ' onClick={show}>
            <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
              0
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
        </Drawer>
      </nav>
      <hr />
    </div>
  )
}

export default Header
