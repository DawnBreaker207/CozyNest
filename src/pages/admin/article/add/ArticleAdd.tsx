import { useState } from 'react'
import useArticleMutation from '@/hooks/useArticleMutation'
import { Button, Form, Input, message, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { RcFile } from 'antd/es/upload'

const ArticleAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [content, setContent] = useState<{ heading: string; paragraph: string; images: RcFile[] }[]>([
    { heading: '', paragraph: '', images: [] }
  ])
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

    const updatedValues = { ...values, content: contentWithUploadedImages }
    mutate(updatedValues)
  }

  return (
    <>
      {contextHolder}
      <div className='bg-white rounded-lg'>
        <Form layout='vertical' onFinish={onFinish}>
          <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Add Article</h1>

          <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Title is required' }]}>
            <Input placeholder='Type article title here...' className='w-full bg-[#F9F9FC]' />
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
                <Input.TextArea
                  rows={4}
                  value={section.paragraph}
                  onChange={(e) =>
                    setContent(content.map((s, i) => (i === index ? { ...s, paragraph: e.target.value } : s)))
                  }
                  placeholder='Type paragraph here...'
                  className='w-full bg-[#F9F9FC]'
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
                  {section.images.map((img, index) => (
                    <span key={img.uid || index} className='mr-2'>
                      {img.name}
                    </span>
                  ))}
                </div>
              </Form.Item>
            </div>
          ))}

          <Button onClick={handleAddContent} icon={<PlusOutlined />}>
            Add Section
          </Button>

          <Form.Item label='Author' name='author' rules={[{ required: true, message: 'Author is required' }]}>
            <Input placeholder='Type author name here...' className='w-full bg-[#F9F9FC]' />
          </Form.Item>

          <Button type='primary' htmlType='submit' className='bg-blue-500 hover:bg-blue-600'>
            Add Article
          </Button>
        </Form>
      </div>
    </>
  )
}

export default ArticleAddPage
