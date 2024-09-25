import ProductAddPage from '@/pages/admin/category/add/CategoryAdd'
import ProductPage from '@/pages/admin/category/CategoryPage'
import ProductEditPage from '@/pages/admin/category/edit/CategoryEdit'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import CartPage from '@/pages/website/cart/CartPage'
import OrderPage from '@/pages/admin/order/OrderPage'
import ReportsPage from '@/pages/admin/report/ReportPage'
import HomePage from '@/pages/website/home/page'
import Introduction from '@/pages/website/introduction/page'
import LayoutWebsite from '@/pages/website/layout'

import CheckOutOder from '@/pages/website/order/_components/CheckOutOder'

import { useRoutes } from 'react-router-dom'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [
        { index: true, Component: HomePage },

        { path: 'cart', Component: CartPage },
        { path: 'check_out_order', Component: CheckOutOder }

      ]
    },
    {
      path: 'admin',
      Component: LayoutAdmin, // ensure this is a component
      children: [
        { index: true, Component: DashboardPage },
        { path: 'products', Component: ProductPage },
        { path: 'products/add', Component: ProductAddPage },
        { path: 'products/:id/edit', Component: ProductEditPage }
      ]
    }
  ])
  return routes
}
export default App
