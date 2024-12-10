import CustomLoadingPage from '@/components/Loading'
import Revenue from './component/Revenue'
import TopProduct from './component/TopProduct'
import { useQuery } from '@tanstack/react-query'
import instance from '@/configs/axios'
import { useState } from 'react'
import { Select } from 'antd'
import RecentOrder from './component/RecentOrder'

const DashboardPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('TopProduct') // State cho component được chọn
  const handleComponentChange = (value: string) => {
    setSelectedComponent(value)
  }
  const {
    data: userData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: errorUsers
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        return await instance.get(`/users`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await instance.get(`/orders`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  // Tính tổng doanh thu cho các đơn hàng đã hoàn thành
  const totalRevenue = data?.data?.res.items
    ? data.data.res.items
        .filter((order: any) => {
          return order.status === 'Completed'
        }) // Lọc các đơn hàng có trạng thái 'Completed'
        .reduce((sum: number, order: any) => sum + order.total_amount, 0) // Cộng tổng số tiền
    : 0

  // Tính số lượng đơn hàng "Completed" và "Canceled"
  const completedOrders = data?.data?.res.items?.filter((order: any) => order.status === 'Completed').length || 0
  const canceledOrders = data?.data?.res.items?.filter((order: any) => order.status === 'Canceled').length || 0
  // Tính số lượng user role member
  const memberCount = userData?.data?.res.filter((user: any) => user.role === 'member').length || 0

  // Kiểm tra trạng thái loading tổng quát
  if (isLoadingUsers || isLoading) {
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  }

  // Xử lý lỗi
  if (isErrorUsers || isError) {
    return <div>{errorUsers?.message || error?.message}</div>
  }

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
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
            </span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/cart.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Đơn hàng hoàn thành</p>
            </div>
            <span className='text-xl font-semibold'>{completedOrders}</span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/delete.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Đơn hàng bị hủy</p>
            </div>
            <span className='text-xl font-semibold'>{canceledOrders}</span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/user.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Khách hàng</p>
            </div>
            <span className='text-xl font-semibold'>{memberCount}</span>
          </div>
        </div>
      </div>
      <div className='mb-10'>
        <Select
          defaultValue='TopProduct'
          style={{ width: 200 }}
          onChange={handleComponentChange}
          options={[
            { value: 'TopProduct', label: 'Top sản phẩm bán chạy' },
            { value: 'RecentOrder', label: 'Đơn hàng gần đây' }
          ]}
        />
      </div>
      <div className='grid grid-cols-2 gap-x-8 gap-y-10'>
        {selectedComponent === 'TopProduct' && <TopProduct />}
        {selectedComponent === 'RecentOrder' && <RecentOrder />}
        <Revenue />
      </div>
    </>
  )
}

export default DashboardPage
