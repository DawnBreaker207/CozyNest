/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from '@/configs/axios'
import { uploadFileCloudinary } from '@/hooks/uploadCloudinary'
import { CheckCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message, Modal, Upload } from 'antd'
import { useState } from 'react'

const RefundOrderButton = ({ order, currentStatus }: any) => {
  const [loading, setLoading] = useState(false) // Trạng thái loading
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [image, setImage] = useState<{ file: File; name: string } | null>(null)
  const [form] = Form.useForm()

  // API mutation để gửi yêu cầu hoàn trả
  const { mutate } = useMutation({
    mutationFn: async (refundData: any) => {
      setLoading(true) // Bật trạng thái loading khi bắt đầu
      try {
        const response = await instance.post('/orders/refund', refundData)
        Modal.confirm({
          title: 'Yêu cầu hoàn tiền của đơn hàng',
          content: `Yêu cầu hoàn tiền của đơn hàng ${response?.data?.res?._id} đã thành công. Số tiền sẽ được hoàn lại trong thời gian sớm nhất. Cảm ơn quý khách đã sử dụng dịch vụ của CozyNest!`,
          icon: <CheckCircleOutlined style={{ color: 'green', fontSize: '30px' }} />,
          onOk: () => {
            window.location.reload()
          },
          onCancel: () => {
            window.location.reload()
          },
          onClose: () => {
            // Tự động reload sau khi tắt modal (OK hoặc Cancel)
            window.location.reload()
          }
        })
        return response
      } catch (error) {
        message.error('Có lỗi xảy ra khi yêu cầu hoàn tiền')
      } finally {
        setLoading(false) // Tắt trạng thái loading khi hoàn tất
      }
    }
  })

  const handleRefundOrder = async () => {
    setLoading(true) // Bật trạng thái loading
    try {
      // Validate form
      await form.validateFields()

      // Lấy dữ liệu form
      const values = form.getFieldsValue()

      // Upload ảnh lên Cloudinary (nếu có)
      const imageUrl = image ? await uploadFileCloudinary(image.file) : ''

      // Tạo đối tượng dữ liệu gửi API
      const refundData = {
        order_id: order._id,
        bank_number: values.bank_number,
        bank_name: values.bank_name,
        customer_name: values.customer_name,
        phone_number: values.phone_number,
        images: imageUrl ? [imageUrl] : []
      }

      // Gọi API hoàn trả đơn hàng
      mutate(refundData)

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
  console.log('order:', order)
  console.log('order.status:', order?.status)
  console.log('order.payment_status:', order?.payment_status)

  return (
    <>
      <Button
        className='bg-yellow-500 text-white w-full sm:w-auto'
        disabled={
          currentStatus === 'Refunding' ||
          !(order?.status === 'Returned' || order?.status === 'Cancelled') ||
          order?.payment_status !== 'Paid'
        }
        onClick={() => setIsModalOpen(true)}
      >
        Yêu cầu hoàn tiền
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
            Gửi yêu cầu hoàn tiền
          </Button>
        ]}
      >
        <h2 className='text-xl font-bold'>Yêu cầu hoàn tiền đơn hàng</h2>
        <Form
          form={form}
          layout='vertical'
          onFinish={handleRefundOrder} // Sử dụng hàm handleReturnOrder khi submit
        >
          <Form.Item
            name='bank_number'
            label='Số Tài Khoản Thụ Hưởng'
            rules={[
              { required: true, message: 'Vui lòng nhập số tài khoản' },
              { pattern: /^[0-9]+$/, message: 'Số tài khoản phải là số' }
            ]}
          >
            <Input placeholder='Nhập số tài khoản thụ hưởng' />
          </Form.Item>
          <Form.Item
            name='bank_name'
            label='Tên Ngân Hàng Thụ Hưởng'
            rules={[{ required: true, message: 'Vui lòng nhập chính xác tên ngân hàng thụ hưởng' }]}
          >
            <Input placeholder='Nhập tên ngân hàng thụ hưởng' />
          </Form.Item>
          <Form.Item
            name='customer_name'
            label='Tên Tài Khoản Ngân Hàng Thụ Hưởng'
            rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản ngân hàng' }]}
          >
            <Input placeholder='Nhập tên tài khoản ngân hàng' />
          </Form.Item>

          <Form.Item
            name='phone_number'
            label='Số điện thoại'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder='Nhập số điện thoại' />
          </Form.Item>

          <Form.Item label='Ảnh Mã QR Ngân Hàng (Nếu Có)'>
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

export default RefundOrderButton
