import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './slider.css'

interface ArrowProps {
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const CustomPrevArrow: React.FC<ArrowProps> = (props) => {
  const windowWidth = window.innerWidth // Lấy chiều rộng của cửa sổ
  const { className, style, onClick } = props
  // Kiểm tra các kích thước màn hình
  const isSmallScreen = windowWidth < 800
  const isMediumScreen = windowWidth >= 800 && windowWidth <= 1024
  return (
    <div
      className={`${className} slick-prev`}
      style={{
        ...style,
        width: '40px',
        height: '40px',
        lineHeight: '50px',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        cursor: 'pointer',
        position: 'absolute',
        top: isSmallScreen ? '36%' : isMediumScreen ? '36%' : '44%', // Căn giữa theo chiều dọc
        left: '10px', // Khoảng cách từ bên trái
        transform: 'translateY(-50%)' // Căn giữa theo chiều dọc
      }}
      onClick={onClick}
    ></div>
  )
}

const CustomNextArrow: React.FC<ArrowProps> = (props) => {
  const windowWidth = window.innerWidth // Lấy chiều rộng của cửa sổ
  const { className, style, onClick } = props

  // Kiểm tra các kích thước màn hình
  const isSmallScreen = windowWidth < 800
  const isMediumScreen = windowWidth >= 800 && windowWidth <= 1024

  return (
    <div
      className={`${className} slick-next`}
      style={{
        ...style,
        width: '40px',
        height: '40px',
        lineHeight: '40px',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        cursor: 'pointer',
        position: 'absolute',
        top: isSmallScreen ? '36%' : isMediumScreen ? '36%' : '44%', // Căn giữa theo chiều dọc
        right: '10px', // Khoảng cách từ bên phải
        transform: 'translateY(-50%)' // Căn giữa theo chiều dọc
      }}
      onClick={onClick}
    ></div>
  )
}

const Category = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  }
  return (
    <div className='mx-auto container mt-[50px] lg:mt-[100px]'>
      <div className='mx-auto'>
        <div className='sectionHeading text-center mb-8'>
          <h3 className='text-[25px] sm:text-[45px] font-normal text-[#FCA120]'>Danh mục sản phẩm</h3>
        </div>
        <div className='sectionContent'>
          <Slider {...settings}>
            {/* Item 1 */}
            <div className='item-category p-3'>
              {' '}
              <div className='media-category effect-image'>
                <a href='#' aria-label='Nội thất cơ bản'>
                  <img
                    className='w-full'
                    src='./src/assets/images/category/img_item_category_1.webp'
                    alt='Nội thất cơ bản'
                  />
                </a>
              </div>
              <div className='title-category text-center mt-4'>
                <h4 className='text-xl font-medium'>
                  <a href='#' className='text-[#FCA120] font-normal' aria-label='Nội thất cơ bản'>
                    Nội thất cơ bản
                  </a>
                </h4>
              </div>
            </div>
            {/* Item 2 */}
            <div className='item-category p-3'>
              {' '}
              <div className='media-category effect-image'>
                <a href='#' aria-label='Nội thất cơ bản'>
                  <img
                    className='w-full'
                    src='./src/assets/images/category/img_item_category_2.webp'
                    alt='Nội thất cơ bản'
                  />
                </a>
              </div>
              <div className='title-category text-center mt-4'>
                <h4 className='text-xl font-medium'>
                  <a href='#' className='text-[#FCA120] font-normal' aria-label='Không gian phòng khách'>
                    Không gian phòng khách
                  </a>
                </h4>
              </div>
            </div>
            {/* Item 3 */}
            <div className='item-category p-3'>
              {' '}
              <div className='media-category effect-image'>
                <a href='#' aria-label='Trang trí nhà bếp'>
                  <img
                    className='w-full'
                    src='./src/assets/images/category/img_item_category_3.webp'
                    alt='Trang trí nhà bếp'
                  />
                </a>
              </div>
              <div className='title-category text-center mt-4'>
                <h4 className='text-xl font-medium'>
                  <a href='#' className='text-[#FCA120] font-normal' aria-label='Trang trí nhà bếp'>
                    Trang trí nhà bếp
                  </a>
                </h4>
              </div>
            </div>
            {/* Item 4 */}
            <div className='item-category p-3'>
              {' '}
              <div className='media-category effect-image'>
                <a href='#' aria-label='Nội thất phòng ngủ'>
                  <img
                    className='w-full'
                    src='./src/assets/images/category/img_item_category_4.webp'
                    alt='Nội thất phòng ngủ'
                  />
                </a>
              </div>
              <div className='title-category text-center mt-4'>
                <h4 className='text-xl font-medium'>
                  <a href='#' className='text-[#FCA120] font-normal' aria-label='Nội thất phòng ngủ'>
                    Nội thất phòng ngủ
                  </a>
                </h4>
              </div>
            </div>
            {/* Item 5 */}
            <div className='item-category p-3'>
              {' '}
              <div className='media-category effect-image'>
                <a href='#' aria-label='Dụng cụ nhà tắm'>
                  <img
                    className='w-full'
                    src='./src/assets/images/category/img_item_category_5.webp'
                    alt='Dụng cụ nhà tắm'
                  />
                </a>
              </div>
              <div className='title-category text-center mt-4'>
                <h4 className='text-xl font-medium'>
                  <a href='#' className='text-[#FCA120] font-normal' aria-label='Dụng cụ nhà tắm'>
                    Dụng cụ nhà tắm
                  </a>
                </h4>
              </div>
            </div>
            {/* Item 6 */}
            <div className='item-category p-3'>
              {' '}
              <div className='media-category effect-image'>
                <a href='#' aria-label='Phụ kiện'>
                  <img className='w-full' src='./src/assets/images/category/img_item_category_6.webp' alt='Phụ kiện' />
                </a>
              </div>
              <div className='title-category text-center mt-4'>
                <h4 className='text-xl font-medium'>
                  <a href='#' className='text-[#FCA120] font-normal' aria-label='Không gian phòng khách'>
                    Phụ kiện
                  </a>
                </h4>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Category
