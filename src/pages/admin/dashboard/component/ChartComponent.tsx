import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import './index.css';

const data = [
  { name: 'Sept 10', uv: 40 },
  { name: 'Sept 11', uv: 60 },
  { name: 'Sept 12', uv: 80 },
  { name: 'Sept 13', uv: 20 },
  { name: 'Sept 14', uv: 20 },
  { name: 'Sept 15', uv: 40 },
  { name: 'Sept 16', uv: 60 },
];

const ChartComponent = () => {
  return (
    <div className="p-4 bg-white shadow-lg w-2/3 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Summary</span>
          <span className="text-blue-600">Sales</span>
          <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5H7z" fill="currentColor"/>
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <span>Last 7 Days</span>
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5H7z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: 'gray', fontSize: 12 }} />
          <YAxis tick={{ fill: 'gray', fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="uv" fill="#3366FF" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

