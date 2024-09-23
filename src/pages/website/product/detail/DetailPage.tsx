// import './css.css'
import { FaRegEye } from 'react-icons/fa'
import CouponCard from '../../cart/_components/CouponCard'
import { Shoppingcart } from '@/components/icons'
import { useState } from 'react'
import { FcNext } from 'react-icons/fc'
import { MdOutlineArrowBackIos } from 'react-icons/md'
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

  // const fb = "../image/pngtree-facebook-social-media-icon-facebook-logo-png-image_3654772.png"
  // const link = "../image/pngtree-vector-link-icon-png-image_322157.jpg"
  // const twitter = "../image/sm_5aeee44e137e1.jpg"
  // const mess = "../image/sm_5aff608b8cae5.jpg"
  // const chat = '../image/sm_5b321c98efaa6.jpg'
  const [activeImageIndex, setActiveImageIndex] = useState(0) // Quản lý trạng thái ảnh hiện tại
  return (
    <>
      <div
        className='bg-gray-100'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div
          className='bg-white ml-[15px] flex'
          style={{
            width: '616.5px',
            height: '582px',
            position: 'sticky',
            top: '20px'
          }}
        >
          {/* List ảnh nhỏ */}
          <div className='ml-[8px] flex flex-col mr-[10px]'>
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Product Thumbnail ${index + 1}`}
                className='w-[66px] h-[66px] mb-[10px] cursor-pointer'
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>

          {/* Ảnh chính của sản phẩm */}
          <div className='relative w-[532px] h-[532px] overflow-hidden'>
            <div
              className='flex transition-transform duration-1000 ease-in-out'
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {thumbnails.map((thumbnail, index) => (
                <img key={index} src={thumbnail} alt={`Product Image ${index + 1}`} className='w-full h-full' />
              ))}
            </div>
            <span className='w-[50px] h-[55px] absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[18px] rounded rounded-b-lg'>
              -29% OFF
            </span>

            {/* Nút Back */}
            <button
              className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2'
              onClick={() => setActiveImageIndex((activeImageIndex - 1 + thumbnails.length) % thumbnails.length)}
            >
              <MdOutlineArrowBackIos className='w-[35px] h-[35px] text-blue-500' />
            </button>

            {/* Nút Next */}
            <button
              className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2'
              onClick={() => setActiveImageIndex((activeImageIndex + 1) % thumbnails.length)}
            >
              <FcNext className='w-[35px] h-[35px]' />
            </button>
          </div>
          {/* <div>
            <span>Chia sẻ</span>
            <img src={fb} />
            <img src={mess} />
            <img src={twitter} />
            <img src={chat} />
            <img src={link} />
          </div> */}
        </div>

        <div style={{ width: '800px' }}>
          <div className='bg-white ml-[-15px] mr-[15px]'>
            <div className='ml-[15px]'>
              <div className='product-heading'>
                <h1 className='text-red-500 font-bold text-[28px]'>
                  Bộ ấm trà bằng sứ BLACK &amp; WHITE hoa văn đen trắng
                </h1>
                <div style={{ display: 'flex', gap: '30px' }}>
                  <span id='pro_sku'>
                    Mã sản phẩm: <strong className='text-red-500'>2001256</strong>{' '}
                  </span>
                  <span className='pro-soldold'>
                    Tình trạng:
                    <strong className='text-red-500'>Còn hàng</strong>
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
              <div className='price' style={{ marginTop: '30px' }}>
                <span className='text-[19px] m-0 flex items-center mr-[150px] font-bold'>Giá:</span>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold text-[24px]'>890,000₫</span>
                  <span className='text-[#878c8f] font-light line-through text-[13px] text-[26px]'>1,250,000₫</span>
                </div>
              </div>

              <div className='btn_1'>
                <div className='quantity-container' style={{ marginTop: '30px' }}>
                  <h2 className='font-bold'>Số lượng:</h2>
                  <div className='products-btn__count'>
                    <button className='minus' onClick={decrease}>
                      -
                    </button>
                    <span className='font-bold'>{count}</span>
                    <button className='plus' onClick={increase}>
                      +
                    </button>
                  </div>
                </div>
                <div className='button-container'>
                  <div className='button-container'>
                    <button className='products__btn btn1 text-white'>
                      <span>Thêm Vào Giỏ</span>
                    </button>
                    <button className='products__btn btn2 bg-blue-600 text-white'>
                      <span>Mua Ngay</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className='product-deliverly mb-0'>
                <div className='deliverly-inner' style={{ marginTop: '10px' }}>
                  <div className='row m-0 infoList-deliverly'>
                    <div className='col-lg-4 col-md-6 col-12 deliverly-item'>
                      <span>
                        <img
                          className='ls-is-cached lazyloaded'
                          data-src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_1_ico.png?v=38'
                          src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_1_ico.png?v=38'
                          alt='1 Năm Bảo Hành'
                        />
                      </span>
                      1 Năm Bảo Hành
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 deliverly-item'>
                      <span>
                        <img
                          className='ls-is-cached lazyloaded'
                          data-src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_2_ico.png?v=38'
                          src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_2_ico.png?v=38'
                          alt='Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá'
                        />
                      </span>
                      Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá
                    </div>
                    <div className='col-lg-4 col-md-6 col-12 deliverly-item'>
                      <span>
                        <img
                          className='ls-is-cached lazyloaded'
                          data-src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_3_ico.png?v=38'
                          src='//theme.hstatic.net/200000796751/1001266995/14/product_deliverly_3_ico.png?v=38'
                          alt='Hotline: 1900 63 64 76(9-21h)'
                        />
                      </span>
                      Hotline: <strong>1900 63 64 76</strong> (9-21h)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap bg-white ml-[-15px] mr-[15px] min-h-[280px] mt-[10px]'>
            <div className='flex flex-wrap gap-4 mt-2 ml-3'>
              <div className='w-[48%]'>
                <CouponCard
                  couponCode={couponCode1}
                  imageUrl='./src/assets/images/coupon/coupon_2_img.webp'
                  expirationDate='10/10/2024'
                  title='Miễn phí vận chuyển'
                  description='Đơn hàng từ 300k'
                  condition='Dành cho đơn hàng từ 300k'
                />
              </div>
              <div className='w-[48%]'>
                <CouponCard
                  couponCode={couponCode2}
                  imageUrl='./src/assets/images/coupon/coupon_1_img.webp'
                  expirationDate='10/10/2024'
                  title='Giảm 20%'
                  description='Đơn hàng từ 200k'
                  condition='Dành cho đơn hàng từ 200k'
                />
              </div>
              <div className='w-[48%] mt-[-40px]'>
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
          </div>

          <div
            className={`transition-all duration-300 ease-in-out ${
              isCollapsed ? 'min-h-[230px]' : 'min-h-[420px]'
            } bg-white ml-[-15px] mr-[15px] mt-[15px] overflow-hidden`}
          >
            <div className='productDetail--navs mg-top mt-[15px] ml-[15px] ProductDetail'>
              <div className='nav tab-title' id='nav-tab' role='tablist'>
                <b className='nav-item active text-[24px] text-red-500' id='nav-home-tab' data-toggle='tab' role='tab'>
                  Mô tả sản phẩm
                </b>
              </div>
              <hr className='mb-[20px]' />
              <div className='tab-content' id='nav-tabContent'>
                <div
                  className={`tab-pane fade show active w-[758.5px] ${
                    isCollapsed ? 'h-[250px]' : 'h-auto'
                  } overflow-hidden transition-all duration-300 ease-in-out`}
                  id='nav-desc'
                  role='tabpanel'
                >
                  <div className='product-description'>
                    <div className='description-content expandable-toggle relative'>
                      <div
                        className={`description-productdetail w-[750px] overflow-hidden transition-all duration-300 ease-in-out ${
                          isCollapsed ? 'max-h-[180px]' : 'max-h-none'
                        }`}
                      >
                        <p>
                          Như cái tên “ Black &amp; White” đã thể hiện lên tông màu chủ đạo của bộ sưu tập này chỉ với
                          hai màu đen và trắng kết hợp, sản phẩm đã toát lên vẻ đẹp thuần khiết, phóng khoáng pha chút
                          huyền bí và sang trọng. Theo phong cách này, khách sử dụng dễ bày biện, trang trí, đặt đồ ăn
                          lên trên. Sản phẩm được làm từ chất liệu sứ đảm bảo an toàn cho sức khỏe người dùng, dễ dàng
                          bảo quản, tiện lợi khi sử dụng.
                        </p>
                        <p>----------</p>
                        <table id='product-attribute-specs-table' className='table-auto w-full border-collapse'>
                          <tbody>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Sản phẩm
                              </th>
                              <td className=''>Bộ ấm trà</td>
                            </tr>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Bộ sưu tập
                              </th>
                              <td className=''>BLACK-&amp;-WHITE</td>
                            </tr>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Kích cỡ
                              </th>
                              <td className=''>H6.5XDia12.5; L20xW11xH15 ∙ 6 cups</td>
                            </tr>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Màu sắc
                              </th>
                              <td className=''>Màu trắng/ màu đen</td>
                            </tr>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Chất liệu
                              </th>
                              <td className=''>Sứ</td>
                            </tr>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Xuất xứ
                              </th>
                              <td className=''>Trung Quốc</td>
                            </tr>
                            <tr>
                              <th scope='row' className='text-left align-top pr-12'>
                                Đơn vị
                              </th>
                              <td className=''>SET</td>
                            </tr>
                          </tbody>
                        </table>
                        ----------
                      </div>
                    </div>
                  </div>
                  <div className='description-btn flex justify-center mt-4'>
                    <button
                      className={`expandable-content_toggle js_expandable_content btn-closemore ${
                        isCollapsed
                          ? 'border border-red-500 text-red-500' // Thêm viền và màu chữ đỏ cho "Xem thêm"
                          : 'text-red-500' // Chỉ màu chữ đỏ cho "Rút gọn nội dung"
                      } p-2 rounded-md transition-all duration-300 ease-in-out`} // Thêm padding, bo góc, hiệu ứng chuyển đổi mượt mà
                      onClick={handleToggleCollapse}
                    >
                      <span className='expandable-content_toggle-icon' />
                      <span className='expandable-content_toggle-text text-[18px]'>
                        {isCollapsed ? '+ Xem thêm' : '- Rút gọn nội dung'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className='tab-pane fade' id='nav-comment' role='tabpanel'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 h-[auto]'>
        <div className='ml-[30px]'>
          <h1 className='text-red-500 font-bold text-[25px] mb-[20px]'>Xem thêm sản phẩm cùng loại</h1>

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
                    <Shoppingcart />
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
                    <Shoppingcart />
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
                    <Shoppingcart />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='ml-[30px] mt-[60px] h-[600px]'>
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
                    <Shoppingcart />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .quantity-container {
          display: flex;
          align-items: center;
        }

        .quantity-container h2 {
          margin-right: 10px;
        }

        .products-btn__count {
          display: flex;
          align-items: center;
          border: 1px solid #ccc; /* Khuôn bao quanh */
          border-radius: 5px;
          padding: 5px;
          width: 120px;
          justify-content: space-between;
        }

        .products-btn__count button {
          // background-color: #f0f0f0; /* Nền cho nút */
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 16px;
          width: 30px; /* Độ rộng cố định cho nút */
          text-align: center;
        }

        .products-btn__count button:hover {
          transform: scale(1.8); /* Scale the button to 120% of its original size */
        }

        .button-container {
          display: flex;
          gap: 12px; /* Khoảng cách giữa hai nút */
          margin-top: 12px;
        }

        .btn_1 {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn1, .btn2 {
          background-color: white;
          border: 2px solid red;
          color: red;
          position: relative;
          overflow: hidden;
          font-size: 16px;
          width: 380px;
          height: 50px;
          transition: color 0.4s ease;
        }

        .btn1::after, .btn2::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%; /* Bắt đầu từ ngoài màn hình */
          width: 100%;
          height: 100%;
          background-color: red;
          transition: left 0.4s ease; /* Chuyển động mượt mà */
          z-index: 0;
        }

        .btn1:hover::after, .btn2:hover::after {
          left: 0; /* Di chuyển lớp nền vào từ trái sang phải */
        }

        .btn1:hover, .btn2:hover {
          color: white; /* Khi hover, màu chữ sẽ chuyển thành trắng */
        }

        .products__btn {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }
.products__btn span {
  position: relative;
  z-index: 1;
}

.product-deliverly {
  padding: 10px; /* Thêm padding nếu cần */
}

.deliverly-inner {
  display: flex;
  flex-wrap: wrap;
}

.infoList-deliverly {
  display: flex;
  flex-wrap: wrap;
  gap: 0px; /* Khoảng cách giữa các item */
  margin: 0;
  margin-left: -10px;
  padding: 0;
  list-style: none;
}

.deliverly-item {
  display: flex;
  align-items: center; /* Căn chỉnh logo và chữ theo chiều dọc */
  flex: 1 1 calc(33.333% - 30px); /* Chiếm 1/3 chiều rộng của container, trừ khoảng cách */
  margin-bottom: 10px; /* Khoảng cách dưới mỗi item */
}

.deliverly-item img {
  width: 30px; /* Đặt kích thước cho logo */
  height: auto; /* Giữ tỷ lệ kích thước của logo */
  margin-right: 10px; /* Khoảng cách giữa logo và chữ */
}

.price {
  width: 770px; /* Chiều rộng của div */
  height: 60px; /* Chiều cao của div */
  background-color: #f0f0f0; /* Màu nền xám */
  display: flex;
  align-items: center; /* Căn giữa nội dung theo chiều dọc */
  justify-content: flex-start; /* Căn chỉnh nội dung theo chiều ngang bên trái */
  padding-left: 10px; /* Khoảng cách giữa div và viền bên trái */
  border: 1px solid #ddd; /* Đường viền nhẹ xung quanh div, tùy chọn */
}
      `}</style>
    </>
  )
}

export default ProductDetail
