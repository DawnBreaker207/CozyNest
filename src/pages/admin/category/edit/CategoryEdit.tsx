import { Form, Input, Button, Checkbox, message, Upload } from 'antd'
import { CaretRightOutlined, CheckSquareOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ICategory } from '@/types/category'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useEffect, useState } from 'react'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { RcFile } from 'antd/es/upload'

const EditCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, isLoading, isError, error } = useCategoryQuery({ id })
  const { mutate } = useCategoryMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật thành công')
      setTimeout(() => {
        navigate(`/admin/categories`)
      }, 600)
    }
  })
  useEffect(() => {
    if (data?.res?.thumbnail) {
      setThumbnail(data.res.thumbnail)
    }
  }, [data])

  const handleUpload = async (file: RcFile) => {
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

    if (!id) {
      messageApi.error('ID danh mục không hợp lệ')
      return
    }

    // Đảm bảo rằng _id từ dữ liệu ban đầu (data) được giữ lại trong category khi gửi đi
    const updatedCategory = {
      ...data?.res, // Dữ liệu danh mục hiện tại
      ...values, // Giá trị form mới
      _id: data?.res?._id // Đảm bảo rằng _id không bị mất
    }

    console.log(updatedCategory)

    mutate(updatedCategory) // Gửi dữ liệu danh mục đã được cập nhật
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
              <span className='text-[#3A5BFF]'>Category</span> <CaretRightOutlined /> <span>Edit Category</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/categories`}>Cancel</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<CheckSquareOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Edit Category
              </Button>
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>General Information</h1>
              <Form.Item
                label='Category Name'
                name='name'
                rules={[{ required: true, message: 'Tên danh mục là bắt buộc' }]}
              >
                <Input placeholder='Type category name here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>

              <Form.Item label='Thumbnail' name='thumbnail'>
                <Upload {...{ beforeUpload: handleUpload }}>
                  <Button icon={<UploadOutlined />}>Tải lên ảnh đại diện</Button>
                </Upload>
                {thumbnail ? (
                  <img src={thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded' />
                ) : (
                  <span className='mt-2'>Hiện tại: {data?.res?.thumbnail}</span>
                )}
              </Form.Item>
            </div>

            <div className='w-[20%]'>
              <div>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Status</h1>
                <Form.Item name='isHidden' valuePropName='checked'>
                  <Checkbox>Hide Category</Checkbox>
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
