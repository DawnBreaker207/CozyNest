import { Card, Table } from 'antd'
const { Column } = Table

type Props = {}
const product = [
  {
    key: '1',
    product: 'Tủ Hồ Sơ Hiện Đại HS06',
    category: 'Tủ',
    price: 1000000,
    quantity: 15
  },
  {
    key: '2',
    product: 'Tủ trang trí phòng khách Borax',
    category: 'Tủ',
    price: 1500000,
    quantity: 12
  },
  {
    key: '3',
    product: 'Tủ Sách Cửa Kính Gỗ Sồi Mỹ',
    category: 'Tủ',
    price: 2000000,
    quantity: 10
  },
  {
    key: '4',
    product: 'Giường Ngủ Đơn Giản GN-N10',
    category: 'Giường',
    price: 2500000,
    quantity: 8
  },
  {
    key: '5',
    product: 'Giường Ngủ Cao Cấp GN-N8',
    category: 'Giường',
    price: 1500000,
    quantity: 6
  },
  {
    key: '6',
    product: 'Giường 2 Tầng Đa Năng',
    category: 'Giường',
    price: 2500000,
    quantity: 4
  }
]

const TopProduct = (props: Props) => {
  return (
    <div>
      <div className='bg-white p-4 rounded-lg shadow-xl'>
        <h2 className='text-2xl font-semibold mb-5 text-center'>Top sản phẩm bán chạy</h2>
        <Table dataSource={product} pagination={{ pageSize: 5 }}>
          <Column title='Tên sản phẩm' dataIndex='product' key='product' />
          <Column title='Danh mục sản phẩm' dataIndex='category' key='category' />
          <Column
            title='Giá sản phẩm'
            dataIndex='price'
            key='price'
            render={(text) => `${text.toLocaleString()} VNĐ`} // Định dạng giá trị
          />
          <Column title='Đã bán' dataIndex='quantity' key='quantity' className='text-center' />
        </Table>
      </div>
    </div>
  )
}

export default TopProduct
