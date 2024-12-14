import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useCategory } from '@/hooks/useCategoryQuery'
import { ICategory } from '@/types/category'
import { vietnameseChars2 } from '@/validations/validate'
import { BackwardOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message, Select, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, error } = useCategory(id)
  const { Option } = Select
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
    if (data?.thumbnail) {
      setThumbnail(data.thumbnail)
    }
  }, [data])

  if (!id) {
    return <div>Error: Invalid category ID</div>
  }
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

    mutate({ ...data, ...updatedValues, _id: id })
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
        <div className='mb-5 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Cập nhật danh mục</h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <BackwardOutlined />
              <Link to={`/admin/categories`}>Quay lại</Link>
            </Button>
          </div>
        </div>
        <Form layout='vertical' onFinish={onFinish} initialValues={{ ...data }}>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
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
                <Input placeholder='Tên danh mục' className='w-full' />
              </Form.Item>

              <Form.Item label='Ảnh danh mục' name='thumbnail'>
                <Upload {...{ beforeUpload: handleUpload }}>
                  <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                </Upload>
                {thumbnail ? (
                  <img src={thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded mt-3' />
                ) : (
                  <span className='mt-2'>
                    <img src={data?.thumbnail} alt='thumbnail' />
                  </span>
                )}
              </Form.Item>
              <Form.Item
                label='Loại danh mục'
                name='type'
                rules={[{ required: true, message: 'Loại danh mục là bắt buộc' }]}
                className='w-[20%]'
              >
                <Select placeholder='Chọn loại danh mục'>
                  <Option value='normal'>Normal</Option>
                  <Option value='default'>Default</Option>
                </Select>
              </Form.Item>
              <Button type='primary' htmlType='submit'>
                Cập nhật danh mục
              </Button>
            </div>

            <div className='w-[20%]'>
              <div>
                <div>
                  <Form.Item name='isHidden' valuePropName='checked'>
                    <Checkbox>Ẩn danh mục</Checkbox>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default EditCategoryPage
