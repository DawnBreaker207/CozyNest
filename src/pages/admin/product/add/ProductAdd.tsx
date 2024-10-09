import { useState } from 'react'
import instance from '@/configs/axios'
import useProductMutation from '@/hooks/useProductMutation'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, InputNumber, message, Select, Upload } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'

const ProductAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  // const [images, setImages] = useState<{ file: File; name: string }[]>([])
  const [thumbnail, setThumbnail] = useState<{ file: File; name: string } | null>(null)
  const navigate = useNavigate()

  const { mutate } = useProductMutation({
    action: 'CREATE',
    onSuccess: () => {
      messageApi.success('Thêm sản phẩm thành công')
      setTimeout(() => {
        navigate(`/admin/products`)
      }, 900)
    }
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await instance.get(`/categories`)
  })

  const onFinish = async (values: IProduct) => {
    // Upload all images when form is submitted
    // const uploadPromises = images.map(({ file }) => uploadFileCloudinary(file))
    // const imageUrls = await Promise.all(uploadPromises)

    const thumbnailUrl = thumbnail ? await uploadFileCloudinary(thumbnail.file) : ''

    const updatedValues = { ...values, thumbnail: thumbnailUrl } // Cập nhật thumbnail
    console.log(updatedValues) // Kiểm tra giá trị trước khi gửi
    mutate(updatedValues)
  }

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Product</span> <CaretRightOutlined /> <span>Add Product</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/products`}>Cancel</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Add Product
              </Button>
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>General Information</h1>
              <Form.Item
                label='Product Name'
                name='name'
                rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
              >
                <Input placeholder='Type product name here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Pricing</h1>
              <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Giá sản phẩm là bắt buộc' }]}>
                <InputNumber placeholder='Type base price here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item label='Discount Percentage (%)' name='discount'>
                <InputNumber placeholder='Type discount percentage here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item label='Description' name='description'>
                <Input.TextArea
                  rows={4}
                  placeholder='Type product description here...'
                  className='w-full bg-[#F9F9FC]'
                />
              </Form.Item>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Media</h1>
              <div>
                <div className='grid grid-cols-1 gap-4'>
                  {/* <Form.Item label='Ảnh sản phẩm' name='images'>
                    <Upload
                      multiple
                      beforeUpload={(file) => {
                        setImages((prev) => [...prev, { file, name: file.name }]);
                        return false; // Prevent automatic upload
                      }}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Tải lên ảnh sản phẩm</Button>
                    </Upload>
                    <div className="mt-2">
                      {images.map(({ name }) => (
                        <span key={name} className="mr-2">{name}</span>
                      ))}
                    </div>
                  </Form.Item> */}

                  <Form.Item label='Ảnh đại diện' name='thumbnail'>
                    <Upload
                      beforeUpload={(file) => {
                        setThumbnail({ file, name: file.name })
                        return false // Prevent automatic upload
                      }}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Tải lên ảnh đại diện</Button>
                    </Upload>
                    {thumbnail && <span className='mt-2'>{thumbnail.name}</span>}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className='w-[20%]'>
              <Form.Item label='Brand' name='brand'>
                <Input placeholder='Type product description here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item
                label='Danh mục'
                name='categoryId'
                rules={[{ required: true, message: 'Bắt buộc chọn danh mục!' }]}
              >
                <Select
                  showSearch
                  placeholder='Chọn danh mục'
                  optionFilterProp='label'
                  options={categories?.data?.res?.map((category: ICategory) => ({
                    value: category._id,
                    label: category.name
                  }))}
                />
              </Form.Item>
              <div>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Status</h1>
                <Form.Item name='isHidden' valuePropName='checked'>
                  <Checkbox>Hide Product</Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ProductAddPage
