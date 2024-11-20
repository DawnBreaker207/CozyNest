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
import AdminCustomerDetailPage from '@/pages/admin/customer/[id]/CustomerDeTail'
import ProfilePage from '@/pages/website/auth/ProfilePage/ProfilePage'
import DeliveryPolicy from '@/pages/website/home/_components/policy/DeliveryPolicy'
import ReturnPolicy from '@/pages/website/home/_components/policy/ReturnPolicy'
import WarrantyPolicy from '@/pages/website/home/_components/policy/WarrantyPolicy'
import CustomerPolicy from '@/pages/website/home/_components/policy/CustomerPolicy'
import SalesPolicy from '@/pages/website/home/_components/policy/SalesPolicy'
import NotFound from '@/pages/website/home/_components/NotFound'
import ProductsPage from '@/pages/website/products/_components/ProductPage'
import AdminArticlePage from '@/pages/admin/article/ArticlePage'
import ArticleAddPage from '@/pages/admin/article/add/ArticleAdd'
import ArticleEditPage from '@/pages/admin/article/edit/ArticleEdit'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      Component: LayoutWebsite,
      children: [
        { index: true, Component: HomePage },
        // Product
        { path: 'contact', Component: ContactPage },
        { path: 'articles', Component: NewsPage },
        { path: 'detail/:id', Component: ProductDetail },
        { path: 'products_page', Component: ProductsPage },
        // Cart
        { path: 'cart', Component: CartPage },
        { path: 'cart/check_out_form', Component: pageCheckOut },
        // Auth
        { path: 'login', Component: Login },
        { path: 'register', Component: Register },
        { path: 'profile', Component: ProfilePage },
        { path: 'reset-password', Component: ResetPassword },
        // Order
        { path: 'check_out_order', Component: CheckOutOder },
        // Policy
        // TODO: Rename
        { path: 'articles/:id', Component: LinkPage },
        { path: 'policy/chinh-sach-ban-hang', Component: SalesPolicy },
        { path: 'policy/giao-hang-va-lap-dat', Component: DeliveryPolicy },
        { path: 'policy/chinh-sach-doi-tra', Component: ReturnPolicy },
        { path: 'policy/bao-hanh-va-bao-tri', Component: WarrantyPolicy },
        { path: 'policy/khach-hang-than-thiet', Component: CustomerPolicy },
        // Others
        { path: 'link', Component: LinkPage },
        { path: 'news', Component: NewsPage },
        { path: 'contact', Component: ContactPage },
        { path: 'intro', Component: Introduction },
        // Not found
        { path: '*', Component: NotFound }
      ]
    },
    {
      path: 'admin',
      Component: LayoutAdmin,
      children: [
        { index: true, Component: DashboardPage },
        // Category
        { path: 'categories', Component: CategoryPage },
        { path: 'categories/add', Component: AddCategoryPage },
        { path: 'categories/:id/edit', Component: EditCategoryPage },
        // Product
        { path: 'products', Component: AdminProductPage },
        { path: 'products/add', Component: ProductAddPage },
        { path: 'products/:id/edit', Component: ProductEditPage },
        // Order
        { path: 'articles', Component: AdminArticlePage },
        { path: 'articles/add', Component: ArticleAddPage },
        { path: 'articles/:id', Component: ArticleEditPage },
        { path: 'order', Component: AdminOrderPage },
        // Customer
        { path: 'customer', Component: AdminCustomerPage },
        { path: 'customer/:id', Component: AdminCustomerDetailPage },
        // Report
        { path: 'report', Component: ReportsPage }
      ]
    }
  ])
  return routes
}
export default App
