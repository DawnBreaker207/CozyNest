/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const ColorEditPage = () => {
  const location = useLocation()
  const { variantId = '' } = location.state || {} // Lấy variantId từ state
  const { id } = useParams()

  const [form] = Form.useForm() // Tạo instance của Form
  const Api = async () => {
    try {
      const { data } = await instance.get(`/variants/${id}/${variantId}`)
      // console.log(data) // Kiểm tra dữ liệu

      if (data.res) {
        const variantData = data.res

        // Kiểm tra xem có options không và lấy dữ liệu từ option đầu tiên
        const option = variantData.options[0] || {} // Lấy option đầu tiên
        const optionValue = option.option_value || {} // Lấy option_value từ option

        // Gán giá trị vào form
        form.setFieldsValue({
          optionName: option.name || '', // Tên tùy chọn
          optionLabel: option.label || '', // Nhãn tùy chọn
          optionPosition: variantData.position || '', // Vị trí
          optionValueLabel: optionValue.label || '', // Nhãn giá trị tùy chọn
          optionValue: optionValue.value || '', // Giá trị tùy chọn
          variantPrice: variantData.price || 0, // Giá variant
          variantStock: variantData.stock || 0 // Số lượng tồn kho
        })
      }
    } catch (error) {
      console.error('Failed to fetch variant data:', error)
    }
  }

  useEffect(() => {
    Api()
  }, [variantId]) // Gọi lại API khi variantId thay đổi

  // Form submission handler
  const onFinish = async (values: any) => {
    console.log('Data to be sent:', values)
    // Xử lý dữ liệu gửi đi
  }

  return (
    <>
      <div className='bg-white rounded-lg'>
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Color</span> <CaretRightOutlined /> <span>Edit Color</span>
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
                Edit Color
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

export default ColorEditPage
