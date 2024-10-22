import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Card, Carousel, Button } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const News = () => {
  const newsItems = [
    {
      title: 'Thiết kế nội thất chung cư đẹp cho đôi vợ chồng trẻ',
      description: 'Sử dụng nội thất thông minh và tận dụng không gian để lưu trữ đồ đạc...',
      date: '13 Tháng 07, 2023',
      image:
        'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.22.42_899b3463f971438b93e951e8475f69ea_grande.png',
      link: '/link'
    },
    {
      title: 'Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn',
      description: 'Lựa chọn bàn ăn phù hợp với không gian nhà bạn',
      date: '13 Tháng 07, 2023',
      image:
        'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.21.03_744e96d8ac574728a4b81008f1f4131a_grande.png',
      link: '/link'
    },
    {
      title: 'Mua sofa giường mang cả thiên đường đến những căn hộ nhỏ',
      description: 'Sử dụng sofa giường để tiết kiệm không gian trong căn hộ nhỏ...',
      date: '13 Tháng 07, 2023',
      image:
        'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.18.57_c2c5c9603d97452e8661433e95e159b3_grande.png',
      link: '/link'
    },
    {
      title: 'Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn',
      description: 'Lựa chọn bàn ăn phù hợp với không gian nhà bạn',
      date: '13 Tháng 07, 2023',
      image:
        'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.21.03_744e96d8ac574728a4b81008f1f4131a_grande.png',
      link: '/link'
    }
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <div className='container'>
      {/* Desktop grid view, hidden on mobile */}
      <div className='hidden md:block relative mt-10 md:mt-20'>
        <Button
          onClick={scrollLeft}
          className='absolute left-10 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2'
        >
          <LeftOutlined />
        </Button>
        <h1 className='text-center text-[25px] sm:text-[45px] mb-2 mx-auto text-[#FCA120]'>Tin tức nổi bật</h1>
        <div ref={scrollContainerRef} className='overflow-hidden scrollbar-hide flex flex-nowrap p-4'>
          {newsItems.map((article, index) => (
            <Card
              key={index}
              hoverable
              className='flex-shrink-0 w-1/3 m-4 rounded-lg shadow-lg overflow-hidden relative bg-white'
              cover={<img alt={article.title} src={article.image} className='rounded-t-lg' />}
            >
              <div className='absolute top-0 left-0 bg-white text-gray-500 px-2 py-1 rounded-br-lg'>{article.date}</div>
              <Meta
                title={<span className='text-[#FCA120]'>{article.title}</span>}
                description={article.description.substring(0, 20)}
              />
              <Link to={article.link} className='text-black hover:text-orange-600 flex items-center mt-4'>
                Xem thêm
                <svg className='w-4 h-4 ml-1 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                </svg>
              </Link>
            </Card>
          ))}
        </div>
        <Button
          onClick={scrollRight}
          className='absolute right-2.5 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2'
        >
          <RightOutlined />
        </Button>
      </div>

      {/* Mobile carousel view, hidden on desktop */}
      <div className='block md:hidden mt-10'>
        <h1 className='text-center text-[25px] sm:text-[45px] mb-10 mx-auto text-[#FCA120]'>Tin tức nổi bật</h1>
        <Carousel
          slidesToShow={2}
          dots
          arrows
          responsive={[
            {
              breakpoint: 768, // breakpoint for tablet
              settings: {
                slidesToShow: 2, // 2 items per slide on smaller screens
                arrows: false
              }
            },
            {
              breakpoint: 480, // breakpoint for mobile
              settings: {
                slidesToShow: 2, // 2 items per slide on mobile
                arrows: false
              }
            }
          ]}
        >
          {newsItems.map((newsItem, index) => (
            <div key={index} className='px-2'>
              <Card
                hoverable
                cover={<img alt={newsItem.title} src={newsItem.image} className='rounded-t-lg' />}
                className='rounded-lg shadow-lg overflow-hidden relative'
              >
                <div className='absolute top-2 left-2 bg-white text-[#FCA120] px-2 py-1 rounded-br-lg'>
                  {newsItem.date}
                </div>
                <Meta
                  title={<span className='text-[#FCA120]'>{newsItem.title}</span>}
                  description={
                    <div>
                      <p className='text-gray-600 mb-2'>{newsItem.description.substring(0, 20)}... </p>
                      <Link to={newsItem.link} className='text-black hover:text-orange-600 flex items-center mt-4'>
                        Xem thêm
                        <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                        </svg>
                      </Link>
                    </div>
                  }
                />
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default News
