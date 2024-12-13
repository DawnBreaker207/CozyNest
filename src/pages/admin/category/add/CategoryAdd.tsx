import { Form, Input, Button, Checkbox, message, Select } from 'antd'
import { CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ICategory } from '@/types/category'
import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useState } from 'react'
import Upload from 'antd/es/upload'
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
      messageApi.error('Không tải được hình ảnh lên. Vui lòng thử lại!')
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
              <span className='text-[#3A5BFF]'>Danh mục</span> <CaretRightOutlined /> <span>Thêm danh mục</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/categories`}>Hủy</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Thêm danh mục
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
                      if (
                        !value ||
                        /^[a-zA-ZÀÁÂÃẢẠẮẶẲẨẦẬẪẤÈÉẺẸÊỀỆẾỂỄÌÍÒÓÔÕỎỒỐỔỘÕỜƠỢỚỠỞÙỤŨÚƯỪỬỨỮỰĂĐĨŨƠàáảạâãắằặẳẩầậấèéêềếểệễìíòóôõỏờơởớpỡợồôổốỗộùụũúăđĩưủừứựữửơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ]/.test(
                          value
                        )
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error('Chữ cái đầu tiên phải là chữ và không được là ký tự đặc biệt hoặc số')
                      )
                    }
                  }
                ]}
              >
                <Input placeholder='Nhập tên danh mục...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item label='Ảnh danh mục'>
                <Upload
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith('image/')
                    const isLt2M = file.size / 1024 / 1024 < 2

                    if (!isImage) {
                      message.error('Bạn chỉ có thể tải lên các tập tin hình ảnh!')
                      return false
                    }
                    if (!isLt2M) {
                      message.error('Hình ảnh phải nhỏ hơn 2MB!')
                      return false
                    }

                    setThumbnail({ file, name: file.name })
                    return false // Ngăn upload tự động
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
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
              >
                <Select placeholder='Select category type' className='w-full'>
                  <Option value='normal'>Bình thường</Option>
                  <Option value='default'>Mặc định</Option>
                </Select>
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

export default AddCategoryPage
