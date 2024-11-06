/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Carousel } from 'antd'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  const carouselRef = useRef<any>(null)

  const prev = () => {
    carouselRef.current.prev()
  }

  const next = () => {
    carouselRef.current.next()
  }

  return (
    <div className='w-full mx-auto top-0  relative pt-14 md:pt-[auto] -mt-[56px]'>
      <Link to={`/products_page`}>
        <Carousel ref={carouselRef} effect='fade' autoplay className='overflow-hidden shadow-lg'>
          <img
            src='https://theme.hstatic.net/200000748041/1001116292/14/slide_3_img.jpg?v=31'
            alt='Slide 1'
            className='w-full object-cover'
          />
          <img
            src='https://theme.hstatic.net/200000748041/1001116292/14/slide_2_img.jpg?v=31,2'
            alt='Slide 2'
            className='w-full object-cover'
          />
          <img
            src='https://theme.hstatic.net/200000748041/1001116292/14/slide_4_img.jpg?v=31,3'
            alt='Slide 3'
            className='w-full object-cover'
          />
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
