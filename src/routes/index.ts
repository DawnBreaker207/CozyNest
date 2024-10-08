import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import CartPage from '@/pages/website/cart/CartPage'
import HomePage from '@/pages/website/home/page'
import LayoutWebsite from '@/pages/website/layout'
import LinkPage from '@/pages/website/Link/page'
import ContactPage from '@/pages/website/contact/contact'
import CheckOutOder from '@/pages/website/order/_components/CheckOutOder'
import { useRoutes } from 'react-router-dom'
import ProductDetail from '@/pages/website/products/detail/DetailPage'
import Introduction from '@/pages/website/introduction/page'
import Login from '@/pages/website/auth/Login'
import Register from '@/pages/website/auth/Register'
import ResetPassword from '@/pages/website/auth/ResetPassword'
import NewsPage from '@/pages/website/news/page'

import CategoryPage from '@/pages/admin/category/CategoryPage'
import AddCategoryPage from '@/pages/admin/category/add/CategoryAdd'
import EditCategoryPage from '@/pages/admin/category/edit/CategoryEdit'
import ProductAddPage from '@/pages/admin/product/add/ProductAdd'
import ProductEditPage from '@/pages/admin/product/edit/ProductEdit'
import AdminCustomerPage from '@/pages/admin/customer/page'
import AdminProductPage from '@/pages/admin/product/ProductPage'
import AdminOrderPage from '@/pages/admin/order/OrderPage'
import ReportsPage from '@/pages/admin/report/ReportPage'
import pageCheckOut from '@/pages/website/order/page'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [
        { index: true, Component: HomePage },
        { path: 'contact', Component: ContactPage },
        { path: 'news', Component: NewsPage },
        { path: 'detail', Component: ProductDetail },
        { path: 'cart', Component: CartPage },
        { path: 'cart/check_out_form', Component: pageCheckOut },
        { path: 'intro', Component: Introduction },
        { path: 'login', Component: Login },
        { path: 'register', Component: Register },
        { path: 'reset-password', Component: ResetPassword },
        { path: 'check_out_order', Component: CheckOutOder },
        { path: 'link', Component: LinkPage }
      ]
    },
    {
      path: 'admin',
      Component: LayoutAdmin, // ensure this is a component
      children: [
        { index: true, Component: DashboardPage },
        { path: 'categories', Component: CategoryPage },
        { path: 'categories/add', Component: AddCategoryPage },
        { path: 'categories/:id/edit', Component: EditCategoryPage },
        { path: 'products', Component: AdminProductPage },
        { path: 'products/add', Component: ProductAddPage },
        { path: 'products/:id/edit', Component: ProductEditPage },
        { path: 'order', Component: AdminOrderPage },
        { path: 'customer', Component: AdminCustomerPage },
        { path: 'report', Component: ReportsPage }
      ]
    }
  ])
  return routes
}
export default App
