import instance from '@/configs/axios'
import useProductMutation from '@/hooks/useProductMutation'
import { useProduct } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, InputNumber, message, Select } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductEditPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams()

  // Lấy dữ liệu sản phẩm
  const { data, isLoading, isError, error } = useProduct(id as string)
  const categoryId = data?.category_id?._id
  // Mutation để cập nhật sản phẩm
  const { mutate } = useProductMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật sản phẩm thành công')
      setTimeout(() => {
        navigate(`/admin/products`)
      }, 900)
    }
  })

  // Lấy danh mục sản phẩm
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await instance.get(`/categories`)
  })

  // Hàm xử lý khi form submit
  const onFinish = (values: IProduct) => {
    // Đảm bảo rằng _id từ dữ liệu ban đầu (data) được giữ lại trong product khi gửi đi
    const updatedProduct = {
      // Dữ liệu sản phẩm hiện tại
      ...data,
      // Giá trị form mới
      ...values,
      // Đảm bảo rằng _id không bị mất
      _id: data!._id
    }
    // Gửi dữ liệu sản phẩm đã được cập nhật
    mutate(updatedProduct)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form
          layout='vertical'
          onFinish={onFinish}
          // Đặt giá trị mặc định cho form, bao gồm categoryId từ sản phẩm
          initialValues={{
            ...data, // Giá trị sản phẩm trả về từ API
            categoryId
          }}
        >
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Product</span> <CaretRightOutlined /> <span>Edit Product</span>
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
                Edit Product
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
              <Form.Item label='Thumbnail' name='thumbnail'>
                <Input placeholder='thumbnail here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
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

export default ProductEditPage
