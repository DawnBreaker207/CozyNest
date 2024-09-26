import { FaRegEye } from 'react-icons/fa'
import CouponCard from '../../cart/_components/CouponCard'
import { Cart } from '@/components/icons/index'
import { useState } from 'react'
import { GrFormNext } from 'react-icons/gr'
import { GrFormPrevious } from 'react-icons/gr'
const ProductDetail = () => {
  const [count, setCount] = useState(1)

  const increase = () => {
    if (count < 10) setCount(count + 1)
  }

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Hàm tính toán chiều cao của phần mô tả
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  const couponCode1 = 'A87TYRT55'
  const couponCode2 = 'QH5G8J0Y'
  const couponCode3 = 'A789UYT'

  // const [image, setImage] = useState('https://via.placeholder.com/500')
  const thumbnails = [
    'https://product.hstatic.net/200000796751/product/422809995_713194157568384_6066714952149197999_n_fca580eb5d5c4f9a9b1ba222f6d061bf_master.jpg',
    'https://product.hstatic.net/200000796751/product/bo-am-tra-black-white_9ae77aee5b7545b78cff8fc15c191afe_master.jpg',
    'https://product.hstatic.net/200000796751/product/kdp_4235_b09fff3d8f994eb486d4d13720ac3b25_master.jpg',
    'https://product.hstatic.net/200000796751/product/kdp_4043_b446b2e4562f4094be3f41b12de94bc2_master.jpg',
    'https://product.hstatic.net/200000796751/product/kdp_4024_a5f92c669d29451cb5dd534db79d4966_master.jpg',
    'https://product.hstatic.net/200000796751/product/kdp_4025_ff16975890de4709a9535fbfb02f96e9_master.jpg'
  ]

  const fb = 'https://png.pngtree.com/element_our/sm/20180515/sm_5afaf0c36298b.jpg'
  const link =
    'https://media.istockphoto.com/id/1302329383/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-hai-chu%E1%BB%97i-li%C3%AAn-k%E1%BA%BFt-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%C3%ADnh-k%C3%A8m-kh%C3%B3a.jpg?s=612x612&w=0&k=20&c=gmc2ecGI6aJlcPdiT98vTRYChEt59P5SMdihgaZpCzs='
  const twitter = 'https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-twitter-inkythuatso-2-01-27-10-22-11.jpg'
  const mess = 'https://png.pngtree.com/png-clipart/20190303/ourmid/pngtree-messenger-logo-icon-png-image_771438.jpg'
  const chat = 'https://png.pngtree.com/element_our/sm/20180521/sm_5b02f93af13fd.jpg'
  const [activeImageIndex, setActiveImageIndex] = useState(0) // Quản lý trạng thái ảnh hiện tại
  return (
    <>
      {/* <div className='bg-gray-100 container'> */}
      <div className='lg:flex mt-16'>
        <div
          className={`btn-0 max-w-[93.75vw]   bg-white lg:flex justify-center py-[20px] w-full mx-auto box-border lg:scale-up`}
        >
          <div
            className={`img lg:ml-[-10px] flex flex-col md:flex-row w-full max-w-[616.5px] h-full sticky top-[20px]`}
          >
            {/* List of Thumbnails */}
            <div className='lg:ml-[0.5208333333333334vw] flex flex-wrap md:flex-col mr-[10px] img-small-1'>
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Product Thumbnail ${index + 1}`}
                  className='w-[65px] h-[65px] mb-[10px] cursor-pointer img-small'
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>

            <div className='relative mx-auto lg:mx-0 big-img  w-[85vw] h-[85vw] md:w-[532px] md:h-[532px] block overflow-hidden'>
              <div
                className='flex  lg:mx-auto transition-transform duration-1000 ease-in-out'
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                {thumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
                    alt={`Product Image ${index + 1}`}
                    className='w-full h-full object-contain' // Keep image aspect ratio and fit within container
                  />
                ))}
              </div>

              <span className='w-[50px] h-[55px] absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[18px] rounded rounded-b-lg'>
                -29% OFF
              </span>

              {/* Back Button */}
              <button
                className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2'
                onClick={() => setActiveImageIndex((activeImageIndex - 1 + thumbnails.length) % thumbnails.length)}
              >
                <GrFormPrevious className='w-[35px] h-[35px]' />
              </button>

              {/* Next Button */}
              <button
                className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2'
                onClick={() => setActiveImageIndex((activeImageIndex + 1) % thumbnails.length)}
              >
                <GrFormNext className='w-[35px] h-[35px]' />
              </button>
            </div>

            {/* Share Section */}
            <div className='hidden share md:flex  lg:ml-[-440px]  z-50 items-center p-2'>
              <span className='mr-2'>Chia sẻ:</span>
              <img src={fb} className='w-[35px] h-[35px] ml-2' />
              <img src={mess} className='w-[35px] h-[35px] ml-2' />
              <img src={twitter} className='w-[35px] h-[35px] ml-2' />
              <img src={chat} className='w-[35px] h-[35px] ml-2' />
              <img src={link} className='w-[35px] h-[35px] ml-2' />
            </div>
          </div>
        </div>
        <div className='info max-w-[850px] w-[100%]'>
          <div className=' mx-[20px]'>
            <div className='ml-[0.9765625vw]'>
              <div className='product-heading'>
                <h1 className='text-red-500 font-bold text-[28px]'>
                  Bộ ấm trà bằng sứ BLACK &amp; WHITE hoa văn đen trắng
                </h1>
                <div className='flex gap-[30px]'>
                  <span id='pro_sku'>
                    Mã sản phẩm: <strong className='text-red-500'>2001256</strong>
                  </span>
                  <span className='pro-soldold'>
                    Tình trạng: <strong className='text-red-500'>Còn hàng</strong>
                  </span>
                  <span className='pro-vendor'>
                    Thương hiệu:{' '}
                    <strong className='text-red-500'>
                      <a title='Show vendor' href='/collections/vendors?q=black-white'>
                        BLACK WHITE
                      </a>
                    </strong>
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className='price w-full max-w-[720px] bg-gray-100 p-2 flex justify-start items-center mt-[30px]'>
                <span className='name-price text-[19px] mr-[30px] font-bold'>Giá:</span>
                <div className='pricedetail flex flex-row items-center gap-2 ml-[5.2734375vw]'>
                  <span className='text-[#FF0000] font-semibold text-[24px]'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[16px]'>1,250,000₫</span>

                  {/* Phần Giảm Giá */}
                  <span className='bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>-29%</span>
                </div>
              </div>

              {/* Quantity Section */}
              <div className='btn_1'>
                <div className='quantity-container flex items-center' style={{ marginTop: '30px' }}>
                  <h2 className='font-bold mr-[10px]'>Số lượng:</h2>
                  <div className='products-btn__count flex items-center justify-between rounded p-[5px] min-w-[120px] border border-gray-300'>
                    <button className='minus text-[16px] p-[10px]' onClick={decrease}>
                      -
                    </button>
                    <span className='font-bold'>{count}</span>
                    <button className='plus text-[16px] p-[10px]' onClick={increase}>
                      +
                    </button>
                  </div>
                </div>
                <div className='button-container'>
                  <div className='button-container flex gap-[12px] mt-[22px]'>
                    <button className='products__btn flex items-center justify-center relative z-10  btn1 hover:text-white bg-white max-w-[380px] w-[100%] h-[50px] border-2 border-red-500 text-red-500 overflow-hidden transition-colors duration-400 ease-in-out'>
                      <span className='relative z-10 text-[16px]'>Thêm Vào Giỏ</span>
                    </button>
                    <button className='products__btn flex items-center justify-center relative z-10 btn2 hover:text-white bg-white max-w-[380px] w-[100%] h-[50px] border-2 border-red-500 text-red-500 overflow-hidden transition-colors duration-400 ease-in-out'>
                      <span className='relative z-10'>Mua Ngay</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Delivery Section */}
              <div className='product-delivery p-[10px]'>
                <div className='flex gap-4 mt-[10px]'>
                  <div className='flex items-center'>
                    <img
                      src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_1_ico.png?v=38'
                      alt='1 Năm Bảo Hành'
                      className='w-[30px] h-auto mr-[10px]'
                    />
                    1 Năm Bảo Hành
                  </div>
                  <div className='flex items-center'>
                    <img
                      src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_2_ico.png?v=38'
                      alt='Hỗ trợ đổi trong 3 ngày'
                      className='w-[30px] h-auto mr-[10px]'
                    />
                    Hỗ trợ đổi trong 3 ngày
                  </div>
                  <div className='flex items-center'>
                    <img
                      src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_3_ico.png?v=38'
                      alt='Hotline: 1900 63 64 76'
                      className='w-[30px] h-auto mr-[10px]'
                    />
                    Hotline: <strong>1900 63 64 76</strong>
                  </div>
                </div>
              </div>
              <hr className='h-[1px] bg-black mt-[1.7615176151761518vh] border-none my-5' />

              {/* Coupon Section */}
              <div className='lg:flex   lg:flex-wrap  lg:space-x-0  lg:gap-4 mt-[10px]'>
                <div className='coupon w-1/2,5 lg:w-[48%]'>
                  <CouponCard
                    couponCode={couponCode1}
                    imageUrl='./src/assets/images/coupon/coupon_2_img.webp'
                    expirationDate='10/10/2024'
                    title='Miễn phí vận chuyển'
                    description='Đơn hàng từ 300k'
                    condition='Dành cho đơn hàng từ 300k'
                  />
                </div>
                <div className='coupon w-1/2,5 lg:w-[48%]'>
                  <CouponCard
                    couponCode={couponCode2}
                    imageUrl='./src/assets/images/coupon/coupon_1_img.webp'
                    expirationDate='10/10/2024'
                    title='Giảm 20%'
                    description='Đơn hàng từ 200k'
                    condition='Dành cho đơn hàng từ 200k'
                  />
                </div>
                <div className='coupon w-1/2,5 lg:w-[48%]'>
                  <CouponCard
                    couponCode={couponCode3}
                    imageUrl='./src/assets/images/coupon/coupon_3_img.webp'
                    expirationDate='10/10/2024'
                    title='Giảm 10%'
                    description='Đơn hàng từ 100k'
                    condition='Dành cho đơn hàng từ 100k'
                  />
                </div>
              </div>
              <hr className='h-[1px] bg-black mt-[2.710027100271003vh] border-none my-5' />

              {/* Product Description */}
              <div
                className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'min-h-[230px]' : 'min-h-[420px]'}  overflow-hidden mt-[10px]`}
              >
                <div className='productDetail--navs mg-top mt-[15px]'>
                  <div className='nav tab-title'>
                    <b className='nav-item active text-[24px] text-red-500'>Mô tả sản phẩm</b>
                  </div>
                  <hr className='mb-[20px]' />
                  <div className={`tab-pane fade show active ${isCollapsed ? 'h-[250px]' : 'h-auto'} transition-all`}>
                    <div
                      className={`description-productdetail overflow-hidden ${isCollapsed ? 'max-h-[180px]' : 'max-h-none'} transition-all`}
                    >
                      <p>
                        Như cái tên “ Black &amp; White” đã thể hiện lên tông màu chủ đạo của bộ sưu tập này chỉ với hai
                        màu đen và trắng kết hợp, sản phẩm đã toát lên vẻ đẹp thuần khiết, phóng khoáng pha chút huyền
                        bí và sang trọng. Theo phong cách này, khách sử dụng dễ bày biện, trang trí, đặt đồ ăn lên trên.
                        Sản phẩm được làm từ chất liệu sứ đảm bảo an toàn cho sức khỏe người dùng, dễ dàng bảo quản,
                        tiện lợi khi sử dụng.
                      </p>
                      <p>--------------</p>
                      {/* More product description details */}
                      <table className='table-auto w-full border-collapse mt-[10px]'>
                        <tbody>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Sản phẩm
                            </th>
                            <td className=''>Bộ ấm trà</td>
                          </tr>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Bộ sưu tập
                            </th>
                            <td className=''>BLACK-&amp;-WHITE</td>
                          </tr>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Kích cỡ
                            </th>
                            <td className=''>H6.5XDia12.5; L20xW11xH15 ∙ 6 cups</td>
                          </tr>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Màu sắc
                            </th>
                            <td className=''>Màu trắng/ màu đen</td>
                          </tr>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Chất liệu
                            </th>
                            <td className=''>Sứ</td>
                          </tr>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Xuất xứ
                            </th>
                            <td className=''>Trung Quốc</td>
                          </tr>
                          <tr>
                            <th scope='row' className='btn-th text-left align-top pr-12'>
                              Đơn vị
                            </th>
                            <td className=''>SET</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='description-btn flex justify-center mt-[10px]'>
                    <button
                      className={`expandable-content_toggle ${isCollapsed ? 'border border-red-500 text-red-500' : 'text-red-500'} p-2 rounded-md`}
                      onClick={handleToggleCollapse}
                    >
                      {isCollapsed ? '+ Xem thêm' : '- Rút gọn nội dung'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='bg-white h-[auto] max-w-[1519px] cata'
        style={{ padding: '20px', width: '100%', margin: '1px auto' }}
      >
        <div className='ml-[2.808988764044944vw] container'>
          <h1 className='text-red-500 font-bold text-[25px] mb-[20px]'>Xem thêm sản phẩm cùng loại</h1>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 mx-8'>
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <div className='relative'>
                <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                  <img src='./src/assets/images/product/sp1.webp' alt='' className='object-cover' />
                  <img src='./src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 bg-white'>
              <div className='relative'>
                <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                  <img src='./src/assets/images/product/sp1.webp' alt='' className='object-cover' />
                  <img src='./src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 bg-white'>
              <div className='relative'>
                <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                  <img src='./src/assets/images/product/sp1.webp' alt='' className='object-cover' />
                  <img src='./src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='ml-[2.808988764044944vw] mt-[60px] h-[600px] container'>
          <h1 className='text-red-500 font-bold text-[25px] mb-[20px]'>Sản phẩm đã xem</h1>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 mx-8'>
            <div className='group overflow-hidden hover:shadow-lg rounded-lg pb-3 bg-white'>
              <div className='relative'>
                <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                  <img src='./src/assets/images/product/sp1.webp' alt='' className='object-cover' />
                  <img src='./src/assets/images/product/sp1.2.webp' alt='' className='object-cover' />
                </div>
                <FaRegEye
                  className='absolute left-[40%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                  title='Xem nhanh'
                />
                <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                  -29%
                </span>
              </div>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>Ấm trà inox không ghỉ</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>1,250,000₫</span>
                </div>
                <button className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'>
                  <span className='text-[12px] uppercase font-semibold text-ellipsis '>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default ProductDetail
