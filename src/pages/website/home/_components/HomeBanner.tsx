const HomeBanner = () => {
  return (
    <>
      <div className='container mt-10 md:mt-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='item-home-banner px-[15px] col-12 col-lg-6'>
            <div className='item-home-banner-inner effect-image'>
              <div className='media-home-banner'>
                <picture>
                  <img
                    src='//theme.hstatic.net/200000748041/1001116292/14/img_home_banner_desktop_1.jpg?v=31'
                    alt='Nội thất phòng khách'
                  />
                </picture>
              </div>
              <div className='info-home-banner text-center mt-4 lg:mt-8'>
                <h4 className='lg:text-[43px] text-[25px] font-normal text-[#fca120]'>
                  <a href='' aria-label='Nội thất phòng khách'>
                    Nội thất phòng khách
                  </a>
                </h4>
                <p className='text-[#252a2b] lg:text-[18px] text-sm mt-2 lg:mt-6 leading-relaxed  '>
                  Phòng khách được ví như trái tim của ngôi nhà, gắn kết các thành viên trong gia đình và đón tiếp bạn
                  bè, người thân của gia chủ. Do vậy, phòng khách là nơi được đầu tư nhiều nhất với các sản phẩm phong
                  cách đẹp, hiện đại và cực kỳ sang trọng.
                </p>
                <div className='action-home-banner mt-5 '>
                  <a
                    href='#'
                    className='border border-gray-200 px-8 py-3 bg-white rounded text-current no-underline outline-none transition duration-300 ease-in-out  inline-block'
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='item-home-banner px-[15px] col-12 col-lg-6'>
            <div className='item-home-banner-inner effect-image'>
              <div className='media-home-banner'>
                <picture>
                  <img
                    className=' h-auto object-cover'
                    src='./src/assets/images/content/NT_PhongNgu.webp'
                    alt='Nội thất phòng ngủ'
                  />
                </picture>
              </div>
              <div className='info-home-banner text-center mt-4 lg:mt-8'>
                <a href=''>
                  <h4 className='lg:text-[43px] text-[25px] font-normal text-[#fca120]'>Nội thất phòng ngủ</h4>
                </a>
                <p className='text-[#252a2b] lg:text-[18px] text-sm lg:mt-6 mt-2 leading-relaxed'>
                  Phòng ngủ là không gian quan trọng, là cầu nối giúp cho giấc ngủ được trọn vẹn,là không gian riêng tư
                  để bạn thực hiện sở thích của mình. Việc bố trí các vật dụng nội thất, ánh sáng trong phòng ngủ dựa
                  trên các tiêu chuẩn về thẩm mỹ kiến trúc.
                </p>
                <div className='action-home-banner mt-5'>
                  <a
                    href='#'
                    className='border border-gray-200 px-8 py-3 bg-white rounded text-current no-underline outline-none transition duration-300 ease-in-out  inline-block'
                  >
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeBanner
