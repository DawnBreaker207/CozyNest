import instance from '@/configs/axios'
import { useEffect, useState } from 'react'
import Revenue from './component/Revenue'
import { Table, Tag } from 'antd';
interface Order {
  _id: string;
  customer_name: string;
  total_amount: number;
  email: string;
  status: string;
  user_id: string;
  createdAt: string;
  order_details: OrderDetailType[];
};
interface OrderDetailType {
  product_id: string;
  name: string;
  quantity: number;
}
const DashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const { data } = await instance.get('/orders')
        setOrders(Array.isArray(data.res.items) ? data.res.items : []);
        console.log(data.res.items);
        const ordersData = data.res.items;
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
          console.log(ordersData)
        } else {
          console.error('Dữ liệu không hợp lệ, `items` không phải là mảng');
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrder()
  }, [])
  
  //*tổng doanh thu
  const totalRevenue = orders.reduce(
    (total, order) => total + (Number(order.total_amount) || 0),
    0
  );
 console.log(totalRevenue)  ;

 //*đơn hàng hoàn thành
 const completedOrdersCount = orders.filter(order => order.status === 'Completed').length;
 console.log(completedOrdersCount);

 //*đơn hàng bị hủy
 const canceledOrdersCount = orders.filter(order => order.status === 'Canceled').length;
 console.log(canceledOrdersCount);
//* số lượng khách hàng đặt hàng 
 const uniqueCustomers = new Set(orders.map(order => order.customer_name)); // Hoặc sử dụng `user_id`
  const customerCount = uniqueCustomers.size;

  const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//* Lấy 5 đơn hàng gần nhất
  const latestOrders = sortedOrders.slice(0, 5);
  console.log(latestOrders)
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Thời gian đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Người đặt hàng',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (
        status:
          | 'Processing'
          | 'Pending'
          | 'Confirmed'
          | 'Pending-Ship'
          | 'Delivering'
          | 'Delivered'
          | 'Canceled'
          | 'Completed'
          | 'Returned'
          | 'Refunded'
      ) => {
        // Ánh xạ trạng thái với màu tương ứng
        const statusColors: { [key in typeof status]: string } = {
          Processing: 'blue',
          Pending: 'yellow',
          Confirmed: 'gold',
          'Pending-Ship': 'orange',
          Delivering: 'orange',
          Delivered: 'green',
          Canceled: 'red',
          Completed: 'cyan',
          Returned: 'magenta',
          Refunded: 'purple'
        }
        return <Tag color={statusColors[status] || 'gray'}>{status.replace('-', ' ')}</Tag>
      }
    },
  ];
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
              {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/cart.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Đơn hàng hoàn thành</p>
            </div>
            <span className='text-xl font-semibold'>{completedOrdersCount}</span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/delete.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Đơn hàng bị hủy</p>
            </div>
            <span className='text-xl font-semibold'>{canceledOrdersCount}</span>
          </div>
        </div>
        <div className='rounded-xl shadow-xl'>
          <div className='flex flex-col gap-5 p-5'>
            <div className='flex gap-3 items-center'>
              <img src='/src/assets/images/content/user.png' alt='' className='size-8' />
              <p className='font-medium text-lg'>Khách hàng</p>
            </div>
            <span className='text-xl font-semibold'>{customerCount}</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-8 gap-y-10'>
      <div>
      <div className='bg-white p-4 rounded-lg shadow-xl'>
        <h2 className='text-2xl font-semibold mb-5 text-center'>5 Đơn hàng gần nhất</h2>
        <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Top 5 Đơn Hàng Gần Nhất</h2>
      <Table
        columns={columns}
        dataSource={latestOrders}
        rowKey="_id"
        pagination={false} // Tắt phân trang
      />
    </div>
      </div>
    </div>
        <Revenue />
      </div>
    </>
  )
}

export default DashboardPage
