import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type RevenueData = {
  time: string
  'Doanh thu': number
}

type RevenueState = {
  monthly: RevenueData[]
  weekly: RevenueData[]
  yearly: RevenueData[]
}

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly')

  const [data, setData] = useState<RevenueState>({
    monthly: [],
    weekly: [],
    yearly: []
  })

  const {
    data: orderData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['thongke'],
    queryFn: async () => {
      try {
        return await instance.get(`/orders`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  useEffect(() => {
    const calculateRevenue = () => {
      if (orderData?.data?.res?.items) {
        const orders = orderData.data.res.items

        // Khởi tạo doanh thu cho mỗi tháng (từ tháng 1 đến tháng 12)
        const revenueByMonth: Record<string, number> = {}

        // Khởi tạo doanh thu theo tuần (Tuần 1 đến Tuần 4) trong tháng hiện tại
        const revenueByWeek: Record<string, number> = {}

        // Khởi tạo doanh thu theo năm
        const revenueByYear: Record<string, number> = {}

        // Khởi tạo dữ liệu doanh thu cho các tháng từ 1 đến 12, mặc định là 0
        for (let month = 1; month <= 12; month++) {
          const monthKey = `2024-${month < 10 ? '0' + month : month}` // Định dạng năm-tháng (Ví dụ: '2024-01')
          revenueByMonth[monthKey] = 0
        }

        // Tạo doanh thu cho các tuần từ Tuần 1 đến Tuần 4 (dự phòng cho trường hợp không có đơn hàng trong tuần)
        const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
        weeks.forEach((week) => {
          revenueByWeek[week] = 0 // Khởi tạo doanh thu cho từng tuần mặc định là 0
        })

        // Tính doanh thu cho mỗi đơn hàng có trạng thái "Completed" và cộng vào tháng, tuần, năm tương ứng
        orders.forEach((order: any) => {
          if (order.status === 'Completed') {
            // Chỉ tính các đơn hàng có trạng thái "Completed"
            const orderDate = new Date(order.date_issued)
            const month = orderDate.getMonth() + 1 // Tháng (1-12)
            const year = orderDate.getFullYear() // Năm (2024, 2025, ...)

            const monthKey = `${year}-${month < 10 ? '0' + month : month}`

            // Cộng doanh thu vào tháng tương ứng
            if (revenueByMonth[monthKey] !== undefined) {
              revenueByMonth[monthKey] += order.total_amount || 0
            }

            // Tính số tuần trong tháng hiện tại (4 tuần)
            const week = Math.ceil(orderDate.getDate() / 7) // Tuần trong tháng, tính bằng cách chia ngày trong tháng cho 7
            const weekKey = `Tuần ${week}` // Đổi thành "Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"

            // Cộng doanh thu vào tuần tương ứng
            if (revenueByWeek[weekKey] !== undefined) {
              revenueByWeek[weekKey] += order.total_amount || 0
            }

            // Cộng doanh thu vào năm tương ứng
            if (revenueByYear[year] !== undefined) {
              revenueByYear[year] += order.total_amount || 0
            } else {
              revenueByYear[year] = order.total_amount || 0
            }
          }
        })

        // Chuyển dữ liệu doanh thu theo tháng thành dạng phù hợp với biểu đồ
        const revenueData: RevenueData[] = Object.keys(revenueByMonth).map((monthKey) => ({
          time: monthKey, // Ví dụ: '2024-01'
          'Doanh thu': revenueByMonth[monthKey]
        }))

        // Chuyển doanh thu theo tuần thành dạng dữ liệu để hiển thị
        const revenueWeekData: RevenueData[] = weeks.map((weekKey) => ({
          time: weekKey, // 'Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'
          'Doanh thu': revenueByWeek[weekKey]
        }))

        // Chuyển doanh thu theo năm thành dạng dữ liệu để hiển thị và sắp xếp theo năm tăng dần
        const revenueYearData: RevenueData[] = Object.keys(revenueByYear)
          .filter((yearKey) => revenueByYear[yearKey] > 0) // Lọc chỉ những năm có doanh thu > 0
          .map((yearKey) => ({
            time: yearKey, // '2024', '2025', ...
            'Doanh thu': revenueByYear[yearKey]
          }))
          .sort((a, b) => parseInt(a.time) - parseInt(b.time)) // Sắp xếp theo năm tăng dần

        // Cập nhật dữ liệu doanh thu cho cả tháng, tuần và năm
        setData({
          monthly: revenueData,
          weekly: revenueWeekData,
          yearly: revenueYearData
        })
      }
    }

    calculateRevenue()
  }, [orderData])

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value as 'weekly' | 'monthly' | 'yearly')
  }

  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error.message}</div>
  return (
    <div className='bg-white p-6 rounded-lg mb-6 shadow-xl'>
      <h3 className='text-2xl font-semibold text-center mb-4'>Thống kê doanh thu</h3>

      <div className='mb-4 flex justify-center'>
        <select
          className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value='weekly'>Theo tuần</option>
          <option value='monthly'>Theo tháng</option>
          <option value='yearly'>Theo năm</option>
        </select>
      </div>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={selectedPeriod === 'weekly' ? data.weekly : selectedPeriod === 'yearly' ? data.yearly : data.monthly}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis />
          <Tooltip formatter={(value) => new Intl.NumberFormat().format(Number(value)) + ' VND'} />
          <Legend />
          <Bar dataKey='Doanh thu' fill='#60a5fa' barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Revenue
