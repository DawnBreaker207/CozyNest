/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomLoadingPage from '@/components/Loading'
import instance from '@/configs/axios'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { BackwardOutlined, PlusOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, message, Modal, Upload } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

type FieldType = {
  SKU: string
  name: string
  price?: number
  stock?: string
  image?: string[] // Array of image URLs
  price_before_discount?: number
  price_discount_percent?: number
}

const UpdateVariant = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const { product_id, sku_id } = useParams()
  const [fileList, setFileList] = useState<UploadFile[]>([]) // fileList mới
  const [removedImages] = useState<string[]>([]) // Lưu các ảnh cũ đã bị xóa
  const [previewVisible, setPreviewVisible] = useState(false) // Modal visible state
  const [previewImage, setPreviewImage] = useState<string>('')
  const [form] = Form.useForm()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['variants', product_id, sku_id],
    queryFn: () => instance.get(`/variants/${product_id}/get/${sku_id}`)
  })

  // Cập nhật dữ liệu form
  useEffect(() => {
    if (data?.data?.res?.image) {
      const oldImages = data?.data?.res?.image.map((url: string) => ({
        uid: url, // UID dựa trên URL cũ
        url,
        name: url.split('/').pop()
      }))
      setFileList(oldImages) // Set lại ảnh cũ vào fileList
    }
  }, [data])

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

  const onFinish = async (values: any) => {
    const uploadedImages = await Promise.all(
      fileList.map(async (file) => {
        if (file.url) {
          return file.url // Chỉ trả về URL ảnh cũ
        } else {
          // Nếu file là ảnh mới, cần upload và lấy URL
          const uploadedUrl = await uploadFileCloudinary(file.originFileObj as RcFile)
          return uploadedUrl
        }
      })
    )

    const updatedValues = {
      ...values,
      image: uploadedImages.length > 0 ? uploadedImages : undefined, // Gửi mảng URL ảnh
      removedImages // Nếu có ảnh cũ bị xóa, gửi danh sách xóa
    }

    mutate(updatedValues)
  }

  const handleChange: any = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList)
  }
  // Open preview modal
  const handlePreview = (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string)) // Get image URL for preview
    setPreviewVisible(true) // Show modal
  }

  // Close preview modal
  const handleCancel = () => setPreviewVisible(false)

  const handlePriceChange = (value: number, field: string) => {
    console.info(value, field)
    const priceBeforeDiscount = form.getFieldValue('price_before_discount')
    const discountPercent = form.getFieldValue('price_discount_percent')

    if (priceBeforeDiscount && discountPercent) {
      const discountAmount = priceBeforeDiscount * (discountPercent / 100)
      const newPrice = priceBeforeDiscount - discountAmount
      form.setFieldsValue({
        price: Math.round(newPrice)
      })
    }
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
      <div className='flex item-center justify-between mb-5'>
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
        layout='vertical'
        initialValues={{
          ...data?.data?.res,
          image: data?.data?.res?.image || [] // Gán ảnh cũ cho field image
        }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='SKU'
          name='SKU'
          className='w-[50%]'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType>
          label='Tên biến thể'
          name='name'
          className='w-[50%]'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label='Ảnh biến thể' name='image' rules={[{ required: true, message: 'Không được bỏ trống!' }]}>
          <Upload
            multiple
            listType='picture-card'
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={(file) => {
              console.info(file)
              return false // Prevent auto-upload
            }}
            onPreview={handlePreview} // Trigger preview on image click
            maxCount={5} // Limit to 5 images
          >
            {fileList.length < 5 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        {/* Image preview modal */}
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel} centered width={600}>
          <img alt='preview' style={{ width: '100%', objectFit: 'contain' }} src={previewImage} />
        </Modal>

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
          label='Giá cũ'
          name='price_before_discount'
          rules={[{ required: true, message: 'Giá không được bỏ trống!' }]}
        >
          <Input
            style={{ width: '30%' }}
            onBlur={() => handlePriceChange(form.getFieldValue('price_before_discount'), 'price_before_discount')}
          />
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
          <Input
            style={{ width: '30%' }}
            onBlur={() => handlePriceChange(form.getFieldValue('price_discount_percent'), 'price_discount_percent')}
          />
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
          <Input style={{ width: '30%' }} disabled />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateVariant
