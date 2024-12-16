/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { useOrderNotifications } from '@/hooks/useOrderNotifcations'
import { useCookie } from '@/hooks/useStorage'
import { StatusType } from '@/types/status'
import { BellOutlined } from '@ant-design/icons'
import { Badge, Button, Dropdown, Menu, Tag } from 'antd'
import { useEffect, useState } from 'react'

const Notification = () => {
  const [user] = useCookie('user', {})
  const { notifications, setNotifications } = useOrderNotifications(user._id)
  const [showNotify, setShowNotify] = useState(false)
  const [loading, setLoading] = useState(false)

  // Cập nhật lại thông báo khi `notifications` thay đổi
  useEffect(() => {
    setNotifications(notifications)
  }, [notifications, setNotifications])

  const markAsRead = async (notificationId: string) => {
    setLoading(true)
    try {
      // Gửi yêu cầu API để đánh dấu thông báo đã đọc
      await instance.patch(`/notification/${notificationId}/read`)
      // Cập nhật trạng thái của thông báo trong state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      )
    } catch (error) {
      console.error('Error marking notification as read', error)
    } finally {
      setLoading(false)
    }
  }
  const statusColors = {
    Processing: 'blue',
    Pending: 'orange',
    Confirmed: 'green',
    'Pending-Ship': 'cyan',
    Delivering: 'purple',
    Delivered: 'green',
    Completed: 'gold',
    Returned: 'red',
    Refunded: 'red',
    Cancelled: 'red'
  }
  const statuses = [
    { label: 'Đang xử lý', value: 'Processing' },
    { label: 'Chờ xác nhận', value: 'Pending' },
    { label: 'Đã xác nhận', value: 'Confirmed' },
    { label: 'Đang chờ bên vận chuyển', value: 'Pending-Ship' },
    { label: 'Đang vận chuyển', value: 'Delivering' },
    { label: 'Giao hàng thành công', value: 'Delivered' },
    { label: 'Đơn hàng hoàn thành', value: 'Completed' },
    { label: 'Hoàn trả đơn hàng', value: 'Returned' },
    { label: 'Hoàn tiền đơn hàng', value: 'Refunded' },
    { label: 'Đã hủy đơn hàng', value: 'Cancelled' }
  ]
  const menu = (
    <Menu>
      {notifications.filter((notification) => !notification.read).length === 0 ? (
        <Menu.Item disabled>Không có thông báo mới nào</Menu.Item>
      ) : (
        notifications
          .filter((notification) => !notification.read) // Lọc thông báo chưa đọc
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 5)
          .map((notification) => (
            <Menu.Item key={notification?._id}>
              <div>
                <p>{new Date(notification?.timestamp).toLocaleString()}</p>
                <p>
                  Đơn hàng
                  <Tag color='green'>#{notification?.orderId}</Tag>
                  đã được cập nhật trạng thái thành
                  <Tag className='ml-2' color={statusColors[notification?.status as StatusType] || 'default'}>
                    {statuses.find((status) => status.value === notification?.status)?.label || 'Không xác định'}
                  </Tag>
                </p>
                {!notification?.read && (
                  <Button
                    onClick={() => markAsRead(notification?._id)}
                    loading={loading}
                    type='link'
                    style={{ padding: 0 }}
                  >
                    Đánh dấu là đã đọc
                  </Button>
                )}
              </div>
            </Menu.Item>
          ))
      )}
    </Menu>
  )

  return (
    <Badge count={notifications.filter((n) => !n.read).length} overflowCount={99}>
      <Dropdown
        overlay={menu}
        open={showNotify}
        onOpenChange={() => setShowNotify((prev) => !prev)} // Đóng dropdown khi click ngoài
        trigger={['click']}
        placement='bottomRight'
      >
        <Button icon={<BellOutlined />} shape='circle' />
      </Dropdown>
    </Badge>
  )
}

export default Notification
