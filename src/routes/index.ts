import AddCategoryPage from '@/pages/admin/category/add/CategoryAdd'
import CategoryPage from '@/pages/admin/category/CategoryPage'
import EditCategoryPage from '@/pages/admin/category/edit/CategoryEdit'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import OrderPage from '@/pages/admin/order/OrderPage'
import ReportsPage from '@/pages/admin/report/ReportPage'
import ProductAddPage from '@/pages/admin/product/add/ProductAdd'
import ProductEditPage from '@/pages/admin/product/edit/ProductEdit'
import ProductPage from '@/pages/admin/product/ProductPage'
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
        { path: 'categories', Component: CategoryPage },
        { path: 'categories/add', Component: AddCategoryPage },
        { path: 'categories/:id/edit', Component: EditCategoryPage },
        { path: 'products', Component: ProductPage },
        { path: 'products/add', Component: ProductAddPage },
        { path: 'products/:id/edit', Component: ProductEditPage },
        { path: 'orders', Component: OrderPage },
        { path: 'reports', Component: ReportsPage }
      ]
    }
  ])
  return routes
}
export default App
