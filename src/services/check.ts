import { useLocation, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import Cookies from 'js-cookie'
import instance from '@/configs/axios'
import axios from 'axios'
import { useEffect } from 'react'

const Token = () => {
  const navigate = useNavigate()

  const handleError = async (status?: number, errorMessage?: string) => {
    switch (status) {
      case 403:
        if (errorMessage === 'Status compare not valid') {
          message.error('Trạng thái tài khoản không hợp lệ. Vui lòng kiểm tra lại.', 5)
        }
        Cookies.remove('user')
        await instance.delete('/auth/token')
        setTimeout(() => {
          navigate('/login')
          window.location.reload()
        }, 5000)
        break

      case 401:
        if (errorMessage === 'Authentication required') {
          message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 5)
        }
        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', 5)
        setTimeout(async () => {
          Cookies.remove('user')
          await instance.delete('/auth/token')
          navigate('/login')
          window.location.reload()
        }, 5000)
        break

      case 500:
        message.error('Lỗi server. Vui lòng thử lại sau!', 5)
        break

      default:
        message.error(errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại!', 5)
        break
    }
  }

  // Fetch dữ liệu API, xử lý lỗi
  const location = useLocation()
  const fetchData = async () => {
    try {
      const response = await instance.get('orders', { withCredentials: true })
      console.log('Data:', response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = error.response?.data?.message
        handleError(status, message)
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  useEffect(() => {
    const user = Cookies.get('user')

    // Kiểm tra user hợp lệ (không phải rỗng và tồn tại dữ liệu)
    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        if (Object.keys(parsedUser).length > 0) {
          fetchData() // Chỉ gọi API nếu user hợp lệ
        } else {
          throw new Error('User is empty')
        }
      } catch (error) {
        // Nếu user không hợp lệ, xóa cookie và điều hướng
        Cookies.remove('user')
      }
    } else {
      Cookies.remove('user')
      console.log(Cookies.remove('user'))
    }
  }, [location, navigate])

  return null
}

export default Token
