import Admin from '@/layouts/LayoutAdmin'
import Client from '@/layouts/LayoutClient'
import { useRoutes } from 'react-router-dom'

const Router = () => {
  const router = useRoutes([
    { path: '/', Component: Client, children: [] },
    {
      path: '/admin',
      Component: Admin,
      children: []
    }
  ])
  return router
}

export default Router
