import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className='container'>
        <div className='row wrapper-row pd-page max-w-[1190px] mx-auto mt-6 text-center'>
          <h1 className='text-9xl font-bold text-yellow-500'>404</h1>
          <p className='text-4xl text-gray-700 font-extrabold'>Không tìm thấy trang</p>
          <p className='text-1xl text-[#666] tracking-wider mt-1'>Xin lỗi, chúng tôi không tìm thấy trang này</p>
          <Link to='/'>
            <button className='max-w-[240px] w-[100%] h-[40px] bg-black text-white mt-10 mb-10 transition-colors duration-300 hover:bg-white hover:text-black border border-black'>
              Trở về trang chủ
            </button>
          </Link>
          <hr className='mx-auto mb-10 w-[100px] h-[3px] bg-black' />
        </div>
      </div>
    </>
  )
}

export default NotFound
