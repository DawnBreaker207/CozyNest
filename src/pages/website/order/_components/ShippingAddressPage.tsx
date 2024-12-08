/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDistricts, getProvinces, getWards } from '@/services/locationService'
import { RightOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Định nghĩa kiểu dữ liệu cho Province, District, và Ward
interface Province {
  ProvinceID: string
  ProvinceName: string
}

interface District {
  DistrictID: string
  DistrictName: string
}

interface Ward {
  WardCode: string
  WardName: string
}

interface ShippingAddressPageProps {
  onNext: (values: any) => void
}

const ShippingAddressPage: React.FC<ShippingAddressPageProps> = ({ onNext }) => {
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [wards, setWards] = useState<Ward[]>([])
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)

  useEffect(() => {
    getProvinces().then(setProvinces)
  }, [])

  const handleProvinceChange = async (value: any) => {
    setSelectedProvince(value)
    setSelectedDistrict(null)
    setWards([])
    const data = await getDistricts(value)
    setDistricts(data)
  }

  const getProvinceName = (provinceId: string) => {
    return provinces.find((province) => province.ProvinceID === provinceId)?.ProvinceName || ''
  }

  const getDistrictName = (districtId: string) => {
    return districts.find((district) => district.DistrictID === districtId)?.DistrictName || ''
  }

  const getWardName = (wardCode: string) => {
    return wards.find((ward) => ward.WardCode === wardCode)?.WardName || ''
  }

  const handleDistrictChange = async (value: any) => {
    setSelectedDistrict(value)
    const data = await getWards(value)
    setWards(data)
  }

  const onFinish = (values: any) => {
    console.log(values)

    const address = `${values.address}, ${getWardName(values.village)}, ${getDistrictName(values.district)}, ${getProvinceName(values.city)}`
    onNext({
      address,
      shipping_address: address,
      customer_name: values.customer_name,
      phone_number: values.phone_number,
      email: values.email
    })
    console.log(values) // Log dữ liệu để kiểm tra
    // navigate('/checkout/payment'); // Nếu bạn muốn tự động điều hướng
  }

  return (
    <div className=''>
      <span className='text-sm font-light text-[#252A2B]'>
        <p className='text-sm'>
          <Link to={`/cart`}>Giỏ hàng</Link> <RightOutlined /> <Link to={`/check_out`}>Thông tin giao hàng</Link>
        </p>
      </span>
      <h2 className='text-lg font-semibold mb-4'>Địa chỉ giao hàng</h2>
      <Form className='' layout='vertical' onFinish={onFinish}>
        <Form.Item
          name='fullName'
          rules={[
            { required: true, message: 'Vui lòng nhập họ và tên' },
            {
              pattern: /^[a-zA-ZÀ-ỹ\s]+$/u,
              message: 'Vui lòng nhập đúng định dạng họ và tên'
            }
          ]}
        >
          <Input placeholder='Nhập họ và tên' />
        </Form.Item>
        <Form.Item
          label='Số điện thoại'
          name='phone_number'
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Số điện thoại không hợp lệ'
            }
          ]}
        >
          <Input className='h-10' placeholder='Nhập số điện thoại của bạn' />
        </Form.Item>
        <Form.Item
          label='Địa chỉ email'
          name='email'
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không đúng định dạng' }
          ]}
        >
          <Input className='h-10' type='email' placeholder='Nhập email' />
        </Form.Item>
        <div className='flex flex-col lg:space-x-10 md:flex-row '>
          <Form.Item
            label='Tỉnh/Thành phố'
            name='city'
            className='lg:w-60'
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành phố' }]}
          >
            <Select className='h-10' placeholder='Chọn tỉnh/thành phố' onChange={handleProvinceChange} allowClear>
              {provinces.map((province) => (
                <Select.Option key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label='Quận/Huyện'
            name='district'
            rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]}
          >
            <Select
              className='h-10'
              placeholder='Chọn quận/huyện'
              onChange={handleDistrictChange}
              disabled={!selectedProvince}
              allowClear
            >
              {districts.map((district) => (
                <Select.Option key={district.DistrictID} value={district.DistrictID}>
                  {district.DistrictName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Phường/Xã' name='village' rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã' }]}>
            <Select className='h-10' placeholder='Chọn phường/xã' disabled={!selectedDistrict} allowClear>
              {wards.map((ward) => (
                <Select.Option key={ward.WardCode} value={ward.WardCode}>
                  {ward.WardName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập điểm giao hàng' }]}>
          <Input className='h-10' placeholder='Nhập địa chỉ cụ thể (Số nhà, Tòa nhà ...)' />
        </Form.Item>
        <Form.Item label='Thông tin thêm' name='note'>
          <Input.TextArea placeholder='Viết các lưu ý cho đơn hàng của bạn' rows={3} />
        </Form.Item>
        <Button type='primary' htmlType='submit' block>
          Tiếp tục đến trang thanh toán
        </Button>
      </Form>
    </div>
  )
}

export default ShippingAddressPage
