import { useEffect, useState } from 'react'
import { Layout, Menu, Card, Row, Col, Typography, Modal, Pagination, Button } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IProduct } from '@/types/product'
import { getAllProducts } from '@/services/product'
const { Header, Content, Sider } = Layout
const { Title, Paragraph, Text } = Typography

interface IArticle {
  _id: string
  title: string
  thumbnail: string
  content: []
  author: string
  createdAt: string
  isHidden: boolean
}

const NewsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [articles, setArticles] = useState<IArticle[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [currentPage, setCurrentPage] = useState(1) // Trang hiện tại
  const articlesPerPage = 6 // Số bài viết mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data.res)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchProducts()
  }, [])
  const getAllArticles = async () => {
    try {
      const { data } = await axios.get('http://localhost:8888/api/v1/articles')
      setArticles(data.res)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }

  const showModal = (image: string) => {
    setModalImage(image)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    getAllArticles()
  }, [])

  // Tính toán bài viết được hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * articlesPerPage
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage)

  return (
    <Layout style={{ backgroundColor: '#f0f2f5' }} className='py-10 container'>
      <Row gutter={[16, 16]}>
        {/* Sidebar */}
        <Col xs={24} sm={8} md={6}>
          <Sider width='100%' theme='light' style={{ padding: 24, backgroundColor: '#fff' }}>
            {/* <div className='mb-4'>
              <Title level={4} style={{ color: '#fa8c16', fontSize: '20px' }}>
                Danh mục tin
              </Title>
              <div className='border-t-2 border-orange-500 mb-2' />
              <Menu mode='inline' style={{ border: 'none' }} theme='light'>
                <Menu.Item key='1'>
                  <Link to='#'>Tin mới nhất (8)</Link>
                </Menu.Item>
                <Menu.Item key='2'>
                  <Link to='#'>Kiến thức nhà đẹp</Link>
                </Menu.Item>
                <Menu.Item key='3'>
                  <Link to='#'>Kiến trúc phong thủy</Link>
                </Menu.Item>
                <Menu.Item key='4'>
                  <Link to='#'>Video dự án</Link>
                </Menu.Item>
              </Menu>
            </div> */}
            <div>
              <Title level={4} style={{ color: '#fa8c16', fontSize: '20px' }}>
                Gợi Ý Sản Phẩm
              </Title>
              <div className='border-t-2 border-orange-500 mb-2 ' />
              {products
                .filter((product) => !product.is_hidden)
                .sort(() => Math.random() - 0.5) // Xáo trộn danh sách
                .slice(0, 2) // Lấy 2 sản phẩm đầu tiên
                .map((product, index) => (
                  <Link to={`/detail/${product._id}`}>
                    <Card
                      className='mb-4 text-center'
                      key={index}
                      hoverable
                      cover={
                        <img
                          alt='Sofa set'
                          src={product?.variants?.[0]?.sku_id?.image?.[0]}
                          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                        />
                      }
                    >
                      <Paragraph className='mb-0'>
                        <strong>{product.name}</strong>
                      </Paragraph>
                      <Paragraph className='text-red-500 font-bold mb-0'>
                        <strong>{product.price}</strong>
                        {/* <span className='line-through text-gray-500'> 10,600,000₫</span> */}
                      </Paragraph>
                      <Button className='text-center'>xem chi tiết</Button>
                    </Card>
                  </Link>
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
                {currentArticles.length > 0 ? (
                  currentArticles
                    .filter((article) => article.isHidden === true)
                    .map((article, index) => (
                      <Col xs={24} sm={12} md={8} key={index}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={article.title}
                              src={article.thumbnail}
                              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                              onClick={() => showModal(article.thumbnail)}
                            />
                          }
                        >
                          <Link to={`/articles/${article._id}`}>
                            <Text type='secondary' style={{ fontSize: '16px' }}>
                              {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                            </Text>
                            <Title level={4} style={{ color: '#000', fontSize: '20px', marginTop: '8px' }}>
                              {article.title.substring(0, 50) + '...'}
                            </Title>
                            <Paragraph style={{ fontSize: '13px', color: 'gray' }}>{article.author}</Paragraph>
                          </Link>
                        </Card>
                      </Col>
                    ))
                ) : (
                  <div>Không có bài viết nào</div>
                )}
              </Row>
              <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                current={currentPage}
                pageSize={articlesPerPage}
                total={articles.length}
                onChange={handlePageChange}
              />
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

export default NewsPage
