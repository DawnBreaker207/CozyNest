import { Cart } from '@/components/icons/index'
import { DoubleRightOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Drawer, Dropdown, MenuProps } from 'antd'
import { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProductList = () => {
  const [, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const show = () => {
    // setVisible(true)
    setOpen(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpen(false)
  }
  const menu: MenuProps['items'] = [
    { key: '1', label: 'Giá: Thấp đến Cao', className: 'hover:bg-yellow-500' },
    { key: '2', label: 'Giá: Cao đến Thấp', className: 'hover:bg-yellow-500' },
    { key: '3', label: 'Từ A - Z', className: 'hover:bg-yellow-500' },
    { key: '4', label: 'Từ Z - A', className: 'hover:bg-yellow-500' },
    { key: '5', label: 'Sản phẩm bán chạy', className: 'hover:bg-yellow-500' }
  ]
  return (
    <>
      <div className='flex flex-row justify-between items-center my-4 px-8 space-x-2 md:space-x-4'>
        {/* Nút Bộ lọc */}
        <Button icon={<FilterOutlined />} onClick={show} className='flex items-center text-sm md:text-base'>
          Bộ lọc
        </Button>

        {/* Dropdown Sắp xếp */}
        <Dropdown menu={{ items: menu }} placement='bottomRight'>
          <Button className='flex items-center text-sm md:text-base'>
            <SortAscendingOutlined className='mr-2' />
            Sắp xếp
          </Button>
        </Dropdown>
      </div>
      <hr className='my-4 ' />
      <Drawer width={280} title='BỘ LỌC' onClose={onClose} open={open} placement='left'>
        <div>
          <div className='p-2'>
            {/* Product Categories */}
            <div className='my-4'>
              <h4 className='mb-2 text-lg'>Danh mục sản phẩm</h4>
              <Link className='text-black hover:text-yellow-500 ' to='#'>
                Sản phẩm khuyến mãi
              </Link>
              <br />
              <Link className='text-black hover:text-yellow-500 ' to='#'>
                sản phẩm nổi bật
              </Link>
              <br />
              <Link className='text-black hover:text-yellow-500 ' to='#'>
                Tất cả sản phẩm
              </Link>
            </div>
            <hr />
            {/* Supplier */}
            <div className='my-4'>
              <h4 className='mb-2 text-lg'>Nhà cung cấp</h4>
              <Checkbox>Khác</Checkbox>
            </div>
            <hr />
            {/* Price Filter */}
            <div className='my-4'>
              <h4 className='mb-2 text-lg'>Lọc giá</h4>
              <Checkbox> Dưới 1.000.000₫</Checkbox>
              <br />
              <Checkbox> 1.000.000₫ - 2.000.000₫</Checkbox>
              <br />
              <Checkbox> 2.000.000₫ - 3.000.000₫</Checkbox>
              <br />
              <Checkbox> 3.000.000₫ - 4.000.000₫</Checkbox>
              <br />
              <Checkbox> Trên 4.000.000₫</Checkbox>
            </div>
            <hr />
            {/* Color Filter */}
            <div className='my-4'>
              <h4 className='mb-2'>Màu sắc</h4>
              <div className='flex flex-wrap gap-2'>
                {[
                  'bg-pink-500',
                  'bg-orange-500',
                  'bg-red-500',
                  'bg-gray-400',
                  'bg-white',
                  'bg-black',
                  'bg-green-500',
                  'bg-yellow-500',
                  'bg-blue-500'
                ].map((colorClass, index) => (
                  <div key={index} className={`w-6 h-6 border rounded cursor-pointer ${colorClass}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      {/* sản phẩm  */}
      <div className='mx-12'>
        <span className='m-4'>10 sản phẩm</span>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5  mt-4 mb-8'>
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp1.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp2.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp2.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp3.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp3.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp4.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp4.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp5.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp5.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp6.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp6.2.jpg' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp7.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp7.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp8.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp8.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp9.jpg' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp9.2.jpg' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
          <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 '>
            <div className='relative'>
              <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                <img src='./src/assets/images/product/sp10.webp' alt='' className='object-cover' />
                <img src='./src/assets/images/product/sp10.2.webp' alt='' className='object-cover' />
              </div>
              <FaRegEye
                className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                title='Xem nhanh'
              />
              <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                -29%
              </span>
            </div>
            <div className='mx-2 text-center space-y-2 mt-3'>
              <h3>Ấm trà inox không ghỉ</h3>
              <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
              </div>
              <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                <div className='p-[6px] bg-[#FCA120] rounded-full'>
                  <Cart />
                </div>
              </button>
            </div>
          </div>
          {/* End product */}
        </div>
        {/* sản phẩm nổi bật */}
        <div className='bg-[#faefec] mt-10 mb-8 rounded'>
          <div className='flex flex-row justify-between px-8 p-2 '>
            <h2 className='text-lg sm:text-2xl font-semibold text-center px-5 mt-4  '>Sản phẩm nổi bật</h2>
            <Link to={'#'} className='flex text-[#FCA120] mr-0.5 mt-[20px] px-5 hover:text-black text-sm sm:mt-6'>
              Xem thêm <DoubleRightOutlined className='ml-1 -mt-1 ' />
            </Link>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 items-center gap-5 sm:gap-10 lg:gap-20 mx-4 sm:mx-8 lg:mx-16 xl:mx-32 py-5'>
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <div className='relative'>
                <div className='flex transition-transform ease-in-out duration-500'>
                  <img src='src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full w-7 h-7 md:w-8 md:h-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3 className='text-sm sm:text-base'>Ấm trà không gỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
            {/* end */}
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <div className='relative'>
                <div className='flex transition-transform ease-in-out duration-500'>
                  <img src='src/assets/images/product/sp2.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full w-7 h-7 md:w-8 md:h-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3 className='text-sm sm:text-base'>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
            {/* end */}
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <div className='relative'>
                <div className='flex transition-transform ease-in-out duration-500'>
                  <img src='src/assets/images/product/sp3.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full w-7 h-7 md:w-8 md:h-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3 className='text-sm sm:text-base'>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
            {/* end  */}
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <div className='relative'>
                <div className='flex transition-transform ease-in-out duration-500'>
                  <img src='src/assets/images/product/sp4.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full w-7 h-7 md:w-8 md:h-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3 className='text-sm sm:text-base'>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductList
