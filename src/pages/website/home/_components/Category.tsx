import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './slider.css'
import { ICategory } from '@/types/category'
import instance from '@/configs/axios'
import { Link } from 'react-router-dom'

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
  const [categories, setCategories] = useState<ICategory[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await instance.get('/categories')
        setCategories(data.res) // Giả sử `data` là mảng danh mục
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }
    fetchCategories()
  }, [])
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
          slidesToShow: 4,
          dots: true, // Hiển thị dấu chấm
          arrows: true // Hiển thị mũi tên
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          dots: true, // Hiển thị dấu chấm
          arrows: false // Ẩn mũi tên
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          dots: true, // Hiển thị dấu chấm
          arrows: false // Ẩn mũi tên
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
            {categories.map((category) => (
              <Link to={`/category/${category._id}`} className='block  py-2 text-gray-700'>
                <div className='item-category p-3'>
                  {' '}
                  <div className='media-category effect-image'>
                    <a href='#' aria-label='Nội thất cơ bản'>
                      <img
                        className='rounded-t-lg w-full h-[270px] object-cover'
                        src={category.thumbnail}
                        alt={category.name}
                      />
                    </a>
                  </div>
                  <div className='title-category text-center mt-4'>
                    <h4 className='text-xl font-medium'>
                      <a href='#' className='text-[#FCA120] font-normal' aria-label='Nội thất cơ bản'>
                        {category.name}
                      </a>
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Category
