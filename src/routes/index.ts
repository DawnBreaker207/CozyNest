import DashboardPage from '@/pages/(dashboard)/dashboard/page';
import LayoutAdmin from '@/pages/(dashboard)/layout';
import ProductAddPage from '@/pages/(dashboard)/products/add/ProductAdd';
import ProductEditPage from '@/pages/(dashboard)/products/edit/ProductEdit';
import ProductPage from '@/pages/(dashboard)/products/ProductPage';
import HomePage from '@/pages/(website)/home/page';
import LayoutWebsite from '@/pages/(website)/layout';
import { useRoutes } from 'react-router-dom';
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
        { path: 'products/:id/edit', Component: ProductEditPage }
      ]
    }
  ])
  return routes
}
export default App
