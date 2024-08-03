import { notification } from 'antd'

export const openNotify = (message: string, description: string) => {
  notification.open({
    message: message,
    description: description,
    showProgress: true,
    pauseOnHover: false
  })
}
