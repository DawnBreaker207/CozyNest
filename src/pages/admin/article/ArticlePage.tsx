import React, { useState } from 'react';
import useArticleMutation from '@/hooks/useArticleMutation';
import { Button, Table, Space, message, Tooltip, Typography, Collapse, Image, Popconfirm, Empty } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useArticleQuery } from '@/hooks/useArticleQuery';
import IArticle from '@/types/article';
import { useQueryClient } from '@tanstack/react-query';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const AdminArticlePage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: Articledata, isLoading, isError } = useArticleQuery();
  const { mutate: deleteArticle } = useArticleMutation({
    action: 'DELETE',
    onSuccess: () => {
      messageApi.success('Article deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['ARTICLE_KEY'] });
    },
  });

  const articlesPerPage = 5;

  const data = Articledata?.res.map((item: IArticle) => ({
    key: item._id,
    ...item,
  })) || [];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (url: string) =>
        url ? (
          <Image
            src={url}
            alt="Thumbnail"
            width={80}
            style={{ borderRadius: 8, objectFit: 'cover' }}
          />
        ) : (
          <Paragraph>No Thumbnail</Paragraph>
        ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Content',
      key: 'content',
      render: (_text: string, record: IArticle) => (
        <Collapse>
          {record.content && record.content.length > 0 ? (
            record.content.map((section: any, index: number) => (
              <Panel header={section.heading || `Section ${index + 1}`} key={index}>
                <Paragraph>{section.paragraph}</Paragraph>
                {section.images && section.images.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {section.images.map((image: any, imgIndex: number) => (
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
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: string, record: IArticle) => (
        <Space size="middle">
          <Link to={`/admin/articles/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Delete Article"
            description="Are you sure you want to delete this article?"
            onConfirm={() => deleteArticle({ _id: record._id } as IArticle)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error loading articles. Please try again later.</p>;

  return (
    <>
      {contextHolder}
      {data.length > 0 ? (
        <Table
          dataSource={data.slice(
            (currentPage - 1) * articlesPerPage,
            currentPage * articlesPerPage
          )}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: currentPage,
            pageSize: articlesPerPage,
            total: data.length,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      ) : (
        <Empty description="No articles found" />
      )}
    </>
  );
};

export default AdminArticlePage;
