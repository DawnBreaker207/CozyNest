// src/components/TopSellingProductsChart.tsx
import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type Product = {
  name: string
  revenueDaily: number
  revenueWeekly: number
  revenueMonthly: number
  revenueYearly: number
}

const topProductsData: Product[] = [
  { name: 'Sản phẩm 1', revenueDaily: 500, revenueWeekly: 3500, revenueMonthly: 15000, revenueYearly: 180000 },
  { name: 'Sản phẩm 2', revenueDaily: 700, revenueWeekly: 4900, revenueMonthly: 21000, revenueYearly: 250000 },
  { name: 'Sản phẩm 3', revenueDaily: 800, revenueWeekly: 5600, revenueMonthly: 24000, revenueYearly: 300000 },
  { name: 'Sản phẩm 4', revenueDaily: 400, revenueWeekly: 2800, revenueMonthly: 12000, revenueYearly: 150000 },
  { name: 'Sản phẩm 5', revenueDaily: 600, revenueWeekly: 4200, revenueMonthly: 18000, revenueYearly: 200000 }
]

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily') // Trạng thái chọn

  // Hàm xử lý thay đổi lựa chọn
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')
  }

  // Chuyển đổi dữ liệu theo khoảng thời gian đã chọn
  const data = topProductsData.map((product) => ({
    name: product.name,
    revenue: product[`revenue${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}` as keyof Product] // Lấy revenue theo loại đã chọn
  }))

  const title =
    selectedPeriod === 'daily'
      ? 'Doanh thu theo ngày'
      : selectedPeriod === 'weekly'
        ? 'Doanh thu theo tuần'
        : selectedPeriod === 'monthly'
          ? 'Doanh thu theo tháng'
          : 'Doanh thu theo năm'

  // Màu sắc cho các dòng
  const colors = ['#4B8E8D', '#F39C12', '#E74C3C', '#3498DB', '#2ECC71']

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
      <h3 className='text-2xl font-semibold text-center text-gray-700 mb-4'>{title}</h3>

      {/* Dropdown để chọn khoảng thời gian */}
      <div className='mb-4 flex justify-center'>
        <select
          className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 '
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value='daily'>Theo ngày</option>
          <option value='weekly'>Theo tuần</option>
          <option value='monthly'>Theo tháng</option>
          <option value='yearly'>Theo năm</option>
        </select>
      </div>

      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='revenue' stroke={colors[0]} strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Revenue
