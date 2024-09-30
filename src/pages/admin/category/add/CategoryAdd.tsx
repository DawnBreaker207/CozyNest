import { Form, Input, Button, Upload, Checkbox } from 'antd'
import { CaretRightOutlined, CloseOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

type FieldType = {
  name?: string
  thumbnail?: string
  isHidden?: boolean
}

const AddCategoryPage = () => {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values)
  }

  return (
    <>
      <div className='bg-white rounded-lg '>
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
              <Form.Item<FieldType> label='Category Name' name='name'>
                <Input placeholder='Type category name here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-2'>Media</h1>
              <Form.Item<FieldType> label='Thumbnail' name='thumbnail'>
                <Upload.Dragger name='files' action='/upload.do'>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='text-[#858D9D] '>Drag and drop image here, or click to upload</p>
                  <Button className='bg-[#3A5BFF26] text-[#3A5BFF] mt-4 font-semibold'>Add Image</Button>
                </Upload.Dragger>
              </Form.Item>
            </div>
            <div className='w-[20%]'>
              <div>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Status</h1>
                <Form.Item<FieldType> name='isHidden' valuePropName='checked'>
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
