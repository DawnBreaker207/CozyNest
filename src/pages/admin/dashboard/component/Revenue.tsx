import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type RevenueData = {
  time: string
  'Doanh thu': number
}

// Dữ liệu giả định cho doanh thu theo tuần, tháng, năm
const revenueData = {
  weekly: [
    { time: 'Tuần 1', 'Doanh thu': 1000000 },
    { time: 'Tuần 2', 'Doanh thu': 800000 },
    { time: 'Tuần 3', 'Doanh thu': 3000000 },
    { time: 'Tuần 4', 'Doanh thu': 1300000 }
  ],
  monthly: [
    { time: 'Tháng 1', 'Doanh thu': 0 },
    { time: 'Tháng 2', 'Doanh thu': 0 },
    { time: 'Tháng 3', 'Doanh thu': 0 },
    { time: 'Tháng 4', 'Doanh thu': 0 },
    { time: 'Tháng 5', 'Doanh thu': 0 },
    { time: 'Tháng 6', 'Doanh thu': 0 },
    { time: 'Tháng 7', 'Doanh thu': 0 },
    { time: 'Tháng 8', 'Doanh thu': 0 },
    { time: 'Tháng 9', 'Doanh thu': 0 },
    { time: 'Tháng 10', 'Doanh thu': 0 },
    { time: 'Tháng 11', 'Doanh thu': 6000000 },
    { time: 'Tháng 12', 'Doanh thu': 7000000 }
  ],
  yearly: [
    { time: '2021', 'Doanh thu': 0 },
    { time: '2022', 'Doanh thu': 0 },
    { time: '2023', 'Doanh thu': 0 },
    { time: '2024', 'Doanh thu': 20000000 }
  ]
}

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly')
  const [data, setData] = useState<RevenueData[]>(revenueData.weekly)

  useEffect(() => {
    // Cập nhật dữ liệu khi `selectedPeriod` thay đổi
    setData(revenueData[selectedPeriod])
  }, [selectedPeriod]) // Chỉ chạy lại khi `selectedPeriod` thay đổi

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value as 'weekly' | 'monthly' | 'yearly')
  }

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
        <BarChart data={data}>
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
