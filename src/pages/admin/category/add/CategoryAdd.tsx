import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { ICategory } from '@/types/category'
import { BackwardOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message, Select } from 'antd'
import Upload from 'antd/es/upload'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const [thumbnail, setThumbnail] = useState<{ file: File; name: string } | null>(null)
  const { mutate } = useCategoryMutation({
    action: 'CREATE',
    onSuccess: () => {
      messageApi.success('Thêm thành công')
      setTimeout(() => {
        navigate(`/admin/categories`)
      }, 600)
    }
  })
  const { Option } = Select
  const onFinish = async (values: ICategory) => {
    try {
      const thumbnailUrl = thumbnail ? await uploadFileCloudinary(thumbnail.file) : 'default-thumbnail-url.jpg'

      const categoryData = {
        ...values,
        thumbnail: thumbnailUrl || 'default-thumbnail-url.jpg',
        isHidden: values.isHidden !== undefined ? values.isHidden : false
      }

      mutate(categoryData)
    } catch (error) {
      messageApi.error('Failed to upload the image. Please try again!')
      console.error(error)
    }
  }

  return (
    <>
      {contextHolder}
      <div className='mb-5 flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Thêm mới danh mục</h1>
        <div className='flex items-center space-x-2'>
          <Button>
            <BackwardOutlined />
            <Link to={`/admin/categories`}>Quay lại</Link>
          </Button>
        </div>
      </div>
      <div className='rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <Form.Item
                label='Tên danh mục'
                name='name'
                rules={[{ required: true, message: 'Tên danh mục là bắt buộc' }]}
              >
                <Input placeholder='Tên danh mục' className='w-full ' />
              </Form.Item>
              <Form.Item label='Ảnh danh mục'>
                <Upload
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith('image/')
                    const isLt2M = file.size / 1024 / 1024 < 2

                    if (!isImage) {
                      message.error('You can only upload image files!')
                      return false
                    }
                    if (!isLt2M) {
                      message.error('Image must smaller than 2MB!')
                      return false
                    }

                    setThumbnail({ file, name: file.name })
                    return false // Ngăn upload tự động
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                </Upload>
                <div className='mt-2'>
                  {thumbnail && (
                    <>
                      <span>{thumbnail.name}</span>
                      <br />
                      <img
                        src={URL.createObjectURL(thumbnail.file)}
                        alt='Thumbnail'
                        style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
                      />
                    </>
                  )}
                </div>
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
                Thêm danh mục
              </Button>
            </div>
            <div className='w-[20%]'>
              <div>
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

export default AddCategoryPage
