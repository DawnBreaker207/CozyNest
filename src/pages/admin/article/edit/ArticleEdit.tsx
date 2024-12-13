import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import useArticleMutation from '@/hooks/useArticleMutation'
import { useArticle } from '@/hooks/useArticleQuery'
import IArticle from '@/types/article'
import { CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
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
              <span className='text-[#3A5BFF]'>Bài viết</span> <CaretRightOutlined /> <span>Chỉnh sửa bài viết</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/articles`}>Hủy</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Cập nhật bài viết
              </Button>
            </div>
          </div>

          <div className='mt-5'>
            <Form.Item
              label='Tiêu đề'
              name='title'
              rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
            >
              <Input placeholder='Nhập tiêu đề...' className='w-full bg-[#F9F9FC]' />
            </Form.Item>

            <Form.Item label='Hình ảnh'>
              <Upload beforeUpload={handleUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />} disabled={uploading}>
                  {uploading ? 'Đang tải ảnh...' : 'Tải ảnh lên'}
                </Button>
              </Upload>
              <div className='mt-2'>
                {thumbnail ? (
                  <img src={data?.thumbnail} alt='Thumbnail' className='w-40 h-40 object-cover rounded' />
                ) : (
                  <p>Không có hình được tải lên</p>
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
                        name={[field.name, 'tiêu đề']}
                        rules={[
                          { required: true, message: 'Tiêu đề không được để trống' },
                          {
                            min: 6,
                            message: 'Tiêu đề phải có tối thiểu 6 ký tự'
                          }
                        ]}
                      >
                        <Input placeholder='Nhập tiêu đề...' />
                      </Form.Item>

                      {/* Sử dụng ReactQuill cho paragraph */}
                      <Form.Item
                        label='Nội dung'
                        name={[field.name, 'nội dung']}
                        rules={[
                          { required: true, message: 'Nội dung không được để trống' },
                          {
                            min: 6,
                            message: 'Nội dung phải có tối thiểu 6 ký tự'
                          }
                        ]}
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
                                  rules={[{ required: true, message: 'Ảnh không được để trống' }]}
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
                                          messageApi.success('Tải ảnh lên thành công')
                                        }
                                      } catch (err) {
                                        messageApi.error('Tải ảnh không thành công')
                                      }
                                      return false
                                    }}
                                    showUploadList={false}
                                  >
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
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

                                <Form.Item label='Chú thích ảnh' name={[imageField.name, 'caption']}>
                                  <Input placeholder='Nhập chú thích ảnh...' />
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
                        Xóa nội dung
                      </Button>
                    </div>
                  ))}
                  <Button type='dashed' onClick={() => add()}>
                    Thêm nội dung
                  </Button>
                </>
              )}
            </Form.List>

            <Form.Item
              label='Tác giả'
              name='author'
              rules={[
                { required: true, message: 'Tên tác giả là bắt buộc' },
                {
                  min: 6,
                  message: 'Tên tác giả phải có tối thiểu 6 ký tự'
                },
                {
                  validator: (_, value) => {
                    if (
                      !value ||
                      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ]/.test(value)
                    ) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('Chữ cái đầu tiên phải là chữ và không được là ký tự đặc biệt hoặc số')
                    )
                  }
                }
              ]}
            >
              <Input placeholder='Nhập tên tác giả...' className='w-full bg-[#F9F9FC]' />
            </Form.Item>
          </div>
          <div className='w-[20%]'>
            <div>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Trạng thái</h1>
              <Form.Item name='isHidden' valuePropName='checked'>
                <Checkbox>Hiển thị</Checkbox>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ArticleEditPage
