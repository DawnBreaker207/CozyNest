import { Tooltip } from 'antd'
import { useState } from 'react'

interface CouponCardProps {
  couponCode: string
  imageUrl: string
  expirationDate: string
  title: string
  description: string
  condition: string
}

const CouponCard = ({ couponCode, imageUrl, expirationDate, title, description, condition }: CouponCardProps) => {
  const [copyText, setCopyText] = useState('Sao chép mã')

  const copyToClipboard = (code: string) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopyText('Đã sao chép')
        setTimeout(() => {
          setCopyText('Sao chép mã')
        }, 2000)
      })
      .catch((err) => {
        console.error('Error copying text: ', err)
      })
  }

  return (
    <div className='mt-4 grid grid-cols-10 border border-gray-200 rounded-2xl p-2 items-center gap-4 lg:w-full w-50%'>
      <div className='p-2 col-span-3 mx-auto'>
        <img src={imageUrl} alt='' className='w-[68px]' />
      </div>
      <div className='flex flex-col gap-4 col-span-7'>
        <div className='flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-sm font-bold'>{title}</span>
            <span className='text-xs font-medium'>{description}</span>
          </div>
          <Tooltip
            title={
              <div className='flex flex-col gap-5 px-3 py-4'>
                <div className='grid grid-cols-2 items-center'>
                  <span className='text-sm text-[#787878]'>Mã</span>
                  <span className='text-sm font-bold flex items-center gap-1 cursor-pointer'>
                    {couponCode}
                    <span
                      className='cpi-trigger border border-gray-200 rounded-full'
                      onClick={() => copyToClipboard(couponCode)} // Gọi hàm sao chép
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
                        <g fill='none' stroke='#007aff'>
                          <rect width='9' height='13' x='6.5' y='6.5' rx='1.5' />
                          <path d='M8.5 6A1.5 1.5 0 0 1 10 4.5h6A1.5 1.5 0 0 1 17.5 6v10a1.5 1.5 0 0 1-1.5 1.5' />
                        </g>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className='grid grid-cols-2 items-center'>
                  <span className='text-sm text-[#787878]'>Hạn sử dụng</span>
                  <span className='text-sm font-medium'>{expirationDate}</span>
                </div>
                <div className='flex flex-col'>
                  <p className='flex items-center'>
                    <div className='size-[6px] min-h-[6px] min-w-[6px] bg-black rounded-full mr-2'></div>
                    {condition}
                  </p>
                  <p className='flex items-center'>
                    <div className='size-[6px] min-h-[6px] min-w-[6px] bg-black rounded-full mr-2'></div>Mỗi khách hàng
                    được sử dụng tối đa 1 lần.
                  </p>
                  <p className='flex items-center'>
                    <div className='size-[6px] min-h-[6px] min-w-[6px] bg-black rounded-full mr-2'></div>Sao chép mã và
                    nhập mã khuyến mãi ở trang thanh toán
                  </p>
                </div>
              </div>
            }
            placement='bottom'
            overlayClassName='custom-tooltip'
          >
            <img src='./src/assets/icon/info.svg' alt='' className='size-5' />
          </Tooltip>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <span className='text-xs font-medium'>
              Mã: <span className='text-xs font-bold'>{couponCode}</span>
            </span>
            <span className='text-xs font-medium'>HSD: {expirationDate}</span>
          </div>
          <button
            className='uppercase text-[10px] font-semibold bg-[#fca120] text-white rounded-full px-2 py-[2px] outline-none'
            onClick={() => copyToClipboard(couponCode)}
          >
            {copyText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CouponCard
