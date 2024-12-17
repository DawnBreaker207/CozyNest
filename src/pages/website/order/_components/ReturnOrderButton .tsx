/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message, Modal, Upload } from 'antd'
import { useState } from 'react'

const ReturnOrderButton = ({ order, currentStatus }: any) => {
  const [loading, setLoading] = useState(false) // Trạng thái loading
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<{ file: File; name: string } | null>(null)
  const [form] = Form.useForm()

  // API mutation để gửi yêu cầu hoàn trả
  const { mutate } = useMutation({
    mutationFn: async (returnData: any) => {
      setLoading(true) // Bật trạng thái loading khi bắt đầu
      try {
        const response = await instance.post('/orders/return', returnData)
        message.success('Gửi yêu cầu hoàn trả đơn hàng thành công')
        setTimeout(() => {
          window.location.reload() // Tự động làm mới trang
        }, 1500) // Đợi 1.5 giây trước khi làm mới trang
        return response
      } catch (error) {
        message.error('Có lỗi xảy ra khi hoàn trả đơn hàng')
      } finally {
        setLoading(false) // Tắt trạng thái loading khi hoàn tất
      }
    }
  })

  const handleReturnOrder = async () => {
    setLoading(true) // Bật trạng thái loading
    try {
      // Validate form
      await form.validateFields()

      // Lấy dữ liệu form
      const values = form.getFieldsValue()

      // Upload ảnh lên Cloudinary (nếu có)
      const imageUrl = image ? await uploadFileCloudinary(image.file) : ''

      // Tạo đối tượng dữ liệu gửi API
      const returnData = {
        order_id: order._id,
        reason: values.reason,
        customer_name: values.customer_name,
        phone_number: values.phone_number,
        images: imageUrl ? [imageUrl] : []
      }

      // Gọi API hoàn trả đơn hàng
      mutate(returnData)

      setIsModalOpen(false) // Tắt modal sau khi hoàn thành
      form.resetFields() // Xóa dữ liệu form
      setImage(null) // Xóa ảnh đã tải lên
    } catch (error) {
      message.error('Lỗi khi gửi yêu cầu hoàn trả')
      console.error('Lỗi khi gửi yêu cầu hoàn trả:', error)
    } finally {
      setLoading(false) // Tắt trạng thái loading
    }
  }

  return (
    <>
      <Button
        className='bg-yellow-500 text-white w-full sm:w-auto'
        disabled={currentStatus === 'Returning' || order?.status !== 'Delivered'}
        onClick={() => setIsModalOpen(true)}
      >
        Hoàn trả đơn hàng
      </Button>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={() => form.submit()} // Submit form qua Ant Design
          >
            Gửi yêu cầu hoàn trả
          </Button>
        ]}
      >
        <h2 className='text-xl font-bold'>Yêu cầu hoàn trả đơn hàng</h2>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleReturnOrder} // Sử dụng hàm handleReturnOrder khi submit
        >
          <Form.Item
            name='reason'
            label='Lý do hoàn trả'
            rules={[{ required: true, message: 'Vui lòng nhập lý do hoàn trả' }]}
          >
            <Input.TextArea placeholder='Nhập lý do hoàn trả' />
          </Form.Item>

          <Form.Item
            name='customer_name'
            label='Tên khách hàng'
            rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
          >
            <Input placeholder='Nhập tên khách hàng' />
          </Form.Item>

          <Form.Item
            name='phone_number'
            label='Số điện thoại'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder='Nhập số điện thoại' />
          </Form.Item>

          <Form.Item label='Ảnh minh chứng'>
            <Upload
              beforeUpload={(file) => {
                setImage({ file, name: file.name })
                return false // Ngăn việc tải lên tự động
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Thêm ảnh</Button>
            </Upload>
            {image && (
              <div className='mt-2'>
                <span>{image.name}</span>
                <img
                  src={URL.createObjectURL(image.file)}
                  alt='image'
                  style={{ width: '100%', maxWidth: '300px', marginTop: '10px' }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ReturnOrderButton
