import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import useProductMutation from '@/hooks/useProductMutation'
import { useProduct } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { BackwardOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input, message, Select } from 'antd'
import ReactQuill from 'react-quill'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css' // Import React Quill CSS

const ProductEditPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams()

  // Lấy dữ liệu sản phẩm
  const { data, isLoading, isError, error } = useProduct(id as string)
  console.log('🚀 ~ ProductEditPage ~ data:', data)
  const category_id = data?.category_id?._id
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
  console.log('🚀 ~ ProductEditPage ~ categories:', categories)

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

  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
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
            category_id
          }}
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
                    required: true,
                    message: 'Tên sản phẩm là bắt buộc'
                  },
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
                      if (
                        !/^[a-zA-ZÀÁÂÃẢẠẮẶẲẨẦẬẪẤÈÉẺẸÊỀỆẾỂỄÌÍÒÓÔÕỎỒỐỔỘÕỜƠỢỚỠỞÙỤŨÚƯỪỬỨỮỰĂĐĨŨƠàáảạâãắằặẳẩầậấèéêềếểệễìíòóôõỏờơởớpỡợồôổốỗộùụũúăđĩưủừứựữửơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ]/.test(
                          value
                        )
                      ) {
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
                label='Mô tả'
                name='description'
                rules={[
                  { required: true, message: 'Mô tả là bắt buộc!' },
                  {
                    min: 6,
                    message: 'Mô tả sản phẩm phải có tối thiểu 6 ký tự!'
                  }
                ]}
              >
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
                rules={[
                  { required: true, message: 'Mã sản phẩm là bắt buộc!' },
                  {
                    min: 6,
                    message: 'Mã sản phẩm phải có tối thiểu 6 ký tự!'
                  }
                ]}
              >
                <Input placeholder='Mã sản phẩm' className='w-full' />
              </Form.Item>
              <div>
                <Form.Item label='Trạng thái hiển thị' name='is_hidden' valuePropName='checked'>
                  <Checkbox>Ẩn</Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
        </Form>
      </div>
    </>
  )
}

export default ProductEditPage
