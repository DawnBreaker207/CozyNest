import AdminArticlePage from '@/pages/admin/article/ArticlePage'
import ArticleAddPage from '@/pages/admin/article/add/ArticleAdd'
import ArticleEditPage from '@/pages/admin/article/edit/ArticleEdit'
import CategoryPage from '@/pages/admin/category/CategoryPage'
import AddCategoryPage from '@/pages/admin/category/add/CategoryAdd'
import EditCategoryPage from '@/pages/admin/category/edit/CategoryEdit'
import CouponPage from '@/pages/admin/coupon/CouponPage'
import CouponAdd from '@/pages/admin/coupon/add/CouponAdd'
import CouponEdit from '@/pages/admin/coupon/edit/CouponEdit'
import AdminCustomerDetailPage from '@/pages/admin/customer/[id]/CustomerDeTail'
import AdminCustomerPage from '@/pages/admin/customer/page'
import DashboardPage from '@/pages/admin/dashboard/page'
import LayoutAdmin from '@/pages/admin/layout'
import AdminOrderDetail from '@/pages/admin/order/OrderDetail'
import AdminOrderPage from '@/pages/admin/order/OrderPage'
import ReturnOrdersAdmin from '@/pages/admin/order/OrderReturns'
import AdminProductPage from '@/pages/admin/product/ProductPage'
import ProductAddPage from '@/pages/admin/product/add/ProductAdd'
import ProductEditPage from '@/pages/admin/product/edit/ProductEdit'
import AdminOption from '@/pages/admin/product/option/AdminOption'
import AdminOptionAdd from '@/pages/admin/product/option/add/AdminOptionAdd'
import AdminOptionEdit from '@/pages/admin/product/option/edit/AdminOptionEdit'
import AdminOptionValue from '@/pages/admin/product/optionvalue/AdminOptionValue'
import AdminOptionValueAdd from '@/pages/admin/product/optionvalue/add/AdminOptionValueAdd'
import AdminOptionValueEdit from '@/pages/admin/product/optionvalue/edit/AdminOptionValueEdit'
import AdminVariantPage from '@/pages/admin/product/variant/AdminVariantPage'
import UpdateVariant from '@/pages/admin/product/variant/_components/UpdateVariant'
import AdminReview from '@/pages/admin/review/AdminReview'
import LinkPage from '@/pages/website/Link/page'
import Login from '@/pages/website/auth/Login'
import ProfilePage from '@/pages/website/auth/ProfilePage/ProfilePage'
import Register from '@/pages/website/auth/Register'
import ResetPassword from '@/pages/website/auth/ResetPassword'
import CartPage from '@/pages/website/cart/CartPage'
import CategoryProductsPage from '@/pages/website/category/ProductPage'
import ContactPage from '@/pages/website/contact/contact'
import NotFound from '@/pages/website/home/_components/NotFound'
import CustomerPolicy from '@/pages/website/home/_components/policy/CustomerPolicy'
import DeliveryPolicy from '@/pages/website/home/_components/policy/DeliveryPolicy'
import ReturnPolicy from '@/pages/website/home/_components/policy/ReturnPolicy'
import SalesPolicy from '@/pages/website/home/_components/policy/SalesPolicy'
import WarrantyPolicy from '@/pages/website/home/_components/policy/WarrantyPolicy'
import HomePage from '@/pages/website/home/page'
import Introduction from '@/pages/website/introduction/page'
import LayoutWebsite from '@/pages/website/layout'
import NewsPage from '@/pages/website/news/page'
import CheckOutOder from '@/pages/website/order/_components/CheckOutOder'
import OrderDetail from '@/pages/website/order/_components/OrderDetail'
import OrderPage from '@/pages/website/order/_components/OrderPage'
import PaymentResultPage from '@/pages/website/order/_components/PaymentResultPage '
import PaymentPage from '@/pages/website/order/_components/RetryPayment'
import StockPropblem from '@/pages/website/order/_components/StockPropblem'
import CheckoutPage from '@/pages/website/order/page'
import ProductsPage from '@/pages/website/products/_components/ProductPage'
import ProductsPageDetail from '@/pages/website/products/_components/ProductPageDetail'
import ProductDetail from '@/pages/website/products/detail/DetailPage'
import { useRoutes } from 'react-router-dom'
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

        { path: 'products_page/:id', Component: ProductsPageDetail },

        { path: 'category/:id', Component: CategoryProductsPage }, // Route path="/products_page?category=:categoryId" element={<ProductsPage />} /> {/* Trang sản phẩm của danh mục */}

        { path: 'cart', Component: CartPage },
        { path: 'check_out', Component: CheckoutPage },
        { path: 'paymentresult', Component: PaymentResultPage },
        { path: 'orders/orderdetail', Component: OrderDetail },
        { path: 'paymentRetry/:id', Component: PaymentPage },
        { path: 'stock_propblem', Component: StockPropblem },
        { path: 'intro', Component: Introduction },
        { path: 'orders', Component: OrderPage },
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

        // Review
        { path: 'reviews', Component: AdminReview },

        // Order
        { path: 'order', Component: AdminOrderPage },
        { path: 'orderDetail/:id', Component: AdminOrderDetail },
        { path: 'order_returns', Component: ReturnOrdersAdmin },

        // Variant
        {
          path: 'products/:product_id/variants',
          Component: AdminVariantPage
        },
        {
          path: 'products/:product_id/variants/:sku_id/update',
          Component: UpdateVariant
        },

        // Option
        {
          path: 'products/:product_id/options',
          Component: AdminOption
        },
        {
          path: 'products/:product_id/options/add',
          Component: AdminOptionAdd
        },
        {
          path: 'products/:product_id/options/:option_id/edit',
          Component: AdminOptionEdit
        },

        // Option Value
        {
          path: 'products/:product_id/options_value/:option_id',
          Component: AdminOptionValue
        },
        {
          path: 'products/:product_id/options_value/:option_id/add',
          Component: AdminOptionValueAdd
        },
        {
          path: 'products/:product_id/options_value/:option_id/:value_id/edit',
          Component: AdminOptionValueEdit
        },

        // Articles
        { path: 'articles', Component: AdminArticlePage },
        { path: 'articles/add', Component: ArticleAddPage },
        { path: 'articles/:id', Component: ArticleEditPage },

        // Customer
        { path: 'coupons', Component: CouponPage },
        { path: 'coupons/add', Component: CouponAdd },
        { path: 'coupons/:id/edit', Component: CouponEdit },
        { path: 'customer', Component: AdminCustomerPage },
        { path: 'customer/:id', Component: AdminCustomerDetailPage }
      ]
    }
  ])
  return routes
}
export default App
