import ProductAddPage from '@/pages/admin/category/add/CategoryAdd'
import ProductPage from '@/pages/admin/category/CategoryPage'
import ProductEditPage from '@/pages/admin/category/edit/CategoryEdit'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import CartPage from '@/pages/website/cart/CartPage'
import HomePage from '@/pages/website/home/page'
import LayoutWebsite from '@/pages/website/layout'
import NewPage from '@/pages/website/newpage/newpage'
import ContactPage from '@/pages/website/contact/contact'
import CheckOutOder from '@/pages/website/order/_components/CheckOutOder'
import { useRoutes } from 'react-router-dom'
import ProductDetail from '@/pages/website/products/detail/DetailPage'
import Introduction from '@/pages/website/introduction/page'
import Login from '@/pages/website/auth/Login'
import Register from '@/pages/website/auth/Register'
import ResetPassword from '@/pages/website/auth/ResetPassword'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [
        { index: true, Component: HomePage },
        { path: 'contact', Component: ContactPage },
        { path: 'newpage', Component: NewPage },
        { path: 'detail', Component: ProductDetail },
        { path: 'cart', Component: CartPage },
        { path: 'check_out_order', Component: CheckOutOder },
        { path: 'intro', Component: Introduction },
        { path: 'login', Component: Login },
        { path: 'register', Component: Register },
        { path: 'reset-password', Component: ResetPassword }
      ]
    },
    {
      path: 'admin',
      Component: LayoutAdmin,
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
