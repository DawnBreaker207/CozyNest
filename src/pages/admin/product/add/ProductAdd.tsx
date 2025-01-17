import instance from '@/configs/axios'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useProductMutation from '@/hooks/useProductMutation'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { vietnameseChars1 } from '@/validations/validate'
import { BackwardOutlined, PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, message, Select } from 'antd'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import { Link, useNavigate } from 'react-router-dom'

const ProductAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  // const [images, setImages] = useState<{ file: File; name: string }[]>([])
  const [thumbnail] = useState<{ file: File; name: string } | null>(null)
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
    mutate(updatedValues)
  }
  const handleQuillChange = (value: string) => {
    return value
  }
  return (
    <>
      {contextHolder}
      <div className=' rounded-lg'>
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
                rules={[
                  {
                    min: 6,
                    message: 'Tên sản phẩm phải có tối thiểu 6 ký tự'
                  },
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject(new Error('Tên sản phẩm không được bỏ trống'))
                      }

                      // Kiểm tra đầu tiên chữ cái đầu phải là chữ và không phải ký tự đặc biệt hoặc số
                      if (!vietnameseChars1.test(value)) {
                        return Promise.reject(
                          new Error('Chữ cái đầu tiên phải là chữ và không được là ký tự đặc biệt hoặc số')
                        )
                      }

                      // Kiểm tra khoảng cách không quá 2 lần liên tiếp
                      if (/\s{2,}/.test(value)) {
                        return Promise.reject(new Error('Tên sản phẩm không được có quá 2 khoảng cách liên tiếp'))
                      }

                      return Promise.resolve()
                    }
                  }
                ]}
              >
                <Input placeholder='Tên sản phẩm' className='w-full' />
              </Form.Item>
              <Form.Item
                label='Mô tả sản phẩm'
                name='description'
                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
              >
                {/* Sử dụng React Quill  */}
                <ReactQuill
                  theme='snow'
                  placeholder='Mô tả sản phẩm'
                  onChange={handleQuillChange} // Lắng nghe thay đổi từ React Quill
                  modules={{
                    toolbar: [
                      [{ header: '1' }, { header: '2' }, { font: [] }],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['bold', 'italic', 'underline'],
                      ['link']
                    ]
                  }}
                />
              </Form.Item>
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
                <Form.Item label='Trạng thái hiển thị' name='is_hidden' valuePropName='checked'>
                  <Checkbox>Ẩn sản phẩm</Checkbox>
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
