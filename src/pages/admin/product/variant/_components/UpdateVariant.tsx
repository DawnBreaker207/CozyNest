import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { vietnameseChars1 } from '@/validations/validate'
import { BackwardOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, message, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type Props = {}
type FieldType = {
  SKU: string
  name: string
  price?: number
  stock?: string
  image?: string
  price_before_discount?: number
  price_discount_percent?: number
}

const UpdateVariant = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const { product_id, sku_id } = useParams()
  const [content, setContent] = useState<{ heading: string; paragraph: string; images: RcFile[] }[]>([
    { heading: '', paragraph: '', images: [] }
  ])
  const [thumbnail, setThumbnail] = useState<RcFile | null>(null)
  const [form] = Form.useForm()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['variants', product_id, sku_id],
    queryFn: () => instance.get(`/variants/${product_id}/get/${sku_id}`)
  })
  console.log('🚀 ~ UpdateVariant ~ data:', data)

  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return instance.put(`/variants/${product_id}/${sku_id}`, formData)
      } catch (error) {
        throw new Error('Cập nhật biến thể thất bại')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật biến thể thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['variants']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })
  const handleAddContent = () => {
    setContent([...content, { heading: '', paragraph: '', images: [] }])
  }
  const onFinish = async (values: any) => {
    const thumbnailUrl = thumbnail ? await uploadFileCloudinary(thumbnail) : data?.data?.res?.image

    // Upload ảnh nội dung (nếu có)
    const contentWithUploadedImages = await Promise.all(
      content.map(async (section) => {
        const uploadedImages = await Promise.all(
          section.images.map(async (file) => ({
            url: await uploadFileCloudinary(file),
            caption: file.name
          }))
        )
        return { ...section, images: uploadedImages }
      })
    )

    const updatedValues = { ...values, content: contentWithUploadedImages, image: thumbnailUrl }

    mutate(updatedValues)
  }

  if (isLoading)
    return (
      <div>
        <CustomLoadingPage />
      </div>
    )
  if (isError) return <div>{error.message}</div>
  return (
    <div>
      {contextHolder}
      <div className='flex item-center justify-between max-w-4xl mx-auto mb-8'>
        <h1 className='text-2xl font-bold'>Cập nhật biến thể</h1>
        <Link to={`/admin/products/${product_id}/variants`}>
          <Button>
            <BackwardOutlined />
            Quay lại
          </Button>
        </Link>
      </div>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...data?.data?.res, image: data?.data?.res?.image || null }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType> label='SKU' name='SKU' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label='Tên biến thể'
          name='name'
          rules={[
            { required: true, message: 'Tên biến thể là bắt buộc' },
            {
              min: 6,
              message: 'Tên biến thể phải có tối thiểu 6 ký tự'
            },
            {
              validator: (_, value) => {
                if (!value || vietnameseChars1.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Chữ cái đầu tiên phải là chữ và không được là ký tự đặc biệt hoặc số'))
              }
            }
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label='Ảnh biến thể'
          name='image'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Upload
            beforeUpload={(file) => {
              setThumbnail(file) // Lưu file vào state thumbnail
              form.setFieldsValue({ image: file })
              return false
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Tải ảnh</Button>
          </Upload>
          {/* Hiển thị ảnh mới nếu đã chọn */}
          {thumbnail && (
            <div className='mt-2'>
              <img
                src={URL.createObjectURL(thumbnail)}
                alt='Ảnh'
                style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
              />
            </div>
          )}
          {/* Hiển thị ảnh cũ nếu không có ảnh mới */}
          {!thumbnail && data?.data?.res?.image && (
            <div className='mt-2'>
              <img
                src={data?.data?.res?.image[0]}
                alt='Ảnh'
                style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
              />
            </div>
          )}
        </Form.Item>

        <Form.Item<FieldType>
          label='Số lượng'
          name='stock'
          rules={[
            { required: true, message: 'Số lượng không được bỏ trống!' },
            {
              pattern: /^[0-9]+$/,
              message: 'Số lượng phải là số và không được chứa ký tự khác'
            },
            {
              validator: (_, value) => (value < 0 ? Promise.reject('Số lượng không được là số âm!') : Promise.resolve())
            }
          ]}
        >
          <Input style={{ width: '30%' }} />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá'
          name='price'
          rules={[
            { required: true, message: 'Giá không được bỏ trống!' },
            {
              pattern: /^[0-9]+$/,
              message: 'Giá phải là số và không được chứa ký tự khác'
            },
            {
              validator: (_, value) => (value < 0 ? Promise.reject('Giá không được là số âm!') : Promise.resolve())
            }
          ]}
        >
          <Input style={{ width: '30%' }} />
        </Form.Item>

        <Form.Item<FieldType>
          label='Giá cũ'
          name='price_before_discount'
          rules={[
            { required: true, message: 'Giá không được bỏ trống!' },
            {
              pattern: /^[0-9]+$/,
              message: 'Giá phải là số và không được chứa ký tự khác'
            },
            {
              validator: (_, value) => (value < 0 ? Promise.reject('Giá không được là số âm!') : Promise.resolve())
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const price = getFieldValue('price')
                if (value <= price) {
                  return Promise.reject(new Error('Giá cũ phải lớn hơn giá mới!'))
                }
                return Promise.resolve()
              }
            })
          ]}
        >
          <Input style={{ width: '30%' }} />
        </Form.Item>
        <Form.Item
          label='Giảm giá'
          name='price_discount_percent'
          rules={[
            {
              validator: (_, value) => {
                if (value && (!/^[0-9]+(\.[0-9]+)?$/.test(value) || parseFloat(value) < 0)) {
                  return Promise.reject(
                    new Error('Giảm giá phải là số lớn hơn 0 và không được chứa chữ hoặc ký tự đặc biệt')
                  )
                }
                if (value && parseFloat(value) > 100) {
                  return Promise.reject(new Error('Giảm giá không được vượt quá 100'))
                }
                return Promise.resolve()
              }
            }
          ]}
        >
          <Input style={{ width: '30%' }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateVariant
