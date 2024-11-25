import CustomLoadingPage from '@/components/Loading'
import { Card, Table } from 'antd'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
const { Column } = Table

const product = [
  {
    key: '1',
    product: 'Handmade Pouch',
    category: 'Bag & Pouch',
    price: '$500'
  },
  {
    key: '2',
    product: 'Smartwatch E2',
    category: 'Watch',
    price: '$500'
  },
  {
    key: '3',
    product: 'Smartwatch E1',
    category: 'Watch',
    price: '$500'
  },
  {
    key: '4',
    product: 'Headphone G1 Pro',
    category: 'Audio',
    price: '$500'
  },
  {
    key: '5',
    product: 'iPhone X',
    category: 'Smartphone',
    price: '$500'
  }
]
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300
  }
]
const data01 = [
  {
    name: 'Group A',
    value: 400
  },
  {
    name: 'Group B',
    value: 300
  },
  {
    name: 'Group C',
    value: 300
  },
  {
    name: 'Group D',
    value: 200
  },
  {
    name: 'Group E',
    value: 278
  },
  {
    name: 'Group F',
    value: 189
  }
]
const data02 = [
  {
    name: 'Group A',
    value: 2400
  },
  {
    name: 'Group B',
    value: 4567
  },
  {
    name: 'Group C',
    value: 1398
  },
  {
    name: 'Group D',
    value: 9800
  },
  {
    name: 'Group E',
    value: 3908
  },
  {
    name: 'Group F',
    value: 4800
  }
]
const data3 = [
  {
    name: 'Group A',
    value: 400
  },
  {
    name: 'Group B',
    value: 300
  },
  {
    name: 'Group C',
    value: 500
  },
  {
    name: 'Group D',
    value: 200
  },
  {
    name: 'Group E',
    value: 278
  },
  {
    name: 'Group F',
    value: 189
  }
]
const colors = ['red', 'green', 'blue', 'yellow']

// const maxValue = Math.max(...data.map((d) => d.value))
const DashboardPage = () => {
  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-2  '>
        <Card className='bg-white p-4 w-auto rounded-lg shadow' title='Customer Volume'>
          <PieChart width={530} height={250}>
            <Pie data={data01} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={50} fill='#8884d8' />
            <Pie
              data={data02}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              fill='#82ca9d'
              label
            />
          </PieChart>
        </Card>
        <div className='bg-white p-4 w-auto rounded-lg shadow'>
          <span className='text-xl ml-6'>Customer Volume</span>
          <BarChart style={{ marginTop: 50 }} width={550} height={250} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='pv' fill='#8884d8' />
            <Bar dataKey='uv' fill='#82ca9d' />
          </BarChart>
        </div>

        <Card className='bg-white p-4 w-auto rounded-lg shadow' title='Customer Behavior'>
          <PieChart width={530} height={250}>
            <Pie data={data3} cx='50%' cy='50%' outerRadius={80} label dataKey='value'>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </Card>

        <Card className='bg-white p-4 rounded-lg shadow' title='Trending Orders'>
          <Table dataSource={product} pagination={{ pageSize: 5 }}>
            <Column title='Product' dataIndex='product' key='product' />
            <Column title='Category' dataIndex='category' key='category' />
            <Column title='Price' dataIndex='price' key='price' />
          </Table>
        </Card>
      </div>
    </>
  )
}

export default DashboardPage
