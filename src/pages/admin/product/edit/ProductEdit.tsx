import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import useProductMutation from '@/hooks/useProductMutation'
import { useProduct } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { vietnameseChars1 } from '@/validations/validate'
import { BackwardOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, message, Select, Spin, Switch } from 'antd'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import React Quill CSS
import { Link, useParams } from 'react-router-dom'

const ProductEditPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  // Lấy dữ liệu sản phẩm
  const { data, isLoading, isError, error } = useProduct(id as string)
  const category_id = data?.category_id?._id

  // Sử dụng useForm từ Ant Design để lấy API form
  const [form] = Form.useForm()

  // Mutation để cập nhật sản phẩm
  const { mutate } = useProductMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật sản phẩm thành công')
      setLoading(false) // Tắt loading khi cập nhật thành công
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
      ...data,
      ...values,
      _id: data!._id
    }

    // Gửi dữ liệu sản phẩm đã được cập nhật
    mutate(updatedProduct)
  }

  // Cập nhật form khi dữ liệu sản phẩm được tải xong
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        category_id,
        is_hidden: data.is_hidden // Cập nhật is_hidden khi dữ liệu đã tải xong
      })
    }
  }, [data, form, category_id]) // Chạy khi `data` và `category_id` thay đổi

  if (isLoading) return <CustomLoadingPage />
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <div className='rounded-lg'>
        {/* Hiển thị spinner khi loading là true */}
        {loading ? (
          <div className='flex justify-center items-center'>
          <CustomLoadingPage />
          </div>
        ) : (
          <Form
            form={form} // Truyền form vào để sử dụng API form
            layout='vertical'
            onFinish={onFinish}
          >
            <div className='flex justify-between'>
              <div>
                <span className='text-2xl font-bold'>Cập nhật sản phẩm</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Button icon={<BackwardOutlined />}>
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
                <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Mô tả là bắt buộc!' }]}>
                  <ReactQuill theme='snow' placeholder='Nhập mô tả sản phẩm' />
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
                  <Form.Item label='Ẩn Sản Phẩm' name='is_hidden' valuePropName='checked'>
                    <Switch
                      checked={data?.is_hidden}
                      onChange={(checked) => {
                        // Cập nhật trạng thái is_hidden khi chuyển trạng thái
                        form.setFieldsValue({ is_hidden: checked }) // Sử dụng API form
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <Button type='primary' htmlType='submit'>
              Cập nhật
            </Button>
          </Form>
        )}
      </div>
    </>
  )
}

export default ProductEditPage
