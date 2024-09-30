import { CheckOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import { useState } from 'react'

const CheckOutOrder = () => {
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false)

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt='product' className='w-16 h-16' />
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price'
    }
  ]

  const data = [
    {
      key: '1',
      image: '//product.hstatic.net/200000796751/product/kdp_4235_b09fff3d8f994eb486d4d13720ac3b25_small.jpg',
      description: 'Bộ ấm trà bằng sứ BLACK & WHITE hoa văn đen trắng',
      quantity: 1,
      price: '516,000₫'
    }
  ]

  return (
    <div className='mx-auto my-10'>
      <div className='flex flex-col lg:flex-row justify-between pt-14 mt-10'>
        {/* Thông tin đặt hàng */}
        <div className='lg:w-1/2 lg:p-[66px] px-4 lg:pl-[66px] mb-8 lg:mb-0'>
          <h1 className='text-3xl font-bold'>CozyNest</h1>
          <div className='flex items-center'>
            <div>
              <h2 className='text-xl font-semibold'>Đặt hàng thành công</h2>
              <p className='text-gray-600'>Mã đơn hàng #105260</p>
              <p className='text-gray-600'>Cảm ơn bạn đã mua hàng!</p>
            </div>
            <div className='flex justify-center items-center w-12 h-12 border-2 mx-5 my-4 border-green-500 rounded-full bg-white cursor-pointer'>
              <CheckOutlined className='text-green-500 text-xl' />
            </div>
          </div>

          <div className='my-4 border border-[2px]'>
            <div className='px-2 mt-2'>
              <h3 className='text-xl font-semibold'>Thông tin giao hàng</h3>
            </div>
            <div className='px-2'>
              <p>minh</p>
              <p>0394494851</p>
              <p>bg</p>
              <p>Xã Phì Điền</p>
              <p>Huyện Lục Ngạn</p>
              <p>Bắc Giang</p>
              <p>Vietnam</p>

              <h3 className='text-lg font-semibold mt-4'>Phương thức thanh toán</h3>
              <p>Thanh toán khi giao hàng (COD)</p>
            </div>
          </div>

          <Button type='primary' className='mt-6'>
            Tiếp tục mua hàng
          </Button>

          <div className='text-gray-500 mt-4'>
            <p>
              Cần hỗ trợ?{' '}
              <a href='mailto:hminh0555@gmail.com' className='text-blue-500'>
                Liên hệ chúng tôi
              </a>
            </p>
          </div>
        </div>

        {/* Thông tin đơn hàng */}
        <div className='lg:w-1/2 p-4 border-l lg:p-[66px] pl-4 lg:pl-[66px] mb-8'>
          <h2 className='text-lg font-semibold'>Thông tin đơn hàng</h2>

          {/* Chỉ hiển thị nút trên mobile */}
          <div className='block lg:hidden mt-4'>
            <button
              className='w-full text-left bg-gray-200 p-2 rounded'
              onClick={() => setIsOrderDetailsVisible(!isOrderDetailsVisible)}
            >
              {isOrderDetailsVisible ? 'Ẩn chi tiết đơn hàng' : 'Hiện chi tiết đơn hàng'}
            </button>
          </div>

          {/* Hiển thị bảng thông tin đơn hàng chỉ trên PC */}
          <div className='hidden lg:block'>
            <Table columns={columns} dataSource={data} pagination={false} className='my-4' />
            <div className='border-t mt-4 pt-4'>
              <div className='flex justify-between'>
                <span>Tạm tính</span>
                <span>516,000₫</span>
              </div>
              <div className='flex justify-between mt-2'>
                <span>Phí vận chuyển</span>
                <span>20,000₫</span>
              </div>
              <div className='flex justify-between mt-4 font-bold text-lg'>
                <span>Tổng cộng</span>
                <span>536,000₫</span>
              </div>
            </div>
          </div>

          {/* Hiển thị thông tin chi tiết đơn hàng trên mobile nếu đã mở */}
          {isOrderDetailsVisible && (
            <div className='lg:hidden'>
              <Table columns={columns} dataSource={data} pagination={false} className='my-4' />
              <div className='border-t mt-4 pt-4'>
                <div className='flex justify-between'>
                  <span>Tạm tính</span>
                  <span>516,000₫</span>
                </div>
                <div className='flex justify-between mt-2'>
                  <span>Phí vận chuyển</span>
                  <span>20,000₫</span>
                </div>
                <div className='flex justify-between mt-4 font-bold text-lg'>
                  <span>Tổng cộng</span>
                  <span>536,000₫</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOutOrder
