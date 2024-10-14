const Contactone = () => {
  return (
    <div className='container mx-auto md:px-2'>
      <h1 className='text-xl font-bold text-center mt-10 -mb-5'>Về chúng tôi</h1>
      <div className='text-center py-8'>
        <div className='flex flex-col md:flex-row justify-around items-center'>
          <div className='max-w-xs bg-white  rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-2'>
            <img
              className='w-full h-48 object-cover'
              src='https://file.hstatic.net/200000804441/file/7_16944769ad624250addfd6e66a28e588_large.png'
              alt='Sản phẩm chất lượng tốt nhất'
            />
            <div className='p-6 '>
              <h3 className='text-xl font-semibold mb-4'>Sản phẩm tốt nhất</h3>
              <p className='text-gray-700'>
                Chất lượng vừa mang tính trừu tượng vừa mang tính cụ thể. Tính trừu tượng thông qua sự phù hợp, nó phản
                ánh mặt chủ quan của sản phẩm và khách hàng hàng hàng hàng.
              </p>
            </div>
          </div>

          <div className='max-w-xs bg-white  rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-2'>
            <img
              className='w-full h-48 object-cover'
              src='https://file.hstatic.net/200000804441/file/8_6bf70e035241456a9eb04abe849bc59a_large.png'
              alt='Chia sẻ kiến thức'
            />
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>Chia sẻ kiến thức</h3>
              <p className='text-gray-700'>
                Chúng tôi cung cấp hướng dẫn chi tiết về các vấn đề không gian, cách điều chỉnh ánh sáng và bố cục để
                đảm bảo không gian sống của bạn đậm chất riêng.
              </p>
            </div>
          </div>

          <div className='max-w-xs bg-white rounded-lg overflow-hidden md:mr-2'>
            <img
              className='w-full h-48 object-cover'
              src='https://file.hstatic.net/200000804441/file/9_fcbfc9ce490e4416a9d90ded046f0763_large.png'
              alt='Bảo vệ môi trường'
            />
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>Bảo vệ môi trường</h3>
              <p className='text-gray-700'>
                Chúng tôi tổ chức các buổi workshop và sự kiện liên quan đến thiết kế kiến trúc để mang đến cho bạn cơ
                hội học hỏi và giao lưu với những người có cùng đam mê.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactone
