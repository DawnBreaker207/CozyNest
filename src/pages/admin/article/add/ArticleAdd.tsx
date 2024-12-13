import { useState } from 'react'
import useArticleMutation from '@/hooks/useArticleMutation'
import { Button, Checkbox, Form, Input, message, Upload } from 'antd'
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
  // TODO: Fix type
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <span className='text-[#3A5BFF]'>Bài viết</span> <CaretRightOutlined /> <span>Thêm bài viết</span>
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
                Thêm bài viết
              </Button>
            </div>
          </div>
          <Form.Item label='Tiêu đề' name='title' rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}>
            <Input placeholder='Nhập tiêu đề...' className='w-full bg-[#F9F9FC]' />
          </Form.Item>

          <Form.Item label='Hình ảnh' rules={[{ required: true, message: 'Ảnh không được bỏ trống' }]}>
            <Upload
              beforeUpload={(file) => {
                setThumbnail(file)
                return false
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
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
              <Form.Item
                label={`Tiêu đề ${index + 1}`}
                rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
              >
                <Input
                  value={section.heading}
                  onChange={(e) =>
                    setContent(content.map((s, i) => (i === index ? { ...s, heading: e.target.value } : s)))
                  }
                  placeholder='Nhập tiêu đề...'
                  className='w-full bg-[#F9F9FC]'
                />
              </Form.Item>

              <Form.Item
                label={`Nội dung ${index + 1}`}
                rules={[{ required: true, message: 'Nội dung không được để trống' }]}
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
                      ['link']
                    ]
                  }}
                />
              </Form.Item>

              <Form.Item label='Ảnh'>
                <Upload
                  beforeUpload={(file) => {
                    setContent(content.map((s, i) => (i === index ? { ...s, images: [...s.images, file] } : s)))
                    return false
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
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
            Thêm nội dung
          </Button>

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
                    /^[a-zA-ZÀÁÂÃẢẠẮẶẲẨẦẬẪẤÈÉẺẸÊỀỆẾỂỄÌÍÒÓÔÕỎỒỐỔỘÕỜƠỢỚỠỞÙỤŨÚƯỪỬỨỮỰĂĐĨŨƠàáảạâãắằặẳẩầậấèéêềếểệễìíòóôõỏờơởớpỡợồôổốỗộùụũúăđĩưủừứựữửơƯĂÂÊÔƠưăâêôơỲÝỴỶỸỳýỵỷỹ]/.test(
                      value
                    )
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
        </Form>
        <div className='w-[20%]'>
          <div>
            <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Trạng thái</h1>
            <Form.Item name='isHidden' valuePropName='checked'>
              <Checkbox>Hiển thị</Checkbox>
            </Form.Item>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleAddPage
