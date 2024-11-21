import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import instance from '@/configs/axios'
import Cookies from 'js-cookie'

const PaymentResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<string>('')

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const resultCode = searchParams.get('resultCode')

    // Lấy orderId từ cookie nếu không có trong URL
    const orderId =  Cookies.get('orderId')

    const updateOrder = async () => {
      try {
        // Bước 1: Lấy thông tin đơn hàng hiện tại
        const { data: currentOrder } = await instance.get(`/orders/orderByOrderId/${orderId}`)

        if (!currentOrder) {
          setPaymentStatus('Đơn hàng không tồn tại')
          return
        }

        // Bước 2: Cập nhật lại đơn hàng với thông tin đầy đủ
        await instance.patch(`/orders/updateOrder/${orderId}`, {
          ...currentOrder, // Dữ liệu cũ
          status: 'Pending', // Cập nhật thêm status
          paid: true // Đánh dấu đã thanh toán
        })

        setPaymentStatus('Thanh toán thành công')

        // Xóa cookie sau khi sử dụng xong
        Cookies.remove('orderId')

        navigate(`/check_out_order?orderId=${orderId}`)
      } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error)
        setPaymentStatus('Có lỗi xảy ra khi cập nhật đơn hàng')
      } finally {
        setLoading(false)
      }
    }

    if (orderId && resultCode === '0') {
      updateOrder()
    } else {
      setPaymentStatus('Thanh toán thất bại')
      setLoading(false)
    }
  }, [location.search, navigate])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 py-10 px-5'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        {loading ? (
          <div className='text-center text-blue-600'>
            <p className='text-xl'>Đang xử lý...</p>
          </div>
        ) : (
          <div className='text-center'>
            <p
              className={`text-2xl font-semibold ${paymentStatus.includes('thất bại') ? 'text-red-500' : 'text-green-500'}`}
            >
              {paymentStatus}
            </p>
            {paymentStatus === 'Thanh toán thành công' && (
              <button
                onClick={() => navigate(`/check_out_order?orderId=${Cookies.get('orderId') || ''}`)}
                className='mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400'
              >
                Xem Đơn Hàng
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentResultPage
