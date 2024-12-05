import Revenue from './component/Revenue'
import TopProduct from './component/TopProduct'

const DashboardPage = () => {
  return (
    <>
      <h1 className='mb-5 text-2xl font-bold'>Thống kê</h1>
      <div className='grid grid-cols-4 px-5 mb-10 gap-10'>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/thu-nhap.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Tổng doanh thu</p>
            </div>
            <span className='text-xl font-semibold'>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(100000000)}
            </span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/cart.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Đơn hàng hoàn thành</p>
            </div>
            <span className='text-xl font-semibold'>50</span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/delete.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Đơn hàng bị hủy</p>
            </div>
            <span className='text-xl font-semibold'>5</span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/user.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Khách hàng</p>
            </div>
            <span className='text-xl font-semibold'>100</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-8 gap-y-10'>
        <TopProduct />
        <Revenue />
      </div>
    </>
  )
}

export default DashboardPage
