import { Form, Input, Button, Checkbox, message } from 'antd'
import { CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ICategory } from '@/types/category'
import useCategoryMutation from '@/hooks/useCategoryMutations'

const AddCategoryPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { mutate } = useCategoryMutation({
    action: 'CREATE',
    onSuccess: () => {
      messageApi.success('Thêm thành công')
      setTimeout(() => {
        navigate(`/admin/categories`)
      }, 600)
    }
  })

  const onFinish = (values: ICategory) => {
    mutate(values)
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
