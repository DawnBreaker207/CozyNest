import React, { useState } from 'react'
import { Layout, Menu, Card, Row, Col, Typography, Modal } from 'antd'
import { Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const { Title, Paragraph, Text } = Typography

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')

  const showModal = (image: string) => {
    setModalImage(image)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Row gutter={[16, 16]}>
        {/* Sidebar */}
        <Col xs={24} sm={8} md={6}>
          <Sider width='100%' theme='light' style={{ padding: 24, backgroundColor: '#fff' }}>
            <div className='mb-4'>
              <Title level={4} style={{ color: '#fa8c16', fontSize: '20px' }}>
                Danh mục tin
              </Title>
              <div className='border-t-2 border-orange-500 mb-2' />
              <Menu mode='inline' style={{ border: 'none' }} theme='light'>
                <Menu.Item key='1'>
                  <Link to='/tin-moi-nhat'>Tin mới nhất (8)</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                  <Link to='/kien-thuc-nha-dep'>Kiến thức nhà đẹp</Link>
                </Menu.Item>
                <Menu.Item key='3'>
                  <Link to='/kien-truc-phong-thuy'>Kiến trúc phong thủy</Link>
                </Menu.Item>
                <Menu.Item key='4'>
                  <Link to='/video-du-an'>Video dự án</Link>
                </Menu.Item>
              </Menu>
            </div>
            <div>
              <Title level={4} style={{ color: '#fa8c16', fontSize: '20px' }}>
                Gợi Ý Sản Phẩm
              </Title>
              <div className='border-t-2 border-orange-500 mb-2' />
              {[...Array(3)].map((_, index) => (
                <Card
                  key={index}
                  hoverable
                  cover={
                    <img
                      alt='Sofa set'
                      src='https://file.hstatic.net/200000804441/article/ban-an-peak-hien-dai-van-may-ceramic-22__1__3f8b8a96c4d74f339260960ee46c3f7c_grande.jpg'
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Paragraph className='mb-0'>
                    <strong>Bàn trà sofa Missouri (Mặt Ceramic)</strong>
                  </Paragraph>
                  <Paragraph className='text-red-500 font-bold mb-0'>
                    <strong>7,460,000₫</strong>
                    <span className='line-through text-gray-500'> 10,600,000₫</span>
                  </Paragraph>
                </Card>
              ))}
            </div>
          </Sider>
        </Col>

        {/* Main Content */}
        <Col xs={24} sm={16} md={18}>
          <Layout>
            <Header style={{ backgroundColor: '#fff', padding: 16 }}>
              <Title level={4} style={{ color: '#fa8c16', fontSize: '20px' }}>
                Tin Tức
              </Title>
            </Header>
            <Content style={{ padding: 20 }}>
              <Row gutter={[16, 16]}>
                {[...Array(6)].map((_, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <Card
                      hoverable
                      cover={
                        <img
                          alt={`Tin tức ${index + 1}`}
                          src={`https://file.hstatic.net/200000804441/article/${index % 2 === 0 ? 'bridge-4_8eb55e22c2644c21b934610b2ee2f262_grande.jpg' : 'nha-xinh-phong-khach-hien-dai-poppy-311021_2d548868a5894762a931c513fdec27ec_grande.jpg'}`}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                          onClick={() =>
                            showModal(
                              `https://file.hstatic.net/200000804441/article/${index % 2 === 0 ? 'bridge-4_8eb55e22c2644c21b934610b2ee2f262_grande.jpg' : 'nha-xinh-phong-khach-hien-dai-poppy-311021_2d548868a5894762a931c513fdec27ec_grande.jpg'}`
                            )
                          }
                        />
                      }
                    >
                      <Text type='secondary' style={{ fontSize: '16px' }}>
                        31/10/2023
                      </Text>
                      <Title level={4} style={{ color: '#000', fontSize: '20px' }}>
                        {index % 2 === 0
                          ? 'Tạo lập phòng ăn chất lượng với 5 cách đơn giản'
                          : 'Mang làn gió Lagom đến không gian sống của bạn'}
                      </Title>
                      <Paragraph style={{ fontSize: '16px', color: '#000' }}>
                        Phòng ăn là không gian kết nối và thư giãn của mỗi gia đình...
                      </Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} centered>
                <img src={modalImage} alt='Phóng to' style={{ width: '100%' }} />
              </Modal>
            </Content>
          </Layout>
        </Col>
      </Row>
    </Layout>
  )
}

export default App
