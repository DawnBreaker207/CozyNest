import ProductAddPage from '@/pages/admin/category/add/CategoryAdd'
import ProductPage from '@/pages/admin/category/CategoryPage'
import ProductEditPage from '@/pages/admin/category/edit/CategoryEdit'
import AdminCustomerDetailPage from '@/pages/admin/customer/[id]/CustomerDeTail'
import AdminCustomerPage from '@/pages/admin/customer/page'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import orderPage from '@/pages/admin/order/OrderPage'
import ReportsPage from '@/pages/admin/report/ReportPage'
import HomePage from '@/pages/website/home/page'
import LayoutWebsite from '@/pages/website/layout'
import { useRoutes } from 'react-router-dom'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [{ index: true, Component: HomePage }]
    },
    {
      path: 'admin',
      Component: LayoutAdmin, // ensure this is a component
      children: [
        { index: true, Component: DashboardPage },
        { path: 'products', Component: ProductPage },
        { path: 'products/add', Component: ProductAddPage },
        { path: 'products/:id/edit', Component: ProductEditPage },
        { path: 'customer', Component: AdminCustomerPage },
        { path: 'customer/:id', Component: AdminCustomerDetailPage },
        { path: 'orders',Component:orderPage},
        { path: 'reports',Component:ReportsPage}
      ]
    }
  ])
  return routes
}
export default App
