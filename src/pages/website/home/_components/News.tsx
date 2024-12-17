import IArticle from '@/types/article'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Card, Carousel, Button } from 'antd'
import Meta from 'antd/es/card/Meta'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const News = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const getAllArticles = async () => {
    try {
      const { data } = await axios.get('http://localhost:8888/api/v1/articles')
      setArticles(data.res)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  useEffect(() => {
    getAllArticles()
  }, [])

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
          {articles
            .filter((article) => article.isHidden === true)
            .map((article) => (
              <Card
                key={article._id}
                hoverable
                className='flex-shrink-0 w-1/3 m-4 rounded-lg shadow-lg overflow-hidden relative bg-white'
                cover={
                  <img
                    alt={article.title}
                    src={article.thumbnail}
                    className='rounded-t-lg w-full h-[270px] object-cover'
                  />
                }
              >
                <div className='absolute top-0 left-0 bg-white text-gray-500 px-2 py-1 rounded-br-lg'>
                  {article.created_at}
                </div>
                <Meta
                  title={<span className='text-[#FCA120]'>{article.title}</span>}
                  description={article.title.substring(0, 45) + "..."}
                />
                <p className='items-center mt-2 -mb-2 text-gray-400 '>tác giả: {article.author}</p>
                <Link
                  to={`/articles/${article._id}`}
                  className='text-black hover:text-orange-600 flex items-center mt-4'
                >
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
          {articles.map((newsItem) => (
            <div key={newsItem._id} className='px-2'>
              <Link to={`/articles/${newsItem._id}`}>
                <Card
                  hoverable
                  cover={<img alt={newsItem.title} src={newsItem.thumbnail} className='rounded-t-lg' />}
                  className='rounded-lg shadow-lg overflow-hidden relative h-[300px]'
                >
                  <div className='absolute top-2 left-2 bg-white text-[#FCA120] px-2 py-1 rounded-br-lg'>
                    {newsItem.created_at}
                  </div>
                  <Meta
                    title={<span className='text-[#FCA120]'>{newsItem.title}</span>}
                    description={
                      <div>
                        <p className='text-gray-600 mb-2'>{newsItem.title.substring(0, 20)}... </p>
                        <Link
                          to={`/articles/${newsItem._id}`}
                          className='text-black hover:text-orange-600 flex items-center mt-4'
                        >
                          Xem thêm
                          <svg className='w-4 h-4 ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                          </svg>
                        </Link>
                      </div>
                    }
                  />
                </Card>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default News
