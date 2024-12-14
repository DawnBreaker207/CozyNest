import useArticleMutation from '@/hooks/useArticleMutation'
import { useArticleQuery } from '@/hooks/useArticleQuery'
import IArticle from '@/types/article'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Collapse, Empty, Image, message, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomLoadingPage from '@/components/Loading'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ColumnGroupType, ColumnType } from 'antd/es/table'

const { Paragraph } = Typography
const { Panel } = Collapse

const AdminArticlePage = () => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const [messageApi, contextHolder] = message.useMessage()

  const { data: articleData, isLoading, isError } = useArticleQuery()
  const { mutate: deleteArticle } = useArticleMutation({
    action: 'DELETE',
    onSuccess: () => {
      messageApi.success('Article deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['ARTICLE_KEY'] })
    }
  })

  const articlesPerPage = 5

  const data =
    articleData?.res?.map((item: IArticle) => ({
      key: item._id,
      ...item
    })) || []

  const columns: (ColumnType<IArticle> | ColumnGroupType<IArticle>)[] = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (url: string) =>
        url ? (
          <Image src={url} alt='Thumbnail' width={80} style={{ borderRadius: 8, objectFit: 'cover' }} />
        ) : (
          <Paragraph>No Thumbnail</Paragraph>
        )
    },
    {
      title: 'Người viết',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Nội dung',
      key: 'content',
      render: (_text: string, record: IArticle) => (
        <Collapse>
          {record.content && record.content.length > 0 ? (
            record.content.map((section, index: number) => (
              <Panel header={section.heading || `Section ${index + 1}`} key={index}>
                {section.paragraph ? (
                  <ReactQuill
                    value={section.paragraph}
                    readOnly
                    theme='bubble' // Sử dụng theme bubble cho chế độ chỉ đọc
                  />
                ) : (
                  <Paragraph>No paragraph available</Paragraph>
                )}
                {section.images && section.images.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {section.images.map((image, imgIndex: number) => (
                      <div key={imgIndex} style={{ width: 100, textAlign: 'center' }}>
                        <Image src={image.url} alt={image.caption} width={100} />
                        <Tooltip title={image.caption}>
                          <Paragraph ellipsis style={{ margin: 0 }}>
                            {image.caption}
                          </Paragraph>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                )}
              </Panel>
            ))
          ) : (
            <Paragraph>No content available</Paragraph>
          )}
        </Collapse>
      )
    },
    ,
    {
      key: 'isHidden',
      title: 'Trạng thái hiển thị',
      dataIndex: 'isHidden',
      render: (isHidden: boolean) => <Tag color={isHidden ? 'green' : 'red'}>{isHidden ? 'Hiển thị' : 'Ẩn'}</Tag>
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_text: string, record: IArticle) => (
        <Space size='middle'>
          <Link to={`/admin/articles/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title='Delete Article'
            description='Are you sure you want to delete this article?'
            onConfirm={() => deleteArticle({ _id: record._id } as IArticle)}
            okText='Yes'
            cancelText='No'
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ].filter((column) => column !== undefined)

  if (isLoading)
    return (
      <>
        <CustomLoadingPage />
      </>
    )
  if (isError) return <p>Error loading articles. Please try again later.</p>

  return (
    <>
      {contextHolder}
      <div className='mb-5'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý bài viết</h1>
        <Link to={`/admin/articles/add`}>
          <Button type='primary'>
            <PlusOutlined />
            Thêm mới bài viết
          </Button>
        </Link>
      </div>
      {data.length > 0 ? (
        <Table
          dataSource={data.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage)}
          columns={columns}
          rowKey='_id'
          pagination={{
            current: currentPage,
            pageSize: articlesPerPage,
            total: data.length,
            onChange: (page) => setCurrentPage(page)
          }}
        />
      ) : (
        <Empty description='No articles found' />
      )}
    </>
  )
}

export default AdminArticlePage
