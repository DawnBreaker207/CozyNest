import { Form, Input, Button, Typography } from 'antd'
import { useState, useEffect } from 'react'

const { Title, Text } = Typography

const ContactPage = () => {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000)
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const onFinish = (values: string) => {
    console.log('Received values:', values)
  }

  return (
    <div style={{ backgroundColor: '#f3f4f6', padding: '24px', minHeight: '100vh' }}>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: screenWidth <= 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div
          style={{
            flex: screenWidth <= 768 ? 1 : 2,
            paddingRight: screenWidth > 768 ? '24px' : 0,
            marginBottom: screenWidth <= 768 ? '16px' : 0
          }}
        >
          <Title level={3} style={{ color: '#333', marginBottom: '16px' }}>
            Liên hệ
          </Title>
          <Text strong>Hà Nội:</Text> số 03 Lê Trọng Tấn, Khương Mai, Thanh Xuân, Hà Nội
          <br />
          <Text strong>Hotline:</Text>
          <br />
          <Text strong>HN:</Text>
          <br />
          <Text strong>Email:</Text>
          <Form onFinish={onFinish} layout='vertical' style={{ marginTop: '24px' }}>
            <Form.Item name='name' label='Tên ' rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}>
              <Input placeholder='Tên của bạn' />
            </Form.Item>
            <Form.Item
              name='email'
              label='Địa chỉ email '
              rules={[{ required: true, type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!' }]}
            >
              <Input placeholder='Địa chỉ email của bạn' />
            </Form.Item>
            <Form.Item
              name='message'
              label='Nội dung '
              rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
            >
              <Input.TextArea placeholder='Nội dung tin nhắn' rows={4} />
            </Form.Item>
            <Text type='secondary' style={{ display: 'block', marginBottom: '16px' }}>
              * Thông tin bắt buộc
            </Text>
            <Button
              type='primary'
              htmlType='submit'
              style={{
                backgroundColor: '#ff7f50',
                borderColor: '#ff7f50',
                width: '100%',
                padding: '10px 16px',
                fontSize: '16px'
              }}
            >
              Gửi
            </Button>
          </Form>
        </div>
        <div
          style={{
            flex: screenWidth <= 768 ? 1 : 1,
            height: '450px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14898.355252066514!2d105.79072489324733!3d21.009113521545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adb1e9b63c6b%3A0xc7ad968c046d18fa!2sVincom%20Center%20Tr%E1%BA%A7n%20Duy%20H%C6%B0ng!5e0!3m2!1svi!2s!4v1726492628498!5m2!1svi!2s'
            style={{ border: 0, width: '100%', height: '100%' }}
            allowFullScreen
            loading='lazy'
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
