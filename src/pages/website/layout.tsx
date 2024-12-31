import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

const LayoutWebsite = () => {
  return (
    <div className='relative'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutWebsite
