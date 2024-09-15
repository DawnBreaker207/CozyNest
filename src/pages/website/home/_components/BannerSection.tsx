const BannerSection = () => {
  return (
    <div className='container mx-auto max-w-[1900px] px-6 lg:px-[75px] mt-20'>
      <div className='line-banner-bottom flex flex-col lg:flex-row mb-8'>
        <div className='col-banner media-banner flex-1 mb-4 lg:mb-0'>
          <a href='' aria-label='Trang trí phòng khách'>
            <picture>
              <img
                className='w-full lazyloaded'
                src='./src/assets/images/content/TrangTri_PK.webp'
                alt='Trang trí phòng khách'
              />
            </picture>
          </a>
        </div>
        <div className='col-banner text-banner flex-1 lg:ml-4 my-auto'>
          <div className='info-banner-bottom text-center p-5   '>
            <div className='title-text-banner mb-4 text-center'>
              <h4 className='lg:text-5xl text-2xl font-normal text-[#fca120]'>
                <a href='' aria-label='Trang trí phòng khách'>
                  Trang trí phòng khách
                </a>
              </h4>
            </div>
            <p className='text-[#252a2b] lg:text-[18px] text-sm mt-2 leading-relaxed mx-5'>
              Trang trí phòng khách đẹp là một công việc thú vị và đầy sáng tạo giúp tạo nên không gian sống đẹp, ấn
              tượng. Hãy cùng khám phá những ý tưởng trang trí phòng khách đẹp đơn giản nhưng vô cùng ấn tượng.
            </p>
            <div className='action-banner-bottom'>
              <a
                className='border border-gray-200 px-8 py-3 bg-white rounded text-current no-underline outline-none transition duration-300 ease-in-out mt-4 inline-block'
                href=''
                aria-label='Trang trí phòng khách'
              >
                Xem ngay
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='line-banner-bottom flex flex-col lg:flex-row'>
        <div className='col-banner text-banner text-center flex-1 lg:mr-4'>
          <div className='info-banner-bottom  p-5'>
            <div className='title-text-banner mb-4'>
              <h4 className='lg:text-5xl text-2xl font-normal text-[#fca120]'>
                <a href='' aria-label='Trang trí sân vườn'>
                  Trang trí sân vườn
                </a>
              </h4>
            </div>
            <p className='text-[#252a2b] lg:text-[18px] text-sm mt-2 leading-relaxed mx-5'>
              Mua sắm các đồ nội thất ban công, vườn là điều mà nhiều gia chủ quan tâm trong thời buổi ngày nay, khi
              cuộc sống ngày càng trở nên ngột ngạt với những khu nhà cao tầng, đường xá,… mà thiếu vắng cây xanh thì xu
              hướng tạo nên khu vườn ngay trong nhà hoặc trong khu ban công là điều nhiều người thực hiện.
            </p>
            <div className='action-banner-bottom'>
              <a
                className='border border-gray-200 px-8 py-3 bg-white rounded text-current no-underline outline-none transition duration-300 ease-in-out mt-4 inline-block'
                href='/collections/all'
                aria-label='Trang trí sân vườn'
              >
                Xem ngay
              </a>
            </div>
          </div>
        </div>
        <div className='col-banner media-banner flex-1 mt-4 lg:-mt-8 lg:-ml-7'>
          <a href='' aria-label='Trang trí sân vườn'>
            <picture>
              <img
                className='w-full lazyloaded'
                src='./src/assets/images/content/TrangTri_SV.jpg'
                alt='Trang trí sân vườn'
              />
            </picture>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BannerSection
