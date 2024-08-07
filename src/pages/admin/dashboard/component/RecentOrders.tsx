
import React, { useState } from 'react';
import { MenuItem, Select } from '@mui/material';

const orders = [
  {
    id: 1,
    productName: 'iPhone 13',
    productImage: 'https://via.placeholder.com/50', // Thay bằng URL hình ảnh thực tế của sản phẩm
    price: '₦730,000.00 x 1',
    date: '12 Sept 2022',
    status: 'Pending'
  },
  {
    id: 2,
    productName: 'iPhone 13',
    productImage: 'https://via.placeholder.com/50', // Thay bằng URL hình ảnh thực tế của sản phẩm
    price: '₦730,000.00 x 1',
    date: '12 Sept 2022',
    status: 'Completed'
  },
   {
    id: 3,
    productName: 'iPhone 14',
    productImage: 'https://via.placeholder.com/50', // Thay bằng URL hình ảnh thực tế của sản phẩm
    price: '₦730,000.00 x 1',
    date: '12 Sept 2022',
    status: 'Pending'
  }

,
   {
    id: 4,
    productName: 'iPhone 15',
    productImage: 'https://via.placeholder.com/50', // Thay bằng URL hình ảnh thực tế của sản phẩm
    price: '₦730,000.00 x 1',
    date: '12 Sept 2022',
    status: 'Completed'
  },
    {
    id: 5,
    productName: 'iPhone 16',
    productImage: 'https://via.placeholder.com/50', // Thay bằng URL hình ảnh thực tế của sản phẩm
    price: '₦730,000.00 x 1',
    date: '12 Sept 2022',
    status: 'Completed'
  },
];

const statusColors = {
  Pending: 'bg-red-100 text-red-600',
  Completed: 'bg-blue-100 text-blue-600'
};

const RecentOrders = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Recent Orders</h2>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          variant="outlined"
          className="bg-transparent outline-none text-sm"
          style={{ height: '30px' }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </div>
      {orders.filter(order => filter === 'All' || order.status === filter).map(order => (
        <div key={order.id} className="flex justify-between items-center mb-4 border-b pb-2">
          <div className="flex items-center space-x-4">
            <img src={order.productImage} alt={order.productName} className="w-12 h-12 rounded" />
            <div className="flex flex-col gap-2" >
              <h3 className="font-medium">{order.productName}</h3>
              <p className="text-gray-500">{order.price}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-gray-500">{order.date}</p>
            <span className={`px-2 py-1 rounded ${statusColors[order.status]}`}>
              {order.status}
            </span>
          </div>

          
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;