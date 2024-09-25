import AddCategoryPage from '@/pages/admin/category/add/CategoryAdd'
import CategoryPage from '@/pages/admin/category/CategoryPage'
import EditCategoryPage from '@/pages/admin/category/edit/CategoryEdit'
import ProductAddPage from '@/pages/admin/category/add/CategoryAdd'
import ProductPage from '@/pages/admin/category/CategoryPage'
import ProductEditPage from '@/pages/admin/category/edit/CategoryEdit'
import AdminCustomerDetailPage from '@/pages/admin/customer/[id]/CustomerDeTail'
import AdminCustomerPage from '@/pages/admin/customer/page'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import OrderPage from '@/pages/admin/order/OrderPage'
import ReportsPage from '@/pages/admin/report/ReportPage'
import HomePage from '@/pages/website/home/page'
import LayoutWebsite from '@/pages/website/layout'
import { useRoutes } from 'react-router-dom'
import NewPage from '@/pages/website/newpage/newpage'
import ContactPage from '@/pages/website/contact/contact'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [
        { index: true, Component: HomePage },
        { path: 'contact', Component: ContactPage },
        { path: 'newpage', Component: NewPage }
      ]
    },
    {
      path: 'admin',
      Component: LayoutAdmin, // ensure this is a component
      children: [
        { index: true, Component: DashboardPage },

        // Category
        { path: 'categories', Component: CategoryPage },
        { path: 'categories/add', Component: AddCategoryPage },
        { path: 'categories/:id/edit', Component: EditCategoryPage },

        // Product
        { path: 'products', Component: ProductPage },
        { path: 'products/add', Component: ProductAddPage },
        { path: 'products/:id/edit', Component: ProductEditPage },

        // Customer
        { path: 'customer', Component: AdminCustomerPage },
        { path: 'customer/:id', Component: AdminCustomerDetailPage },

        // Order
        { path: 'orders', Component: OrderPage },

        // Report
        { path: 'reports', Component: ReportsPage }
      ]
    }
  ])
  return routes
}
export default App
