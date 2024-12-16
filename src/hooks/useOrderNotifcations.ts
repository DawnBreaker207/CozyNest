/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useCallback, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

export const useOrderNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<any[]>([])
  const [socket, setSocket] = useState<typeof Socket | null>(null)
  const getNotification = useCallback(async () => {
    try {
      const { data } = await instance.get(`/notification?userId=${userId}`)
      setNotifications(data.res)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }, [userId])
  useEffect(() => {
    const socketInstance: typeof Socket = io('http://localhost:8888', {
      transports: ['websocket']
    })
    setSocket(socketInstance)

    const handleOrderUpdated = (order: any) => {
      setNotifications((prev) => {
        // Cập nhật thông báo mới nếu chưa có
        if (!prev.some((notification) => notification._id === order.message._id)) {
          return [...prev, order.message]
        }
        return prev
      })
      // Reload lại thông báo từ API ngay lập tức sau khi nhận sự kiện WebSocket
      getNotification()
    }

    socketInstance.on('orderUpdated', handleOrderUpdated)

    return () => {
      socketInstance.off('orderUpdated', handleOrderUpdated)
      socketInstance.disconnect()
    }
  }, [getNotification])

  useEffect(() => {
    getNotification()
  }, [userId, getNotification])

  return { notifications, socket, setNotifications }
}
