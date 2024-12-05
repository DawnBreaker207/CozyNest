/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCartStore } from '@/hooks/store/cartStore'
import useCart from '@/hooks/useCart'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StockProblem = () => {
  const navigate = useNavigate()
  const [stockIssues, setStockIssues] = useState<any[]>([])
  const { products, quantities, setQuantity } = useCartStore()
  const { mutate } = useCart()

  useEffect(() => {
    const storedStockIssues = localStorage.getItem('unavailableProducts')

    if (storedStockIssues) {
      // Nếu có dữ liệu lỗi tồn kho, hiển thị nó
      setStockIssues(JSON.parse(storedStockIssues))
    } else {
      // Nếu không có lỗi tồn kho, chuyển hướng về giỏ hàng
      navigate('/cart')
    }
  }, [navigate])
  const decreaseAll = async () => {
    try {
      // Thực hiện giảm số lượng cho từng sản phẩm trong danh sách
      for (let i = 0; i < stockIssues.length; i++) {
        const stockIssue = stockIssues[i]
        const difference = stockIssue.quantity - stockIssue.stock

        if (difference > 0) {
          // Gọi mutation để giảm số lượng sản phẩm
          await mutate({
            action: 'DECREMENT',
            sku_id: products[i].sku_id._id,
            quantity: difference // Truyền số lượng cần giảm
          })

          // Cập nhật số lượng trong store (nếu cần)
          setQuantity(i, Math.max(0, quantities[i] - difference))
        }
      }

      // Xóa danh sách lỗi tồn kho và điều hướng về giỏ hàng
      setStockIssues([])
      navigate('/cart')
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  return (
    <div className='bg-white max-w-7xl mx-auto py-12 px-12'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-900'>Nội Thất CozyNest</h1>
        <div className='flex justify-center mt-4'>
          <img
            src='https://res.cloudinary.com/didbnrsmz/image/upload/v1733320347/CozyNest/inventory_issues_pmgsjn.webp'
            alt='Product'
            className='w-48 h-48 object-cover '
          />
        </div>
        <p className='mt-2 text-xl text-gray-600'>Vấn đề tồn kho</p>
        <p className='mt-4 text-gray-500'>
          Một số sản phẩm trong giỏ hàng của quý khách đã không còn hợp lệ trong quá trình thanh toán.
        </p>
      </div>

      {/* Product Information */}
      <div className='mt-8 space-y-5'>
        {stockIssues.length > 0 ? (
          stockIssues.map((issue, index) => (
            <div key={index} className='flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
                <img
                  src='https://picsum.photos/seed/picsum/200/300'
                  alt='Product'
                  className='w-24 h-24 object-cover rounded'
                />
                <div>
                  <p className='text-lg font-medium text-gray-900'>{issue.productName}</p>
                  <p className='text-sm text-gray-500'>{issue.color}</p>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <span className='text-lg font-medium text-gray-900'>
                  Số Lượng: {issue.quantity} &rarr; {issue.stock}
                </span>
                <span className='text-lg font-medium text-gray-900'>
                  Giá: {issue.priceCart.toLocaleString()}₫ &rarr; {issue.priceStock.toLocaleString()}₫
                </span>
              </div>
              <div className='flex items-center'>
                <span className='text-orange-300 font-medium'>Vượt tồn kho</span>
                {/* <button
                  className='ml-2 text-blue-600 hover:text-red-800'
                  onClick={() => decrease(index)} // Giảm số lượng
                >
                  Giảm
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>Không có sản phẩm vượt tồn kho.</p>
        )}
      </div>

      {/* Buttons */}
      <div className='mt-8 flex justify-between'>
        <button className='flex items-center text-blue-600 hover:text-blue-800' onClick={() => navigate('/cart')}>
          <span className='mr-2'>&larr; Quay lại giỏ hàng</span>
        </button>
        <button
          className='px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
          onClick={decreaseAll} // Giảm tất cả sản phẩm
        >
          Giảm số lượng sản phẩm vượt tồn kho
        </button>
      </div>
    </div>
  )
}

export default StockProblem
