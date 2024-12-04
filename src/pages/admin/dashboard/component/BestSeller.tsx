// src/components/BestSeller.tsx
import React, { useState } from 'react'

type Product = {
  name: string
  salesDaily: number // Số lượng bán ra theo ngày
  salesWeekly: number // Số lượng bán ra theo tuần
  salesMonthly: number // Số lượng bán ra theo tháng
  salesYearly: number // Số lượng bán ra theo năm
  revenueDaily: number // Doanh thu theo ngày
  revenueWeekly: number // Doanh thu theo tuần
  revenueMonthly: number // Doanh thu theo tháng
  revenueYearly: number // Doanh thu theo năm
}

const topProductsData: Product[] = [
  {
    name: 'Sản phẩm 1',
    salesDaily: 50,
    salesWeekly: 350,
    salesMonthly: 1500,
    salesYearly: 18000,
    revenueDaily: 500,
    revenueWeekly: 3500,
    revenueMonthly: 15000,
    revenueYearly: 180000
  },
  {
    name: 'Sản phẩm 2',
    salesDaily: 70,
    salesWeekly: 490,
    salesMonthly: 2100,
    salesYearly: 25000,
    revenueDaily: 700,
    revenueWeekly: 4900,
    revenueMonthly: 21000,
    revenueYearly: 250000
  },
  {
    name: 'Sản phẩm 3',
    salesDaily: 80,
    salesWeekly: 560,
    salesMonthly: 2400,
    salesYearly: 30000,
    revenueDaily: 800,
    revenueWeekly: 5600,
    revenueMonthly: 24000,
    revenueYearly: 300000
  },
  {
    name: 'Sản phẩm 4',
    salesDaily: 40,
    salesWeekly: 280,
    salesMonthly: 1200,
    salesYearly: 15000,
    revenueDaily: 400,
    revenueWeekly: 2800,
    revenueMonthly: 12000,
    revenueYearly: 150000
  },
  {
    name: 'Sản phẩm 5',
    salesDaily: 60,
    salesWeekly: 420,
    salesMonthly: 1800,
    salesYearly: 20000,
    revenueDaily: 600,
    revenueWeekly: 4200,
    revenueMonthly: 18000,
    revenueYearly: 200000
  }
]

const BestSeller = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily')

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')
  }

  // Dữ liệu theo thời gian được chọn
  const data = topProductsData.map((product) => ({
    name: product.name,
    sales: product[`sales${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}` as keyof Product],
    revenue: product[`revenue${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}` as keyof Product]
  }))

  const title =
    selectedPeriod === 'daily'
      ? 'Sản phẩm bán chạy nhất theo ngày'
      : selectedPeriod === 'weekly'
        ? 'Sản phẩm bán chạy nhất theo tuần'
        : selectedPeriod === 'monthly'
          ? 'Sản phẩm bán chạy nhất theo tháng'
          : 'Sản phẩm bán chạy nhất theo năm'

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
      <h3 className='text-2xl font-semibold text-center text-gray-700 mb-4'>{title}</h3>

      {/* Dropdown để chọn khoảng thời gian */}
      <div className='mb-4 flex justify-center'>
        <select
          className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none'
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value='daily'>Theo ngày</option>
          <option value='weekly'>Theo tuần</option>
          <option value='monthly'>Theo tháng</option>
          <option value='yearly'>Theo năm</option>
        </select>
      </div>

      {/* Bảng sản phẩm bán chạy */}
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-gray-300'>
              <th className='p-3 text-left'>#</th>
              <th className='p-3 text-left'>Sản phẩm</th>
              <th className='p-3 text-left'>Số lượng bán</th>
              <th className='p-3 text-left'>Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => (
              <tr key={index} className='border-b hover:bg-gray-100'>
                <td className='p-3'>{index + 1}</td>
                <td className='p-3'>{product.name}</td>
                <td className='p-3 font-semibold'>{product.sales.toLocaleString()}</td>
                <td className='p-3 font-semibold text-green-600'>{product.revenue.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BestSeller
