import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { Button, notification } from 'antd'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<string>('')

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)

    // Dữ liệu MoMo
    const resultCode = searchParams.get('resultCode') // MoMo resultCode
    const momoOrderId = Cookies.get('orderId') // Order ID lưu trong cookie

    // Dữ liệu VNPay
    const vnpTxnRef = searchParams.get('vnp_TxnRef') // Mã tham chiếu giao dịch VNPay
    const vnpResponseCode = searchParams.get('vnp_ResponseCode') // Mã phản hồi từ VNPay

    // Dữ liệu ZaloPay
    // const amount = searchParams.get('amount') // Số tiền thanh toán
    const appid = searchParams.get('appid') // Mã ứng dụng
    const apptransid = searchParams.get('apptransid') // Mã giao dịch của ứng dụng
    const checksum = searchParams.get('checksum') // Checksum để kiểm tra tính hợp lệ
    const status = searchParams.get('status') // Trạng thái thanh toán
    const orderId = Cookies.get('orderId')

    const updateOrder = async () => {
      try {
        // Lấy thông tin đơn hàng
        const { data: currentOrder } = await instance.get(`/orders/${orderId}`)

        if (!currentOrder) {
          setPaymentStatus('Đơn hàng không tồn tại')
          return
        }

        // Cập nhật đơn hàng
        await instance.put(`/orders/updateStatusPayment/${orderId}`, {
          ...currentOrder,
          payment_status: 'Paid'
        })

        setPaymentStatus('Thanh toán thành công')
        Cookies.remove('orderId') // Xóa cookie sau khi dùng
        navigate(`/check_out_order?orderId=${orderId}`)
      } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error)
        setPaymentStatus('Có lỗi xảy ra khi cập nhật đơn hàng')
      } finally {
        setLoading(false)
      }
    }

    // Kiểm tra thanh toán MoMo, VNPay, hoặc ZaloPay
    if (orderId) {
      if (
        (vnpTxnRef && vnpResponseCode === '00') || // VNPay thành công
        (momoOrderId && resultCode === '0') || // MoMo thành công
        (status === '1' && appid && apptransid && checksum) // ZaloPay thành công
      ) {
        updateOrder()
      } else {
        setPaymentStatus('Thanh toán thất bại')
        setLoading(false)
      }
    } else {
      setPaymentStatus('Không tìm thấy thông tin đơn hàng')
      setLoading(false)
    }
  }, [location.search, navigate])

  // Xử lý thanh toán lại
  const handleRetryPayment = async () => {
    try {
      const orderId = Cookies.get('orderId')
      // Lấy dữ liệu đơn hàng từ backend
      const { data: currentOrder } = await instance.get(`/orders/${orderId}`)
      // Kiểm tra nếu trạng thái thanh toán là "Unpaid", chuyển hướng đến payment_url
      if (currentOrder?.res?.payment_status === 'Unpaid') {
        const paymentUrl = currentOrder?.res?.payment_url
        if (paymentUrl) {
          // Chuyển hướng đến trang thanh toán
          window.location.href = paymentUrl
        } else {
          notification.error({
            message: 'Lỗi thanh toán',
            description: 'Không tìm thấy đường dẫn thanh toán.'
          })
        }
      } else {
        notification.info({
          message: 'Thanh toán đã hoàn tất',
          description: 'Đơn hàng đã thanh toán thành công.'
        })
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      notification.error({
        message: 'Lỗi',
        description: 'Thanh toán không thành công. Vui lòng thử lại!'
      })
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 py-10 px-5'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
        {loading ? (
          <CustomLoadingPage />
        ) : (
          <div className='text-center'>
            <p
              className={`text-2xl font-semibold ${
                paymentStatus.includes('thất bại') ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {paymentStatus}
            </p>
            {paymentStatus === 'Thanh toán thất bại' && (
              <Button onClick={handleRetryPayment} className='mt-4' type='primary'>
                Thanh Toán Lại
              </Button>
            )}
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
