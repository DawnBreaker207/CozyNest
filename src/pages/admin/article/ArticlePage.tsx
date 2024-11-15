import useArticleMutation from '@/hooks/useArticleMutation';
import { Button, Table, Space, message, Tooltip, Typography, Collapse, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useArticleQuery } from '@/hooks/useArticleQuery';
import IArticle from '@/types/article';
import { useQueryClient } from '@tanstack/react-query';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const AdminArticlePage = () => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
  const {
    data: Articledata, isLoading,isError
  } = useArticleQuery()
  const { mutate: deleteArticle } = useArticleMutation({
    action: 'DELETE',
    onSuccess: () => {
      message.success('Article deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['ARTICLE_KEY'] });
    }
   
  });
  const data = Articledata?.res?.map((item:IArticle) =>(
    {
      key: item._id,
      ...item
    }
  ))
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <strong>{text}</strong>
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author'
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
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to={`/admin/articles/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteArticle(record._id)}
          />
        </Space>
      )
    }
  ];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading articles</p>;

  return (
    <>
      {contextHolder}
      <Table dataSource={data} columns={columns} rowKey="_id" /> {/* Đảm bảo `dataSource` là một mảng */}
    </>
  );
};

export default AdminArticlePage;
