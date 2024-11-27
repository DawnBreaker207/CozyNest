import { Rule } from 'antd/es/form'

export const validatePhoneNumber = (_rule: Rule, value: string): Promise<void> => {
  if (!value || value.replace(/\D/g, '').length === 10) {
    return Promise.resolve()
  }
  return Promise.reject('Số điện thoại không hợp lệ!')
}
