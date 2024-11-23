import { useState } from 'react'
import useArticleMutation from '@/hooks/useArticleMutation'
import { Button, Form, Input, message, Upload } from 'antd'
import { CaretRightOutlined, CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill' // Import ReactQuill
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { RcFile } from 'antd/es/upload'

const ArticleAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [content, setContent] = useState<{ heading: string; paragraph: string; images: RcFile[] }[]>([
    { heading: '', paragraph: '', images: [] }
  ])
  const [thumbnail, setThumbnail] = useState<RcFile | null>(null) // Ảnh tiêu đề
  const navigate = useNavigate()

  const { mutate } = useArticleMutation({
    action: 'CREATE',
    onSuccess: () => {
      messageApi.success('Thêm bài viết thành công')
      setTimeout(() => {
        navigate(`/admin/articles`)
      }, 900)
    }
  })

  const handleAddContent = () => {
    setContent([...content, { heading: '', paragraph: '', images: [] }])
  }

  const onFinish = async (values: any) => {
    // Upload ảnh tiêu đề lên Cloudinary
    const thumbnailUrl = thumbnail ? await uploadFileCloudinary(thumbnail) : null

    // Upload ảnh nội dung
    const contentWithUploadedImages = await Promise.all(
      content.map(async (section) => {
        const uploadedImages = await Promise.all(
          section.images.map(async (file) => ({
            url: await uploadFileCloudinary(file),
            caption: file.name // Sử dụng tên file làm caption
          }))
        )
        return { ...section, images: uploadedImages }
      })
    )

    const updatedValues = { ...values, content: contentWithUploadedImages, thumbnail: thumbnailUrl }
    mutate(updatedValues)
  }

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Article</span> <CaretRightOutlined /> <span>Add Article</span>
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
                Add Article
              </Button>
            </div>
          </div>
          <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Title is required' }]}>
            <Input placeholder='Type article title here...' className='w-full bg-[#F9F9FC]' />
          </Form.Item>

          <Form.Item label='Thumbnail' rules={[{ required: true, message: 'Thumbnail is required' }]}>
            <Upload
              beforeUpload={(file) => {
                setThumbnail(file)
                return false
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
            </Upload>
            <div className='mt-2'>
              {thumbnail && (
                <>
                  <span>{thumbnail.name}</span>
                  <br />
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt='Thumbnail'
                    style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
                  />
                </>
              )}
            </div>
          </Form.Item>

          {content.map((section, index) => (
            <div key={index} className='mb-6'>
              <Form.Item label={`Heading ${index + 1}`} rules={[{ required: true, message: 'Heading is required' }]}>
                <Input
                  value={section.heading}
                  onChange={(e) =>
                    setContent(content.map((s, i) => (i === index ? { ...s, heading: e.target.value } : s)))
                  }
                  placeholder='Type heading here...'
                  className='w-full bg-[#F9F9FC]'
                />
              </Form.Item>

              <Form.Item
                label={`Paragraph ${index + 1}`}
                rules={[{ required: true, message: 'Paragraph is required' }]}
              >
                <ReactQuill
                  value={section.paragraph}
                  onChange={(value) =>
                    setContent(content.map((s, i) => (i === index ? { ...s, paragraph: value } : s)))
                  }
                  modules={{
                    toolbar: [
                      [{ header: '1' }, { header: '2' }, { font: [] }],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['bold', 'italic', 'underline'],
                      ['link'] // Thêm icon chèn ảnh
                    ]
                  }}
                />
              </Form.Item>

              <Form.Item label='Images'>
                <Upload
                  beforeUpload={(file) => {
                    setContent(content.map((s, i) => (i === index ? { ...s, images: [...s.images, file] } : s)))
                    return false
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
                <div className='mt-2'>
                  {section.images.map((img, imgIndex) => (
                    <div key={img.uid || imgIndex} className='flex items-center mb-2'>
                      <span className='mr-2'>{img.name}</span>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Image ${imgIndex + 1}`}
                        style={{ width: '100%', maxWidth: '150px' }}
                      />
                    </div>
                  ))}
                </div>
              </Form.Item>
            </div>
          ))}

          <Button onClick={handleAddContent} icon={<PlusOutlined />} style={{ marginBottom: '20px' }}>
            Add Section
          </Button>

          <Form.Item label='Author' name='author' rules={[{ required: true, message: 'Author is required' }]}>
            <Input placeholder='Type author name here...' className='w-full bg-[#F9F9FC]' />
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default ArticleAddPage
