import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useArticleMutation from '@/hooks/useArticleMutation'
import { useArticle } from '@/hooks/useArticleQuery'
import IArticle from '@/types/article'
import { BackwardOutlined, CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message, Upload } from 'antd'
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
    if (data?.thumbnail) {
      setThumbnail(data.thumbnail)
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
      <div className='rounded-lg'>
        <div className='mb-5 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Cập nhật bài viết</h1>
          <div className='flex items-center space-x-2'>
            <Button>
              <BackwardOutlined />
              <Link to={`/admin/articles`}>Quay lại</Link>
            </Button>
          </div>
        </div>
        <Form
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            ...data
          }}
        >
          <div className='flex justify-between'>
            <div className='w-[75%] pr-4'>
              <Form.Item
                label='Tiêu đề bài viết'
                name='title'
                rules={[{ required: true, message: 'Không được bỏ trống!' }]}
              >
                <Input placeholder='Tiêu đề bài viết' className='w-full' />
              </Form.Item>

              <Form.Item label='Ảnh'>
                <Upload beforeUpload={handleUpload} showUploadList={false}>
                  <Button icon={<UploadOutlined />} disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Tải ảnh'}
                  </Button>
                </Upload>
                <div className='mt-2'>
                  {thumbnail ? (
                    <img src={data?.thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded' />
                  ) : (
                    <p>No thumbnail uploaded</p>
                  )}
                </div>
              </Form.Item>

              <Form.List name='content'>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className='border p-4 mb-4 rounded-lg bg-gray-50'>
                        <Form.Item
                          label={`Tiêu đề ${index + 1}`}
                          name={[field.name, 'heading']}
                          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                        >
                          <Input placeholder='Enter heading...' />
                        </Form.Item>

                        {/* Sử dụng ReactQuill cho paragraph */}
                        <Form.Item
                          label='Nội dung'
                          name={[field.name, 'paragraph']}
                          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
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
                                    label='Ảnh'
                                    name={[imageField.name, 'url']}
                                    rules={[{ required: true, message: 'Không được bỏ trống!' }]}
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
                                      <Button icon={<UploadOutlined />}>Tải ảnh</Button>
                                    </Upload>
                                    <div className='mt-2'>
                                      <img
                                        // src={form.getFieldValue([
                                        //   'content',
                                        //   field.name,
                                        //   'images',
                                        //   imageField.name,
                                        //   'url'
                                        // ])}
                                        src={data.content[index].images[imageField.name].url}
                                        alt='Uploaded'
                                        className='w-20 h-20 object-cover rounded'
                                      />
                                    </div>
                                  </Form.Item>

                                  <Form.Item label='Tên ảnh' name={[imageField.name, 'caption']}>
                                    <Input placeholder='Tên ảnh' />
                                  </Form.Item>
                                  <Button type='dashed' onClick={() => removeImage(imageField.name)}>
                                    Xóa ảnh
                                  </Button>
                                </div>
                              ))}
                              <Button type='dashed' onClick={() => addImage()}>
                                Thêm ảnh
                              </Button>
                            </>
                          )}
                        </Form.List>

                        <Button type='dashed' onClick={() => remove(field.name)}>
                          Thêm phần mới
                        </Button>
                      </div>
                    ))}
                    <Button type='dashed' onClick={() => add()}>
                      Thêm phần mới
                    </Button>
                  </>
                )}
              </Form.List>

              <Form.Item
                label='Người viết'
                className='mt-3'
                name='author'
                rules={[{ required: true, message: 'Không được bỏ trống!' }]}
              >
                <Input placeholder='Người viết' className='w-full' />
              </Form.Item>
            </div>
            <div className='w-[20%]'>
              <div>
                <Form.Item name='isHidden' valuePropName='checked'>
                  <Checkbox>Hiển thị</Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
          <Button type='primary' htmlType='submit'>
            Cập nhật bài viết
          </Button>
        </Form>
      </div>
    </>
  )
}

export default ArticleEditPage
