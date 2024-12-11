import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'

type Props = {}

const TopProduct = (props: Props) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await instance.get(`/orders`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })

  // 1. Lọc các đơn hàng đã hoàn thành
  const completedOrders = data?.data?.res?.items.filter((order: any) => order.status === 'Completed')
  console.log('🚀 ~ TopProduct ~ completedOrders:', completedOrders)

  // 2. Tổng hợp số lượng theo sku_id, đồng thời lưu trữ tên và hình ảnh
  const productSales: Record<string, { SKU: string; quantity: number; name: string; image: string[]; price: number }> =
    {}

  completedOrders.forEach((order: any) => {
    order.products.forEach((product: any) => {
      product.products.forEach((item: any) => {
        const skuId = item.sku_id // sku_id là đối tượng chứa _id và các thông tin khác

        // Kiểm tra sku_id có hợp lệ hay không
        if (skuId && skuId._id) {
          if (productSales[skuId._id]) {
            productSales[skuId._id].quantity += item.quantity
          } else {
            productSales[skuId._id] = {
              SKU: skuId.SKU, // SKU lấy từ đối tượng sku_id
              quantity: item.quantity,
              name: skuId.name, // Tên sản phẩm lấy từ sku_id
              price: item.price,
              image: skuId.image || [] // Hình ảnh lấy từ sku_id
            }
          }
        }
      })
    })
  })

  // 3. Sắp xếp theo số lượng đã bán (cao nhất trước)
  const sortedProducts = Object.entries(productSales)
    .map(([sku_id, data]) => ({ sku_id, ...data }))
    .sort((a, b) => b.quantity - a.quantity)

  // 4. Chọn 5 sản phẩm bán chạy nhất
  const topProducts = sortedProducts.slice(0, 5)

  // 5. Dữ liệu cho bảng, SKU sẽ được chuyển sang chữ in hoa
  const tableData = topProducts.map((product, index) => ({
    key: index + 1,
    SKU: product.SKU,
    quantity: product.quantity,
    name: product.name,
    price: product.price,
    image: product.image.length > 0 ? product.image[0] : '' // Lấy ảnh đầu tiên nếu có
  }))

  // Cột trong bảng
  const columns = [
    {
      title: 'SKU',
      dataIndex: 'SKU',
      key: 'SKU'
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) =>
        image ? <img src={image} alt='Product' style={{ width: 50, height: 50 }} /> : <span>No Image</span>
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Giá Sản Phẩm',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Số lượt bán',
      dataIndex: 'quantity',
      key: 'quantity'
    }
  ]

  if (isLoading) return <CustomLoadingPage />
  if (isError) return <div>{error?.message}</div>

  return (
    <div>
      <div className='bg-white p-2 rounded-lg shadow-xl'>
        <h2 className='text-2xl font-semibold mb-5 text-center'>Top 5 Sản Phẩm Bán Chạy</h2>
        <Table dataSource={tableData} columns={columns} pagination={false} />
      </div>
    </div>
  )
}

export default TopProduct
