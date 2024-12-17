import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Carousel, Typography } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  const carouselRef = useRef<CarouselRef | null>(null)
  const { Text } = Typography
  const prev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev()
    }
  }

  const next = () => {
    if (carouselRef.current) {
      carouselRef.current.next()
    }
  }

  return (
    <div className='w-full mx-auto top-0  relative pt-14 md:pt-[auto] -mt-[56px] '>
      <Link to={`/products_page`}>
        <Carousel ref={carouselRef} effect='fade' autoplay className='overflow-hidden shadow-lg relative'>
          {/* Slide 1 */}
          <div className='relative'>
            <img
              src='https://theme.hstatic.net/200000748041/1001116292/14/slide_3_img.jpg?v=31'
              alt='Slide 2'
              className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <Text className='text-white text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-oldstyle font-bold text-center'>
                Chào mừng đến với Cozynest
              </Text>
            </div>
          </div>

          {/* Slide 2 */}
          <div className='relative'>
            <img
              src='https://theme.hstatic.net/200000748041/1001116292/14/slide_4_img.jpg?v=31,2'
              alt='Slide 1'
              className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover'
            />
            {/* Lớp phủ */}
            <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center'>
              {/* Phần nội dung */}
              <div className='text-center px-4 flex flex-col items-center'>
                <Text className='text-yellow-500 text-2xl sm:text-4xl lg:text-5xl font-oldstyle font-bold mb-4 ml-2'>
                  NỘI THẤT CHUẨN XUẤT KHẨU CHÂU ÂU
                </Text>
                <Text className='text-white text-2xl lg:text-3xl font-oldstyle font-bold mb-6'>
                  AN TOÀN CHO CẢ GIA ĐÌNH
                </Text>
                <Button className='px-6 py-3  w-1/5 lg:px-6 lg:py-4 bg-yellow-700 text-white rounded-md'>
                  XEM CHI TIẾT
                </Button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className='relative'>
            <img
              src='https://theme.hstatic.net/200000748041/1001116292/14/slide_2_img.jpg?v=31,3'
              alt='Slide 3'
              className='w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <Text className='text-white text-2xl sm:text-4xl md:text-6xl font-oldstyle font-bold text-center font-bold'>
                Thiết kế nội thất với phong cách hiện đại
              </Text>
            </div>
          </div>
        </Carousel>
      </Link>

      {/* Nút sang trái */}
      <Button
        onClick={prev}
        className='hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 left-4 bg-white text-black px-2 rounded-full shadow-lg hover:bg-gray-200'
      >
        <LeftOutlined />
      </Button>

      {/* Nút sang phải */}
      <Button
        onClick={next}
        className='hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 right-4 bg-white text-black px-2 rounded-full shadow-lg hover:bg-gray-200'
      >
        <RightOutlined />
      </Button>
    </div>
    // dưới banner
  )
}

export default Banner
