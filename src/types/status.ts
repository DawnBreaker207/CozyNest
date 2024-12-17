export type StatusType =
  | 'Processing'
  | 'Pending'
  | 'Confirmed'
  | 'Pending-Ship'
  | 'Delivering'
  | 'Delivered'
  | 'Completed'
  | 'Returned'
  | 'Refunded'
  | 'Cancelled'

// Khai báo màu sắc cho từng trạng thái
export const statusColors: Record<StatusType, string> = {
  Processing: 'blue',
  Pending: 'orange',
  Confirmed: 'green',
  'Pending-Ship': 'cyan',
  Delivering: 'purple',
  Delivered: 'green',
  Completed: 'gold',
  Returned: 'red',
  Refunded: 'red',
  Cancelled: 'gray'
}
