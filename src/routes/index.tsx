import DashboardPage from '@/pages/(dashboard)/dashboard/page'
import LayoutAdmin from '@/pages/(dashboard)/layout'
import ProductAddPage from '@/pages/(dashboard)/products/add/ProductAdd'
import ProductEditPage from '@/pages/(dashboard)/products/edit/ProductEdit'
import ProductPage from '@/pages/(dashboard)/products/ProductPage'
import HomePage from '@/pages/(website)/home/page'
import LayoutWebsite from '@/pages/(website)/layout'
import { Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path='admin' element={<LayoutAdmin />}>
          <Route index element={<DashboardPage />} />
          <Route path='products' element={<ProductPage />} />
          <Route path='products/add' element={<ProductAddPage />} />
          <Route path='products/:id/edit' element={<ProductEditPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default Router
