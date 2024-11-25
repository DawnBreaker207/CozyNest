const Contacttwo = () => {
  return (
    <div className='container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]  gap-8 items-center bg-yellow-600 p-8 lg:p-8'>
      {/* Left side */}
      <div className='lg:col-span-1 space-y-8 text-center lg:text-right'>
        <div>
          <h3 className='font-bold text-xl mb-2'>Đổi trả dễ dàng</h3>
          <p>
            Chính sách đổi trả minh bạch, hỗ trợ tối đa cho khách hàng. Đảm bảo bạn hài lòng với mọi sản phẩm nội thất
            mà bạn chọn.
          </p>
        </div>
        <div>
          <h3 className='font-bold text-xl mb-2'>Thương hiệu chất lượng</h3>
          <p>
            Cam kết mang đến những sản phẩm nội thất từ các thương hiệu uy tín, sử dụng vật liệu cao cấp, bền đẹp theo
            thời gian.
          </p>
        </div>
      </div>

      {/* Vertical divider with dots */}
      <div className='relative flex justify-center items-center lg:col-span-1'>
        <div className='h-full w-1 border-r-2 border-gray-400'></div>
        {/* <div className='absolute top-1/4 w-4 h-4 bg-orange-500 rounded-full'></div> */}
        {/* <div className='absolute top-3/4 w-4 h-4 bg-orange-500 rounded-full'></div> */}
      </div>

      {/* Right side */}
      <div className='lg:col-span-1 space-y-8 text-center lg:text-left'>
        <div>
          <h3 className='font-bold text-xl mb-2'>Thiết kế đa dạng</h3>
          <p>
            Khám phá bộ sưu tập nội thất phong phú, từ phong cách hiện đại, tối giản đến cổ điển sang trọng, phù hợp với
            mọi không gian sống.
          </p>
        </div>
        <div>
          <h3 className='font-bold text-xl mb-2'>Tiêu chuẩn nghiêm ngặt</h3>
          <p>
            Mỗi sản phẩm đều trải qua quy trình kiểm định chất lượng khắt khe, đảm bảo an toàn và độ bền lâu dài cho gia
            đình bạn.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contacttwo
