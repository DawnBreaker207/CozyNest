import { QuestionCircleOutlined, GiftOutlined, CreditCardOutlined, ReloadOutlined } from '@ant-design/icons'

const Contactfour = () => {
  const Contactfours = [
    {
      icon: <QuestionCircleOutlined className='text-xl text-gray-600' />,
      title: 'Hỗ trợ 24/7',
      description: 'Hotline hỗ trợ 1900.000.XXX'
    },
    {
      icon: <GiftOutlined className='text-xl text-gray-600' />,
      title: 'Giao hàng miễn phí',
      description: 'Thời gian giao hàng nhanh chóng, từ 3 - 5 ngày làm việc'
    },
    {
      icon: <CreditCardOutlined className='text-xl text-gray-600' />,
      title: 'Thanh toán đa dạng',
      description: 'Chấp nhận thanh toán COD, Momo, Banking'
    },
    {
      icon: <ReloadOutlined className='text-xl text-gray-600' />,
      title: 'Đổi trả hàng dễ dàng',
      description: 'Thời gian trả hàng lên tới 30 ngày'
    }
  ]

  return (
    <div className='bg-white py-10 grid grid-cols-2 container mx-auto md:grid-cols-4 gap-4 p-2 text-center mb-10'>
      {Contactfours.map((Contactfour, index) => (
        <div key={index}>
          <div className='flex justify-center mb-4 p-4'>
            <div className='w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full'>
              {Contactfour.icon}
            </div>
          </div>
          <h3 className='text-orange-500 text-lg'>{Contactfour.title}</h3>
          <p className='text-gray-600'>{Contactfour.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Contactfour
