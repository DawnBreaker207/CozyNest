import instance from '@/configs/axios'
import { IReview } from '@/types/review'
import { StarFilled } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Form, FormProps, message, Modal, Rate, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const desc = ['Tệ', 'Kém', 'Trung bình', 'Tốt', 'Tuyệt vời']
const reviews = [
  {
    user: 'Nguyễn Văn A',
    rating: 5,
    comment: 'Sản phẩm tốt, giao hàng nhanh. Mình rất hài lòng!',
    userImage: 'https://picsum.photos/200/300',
    productImage: 'https://picsum.photos/200/300'
  },
  {
    user: 'Nguyễn Văn B',
    rating: 4,
    comment: 'Chất lượng ổn nhưng giá hơi cao một chút.',
    userImage: 'https://picsum.photos/200/300',
    productImage: 'https://picsum.photos/200/300'
  },
  {
    user: 'Nguyễn Văn c',
    rating: 5,
    comment: 'Sản phẩm dùng tốt, giao hàng nhanh.',
    userImage: 'https://picsum.photos/200/300',
    productImage: 'https://picsum.photos/200/300'
  }
]

const ReviewComponent = () => {
  const [showAll, setShowAll] = useState(false)
  const [selectedRating, setSelectedRating] = useState(null)
  const [messageApi, contextHolder] = message.useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { id } = useParams()
  const [form] = Form.useForm()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = user.data.res._id
  const { mutate } = useMutation({
    mutationFn: async (formData: IReview) => {
      try {
        return instance.post(`/review`, formData)
      } catch (error) {
        throw new Error('Thêm đánh giá thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Thêm đánh giá thành công'
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    try {
      await form.validateFields()
      form.submit()
      setIsModalOpen(false)
    } catch (error) {
      console.error('error:', error)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish: FormProps<IReview>['onFinish'] = async (values) => {
    const reviewData = {
      ...values,
      product_id: id,
      user_id: userId
    }
    console.log('Data review:', reviewData)
    mutate(reviewData)
    form.resetFields()
  }
  const ratings = [10, 1, 0, 0, 0]

  // Tính tổng số lượng đánh giá
  const totalRatings = ratings.reduce((total, rating) => total + rating, 0)

  // Tính tổng điểm
  const totalPoints = ratings.reduce((total, rating, index) => total + rating * (5 - index), 0)

  // Tính trung bình
  const averageRating = totalRatings === 0 ? 0 : (totalPoints / totalRatings).toFixed(1)

  return (
    <div className='p-6 border border-gray-200 rounded-lg mt-24 mr-10'>
      {contextHolder}
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
        <div className='w-2/3'>
          {[5, 4, 3, 2, 1].map((star, index) => {
            const ratingCount = ratings[5 - star] // Lấy số lượng đánh giá cho mỗi mức sao
            const percentage = totalRatings === 0 ? 0 : (ratingCount / totalRatings) * 100

            return (
              <div key={index} className='flex items-center gap-2 mb-2'>
                <div className='flex items-center gap-1'>
                  <p className='text-sm font-bold'>{star}</p>
                  <StarFilled className='text-sm text-[#fadb14]' />
                </div>
                <div className='w-2/3 h-2 rounded bg-gray-200'>
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
          defaultValue='moi'
          // onChange={handleChange}
          options={[
            { value: 'moi', label: 'Mới nhất' },
            { value: 'cao', label: 'Đánh giá cao -> thấp' },
            { value: 'thấp', label: 'Đánh giá thấp -> cao' }
          ]}
        />
      </div>
      <div className='flex gap-2 mb-4'>
        <button
          onClick={() => setSelectedRating(null)}
          className={`py-1 px-2 rounded-2xl ${
            selectedRating === null ? 'bg-[#fca120] text-white' : 'bg-gray-50 text-black'
          }`}
        >
          Tất cả
        </button>
        {[1, 2, 3, 4, 5].map((star: any) => (
          <button
            key={star}
            onClick={() => setSelectedRating(star)}
            className={`py-1 px-2 rounded-2xl ${
              selectedRating === star ? 'bg-[#fca120] text-white' : 'bg-gray-50 text-black '
            }`}
          >
            {star} <StarFilled className='text-sm text-[#fadb14]' />
          </button>
        ))}
      </div>

      {/* Hiển thị danh sách các đánh giá */}
      <div className='space-y-4 p-4'>
        {reviews.slice(0, showAll ? reviews.length : 2).map((review, index) => (
          <div key={index} className='flex gap-4 items-start pb-4'>
            <img src={review.userImage} alt='User avatar' className='w-12 h-12 rounded-full' />
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <p className='font-semibold text-lg'>{review.user}</p>
                <div className='flex items-center text-[#fca120]'>
                  <Rate disabled allowHalf value={review.rating} className='text-sm' />
                </div>
              </div>
              <p className='text-sm text-gray-600 mt-2'>{review.comment}</p>
              {/* Hiển thị hình ảnh sản phẩm */}
              <div className='mt-4'>
                <img src={review.productImage} alt='Product' className='w-32 h-32 object-cover rounded-md' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center gap-4 mt-4'>
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className='block w-full text-[#fca120] font-semibold py-2 px-4 rounded border-transparent hover:border-[#fca120] border'
          >
            Xem tất cả
          </button>
        )}
        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className='block w-full text-[#fca120] font-semibold py-2 px-4 rounded border-transparent hover:border-[#fca120] border'
          >
            Ẩn bớt
          </button>
        )}
        <button className='block w-full bg-[#fca120] text-white font-semibold py-2 px-4 rounded' onClick={showModal}>
          Đánh giá ngay
        </button>
      </div>

      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <h2 className='text-xl font-bold'>Đánh giá & nhận xét</h2>
          <h3 className='text-lg font-bold mt-4'>Sofa 1 chỗ Orientale da beige R5</h3>
          <Form form={form} onFinish={onFinish}>
            <Form.Item name='rating' rules={[{ required: true, message: 'Vui lòng chọn đánh giá!' }]}>
              <Rate tooltips={desc} />
            </Form.Item>
            <Form.Item name='comment' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
              <TextArea rows={5} placeholder='Nhập nhận xét của bạn...' />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default ReviewComponent
