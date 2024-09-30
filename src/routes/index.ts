import ProductAddPage from '@/pages/admin/category/add/CategoryAdd'
import ProductPage from '@/pages/admin/category/CategoryPage'
import ProductEditPage from '@/pages/admin/category/edit/CategoryEdit'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import HomePage from '@/pages/website/home/page'
import LayoutWebsite from '@/pages/website/layout'
import LinkPage from '@/pages/website/Link/page'
import { useRoutes } from 'react-router-dom'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [{ index: true, Component: HomePage },
        { path: '/link', Component: LinkPage }
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
