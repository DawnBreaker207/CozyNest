const Contactthree = () => {
  return (
    <div className='container mx-auto mb-50 mt-20'>
      <div className='bg-gray-100 flex justify-center items-center p-8'>
        <div className='bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row w-full max-w-6xl mb-4'>
          {/* Hình ảnh */}
          <div className='md:w-1/3 w-full mb-6 md:mb-0'>
            <img
              src='https://file.hstatic.net/200000804441/file/6_45bab837763d4970963a7f1e9893b0a9_grande.png'
              alt='Mew Furniture'
              className='w-full h-auto rounded-lg shadow-md object-cover'
            />
          </div>

          {/* Nội dung văn bản */}
          <div className='md:w-2/3 w-full pl-0 md:pl-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6'>Về công ty</h2>
            <p className='text-gray-600 mb-4'>
              Chào mừng đến với Cozynest, nơi mang đến vẻ đẹp tự nhiên và không gian sống lý tưởng. Chúng tôi tự hào là
              một trong những đơn vị hàng đầu cung cấp sản phẩm nội thất chất lượng cao.
            </p>
            <p className='text-gray-600 mb-4'>
              Cozynest đặt sự chăm sóc khách hàng và tính chuyên nghiệp lên hàng đầu, cam kết mang đến sản phẩm chính
              hãng và dịch vụ tốt nhất cho quý khách.
            </p>
          </div>
        </div>
      </div>

      <div className='bg-gray-100 flex justify-center items-center p-8'>
        <div className='bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row w-full max-w-6xl mb-4'>
          {/* Hình ảnh */}
          <div className='md:w-1/3 w-full mb-6 md:mb-0 mt-9 order-1 md:order-2'>
            <img
              src='https://file.hstatic.net/200000804441/file/5_d9a935a2617345d6846eb44657c7a51b_grande.png'
              alt='Mew Furniture'
              className='w-full h-auto rounded-lg shadow-md object-cover'
            />
          </div>

          {/* Nội dung văn bản */}
          <div className='md:w-2/3 w-full pl-0 md:pl-2 order-2 md:order-1'>
            <h2 className='text-3xl font-bold text-gray-800 mb-6'>Về công ty</h2>
            <p className='text-gray-600 mb-4'>
              Cozynest không chỉ đơn thuần là nơi để mua sắm nội thất, mà còn là một cộng đồng của những người yêu thích
              thiết kế và kiến trúc. Tại đây, bạn có thể trao đổi kinh nghiệm, chia sẻ niềm đam mê với những người cùng
              chí hướng. Chúng tôi tổ chức các buổi workshop và sự kiện liên quan đến thiết kế và kiến trúc, mang đến cơ
              hội học hỏi và giao lưu với các chuyên gia trong ngành. Đặc biệt, Cozynest cam kết bảo vệ môi trường và
              phát triển bền vững. Chúng tôi ưu tiên sử dụng các phương pháp tái chế trong sản xuất và thu hồi sản phẩm,
              với mong muốn truyền cảm hứng và khuyến khích mọi người tham gia vào lối sống xanh. Chúng tôi tự hào tạo
              ra những không gian sống vừa độc đáo, vừa thân thiện với môi trường. Tại Cozynest, chúng tôi hiểu rằng nội
              thất không chỉ đơn thuần là vật trang trí, mà còn là yếu tố quan trọng ảnh hưởng đến tinh thần và cuộc
              sống của mỗi người. Với sự chăm sóc khách hàng tận tâm và tính chuyên nghiệp cao, chúng tôi cam kết mang
              đến những sản phẩm chính hãng, chất lượng tốt nhất để phục vụ quý khách.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactthree
