/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Input, Select, Form, RadioChangeEvent, Radio } from 'antd'
import { BankOutlined, CreditCardOutlined } from '@ant-design/icons'
import { useState } from 'react'
import useCart from '@/hooks/useCart'
import { Link } from 'react-router-dom'

const { Option } = Select
const options = [
  {
    label: (
      <>
        <BankOutlined /> Chuyển khoản ngân hàng
      </>
    ),
    value: 'Orange',
    title: 'Orange'
  }
]
const option = [
  {
    label: (
      <div>
        <CreditCardOutlined /> Thanh toán khi nhận hàng
      </div>
    ),
    value: 'Apple'
  }
]
const CheckoutPage = () => {
  const [value3, setValue3] = useState('Apple')
  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value)
    setValue3(value)
  }
  const { data, calculateTotal } = useCart() // Sử dụng hook
  return (
    <div className='flex flex-col md:flex-row p-6 bg-background mt-20'>
      {/* Form nhập địa chỉ giao hàng */}
      <div className='w-full md:w-2/3 pr-0 md:pr-6 px-4'>
        <h2 className='text-lg font-semibold mb-4'>Địa chỉ giao hàng</h2>
        <Form layout='vertical'>
          <Form.Item label='Họ và tên' name='name' rules={[{ required: true }]}>
            <Input placeholder='Nhập họ và tên' />
          </Form.Item>
          <Form.Item label='Số điện thoại' name='phone' rules={[{ required: true }]}>
            <Input placeholder='Nhập số điện thoại của bạn' />
          </Form.Item>
          <Form.Item label='Địa chỉ email' name='email' rules={[{ required: true }]}>
            <Input type='email' placeholder='Nhập email' />
          </Form.Item>
          <div className='flex flex-col md:flex-row'>
            <Form.Item
              className='w-full md:w-1/2 md:pr-2'
              label='Tỉnh / Thành phố'
              name='city'
              rules={[{ required: true }]}
            >
              <Select placeholder='Chọn tỉnh / thành phố'>
                <Option value='hanoi'>Hà Nội</Option>
                <Option value='hcm'>TP. Hồ Chí Minh</Option>
                {/* Add more options */}
              </Select>
            </Form.Item>
            <Form.Item
              className='w-full md:w-1/2 md:pl-2'
              label='Quận / Huyện'
              name='district'
              rules={[{ required: true }]}
            >
              <Select placeholder='Chọn quận / huyện'>
                <Option value='district1'>Quận 1</Option>
                <Option value='district2'>Quận 2</Option>
                {/* Add more options */}
              </Select>
            </Form.Item>
          </div>
          <Form.Item label='Địa chỉ' name='address' rules={[{ required: true }]}>
            <Input placeholder='Nhập địa chỉ' />
          </Form.Item>
          <Form.Item name='createAccount' valuePropName='checked'>
            <Checkbox>Create an account?</Checkbox>
          </Form.Item>
          <Form.Item label='Thông tin thêm' name='note'>
            <Input.TextArea placeholder='Viết các lưu ý cho đơn hàng của bạn' rows={3} />
          </Form.Item>
          <h2 className='text-lg font-semibold mb-4 '>Phương thức thanh toán</h2>
          <Radio.Group
            options={option}
            onChange={onChange3}
            value={value3}
            optionType='button'
            buttonStyle='solid'
            className='mb-2 mr-2'
          />
          <Radio.Group options={options} onChange={onChange3} value={value3} optionType='button' buttonStyle='solid' />
        </Form>
      </div>

      {/* Tóm tắt đơn hàng */}
      <div className='w-full md:w-1/3 bg-card p-4 rounded-lg mt-6 md:mt-0 border border-slate-500'>
        <h2 className='text-lg font-semibold mb-4'>Tóm tắt đơn hàng</h2>
        <div className='mb-2'>
          <span className='font-medium'>Thành tiền:</span>
          <span className='float-right'>{calculateTotal().toLocaleString()}₫</span>
        </div>
        <div className='mb-2'>
          <span className='font-medium'>Vận chuyển:</span>
          <span className='float-right'>Liên hệ phí vận chuyển sau</span>
        </div>
        <div className='mb-2'>
          <span className='font-medium'>Tổng cộng:</span>
          <span className='float-right'>{calculateTotal().toLocaleString()}₫</span>
        </div>
        <div className='mb-4'>
          <span className='font-medium'>Sản phẩm:</span>
        </div>
        <hr className='mb-4' />
        {data?.res?.products?.map((product: any) => (
          <div key={product.productId._id} className='mb-4 flex justify-between lg:gap-4'>
            <span className='flex items-center'>
              <img
                src={product.productId.thumbnail}
                className='xl:w-20 lg:w-20 w-12 sm:w-[100%]'
                alt={product.productId.name}
              />
            </span>
            <span className='font-medium'>{product.productId.name}</span>
            <span className='float-right'>× {product.quantity}</span>
            <span className='float-right'>{(product.price * product.quantity).toLocaleString()}₫</span>
          </div>
        ))}
        <hr className='mb-4' />
        <h2 className='text-lg font-semibold mb-4'>Chính sách bán hàng</h2>
        <p className='text-sm mb-2'>
          CozyNest chỉ áp dụng duy nhất một hình thức thanh toán online qua thẻ tín dụng, chuyển khoản, cụ thể:
        </p>
        <ol className='list-decimal pl-5 mb-4'>
          <li>Khách hàng tìm hiểu thông tin về sản phẩm.</li>
        </ol>
        <Form>
          <Form.Item name='terms' valuePropName='checked'>
            <Checkbox>
              Tôi đã đọc và đồng ý điều kiện đổi trả hàng, giao hàng, chính sách bảo mật, điều khoản dịch vụ mua hàng
              online *
            </Checkbox>
          </Form.Item>
        </Form>
        <Link to={`/check_out_order`}>
          <Button block className='bg-yellow-600 text-white mb-4'>
            <span className='hover:text-white'>ĐẶT MUA</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CheckoutPage
