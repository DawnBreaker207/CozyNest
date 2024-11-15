import React, { useState } from 'react'; // Để quản lý trang hiện tại
import useArticleMutation from '@/hooks/useArticleMutation';
import { Button, Table, Space, message, Tooltip, Typography, Collapse, Image, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useArticleQuery } from '@/hooks/useArticleQuery';
import IArticle from '@/types/article';
import { useQueryClient } from '@tanstack/react-query';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const AdminArticlePage = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại
  const [messageApi, contextHolder] = message.useMessage();
  const { data: Articledata, isLoading, isError } = useArticleQuery();
  const { mutate: deleteArticle } = useArticleMutation({
    action: 'DELETE',
    onSuccess: () => {
      message.success('Article deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['ARTICLE_KEY'] });
    },
  });

  const articlesPerPage = 5; // Số bài viết mỗi trang
  const data = Articledata?.res.map((item: IArticle) => ({
    key: item._id,
    ...item,
  }));

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>,
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
          {record.content.map((section: any, index: number) => (
            <Panel header={section.heading} key={index}>
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
          ))}
        </Collapse>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: IArticle) => (
        <Space size="middle">
          <Link to={`/admin/articles/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => deleteArticle({ _id: record._id } as IArticle)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading articles</p>;

  return (
    <>
      {contextHolder}
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        pagination={{
          current: currentPage, // Trang hiện tại
          pageSize: articlesPerPage, // Số bài viết mỗi trang
          total: data?.length, // Tổng số bài viết
          onChange: (page) => setCurrentPage(page), // Cập nhật trang hiện tại khi thay đổi
        }}
      />
    </>
  );
};

export default AdminArticlePage;
