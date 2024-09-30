import { Form, Input, Select, Button, Upload, Checkbox } from 'antd'
import { CaretRightOutlined, CloseOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Option } = Select
type FieldType = {
  name?: string
  price?: string
  description?: string
  category?: string
  tags?: string
  image?: string
}
const ProductAddPage = () => {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values)
  }

  return (
    <>
      <div className='bg-white rounded-lg '>
        <Form layout='vertical' onFinish={onFinish}>
          <div className='flex justify-between'>
            <div>
              <span className='text-[#3A5BFF]'>Product</span> <CaretRightOutlined /> <span>Add Product</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Button icon={<CloseOutlined />} className='text-[#858D9D] border border-gray-400 hover:bg-gray-200'>
                <Link to={`/admin/products`}>Cancel</Link>
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                icon={<PlusOutlined />}
                className='bg-blue-500 hover:bg-blue-600'
              >
                Add Product
              </Button>
            </div>
          </div>
          <div className='flex justify-between mt-5'>
            <div className='w-[75%] pr-4'>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>General Information</h1>
              <Form.Item<FieldType> label='Product Name' name='name'>
                <Input placeholder='Type product name here. . .' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <Form.Item<FieldType> label='Description' name='description'>
                <Input.TextArea
                  rows={4}
                  placeholder='Type product description here. . .'
                  className='w-full bg-[#F9F9FC]'
                />
              </Form.Item>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-2'>Media</h1>
              <Form.Item<FieldType> label='Photo' name='image'>
                <Upload.Dragger name='files' action='/upload.do'>
                  <p className='ant-upload-drag-icon'>
                    <InboxOutlined />
                  </p>
                  <p className='text-[#858D9D] '>Drag and drop image here, or click add image</p>
                  <Button className='bg-[#3A5BFF26] text-[#3A5BFF] mt-4 font-semibold'>Add Image</Button>
                </Upload.Dragger>
              </Form.Item>
              <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Pricing</h1>
              <Form.Item<FieldType> label='Base Price' name='name'>
                <Input placeholder='$ Type base price here. . .' className='w-full bg-[#F9F9FC]' />
              </Form.Item>
              <div className='flex'>
                <div className='w-[50%]'>
                  <Form.Item<FieldType> label='Discount Type' name='category'>
                    <Select placeholder='Select a discount type' className='w-full'>
                      <Option value='category1'>Discount 1</Option>
                      <Option value='category2'>Discount 2</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item<FieldType> label='Tax Class' name='tags'>
                    <Select placeholder='Select a tax class' className='w-full'>
                      <Option value='tag1'>Tag 1</Option>
                      <Option value='tag2'>Tag 2</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className='w-[50%] pl-4'>
                  <Form.Item<FieldType> label='Discount Precentage (%)' name='category'>
                    <Input placeholder='Type discount precentage. . .' className='w-full bg-[#F9F9FC]' />
                  </Form.Item>
                  <Form.Item<FieldType> label='VAT Amount (%)' name='tags'>
                    <Input placeholder='Type VAT amount. . .' className='w-full bg-[#F9F9FC]' />
                  </Form.Item>
                </div>
              </div>
              <div className=''>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Inventory</h1>
                <div className='flex space-x-4'>
                  <div className='w-[33%]'>
                    <Form.Item<FieldType> label='SKU' name='name'>
                      <Input placeholder='Type product SKU here. . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                  <div className='w-[33%]'>
                    <Form.Item<FieldType> label='Barcode' name='name'>
                      <Input placeholder='Product barcode. . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                  <div className='w-[33%]'>
                    <Form.Item<FieldType> label='Quantity' name='name'>
                      <Input placeholder='Type product quantity here. . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className=''>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Variation</h1>
                <div className='flex'>
                  <div className='w-[45%]'>
                    <Form.Item<FieldType> label='Variation Type' name='category'>
                      <Select placeholder='Select a variation' className='w-full '>
                        <Option value='category1'>variation 1</Option>
                        <Option value='category2'>variation 2</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item<FieldType> label='Variation Type' name='category'>
                      <Select placeholder='Select a variation' className='w-full '>
                        <Option value='category1'>variation 1</Option>
                        <Option value='category2'>variation 2</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className='w-[45%] pl-4'>
                    <Form.Item<FieldType> label='Variation' name='category'>
                      <Input placeholder='Variation. . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                    <Form.Item<FieldType> label='Variation' name='category'>
                      <Input placeholder='Variation. . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                </div>
                <Button className='bg-[#3A5BFF26] text-[#3A5BFF]'>
                  <PlusOutlined />
                  Add Variant
                </Button>
              </div>
              <div className='mt-10'>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Shipping</h1>
                <Form.Item name='' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                  <Checkbox className='-ml-[295px] '>This is a physical product</Checkbox>
                </Form.Item>
                <div className='flex space-x-4'>
                  <div className='w-[24%]'>
                    <Form.Item<FieldType> label='Weight' name='name'>
                      <Input placeholder='Product weight. . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                  <div className='w-[24%]'>
                    <Form.Item<FieldType> label='Height' name='name'>
                      <Input placeholder='Height (cm). . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                  <div className='w-[24%]'>
                    <Form.Item<FieldType> label='Length' name='name'>
                      <Input placeholder='Length (cm). . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                  <div className='w-[24%]'>
                    <Form.Item<FieldType> label='Width' name='name'>
                      <Input placeholder='Width (cm). . .' className='w-full bg-[#F9F9FC]' />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-[20%]'>
              <div>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Category</h1>
                <Form.Item<FieldType> label='Product Category' name='category'>
                  <Select placeholder='Select category' className='w-full'>
                    <Option value='category1'>Category 1</Option>
                    <Option value='category2'>Category 2</Option>
                  </Select>
                </Form.Item>
                <Form.Item<FieldType> label='Product Tags' name='tags'>
                  <Select mode='multiple' placeholder='Select tags' className='w-full'>
                    <Option value='tag1'>Tag 1</Option>
                    <Option value='tag2'>Tag 2</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <h1 className='text-[18px] text-[#353535] font-semibold mb-6'>Status</h1>
                <Form.Item label='Product Status' name=''>
                  <Select placeholder='Draft' className='w-full'>
                    <Option value='category1'>Category 1</Option>
                    <Option value='category2'>Category 2</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default ProductAddPage