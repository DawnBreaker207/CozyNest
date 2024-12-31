/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ColorAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams()

  // Form submission handler
  const onFinish = async (values: any) => {
    // Kiểm tra nếu các trường không giống nhau
    if (values.optionName !== values.optionValue || values.optionName !== values.optionValueLabel) {
      messageApi.error('Các trường Options Name, Label và Value phải giống nhau')
      return // Không tiếp tục xử lý nếu không thỏa mãn điều kiện
    }
    try {
      // Bước 1: Tạo Options
      const optionsResponse = await instance.post(`/options/${id}`, {
        name: values.optionName,
        label: values.optionLabel,
        position: Number(values.optionPosition)
      })
      const optionId = optionsResponse.data.res._id

      // Bước 2: Tạo Options Value
      const optionValueResponse = await instance.post(`/optionalValue/${id}/${optionId}`, {
        label: values.optionValueLabel,
        value: values.optionValue
      })
      const optionValueId = optionValueResponse.data.id

      // Bước 3: Tạo Variants
      await instance.post(`/variants/${id}`, {
        optionId: optionId,
        optionValueId: optionValueId,
        price: Number(values.variantPrice),
        stock: Number(values.variantStock)
      })

      messageApi.success('Thêm màu sắc thành công')
      setTimeout(() => {
        navigate(`/admin/colors`)
      }, 900)
    } catch (error: any) {
      messageApi.error(error?.response?.data?.message || 'Đã có lỗi xảy ra')
    }
  }

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Color</span> <CaretRightOutlined /> <span>Add Color</span>
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
                Add Color
              </Button>
            </div>
          </div>

          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Options</h1>
              <Form.Item
                label='Options Name'
                name='optionName'
                rules={[{ required: true, message: 'Name là bắt buộc' }]}
              >
                <Input placeholder='Type options name here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item
                label='Options Label'
                name='optionLabel'
                rules={[{ required: true, message: 'Label là bắt buộc' }]}
              >
                <Input placeholder='Type options label here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item
                label='Position'
                name='optionPosition'
                rules={[
                  { required: true, message: 'Position là bắt buộc' },
                  { pattern: /^[0-9]*$/, message: 'Position phải là một số không âm' }
                ]}
              >
                <Input placeholder='Type position here...' className='w-full bg-[#F9F9FC]' type='number' min='0' />
              </Form.Item>

              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Options Value</h1>
              <Form.Item
                label='Label'
                name='optionValueLabel'
                rules={[{ required: true, message: 'Label là bắt buộc' }]}
              >
                <Input placeholder='Type label here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item label='Value' name='optionValue' rules={[{ required: true, message: 'Value là bắt buộc' }]}>
                <Input placeholder='Type value here...' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
            </div>

            <div className='w-[20%]'>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Variants</h1>
              <Form.Item
                label='Variants Price'
                name='variantPrice'
                rules={[
                  { required: true, message: 'Price là bắt buộc' },
                  { pattern: /^[0-9]*$/, message: 'Price phải là một số không âm' }
                ]}
              >
                <Input placeholder='Type price here...' className='w-full bg-[#F9F9FC]' type='number' min='0' />
              </Form.Item>

              <Form.Item
                label='Stock'
                name='variantStock'
                rules={[
                  { required: true, message: 'Stock là bắt buộc' },
                  { pattern: /^[0-9]*$/, message: 'Stock phải là một số không âm' }
                ]}
              >
                <Input placeholder='Type stock here...' className='w-full bg-[#F9F9FC]' type='number' min='0' />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ColorAddPage
