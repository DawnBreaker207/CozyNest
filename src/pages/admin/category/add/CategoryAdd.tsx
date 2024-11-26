import { Form, Input, Button, Checkbox, message, Select } from 'antd'
import { CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ICategory } from '@/types/category'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useState } from 'react'
import Upload, { RcFile } from 'antd/es/upload'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'

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
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Category</span> <CaretRightOutlined /> <span>Add Category</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/categories`}>Cancel</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Add Category
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
              <Form.Item label='Thumbnail'>
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
                  <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
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
                label='Category Type'
                name='type'
                rules={[{ required: true, message: 'Loại danh mục là bắt buộc' }]}
              >
                <Select placeholder='Select category type' className='w-full'>
                  <Option value='normal'>Normal</Option>
                  <Option value='default'>Default</Option>
                </Select>
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

export default AddCategoryPage
