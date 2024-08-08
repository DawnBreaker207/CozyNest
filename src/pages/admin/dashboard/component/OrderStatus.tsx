import { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { LuUsers2 } from 'react-icons/lu'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'

const OrderStatus = () => {
  const [filter, setFilter] = useState('Movie')
  return (
    <div className='flex gap-3'>
      <div className='w-1/3 p-4 border border-solid border-gray-200 flex flex-col gap-6 rounded-[10px]'>
        <div className='flex justify-between items-center'>
          <FiShoppingCart className='text-[25px]' />
          <Select
            defaultValue='All'
            value={filter}
            onChange={(value) => setFilter(value)}
            variant='outlined'
            className='bg-transparent outline-none text-sm'
            style={{ height: '30px' }}
          >
            <Option value='All'>Movie</Option>
            <Option value='Pending'>Pending</Option>
            <Option value='Completed'>Completed</Option>
          </Select>
        </div>
        <div className='flex gap-7'>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#CC5F5F]'>Abandoned Cart</p>
            <p className='text-[20px]'>20%</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#8B8D97]'>Customers</p>
            <p className='text-[20px]'>30</p>
          </div>
        </div>
      </div>
      <div className='w-1/3 p-4 border border-solid border-gray-200 flex flex-col gap-6 rounded-[10px]'>
        <div className='flex justify-between items-center'>
          <LuUsers2 className='text-[25px]' />
          <Select
            defaultValue='All'
            value={filter}
            onChange={(value) => setFilter(value)}
            variant='outlined'
            className='bg-transparent outline-none text-sm'
            style={{ height: '30px' }}
          >
            <Option value='All'>Movie</Option>
            <Option value='Pending'>Pending</Option>
            <Option value='Completed'>Completed</Option>
          </Select>
        </div>
        <div className='flex gap-7'>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#8B8D97]'>Customers</p>
            <p className='text-[20px]'>1,250</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#8B8D97]'>Active</p>
            <p className='text-[20px]'>1,180</p>
          </div>
        </div>
      </div>
      <div className='w-1/3 p-4 border border-solid border-gray-200 flex flex-col gap-6 rounded-[10px]'>
        <div className='flex justify-between items-center'>
          <MdOutlineShoppingBag className='text-[25px]' />
          <Select
            defaultValue='All'
            value={filter}
            onChange={(value) => setFilter(value)}
            variant='outlined'
            className='bg-transparent outline-none text-sm'
            style={{ height: '30px' }}
          >
            <Option value='All'>Movie</Option>
            <Option value='Pending'>Pending</Option>
            <Option value='Completed'>Completed</Option>
          </Select>
        </div>
        <div className='flex gap-7'>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#8B8D97]'>All Orders</p>
            <p className='text-[20px]'>0</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#8B8D97]'>Pending</p>
            <p className='text-[20px]'>0</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-[14px] text-[#8B8D97]'>Completed</p>
            <p className='text-[20px]'>0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus
