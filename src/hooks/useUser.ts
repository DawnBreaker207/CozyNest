import { openNotify } from '@/utils/notification'
import Cookies from 'js-cookie'
import { useEffect, useMemo, useState } from 'react'

export const useUser = () => {
  const [user, setUser] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  // Hàm đọc thông tin user từ cookie
  const getUserFromCookie = useMemo(() => {
    const storedUser = Cookies.get('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        return {
          username: userData?.username || null,
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
    setUser(username)
    setUserId(id)
  }, [getUserFromCookie])

  const Logout = () => {
    // Xóa các thông tin từ cookie
    Cookies.remove('user')
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    // Hiển thị thông báo và reset state
    openNotify('Success', 'Đăng xuất thành công!')
    setUser(null)
    setUserId(null)
  }

  return { user, userId, Logout }
}
