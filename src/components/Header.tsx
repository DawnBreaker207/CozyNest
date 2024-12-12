import instance from '@/configs/axios'
import { useCartStore } from '@/hooks/store/cartStore'
import { useAdminUser } from '@/hooks/useAdminUsersQuery'
import useCart from '@/hooks/useCart'
import { useCookie } from '@/hooks/useStorage'
import { useUser } from '@/hooks/useUser'
import { ICategory } from '@/types/category'
import {
  DeleteOutlined,
  DownOutlined,
  MailOutlined,
  MehOutlined,
  MenuOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Button, Divider, Drawer, Dropdown, GetProps, Input, List, MenuProps, message, Modal, Space, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { menu1 } from './data/Header'

const { useToken } = theme

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [, contextHolder] = message.useMessage()
  const { token } = useToken()
  const { data, calculateTotal, mutate } = useCart()

  const { Logout, user, userId } = useUser()
  const { products, quantities, setQuantity } = useCartStore()
  const [isVisible, setIsVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { data: userData, error } = useAdminUser(userId ?? '')
  const [isOpen, setIsOpen] = useState(false) // Quản lý trạng thái mở/đóng menu

  // Toggle trạng thái menu
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Đóng menu khi nhấp ra ngoài
  const handleClickOutside = (e: any) => {
    if (!e.target.closest('.menu-container')) {
      setIsOpen(false)
    }
  }
  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await instance.get('/categories')
        setCategories(data.res) // Giả sử `data` là mảng danh mục
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }
    fetchCategories()
  }, [])
  // Thêm sự kiện lắng nghe nhấp ra ngoài
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      message.warning('Vui lòng nhập từ khóa tìm kiếm!')
      return
    }

    setLoading(true)

    try {
      // Gọi API với query từ người dùng
      const response = await instance.get('http://localhost:8888/api/v1/search', {
        params: { query: value }
      })

      setResults(response.data) // Lưu kết quả vào state
    } catch (error: any) {
      if (error.response?.status === 404) {
        message.info('Không tìm thấy sản phẩm nào.')
      } else {
        message.error('Đã có lỗi xảy ra khi tìm kiếm!')
      }
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const clearResults = () => {
    setResults([]) // Xóa kết quả tìm kiếm
  }

  const toggleDrawer = (isVisible: boolean, isOpen: boolean) => {
    setVisible(isVisible)
    setOpen(isOpen)
  }

  const showDrawer = () => {
    toggleDrawer(true, false)
  }
  const onOpen = () => {
    toggleDrawer(false, true)
  }
  const onClose = () => {
    toggleDrawer(false, false)
  }

  useEffect(() => {
    const duration = 6000
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    // Dọn dẹp để xóa timer khi component unmount
    return () => clearTimeout(timer)
  }, [])

  // Tăng số lượng sản phẩm
  const increase = (index: number) => {
    if (quantities[index]) {
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

  // const show = () => {
  //   if (!userId) {
  //     // Nếu không có userId, chuyển hướng đến trang đăng nhập
  //     window.location.href = '/login'
  //   } else {
  //     setOpen(true) // Mở Drawer nếu đã đăng nhập
  //   }
  // }

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary
  }
  type SearchProps = GetProps<typeof Input.Search>
  const { Search } = Input
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  // if (error) {
  //   Logout()
  //   return window.location.reload()
  // }

  const userJson = useCookie('user', {})
  const role = userJson ? userJson?.[0].role : null

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
        ...(role === 'admin' || role === 'shipper'
          ? [
              {
                label: <a href='/admin'>Quản lý</a>, // Liên kết đến trang quản lý
                key: '2'
              }
            ]
          : []), // Nếu không phải admin, không thêm menu này
        { type: 'divider' }, // Đường kẻ phân cách
        {
          label: (
            <a href='/' onClick={Logout}>
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

  const handleDelete = () => {
    // Thực hiện hành động mutate
    mutate({ action: 'REMOVE', sku_id: products[0].sku_id._id })
    setIsModalVisible(false) // Ẩn modal sau khi xóa
  }
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
            <div className='relative menu-container'>
              {/* Menu Button */}
              <div
                className='cursor-pointer flex items-center'
                onClick={toggleMenu} // Toggle trạng thái menu
              >
                <span className='text-muted hover:text-muted-foreground'>Sản phẩm</span>
                <DownOutlined className='text-xs max-w-[10px] w-[100%] h-auto ml-[3px]' />
              </div>

              {/* Dropdown Menu */}
              {isOpen && ( // Hiển thị menu nếu `isOpen` là `true`
                <div className='absolute top-full left-0 mt-2 bg-white shadow-md rounded-lg w-[200px] z-10'>
                  <ul className='py-2'>
                    {/* Mục "Sản phẩm mới" */}
                    <hr />
                    <li className='hover:bg-gray-100'>
                      <Link to='/products_page' className='block px-4 py-2 text-gray-700'>
                        Sản phẩm mới
                      </Link>
                      <hr />
                    </li>
                    {/* Danh sách các danh mục */}
                    {categories.map((category) => (
                      <>
                        <li key={category._id} className='hover:bg-gray-100'>
                          <Link to={`/category/${category._id}`} className='block px-4 py-2 text-gray-700'>
                            {category.name}
                          </Link>
                        </li>
                        <hr />
                      </>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
              onOpenChange={(visible) => {
                if (!visible) clearResults() // Xóa lịch sử khi dropdown đóng
              }}
              dropdownRender={() => (
                <div style={contentStyle}>
                  <Space direction='vertical' style={{ padding: 8 }}>
                    {/* Thanh tìm kiếm */}
                    <Search
                      placeholder='Tìm kiếm sản phẩm...'
                      onSearch={handleSearch}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      loading={loading}
                      className='w-full'
                    />
                  </Space>

                  {/* Hiển thị kết quả */}
                  <Divider style={{ margin: '8px 0' }} />
                  {results.length > 0 ? (
                    <List
                      size='small'
                      bordered
                      dataSource={results}
                      renderItem={(item: any) => (
                        <List.Item>
                          <img
                            src={item?.images?.[0]?.url}
                            alt={item.name}
                            style={{ width: 50, height: 50, marginRight: 8 }}
                          />
                          <div>
                            <strong>{item.name}</strong>
                            <p className='text-sm text-gray-500'>{item.description}</p>
                            {/* Link tới trang chi tiết sản phẩm */}
                            <Link to={`/detail/${item._id}`} className='text-blue-500 hover:underline'>
                              Xem chi tiết
                            </Link>
                          </div>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <p className='text-center text-gray-500 p-2'>{loading ? 'Đang tải...' : 'Không có kết quả'}</p>
                  )}
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
              open={isVisible}
              onOpenChange={(visible) => setIsVisible(visible)}
            >
              <span onClick={(e) => e.preventDefault()}>
                <Space>
                  {user ? (
                    <div className='flex'>
                      <Button shape='circle' className='mt-1.5'>
                        <img src={userData?.avatar} alt='user' className='w-[32px] h-[32px] rounded-full' />
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
              <Button shape='circle' icon={<ShoppingCartOutlined />} className='relative ' onClick={onOpen}>
                <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>
                  {data?.res?.products?.length || 0}
                </span>
              </Button>
            ) : (
              <Link to={`/login`}>
                <Button shape='circle' icon={<ShoppingCartOutlined />} className='relative ' onClick={onOpen}>
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

            <NavLink to={'/products_page'} className='block  text-black ml-2 hover:text-yellow-600 mb-3 '>
              Sản phẩm mới
            </NavLink>

            <NavLink to={'/intro'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Giới thiệu
            </NavLink>

            <NavLink
              to={'/policy/chinh-sach-ban-hang'}
              className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4'
            >
              Dịch vụ
            </NavLink>

            {/* <NavLink to={'#'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Cẩm nang trang trí
            </NavLink> */}
            <NavLink to={'/articles'} className='block  text-black ml-2 hover:text-yellow-600 mb-6 mt-4 '>
              Tin tức
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
                {products.map((product: any, index: number) => {
                  // Tìm variant phù hợp với sku_id
                  const currentVariant = product?.sku_id?.product_id?.variants.find(
                    (variant: any) => variant?.sku_id === product?.sku_id?._id
                  )

                  return (
                    <div key={product.sku_id._id} className='flex justify-between items-center mb-4 border-b pb-4'>
                      {/* Hình ảnh và thông tin sản phẩm */}
                      <div className='flex items-center'>
                        <img
                          src={product.sku_id.image[0]}
                          alt={product.sku_id.name}
                          className='w-16 h-20 object-cover'
                        />
                        <div className='ml-2 flex flex-col justify-between'>
                          <p className='font-semibold'>{product.sku_id.product_id.name}</p>

                          {/* Hiển thị giá trị option_value_id của variant hiện tại */}
                          <p>{currentVariant?.option_value_id?.label || 'Không xác định'}</p>

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
                      </div>
                      {/* Giá sản phẩm */}
                      <div className='flex flex-col items-end'>
                        <button title='Xóa' onClick={() => setIsModalVisible(true)}>
                          <DeleteOutlined />
                        </button>

                        <Modal
                          title='Xác nhận xóa'
                          open={isModalVisible}
                          onOk={handleDelete}
                          onCancel={() => setIsModalVisible(false)}
                          okText='Xóa'
                          cancelText='Hủy'
                        >
                          <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
                        </Modal>
                        <span className='mt-4 font-semibold text-sm '>{product.price.toLocaleString()}₫</span>
                      </div>
                    </div>
                  )
                })}
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
