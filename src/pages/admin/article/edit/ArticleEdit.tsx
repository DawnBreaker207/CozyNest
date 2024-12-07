import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useArticleMutation from '@/hooks/useArticleMutation'
import { useArticle } from '@/hooks/useArticleQuery'
import IArticle from '@/types/article'
import { CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill' // Import ReactQuill
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import { Link, useNavigate, useParams } from 'react-router-dom'

const ArticleEditPage = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const { data, isLoading, isError, error } = useArticle(id)
  const { mutate } = useArticleMutation({
    action: 'UPDATE',
    onSuccess: () => {
      messageApi.success('Cập nhật bài viết thành công')
      setTimeout(() => {
        navigate(`/admin/articles`)
      }, 900)
    }
  })

  useEffect(() => {
    if (data?.res?.thumbnail) {
      setThumbnail(data?.res?.thumbnail)
    }
  }, [data])

  if (!id) {
    return <div>Error: Invalid article ID</div>
  }

  const handleUpload = async (file: RcFile) => {
    setUploading(true)
    try {
      const response = await uploadFileCloudinary(file)
      if (response) {
        setThumbnail(response)
        messageApi.success('Upload thumbnail thành công')
      } else {
        messageApi.error('Không thể upload thumbnail')
      }
    } catch (err) {
      messageApi.error('Lỗi upload ảnh')
    } finally {
      setUploading(false)
    }
    return false
  }

  const onFinish = (values: IArticle) => {
    if (!thumbnail) {
      messageApi.error('Vui lòng upload thumbnail')
      return
    }

    const updatedValues = {
      ...values,
      thumbnail
    }

    mutate({ ...data, ...updatedValues, _id: id })
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
          initialValues={{
            ...data
          }}
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
            <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Title is required' }]}>
              <Input placeholder='Enter article title...' className='w-full bg-[#F9F9FC]' />
            </Form.Item>

            <Form.Item label='Thumbnail'>
              <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />} disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload Thumbnail'}
                </Button>
              </Upload>
              <div className='mt-2'>
                {thumbnail ? (
                  <img src={data?.thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded' />
                ) : (
                  <img src={data?.thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded' />
                )}
              </div>
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

                      {/* Sử dụng ReactQuill cho paragraph */}
                      <Form.Item
                        label='Paragraph'
                        name={[field.name, 'paragraph']}
                        rules={[{ required: true, message: 'Paragraph is required' }]}
                      >
                        <ReactQuill
                          value={form.getFieldValue(['content', field.name, 'paragraph'])}
                          onChange={(value) => form.setFieldValue(['content', field.name, 'paragraph'], value)}
                          modules={{
                            toolbar: [
                              [{ header: '1' }, { header: '2' }, { font: [] }],
                              [{ list: 'ordered' }, { list: 'bullet' }],
                              ['bold', 'italic', 'underline'],
                              ['link'] // Thêm chức năng chèn ảnh
                            ]
                          }}
                        />
                      </Form.Item>

                      <Form.List name={[field.name, 'images']}>
                        {(imageFields, { add: addImage, remove: removeImage }) => (
                          <>
                            {imageFields.map((imageField) => (
                              <div key={imageField.key} className='mb-2'>
                                <Form.Item
                                  label='Image'
                                  name={[imageField.name, 'url']}
                                  rules={[{ required: true, message: 'Image is required' }]}
                                >
                                  <Upload
                                    beforeUpload={async (file) => {
                                      try {
                                        const response = await uploadFileCloudinary(file)
                                        if (response) {
                                          form.setFieldValue(
                                            ['content', field.name, 'images', imageField.name, 'url'],
                                            response
                                          )
                                          messageApi.success('Image uploaded successfully')
                                        }
                                      } catch (err) {
                                        messageApi.error('Image upload failed')
                                      }
                                      return false
                                    }}
                                    showUploadList={false}
                                  >
                                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                                  </Upload>
                                  <div className='mt-2'>
                                    <img
                                      src={form.getFieldValue([
                                        'content',
                                        field.name,
                                        'images',
                                        imageField.name,
                                        'url'
                                      ])}
                                      alt='Uploaded'
                                      className='w-20 h-20 object-cover rounded'
                                    />
                                  </div>
                                </Form.Item>

                                <Form.Item label='Image Caption' name={[imageField.name, 'caption']}>
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
