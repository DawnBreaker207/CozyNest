import instance from '@/configs/axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, FormProps, Input, InputNumber, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

type Props = {}
type FieldType = {
  price?: number
  stock?: string
  price_before_discount?: number
  price_discount_percent?: number
}

const UpdateVariant = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const { product_id, sku_id } = useParams()
  const [form] = Form.useForm()
  const { data, isLoading } = useQuery({
    queryKey: ['product', product_id],
    queryFn: () => instance.get(`/variants/${product_id}`)
  })
  const { mutate } = useMutation({
    mutationFn: async (formData: FieldType) => {
      try {
        return instance.put(`/variants/${product_id}/${sku_id}`, formData)
      } catch (error) {
        throw new Error('Cập nhật sản phẩm biến thể')
      }
    },
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật sản phẩm thành công'
      })
      queryClient.invalidateQueries({
        queryKey: ['product']
      })
    },
    onError: (error) => {
      messageApi.open({
        type: 'error',
        content: error.message
      })
    }
  })
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    mutate(values)
  }
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      {contextHolder}
      <div className='flex item-center justify-between'>
        <h1>Cập nhật sản phẩm</h1>
        <Link to={`/admin/variants/products/${product_id}/variants`}>
          <Button>Quay lại</Button>
        </Link>
      </div>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...data?.data }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Số lượng'
          name='stock'
          rules={[{ required: true, message: 'Không được bỏ trống!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá'
          name='price'
          rules={[
            { required: true, message: 'Không được bỏ trống!' },
            { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType>
          label='Giá cũ'
          name='price_before_discount'
          rules={[
            { required: true, message: 'Không được bỏ trống!' },
            { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item<FieldType> label='Giảm giá' name='price_discount_percent'>
          <Input />
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
