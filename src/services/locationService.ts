import instance from '@/configs/axios'
const TOKEN_SHIPMENT = '0c2c6b3c-8797-11ef-8e53-0a00184fe694'
// Lấy danh sách tỉnh
export const getProvinces = async () => {
  const response = await instance.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
    headers: { Token: TOKEN_SHIPMENT }
  })
  return response.data.data
}

// Lấy danh sách quận theo ID tỉnh
export const getDistricts = async (provinceId: number) => {
  const response = await instance.post(
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
    { province_id: provinceId },
    { headers: { Token: TOKEN_SHIPMENT } }
  )
  return response.data.data
}

// Lấy danh sách phường theo ID quận
export const getWards = async (districtId: number) => {
  const response = await instance.post(
    'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',
    { district_id: districtId },
    { headers: { Token: TOKEN_SHIPMENT } }
  )
  return response.data.data
}
