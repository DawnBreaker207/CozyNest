import useArticleMutation from '@/hooks/useArticleMutation'
import { useArticleQuery } from '@/hooks/useArticleQuery'
import IArticle from '@/types/article'
import { CaretRightOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ArticleEditPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  // Kiểm tra nếu id tồn tại
  if (!id) {
    return <div>Error: Invalid article ID</div>
  }

  // Lấy dữ liệu bài viết
  const { data, isLoading, isError, error, } = useArticleQuery({ id })

  // Mutation để cập nhật bài viết
  const { mutate } = useArticleMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật bài viết thành công')
      setTimeout(() => {
        navigate(`/admin/articles`)
      }, 900)
    }
  })

  // Hàm xử lý khi form submit
  const onFinish = (values: IArticle) => {
    if (data) {
      // Chắc chắn thêm _id vào values trước khi gửi đi
      mutate({ ...data, ...values, _id: id })
    } else {
      messageApi.error('Dữ liệu bài viết không hợp lệ')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form
          layout='vertical'
          onFinish={onFinish}
          initialValues={data?.res}  // Giá trị bài viết trả về từ API
        >
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Article</span> <CaretRightOutlined /> <span>Edit Article</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/articles`}>Cancel</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Edit Article
              </Button>
            </div>
          </div>

          <div className='mt-5'>
            <Form.Item
              label='Title'
              name='title'
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <Input placeholder='Enter article title...' className='w-full bg-[#F9F9FC]' />
            </Form.Item>

            <Form.List name='content'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key} className='border p-4 mb-4 rounded-lg bg-gray-50'>
                      <Form.Item
                        label={`Heading ${index + 1}`}
                        name={[field.name, 'heading']}
                        rules={[{ required: true, message: 'Heading is required' }]}
                      >
                        <Input placeholder='Enter heading...' />
                      </Form.Item>

                      <Form.Item
                        label='Paragraph'
                        name={[field.name, 'paragraph']}
                        rules={[{ required: true, message: 'Paragraph is required' }]}
                      >
                        <Input.TextArea rows={3} placeholder='Enter paragraph...' />
                      </Form.Item>

                      <Form.List name={[field.name, 'images']}>
                        {(imageFields, { add: addImage, remove: removeImage }) => (
                          <>
                            {imageFields.map((imageField) => (
                              <div key={imageField.key} className='mb-2'>
                                <Form.Item
                                  label='Image URL'
                                  name={[imageField.name, 'url']}
                                  rules={[{ required: true, message: 'Image URL is required' }]}
                                >
                                  <Input placeholder='Enter image URL...' />
                                </Form.Item>
                                <Form.Item
                                  label='Image Caption'
                                  name={[imageField.name, 'caption']}
                                >
                                  <Input placeholder='Enter image caption...' />
                                </Form.Item>
                                <Button type='dashed' onClick={() => removeImage(imageField.name)}>
                                  Remove Image
                                </Button>
                              </div>
                            ))}
                            <Button type='dashed' onClick={() => addImage()}>
                              Add Image
                            </Button>
                          </>
                        )}
                      </Form.List>

                      <Button type='dashed' onClick={() => remove(field.name)}>
                        Remove Section
                      </Button>
                    </div>
                  ))}
                  <Button type='dashed' onClick={() => add()}>
                    Add Section
                  </Button>
                </>
              )}
            </Form.List>

            <Form.Item label='Author' name='author' rules={[{ required: true, message: 'Author is required' }]}>
              <Input placeholder='Enter author name...' className='w-full bg-[#F9F9FC]' />
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ArticleEditPage
