import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { Card, Table } from 'antd'
const { Column } = Table

type Props = {}

interface ProductSales {
  totalQuantity: number
  totalRevenue: number
}
const TopProduct = (props: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['variants'],
    queryFn: async () => {
      try {
        return await instance.get(`/orders`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  // Lọc các đơn hàng có status là "Completed"
  const completedOrders = data?.data.res?.items.filter((order: any) => order.status === 'Completed')

  // Tính tổng số lượng và doanh thu cho từng sản phẩm
  const productSales: { [sku_id: string]: ProductSales } = {}

  completedOrders?.forEach((order: any) => {
    // Lọc sản phẩm không có sku_id
    order.products.forEach((product: any) => {
      if (product.sku_id) {
        // Kiểm tra nếu sản phẩm có sku_id
        if (!productSales[product.sku_id]) {
          productSales[product.sku_id] = { totalQuantity: 0, totalRevenue: 0 }
        }
        productSales[product.sku_id].totalQuantity += product.quantity
        productSales[product.sku_id].totalRevenue += product.price * product.quantity
      }
    })
  })

  // Sắp xếp các sản phẩm theo số lượng bán được (từ cao đến thấp)
  const topProducts = Object.entries(productSales)
    .map(([sku_id, sales]) => ({
      sku_id,
      totalQuantity: sales.totalQuantity,
      totalRevenue: sales.totalRevenue
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)

  // Chọn ra 5 sản phẩm bán chạy nhất
  const top5Products = topProducts.slice(0, 5)

  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )

  if (isError) return <div>{error.message}</div>

  return (
    <div>
      <div className='bg-white p-4 rounded-lg shadow-xl'>
        <h2 className='text-2xl font-semibold mb-5 text-center'>Top sản phẩm bán chạy</h2>
        <Table dataSource={top5Products} pagination={{ pageSize: 5 }} rowKey='sku_id'>
          <Column title='Mã sản phẩm' dataIndex='sku_id' key='sku_id' />
          <Column title='Số lượng đã bán' dataIndex='totalQuantity' key='totalQuantity' className='text-center' />
          <Column
            title='Doanh thu'
            dataIndex='totalRevenue'
            key='totalRevenue'
            render={(text) => `${text.toLocaleString()} VNĐ`} // Định dạng doanh thu
          />
        </Table>
      </div>
    </div>
  )
}

export default TopProduct
