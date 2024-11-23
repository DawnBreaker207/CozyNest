import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const LayoutWebsite = () => {
  const userJson = localStorage.getItem("user");
  const role = userJson ? JSON.parse(userJson)?.data?.res?.role : null;
  const nav = useNavigate();

  if (role === 'admin') {
    nav('/admin');
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <p className="text-lg font-semibold text-red-500 mb-4">
          Admins are not allowed to access this page.
        </p>
        <Link to={`admin`} className='px-4 py-4 bg-red-500 border' >Admin page</Link>
      </div>
    );
  }
  
  return (
    <div className='relative'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutWebsite
