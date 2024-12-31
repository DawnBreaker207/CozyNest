import instance from '@/configs/axios'
import { IUsers } from '@/types/user'
import { openNotify } from '@/utils/notification'
import Cookies from 'js-cookie'
import { useEffect, useMemo, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<IUsers | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Hàm đọc thông tin user từ cookie
  const getUserFromCookie = useMemo(() => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        return {
          username: userData || null,
          id: userData?._id || null
        }
      } catch (error) {
        console.error('Lỗi khi parse cookie user:', error)
      }
    }
    return { username: null, id: null }
  }, [])

  useEffect(() => {
    const { username, id } = getUserFromCookie
    setUser({ ...username })
    setUserId(id)
  }, [getUserFromCookie])

  const Logout = async () => {
    try {
      // Xóa các thông tin từ cookie
      Cookies.remove('user')
      await instance.delete('/auth/token') // Gọi API xóa token
      // Hiển thị thông báo và reset state
      openNotify('Success', 'Đăng xuất thành công!')
      setUser(null)
      setUserId(null)
      window.location.reload()
    } catch (error) {
      console.error('Error while logging out:', error)
      openNotify('Error', 'Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại!')
    }
  }

  return { user, userId, Logout }
}
