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
    const addressShipping = `${values.address}, ${getWardName(values.village)}, ${getDistrictName(values.district)}, ${getProvinceName(values.city)}`
    onNext({
      addressShipping,
      customerName: values.customerName,
      phoneNumber: values.phoneNumber,
      email: values.email
    })
    console.log(values) // Log dữ liệu để kiểm tra
    // navigate('/checkout/payment'); // Nếu bạn muốn tự động điều hướng
  }

  return (
    <div className=''>
      <span className='text-sm font-light text-[#252A2B]'>
        <p className='text-sm'>
          <Link to={`/cart`}>Giỏ hàng</Link> <RightOutlined />{' '}
          <Link to={`/cart/check_out_form`}>Thông tin giao hàng</Link>
        </p>
      </span>
      <h2 className='text-lg font-semibold mb-4'>Địa chỉ giao hàng</h2>
      <Form className='' layout='vertical' onFinish={onFinish}>
        <Form.Item label='Họ và tên' name='customerName' rules={[{ required: true }]}>
          <Input className='h-10' placeholder='Nhập họ và tên' />
        </Form.Item>
        <Form.Item label='Số điện thoại' name='phoneNumber' rules={[{ required: true }]}>
          <Input className='h-10' placeholder='Nhập số điện thoại của bạn' />
        </Form.Item>
        <Form.Item label='Địa chỉ email' name='email' rules={[{ required: true }]}>
          <Input className='h-10' type='email' placeholder='Nhập email' />
        </Form.Item>
        <div className='flex flex-col lg:space-x-10 md:flex-row '>
          <Form.Item label='Tỉnh/Thành phố' name='city' className='lg:w-60'>
            <Select className='h-10' placeholder='Chọn tỉnh/thành phố' onChange={handleProvinceChange} allowClear>
              {provinces.map((province) => (
                <Select.Option key={province.ProvinceID} value={province.ProvinceID}>
                  {province.ProvinceName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Quận/Huyện' name='district'>
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
          <Form.Item label='Phường/Xã' name='village'>
            <Select className='h-10' placeholder='Chọn phường/xã' disabled={!selectedDistrict} allowClear>
              {wards.map((ward) => (
                <Select.Option key={ward.WardCode} value={ward.WardCode}>
                  {ward.WardName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item label='Địa chỉ' name='address' rules={[{ required: true }]}>
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
