import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useCategory } from '@/hooks/useCategoryQuery'
import { ICategory } from '@/types/category'
import { vietnameseChars2 } from '@/validations/validate'
import { CaretRightOutlined, CheckSquareOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, error } = useCategory(id)
  const { mutate } = useCategoryMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật thành công')
      setTimeout(() => {
        navigate(`/admin/categories`)
      }, 600)
    }
  })
  const isValidImageFile = (file: RcFile): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!validTypes.includes(file.type)) {
      messageApi.error('Chỉ cho phép tải lên các file ảnh có định dạng .jpg, .png, .gif!')
      return false
    }
    return true
  }
  useEffect(() => {
    if (data?.res?.thumbnail) {
      setThumbnail(data.res.thumbnail)
    }
  }, [data])

  if (!id) {
    return <div>Error: Invalid category ID</div>
  }
  const handleUpload = async (file: RcFile) => {
    if (!isValidImageFile(file)) return false

    try {
      const response = await uploadFileCloudinary(file)
      if (response) {
        setThumbnail(response)
        messageApi.success('Upload thumbnail thành công')
      } else {
        messageApi.error('Không thể upload thumbnail')
      }
    } catch (err) {
      messageApi.error('Lỗi upload ảnh')
    }
    return false
  }

  const onFinish = (values: ICategory) => {
    if (!thumbnail) {
      messageApi.error('Vui lòng upload thumbnail')
      return
    }

    const updatedValues = {
      ...values,
      thumbnail
    }

    mutate({ ...data?.res, ...updatedValues, _id: id })
  }
  if (!id) {
    messageApi.error('ID danh mục không hợp lệ')
    return
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish} initialValues={{ ...data?.res }}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Danh mục</span> <CaretRightOutlined /> <span>Cập nhật danh mục</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/categories`}>Hủy</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<CheckSquareOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Cập nhật danh mục
              </Button>
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Thông tin chung</h1>
              <Form.Item
                label='Tên danh mục'
                name='name'
                rules={[
                  { required: true, message: 'Tên danh mục là bắt buộc' },
                  {
                    min: 6,
                    message: 'Tên danh mục phải có tối thiểu 6 ký tự'
                  },
                  {
                    validator: (_, value) => {
                      if (!value || vietnameseChars2.test(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error('Chữ cái đầu tiên phải là chữ và không được có khoảng trắng liên tiếp')
                      )
                    }
                  }
                ]}
              >
                <Input placeholder='Nhập tên danh mục...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>

              <Form.Item label='Ảnh danh mục' name='thumbnail'>
                <Upload
                  beforeUpload={handleUpload}
                  maxCount={1} // Chỉ cho phép tải lên 1 file
                >
                  <Button icon={<UploadOutlined />}>Tải lên ảnh danh mục</Button>
                </Upload>
                {thumbnail ? (
                  <img src={thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded' />
                ) : (
                  data?.res?.thumbnail && (
                    <span className='mt-2'>
                      <img src={data.res.thumbnail} alt='thumbnail' />
                    </span>
                  )
                )}
              </Form.Item>
            </div>

            <div className='w-[20%]'>
              <div>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Trạng thái</h1>
                <Form.Item name='isHidden' valuePropName='checked'>
                  <Checkbox>Ẩn danh mục</Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default EditCategoryPage
