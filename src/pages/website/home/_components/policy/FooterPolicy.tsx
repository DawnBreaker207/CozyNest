const FooterPolicy = () => {
  return (
    <>
      <div className='container pr-[15px] pl-[15px] mb-20 mt-16'>
        <div className='grid grid-cols-2 max-w-[1200px] mx-auto md:grid-cols-4'>
          <div className='services w-full max-h-[204px] h-[100%] py-[40px] border flex flex-col items-center transition-all duration-300 hover:bg-gray-100 hover:shadow-lg'>
            <div className='img-outer'>
              <div className='service-img fade-box'>
                <img
                  className='w-[50px] h-[50px]'
                  src='//theme.hstatic.net/200000065946/1001264503/14/vice_item_1_thumb.png?v=422'
                  alt='Giao Hàng & Lắp Đặt'
                />
              </div>
            </div>
            <div className='text text-center'>
              <div className='title font-medium text-lg text-[#666] my-[10px]'>Giao Hàng &amp; Lắp Đặt</div>
              <div className='desc font-medium text-sm text-[#666] my-[10px]'>Miễn Phí</div>
            </div>
          </div>

          <div className='services w-full max-h-[204px] h-[100%] py-[40px] border flex flex-col items-center transition-all duration-300 hover:bg-gray-100 hover:shadow-lg'>
            <div className='img-outer'>
              <div className='service-img fade-box'>
                <img
                  className='w-[50px] h-[50px]'
                  src='//theme.hstatic.net/200000065946/1001264503/14/vice_item_2_thumb.png?v=422'
                  alt='Đổi Trả 1 - 1'
                />
              </div>
            </div>
            <div className='text text-center'>
              <div className='title font-medium text-lg text-[#666] my-[10px]'>Đổi Trả 1 - 1</div>
              <div className='desc font-medium text-sm text-[#666] my-[10px]'>Miễn Phí</div>
            </div>
          </div>

          <div className='services w-full max-h-[204px] h-[100%] py-[40px] border flex flex-col items-center transition-all duration-300 hover:bg-gray-100 hover:shadow-lg'>
            <div className='img-outer'>
              <div className='service-img fade-box'>
                <img
                  className='w-[50px] h-[50px]'
                  src='//theme.hstatic.net/200000065946/1001264503/14/vice_item_3_thumb.png?v=422'
                  alt='Bảo Hành 2 Năm'
                />
              </div>
            </div>
            <div className='text text-center'>
              <div className='title font-medium text-lg text-[#666] my-[10px]'>Bảo Hành 2 Năm</div>
              <div className='desc font-medium text-sm text-[#666] my-[10px]'>Miễn Phí</div>
            </div>
          </div>

          <div className='services w-full max-h-[204px] h-[100%] py-[40px] border flex flex-col items-center transition-all duration-300 hover:bg-gray-100 hover:shadow-lg'>
            <div className='img-outer'>
              <div className='service-img fade-box'>
                <img
                  className='w-[50px] h-[50px]'
                  src='//theme.hstatic.net/200000065946/1001264503/14/vice_item_4_thumb.png?v=422'
                  alt='Tư Vấn Thiết Kế'
                />
              </div>
            </div>
            <div className='text text-center'>
              <div className='title font-medium text-lg text-[#666] my-[10px]'>Tư Vấn Thiết Kế</div>
              <div className='desc font-medium text-sm text-[#666] my-[10px]'>Miễn Phí</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FooterPolicy
