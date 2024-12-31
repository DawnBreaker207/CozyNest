/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { StarFilled } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Rate, Select, Spin } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ReviewComponent = ({ handleBuyNow, loading }: any) => {
  const [showAll, setShowAll] = useState(false)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)

  const [sortOption, setSortOption] = useState('moi')
  const handleSortChange = (value: any) => {
    setSortOption(value)
  }
  const { id } = useParams()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        return await instance.get(`/reviews/${id}`)
      } catch (error) {
        throw new Error((error as any).message)
      }
    }
  })
  const dataReview = data?.data?.data || []
  const sortedReviews = [...dataReview].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    if (sortOption === 'moi') {
      return dateB - dateA
    }
    return dateA - dateB
  })

  const ratingCounts = [0, 0, 0, 0, 0]
  dataReview?.forEach((review: any) => {
    const rating = review.rating
    if (rating >= 1 && rating <= 5) {
      ratingCounts[5 - rating] += 1
    }
  })

  const totalRatings = ratingCounts.reduce((total, count) => total + count, 0)

  const totalPoints = ratingCounts.reduce((total, count, index) => total + count * (5 - index), 0)

  const averageRating = totalRatings === 0 ? 0 : (totalPoints / totalRatings).toFixed(1)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>
  return (
    <div className='p-4 md:p-6 border border-gray-200 rounded-lg mt-6 lg:mt-24 md:mr-10'>
      {dataReview.length > 0 ? (
        <>
          <h4 className='text-lg font-semibold mb-4'>Đánh giá & nhận xét</h4>
          <div className='flex items-center justify-between mb-5'>
            <div className='text-center'>
              <p className='text-xl font-bold'>{averageRating}/5</p>
              <div className='flex justify-center mb-1'>
                <Rate disabled allowHalf defaultValue={Number(averageRating)} className='text-base' />
              </div>
              <a href='#' className='text-sm'>
                {totalRatings} đánh giá
              </a>
            </div>
            <div className='md:w-2/3'>
              {[5, 4, 3, 2, 1].map((star, index) => {
                const ratingCount = ratingCounts[5 - star] // Lấy số lượng đánh giá cho mỗi mức sao
                const percentage = totalRatings === 0 ? 0 : (ratingCount / totalRatings) * 100

                return (
                  <div key={index} className='flex items-center gap-2 mb-2'>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm font-bold'>{star}</p>
                      <StarFilled className='text-sm text-[#fadb14]' />
                    </div>
                    <div className='w-[60px] md:w-2/3 h-2 rounded bg-gray-200'>
                      <div className='h-2 rounded bg-[#fadb14]' style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className='ml-2 text-sm'>{ratingCount} đánh giá</span>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Bộ lọc */}
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='text-lg font-semibold'>Lọc đánh giá</div>

            <Select
              value={sortOption}
              onChange={handleSortChange}
              options={[
                { value: 'moi', label: 'Mới nhất' },
                { value: 'cu', label: 'Cũ nhất' }
              ]}
            />
          </div>
          <div className='flex gap-2 mb-4'>
            <button
              onClick={() => setSelectedRating(null)} // Đặt lại bộ lọc để hiển thị tất cả các đánh giá
              className={`py-1 px-2 rounded-2xl ${
                selectedRating === null ? 'bg-[#fca120] text-white' : 'bg-gray-50 text-black'
              }`}
            >
              Tất cả
            </button>
            {[1, 2, 3, 4, 5].map((star: number) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)} // Đặt đánh giá sao đã chọn khi người dùng nhấn
                className={`py-1 px-2 rounded-2xl ${
                  selectedRating === star ? 'bg-[#fca120] text-white' : 'bg-gray-50 text-black'
                }`}
              >
                {star} <StarFilled className='text-sm text-[#fadb14]' />
              </button>
            ))}
          </div>

          {/* Hiển thị danh sách các đánh giá */}
          <div className='space-y-4 p-2 md:p-4'>
            {sortedReviews
              .filter((review: any) => selectedRating === null || review.rating === selectedRating)
              .slice(0, showAll ? sortedReviews.length : 2)
              .map((review: any, index: number) => (
                <div key={index} className='flex gap-4 items-start pb-4'>
                  <img src={review.user_id.avatar} alt='User avatar' className='w-8 h-8 md:w-12 md:h-12 rounded-full' />
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <p className='font-semibold text-base md:text-lg'>{review.user_id.username}</p>
                      <div className='flex items-center text-[#fca120]'>
                        <Rate disabled allowHalf value={review.rating} className='text-sm' />
                      </div>
                    </div>
                    <p className='text-sm text-gray-600 mt-2'>{review.comment}</p>
                    {/* Hiển thị hình ảnh của sản phẩm */}
                    <div className='mt-4 grid grid-cols-3 gap-2'>
                      {review.image && (
                        <img
                          title='ảnh sản phẩm'
                          src={review.image}
                          className='w-20 h-20 md:w-32 md:h-32 object-cover rounded-md'
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className='flex items-center gap-4 mt-2 md:mt-4'>
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                className='block mx-auto bg-[#fca120] text-white font-semibold py-2 px-4 rounded'
              >
                Xem tất cả
              </button>
            )}
            {showAll && (
              <button
                onClick={() => setShowAll(false)}
                className='block mx-auto bg-[#fca120] text-white font-semibold py-2 px-4 rounded'
              >
                Ẩn bớt
              </button>
            )}
            {/* <button
              className='block w-full bg-[#fca120] text-white font-semibold py-2 px-4 rounded'
              onClick={showModal}
            >
              Đánh giá ngay
            </button> */}
          </div>
        </>
      ) : (
        <>
          <h4 className='text-lg font-semibold mb-4'>Đánh giá & nhận xét</h4>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-base text-center'>Hiện chưa có đánh giá nào.</p>
            <p className='text-base text-center'>Chỉ những người đã mua hàng mới có thể đánh giá sản phẩm này.</p>
          </div>
          <div className='flex items-center justify-center mt-3'>
            <button
              onClick={handleBuyNow}
              disabled={loading}
              className='block bg-[#fca120] text-white font-semibold py-2 px-4 rounded'
            >
              {loading ? (
                <p>
                  <Spin size='small' className='mr-2' />
                  Mua Ngay
                </p>
              ) : (
                <span>Mua Ngay</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ReviewComponent
