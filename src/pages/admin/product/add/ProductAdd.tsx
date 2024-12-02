import instance from '@/configs/axios'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useProductMutation from '@/hooks/useProductMutation'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { BackwardOutlined, CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, InputNumber, message, Select, Upload } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
              <h1 className='text-2xl font-bold'>Thêm sản phẩm</h1>
            </div>
            <div className='flex items-center space-x-2'>
              <Button>
                <BackwardOutlined />
                <Link to={`/admin/products`}>Quay lại</Link>
              </Button>
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <Form.Item
                label='Tên sản phẩm'
                name='name'
                rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
              >
                <Input placeholder='Tên sản phẩm' className='w-full' />
              </Form.Item>
              <Form.Item
                label='Giá sản phẩm'
                name='price'
                rules={[{ required: true, message: 'Giá sản phẩm là bắt buộc' }]}
              >
                <InputNumber placeholder='Giá sản phẩm' className='w-full' />
              </Form.Item>
              <Form.Item label='Mô tả sản phẩm' name='description'>
                <Input.TextArea rows={4} placeholder='Mô tả' className='w-full' />
              </Form.Item>
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

                  <Form.Item label='Ảnh sản phẩm' name='images' className='flex items-center'>
                    <Upload
                      beforeUpload={(file) => {
                        setThumbnail({ file, name: file.name })
                        return false // Prevent automatic upload
                      }}
                      showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
                    </Upload>
                    {thumbnail && <span className='ml-3'>{thumbnail.name}</span>}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className='w-[20%]'>
              <Form.Item
                label='Danh mục'
                name='category_id'
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
              <Form.Item
                label='Mã sản phẩm'
                name='SKU'
                rules={[{ required: true, message: 'Mã sản phẩm là bắt buộc!' }]}
              >
                <Input placeholder='Mã sản phẩm' className='w-full' />
              </Form.Item>
              <div>
                <Form.Item label='Trạng thái hiển thị' name='isHidden' valuePropName='checked'>
                  <Checkbox>Hiển thị</Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
          <Button type='primary' htmlType='submit' icon={<PlusOutlined />}>
            Thêm sản phẩm
          </Button>
        </Form>
      </div>
    </>
  )
}

export default ProductAddPage
