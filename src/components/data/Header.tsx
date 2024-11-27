import { MenuProps } from 'antd'
import { Link } from 'react-router-dom'

export const menu: MenuProps['items'] = [
  {
    key: '1',
    label: <span className='text-muted-foreground'>Sản phẩm mới</span>
  },
  {
    key: '2',
    label: <span className='text-muted-foreground'>Sản phẩm nổi bật</span>
  },
  {
    key: '3',
    label: <span className='text-muted-foreground'>Chương trình khuyến mãi</span>
  }
]

export const menu1: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to={`/policy/chinh-sach-ban-hang`} className='text-muted-foreground'>
        Chính sách bán hàng
      </Link>
    )
  },
  {
    key: '2',
    label: (
      <Link to={`/policy/giao-hang-va-lap-dat`} className='text-muted-foreground'>
        Chính sách giao hàng & Lắp đặt
      </Link>
    )
  },
  {
    key: '3',
    label: (
      <Link to={`/policy/chinh-sach-doi-tra`} className='text-muted-foreground'>
        Chính sách đổi trả
      </Link>
    )
  },
  {
    key: '4',
    label: (
      <Link to={`/policy/bao-hanh-va-bao-tri`} className='text-muted-foreground'>
        Chính sách bảo hành và bảo trì
      </Link>
    )
  },
  {
    key: '5',
    label: (
      <Link to={`/policy/khach-hang-than-thiet`} className='text-muted-foreground'>
        Khách hàng thân thiết
      </Link>
    )
  }
]

export const menus: MenuProps['items'] = [
  {
    key: 'sub1',
    label: 'Sản phẩm mới'
  },
  {
    key: 'sub2',
    label: 'Sản phẩm nổi bật',
    children: [
      { key: '4', label: 'Trang trí phòng khách' },
      { key: '5', label: 'Trang trí phòng ngủ' },
      { key: '6', label: 'Sân vườn thoải mái' }
    ]
  }
]
