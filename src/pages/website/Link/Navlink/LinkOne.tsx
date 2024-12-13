import IArticle from '@/types/article'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { Link, useParams } from 'react-router-dom'
import "react-quill/dist/quill.snow.css"; // Import CSS cho React Quill

const Linkone: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const getAllArticles = async () => {
    try {
      const { data } = await axios.get('http://localhost:8888/api/v1/articles')
      setArticles(data.res)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }
  useEffect(() => {
    getAllArticles()
  }, [])
  const [article, setArticle] = useState<IArticle | null>(null)
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false) // Trạng thái để kiểm soát việc hiển thị bài viết
  const togglePosts = () => {
    setIsOpen(!isOpen) // Chuyển đổi trạng thái
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8888/api/v1/articles/${id}`)
        setArticle(data.res)
      } catch (error) {
        console.error('Error fetching article:', error)
      }
    }
    fetchArticle()
  }, [id])

  return (
    <div className='lg:px-[75px] container mx-auto'>
      <div className='flex flex-col md:flex-row p-4 mt-[3%]'>
        {/* Main content */}
        <div className='bg-white p-4 mb-6 lg:max-w-[987px] rounded-lg shadow-shadowUser'>
          <div className='mb-4'>
            <h1 className='text-2xl font-semibold text-gray-900'>{article?.title}</h1>
            <div className='text-sm text-gray-500 flex space-x-4'>
              <span className='block'>bởi: {article?.author}</span>
              <span className='block'>
                <time dateTime='2023-07-13'>{article?.created_at}</time>
              </span>
            </div>
          </div>
          <div className='article-content'>
            <div className='mb-4'>
              <img
                className='w-full h-auto'
                src={article?.thumbnail}
                alt='Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn'
              />
            </div>
            {article?.content?.map((section, index) => (
              <div className='max-w-[860px] mx-auto mb-[30px]' key={index}>
                <h1
                  id='1-_su_dung_noi_that_thong_minh_va_tan_dung_khong_gian_de_luu_tru_do_dac'
                  className='text-[40px] font-bold text-[#fca120] mb-4'
                >
                  {section.heading}
                </h1>
                <p className='mb-4 text-gray-700 text-[14px]'>
                {section.paragraph ? (
            <div className="mb-4 text-gray-700 text-[14px]">
              <ReactQuill
                value={section.paragraph}
                readOnly
                theme="bubble" // Sử dụng theme bubble cho chế độ chỉ đọc
              />
            </div>
          ) : (
            <p>No paragraph available</p>
          )}
                </p>
                {section.images &&
                  Array.isArray(section.images) &&
                  section.images.map(
                    (image, imgIndex) =>
                      image?.url && (
                        <div key={imgIndex} className='mr-4 lg:w-[767px] mb-4'>
                          <img
                            title={image.caption || 'Image'}
                            className='w-full h-auto mb-2'
                            src={image.url}
                            alt={image.caption || 'Article image'}
                          />
                          <span className=' items-center text-sm text-gray-500'>{image.caption}</span>
                        </div>
                      )
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Latest Posts */}
        <div className=''>
          <div className='  w-[339px] pl-4'>
            <div className='bg-white shadow-lg lg:w-[339px] rounded-lg '>
              <div
                className='flex items-center justify-between   shadow-shadowUser px-5 py-2 cursor-pointer'
                onClick={togglePosts}
              >
                <h2 className='text-lg font-semibold text-[#fca120] '>Bài viết mới nhất</h2>
                {isOpen ? (
                  <UpOutlined className='text-gray-400' style={{ fontSize: '10px' }} />
                ) : (
                  <DownOutlined className='text-gray-400' style={{ fontSize: '10px' }} />
                )}
              </div>

              {!isOpen && (
                <>
                  {articles
                  .filter((article) => article.isHidden === true)
                  .map((article, index) => (
                    <Link to={`/articles/${article._id}`} key={index}>
                      <div className='shadow-shadowUser mt-1 px-5 pb-4'>
                        {/* Các bài viết với kích thước hình ảnh bằng nhau */}
                        <div className='flex items-center  mb-4'>
                          <div className='relative w-auto'>
                            <img
                              title='img'
                              src={article.thumbnail}
                              className='w-40 h-14 object-cover' // Chiều rộng và chiều cao bằng nhau
                              // Lấy URL hình ảnh từ mảng
                            />
                            <span className='absolute top-1/4 left-[-16px] border-2 border-white h-[28px] w-[28px] leading-[26px] text-center rounded-full bg-[#fca120] text-[#fff] text-xs z-10'></span>
                          </div>
                          <div className='ml-4 '>
                            <div className='mb-1'>
                              <p className='font-medium text-[13px] text-gray-800'>{article.title}</p>{' '}
                              {/* Tiêu đề bài viết */}
                            </div>
                            <p className='text-sm text-gray-500'>{article.created_at}</p> {/* Ngày bài viết */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Linkone
