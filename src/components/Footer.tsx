import { Layout, Row, Col, Input, Button } from 'antd'
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GooglePlusOutlined,
  YoutubeOutlined,
  FacebookFilled,
  PlusOutlined
} from '@ant-design/icons'
import { useState } from 'react'

const CustomFooter = () => {
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? undefined : section)
  }
  return (
    <footer className='bg-black text-white py-2'>
      <div className='bg-black py-1 container'>
        <div className='mx-auto flex flex-col md:flex-row justify-between    items-center space-y-2 md:space-y-0'>
          {/* Đăng ký nhận tin */}
          <div className='flex flex-col md:flex-row items-center space-x-0 md:space-x-4 p-2  space-y-2 md:space-y-0'>
            <span className='text-lg font-semibold text-white'>Đăng ký nhận tin</span>
            <div className='flex items-center bg-card p-2 rounded-lg shadow-md'>
              <Input
                className='w-full md:w-auto py-2 m-0.5 '
                size='large'
                placeholder='Nhập email của bạn'
                prefix={<MailOutlined />}
              />
              <Button
                type='primary'
                className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold  px-6 py-5 w-sm  md:w-auto'
              >
                Đăng ký
              </Button>
            </div>
          </div>

          {/* Kết nối với chúng tôi (chỉ hiển thị trên màn hình từ md trở lên) */}
          <div className='hidden md:flex flex-col md:flex-row items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0'>
            <span className='text-white text-lg'>Kết nối với chúng tôi</span>
            <div className='flex space-x-3'>
              <a
                href='#'
                className='text-white text-2xl border border-white p-2 rounded-full flex items-center justify-center'
              >
                <FacebookFilled />
              </a>
              <a
                href='#'
                className='text-white text-2xl border border-white p-2 rounded-full flex items-center justify-center'
              >
                <TwitterOutlined />
              </a>
              <a
                href='#'
                className='text-white text-2xl border border-white p-2 rounded-full flex items-center justify-center'
              >
                <InstagramOutlined />
              </a>
              <a
                href='#'
                className='text-white text-2xl border border-white p-2 rounded-full flex items-center justify-center'
              >
                <GooglePlusOutlined />
              </a>
              <a
                href='#'
                className='text-white text-2xl border border-white p-2 rounded-full flex items-center justify-center'
              >
                <YoutubeOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className='my-4 border-t border-gray-600 ' />
      <div className='container mx-auto '>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={6}>
            <div className='md:hidden'>
              <h4 className='text-lg font-semibold  cursor-pointer' onClick={() => toggleSection('about')}>
                Về Home Haven <PlusOutlined className='float-right mt-2.5 text-xs' />
              </h4>

              {activeSection === 'about' && (
                <div>
                  <p className='text-sm'>
                    Với các giải pháp công nghệ tốt nhất, Haravan là tất cả những gì bạn cần để xây dựng thương hiệu
                    online, thành công trong bán lẻ và marketing đột phá.
                  </p>
                  <p className='mt-4 text-sm'>
                    <EnvironmentOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                    Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.
                  </p>
                  <p className='mt-2 text-sm'>
                    <PhoneOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                    1900.000.XXX
                  </p>
                  <p className='text-sm'>
                    <MailOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                    hi@home-haven.abc
                  </p>
                </div>
              )}
              <br />
              <hr className=' border-t border-gray-600' />
            </div>

            {/* Nội dung hiển thị trên màn hình lớn */}
            <div className='hidden md:block'>
              <h4 className='text-lg font-semibold mb-4'>Về Home Haven</h4>
              <p className='text-sm'>
                Với các giải pháp công nghệ tốt nhất, Haravan là tất cả những gì bạn cần để xây dựng thương hiệu online,
                thành công trong bán lẻ và marketing đột phá.
              </p>
              <p className='mt-4 text-sm'>
                <EnvironmentOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.
              </p>
              <p className='mt-2 text-sm'>
                <PhoneOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                1900.000.XXX
              </p>
              <p className='text-sm'>
                <MailOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                hi@home-haven.abc
              </p>
            </div>
          </Col>

          <Col xs={24} md={6}>
            <div className='md:hidden -mt-3'>
              <h4 className='text-lg font-semibold  cursor-pointer' onClick={() => toggleSection('support')}>
                Hỗ trợ khách hàng <PlusOutlined className='float-right mt-2.5 text-xs' />
              </h4>
              {activeSection === 'support' && (
                <>
                  <ul className='space-y-2' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    <li>Sản phẩm khuyến mãi</li>
                    <li>Sản phẩm nổi bật</li>
                    <li>Tất cả sản phẩm</li>
                  </ul>
                  <>
                    <h4 className='text-lg font-semibold mt-6'>Phương thức vận chuyển</h4>
                    <div className='flex space-x-4 mt-4 '>
                      <img
                        src='https://theme.hstatic.net/200000748041/1001116292/14/shipment_1_img.png?v=31'
                        alt='GHN Express'
                        className='h-8'
                      />
                      <img
                        src='https://theme.hstatic.net/200000748041/1001116292/14/shipment_3_img.png?v=31'
                        alt='Ahamove'
                        className='h-8'
                      />
                      <img
                        src='https://theme.hstatic.net/200000748041/1001116292/14/shipment_4_img.png?v=31'
                        alt='J&T Express'
                        className='h-8'
                      />
                    </div>
                  </>
                </>
              )}
              <hr className='my-4 border-t border-gray-600 ' />
            </div>

            <div className='hidden md:block'>
              <h4 className='text-lg font-semibold mb-4'>Hỗ trợ khách hàng</h4>
              <ul className='space-y-2' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Sản phẩm khuyến mãi</li>
                <li>Sản phẩm nổi bật</li>
                <li>Tất cả sản phẩm</li>
              </ul>
              {/* Phương thức  vận chuyển */}
              <h4 className='text-lg font-semibold mt-6'>Phương thức vận chuyển</h4>
              <div className='flex space-x-6 mt-4 w-[23%] '>
                <img
                  src='https://theme.hstatic.net/200000748041/1001116292/14/shipment_1_img.png?v=31'
                  alt='GHN Express'
                  className='h-8'
                />
                <img
                  src='https://theme.hstatic.net/200000748041/1001116292/14/shipment_3_img.png?v=31'
                  alt='Ahamove'
                  className='h-8'
                />
                <img
                  src='https://theme.hstatic.net/200000748041/1001116292/14/shipment_4_img.png?v=31'
                  alt='J&T Express'
                  className='h-8 '
                />
              </div>
            </div>
          </Col>

          <Col xs={24} md={6}>
            <div className='md:hidden -mt-9'>
              <h4 className='text-lg font-semibold py-2  cursor-pointer' onClick={() => toggleSection('lienket')}>
                Liên Kết <PlusOutlined className='float-right mt-2.5 text-xs' />
              </h4>
              {activeSection === 'lienket' && (
                <ul className='space-y-2' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li> Trang chủ</li>
                  <li> Sản phẩm</li>
                  <li>Trang sản phẩm</li>
                  <li>Giới thiệu</li>
                  <li>Cẩm nang trang trí</li>
                  <li>Hệ thống cửa hàng</li>
                  <li>FAQs</li>
                  <li>Landing page</li>
                </ul>
              )}
              <hr className='my-2 border-t border-gray-600 ' />
            </div>

            {/* Nội dung hiển thị trên màn hình lớn */}
            <div className='hidden md:block'>
              <h4 className='text-lg font-semibold mb-4'>Liên Kết </h4>
              <ul className='space-y-2' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li> Trang chủ</li>
                <li> Sản phẩm</li>
                <li>Trang sản phẩm</li>
                <li>Giới thiệu</li>
                <li>Cẩm nang trang trí</li>
                <li>Hệ thống cửa hàng</li>
                <li>FAQs</li>
                <li>Landing page</li>
              </ul>
            </div>
          </Col>

          <Col xs={24} md={6}>
            <div className='md:hidden -mt-5'>
              <h4 className='text-lg font-semibold  cursor-pointer' onClick={() => toggleSection('chinhsach')}>
                Chính sách <PlusOutlined className='float-right mt-2.5 text-xs' />
              </h4>
              {activeSection === 'chinhsach' && (
                <ul className='space-y-2' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  <li>Tìm kiếm</li>
                  <li>Giới thiệu</li>
                  <li>Chính sách đổi trả</li>
                  <li>Chính sách bảo mật</li>
                  <li>Điều khoản dịch vụ</li>
                  <li>Liên hệ</li>
                </ul>
              )}
            </div>

            {/* Nội dung hiển thị trên màn hình lớn */}
            <div className='hidden md:block'>
              <h4 className='text-lg font-semibold mb-4'>Chính sách </h4>
              <ul className='space-y-2' style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Tìm kiếm</li>
                <li>Giới thiệu</li>
                <li>Chính sách đổi trả</li>
                <li>Chính sách bảo mật</li>
                <li>Điều khoản dịch vụ</li>
                <li>Liên hệ</li>
              </ul>
            </div>
          </Col>
        </Row>

        <hr className='my-4 border-t border-gray-600' />

        <Row justify='center' className='mt-7'>
          <Col>
            <p className='text-xs text-center mb-4'>2024 Created by CozyNest</p>
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default CustomFooter
