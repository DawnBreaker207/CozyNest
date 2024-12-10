import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useProductQuery } from '@/hooks/useProductQuery'
import { getAllProducts } from '@/services/product'
import { formatCurrency } from '@/utils/formatCurrency'
import { useQuery } from '@tanstack/react-query'
import { Card, Table } from 'antd'
import { snakeCase } from 'lodash'
const { Column } = Table

interface ProductSales {
  totalQuantity: number
  totalRevenue: number
  name: string
}
const TopProduct = () => {
  const { data, isLoading, isError, error } = useProductQuery()
  console.log(data?.res)

  const products = data?.res || []

  // Tính tổng số lượng và doanh thu cho từng sản phẩm
  const productSales: { [sku_id: string]: ProductSales } = {}

  products.forEach((product: any) => {
    // Duyệt qua các variants của sản phẩm
    product.variants?.forEach((variant: any) => {
      const sku_id = variant.sku_id._id // Lấy sku_id từ variant

      if (sku_id) {
        if (!productSales[sku_id]) {
          productSales[sku_id] = { totalQuantity: 0, totalRevenue: 0, name: product.name }
        }
        // Tổng số lượng và doanh thu dựa trên sold và price của variant
        productSales[sku_id].totalQuantity += variant.sku_id.sold || 0
        productSales[sku_id].totalRevenue += (variant.sku_id.price || 0) * (variant.sku_id.sold || 0)
      }
    })
  })
  // Sắp xếp các sản phẩm theo số lượng bán (từ cao đến thấp)
  const topProducts = Object.entries(productSales)
    .map(([sku_id, sales]) => ({
      sku_id,
      name: sales.name,
      totalQuantity: sales.totalQuantity,
      totalRevenue: sales.totalRevenue
    }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity) // Sắp xếp giảm dần theo số lượng bán

  // Lấy top 5 sản phẩm bán chạy nhất
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
          <Column title='Tên sản phẩm' dataIndex='name' key='name' />
          <Column title='Số lượng đã bán' dataIndex='totalQuantity' key='totalQuantity' className='text-center' />
          <Column
            title='Doanh thu'
            dataIndex='totalRevenue'
            key='totalRevenue'
            render={(text) => formatCurrency(text)} // Định dạng doanh thu
          />
        </Table>
      </div>
    </div>
  )
}

export default TopProduct
