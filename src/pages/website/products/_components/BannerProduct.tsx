
import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"

const BannerProduct = () => {
  const breadcrumbItems = [
    {
      title: <Link className="text-white" to="/">Trang chủ</Link>,
    },
    {
      title: 'Tất cả sản phẩm',
    },
  ];
  return (
    <div>
      <div className='w-full  mx-auto relative mt-[58px]   '>
        {/* Overlay */}
        <div className='absolute inset-0 bg-black opacity-50'></div>

        {/* Image */}
        <img
          src='https://file.hstatic.net/200000065946/collection/banner_web_1920x450-0410__1__6f2_c39476d703c04384bf6b292d1aef8d19_2048x2048.jpg'
          alt='Banner'
          className='w-full h-full object-cover object-center md:object-[center_top]  overflow-hidden shadow-lg'
        />
        {/* Content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8'>
          <h1 className='text-white text-base md:text-2xl lg:text-3xl font-bold'>SẢN PHẨM</h1>
          <Breadcrumb items={breadcrumbItems} className='text-white mt-2 text-sm md:text-base lg:text-lg'/>
        </div>
      </div>
    </div>
  )
}

export default BannerProduct