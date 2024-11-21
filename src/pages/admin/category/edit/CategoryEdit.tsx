import useCategoryMutation from '@/hooks/useCategoryMutations'
import { useCategory } from '@/hooks/useCategoryQuery' // Sử dụng hook bạn đã cung cấp
import { ICategory } from '@/types/category'
import { CaretRightOutlined, CheckSquareOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams() // Lấy ID của danh mục từ URL

  const { data, isLoading, isError, error } = useCategory(id) // Lấy danh mục theo ID
  const { mutate } = useCategoryMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật thành công')
      setTimeout(() => {
        navigate(`/admin/categories`)
      }, 600)
    }
  })

  const onFinish = (values: ICategory) => {
    if (!id) {
      messageApi.error('ID danh mục không hợp lệ')
      return
    }

    // Đảm bảo rằng _id từ dữ liệu ban đầu (data) được giữ lại trong category khi gửi đi
    const updatedCategory = {
      // Dữ liệu danh mục hiện tại
      ...data,
      // Giá trị form mới
      ...values,
      // Đảm bảo rằng _id không bị mất
      _id: data?._id
    }

    // Gửi dữ liệu danh mục đã được cập nhật
    mutate(updatedCategory)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish} initialValues={{ ...data }}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Category</span> <CaretRightOutlined /> <span>Edit Category</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/categories`}>Cancel</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<CheckSquareOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Edit Category
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

export default EditCategoryPage
