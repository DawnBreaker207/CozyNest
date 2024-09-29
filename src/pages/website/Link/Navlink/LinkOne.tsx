import { DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const Linkone: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false) // Trạng thái để kiểm soát việc hiển thị bài viết
    const [isOpen2, setIsOpen2] = useState(false)
    const togglePosts = () => {
        setIsOpen(!isOpen) // Chuyển đổi trạng thái
    }
    const togglePosts2 = () => {
        setIsOpen2(!isOpen2) // Chuyển đổi trạng thái
    }
    const [isContentVisible, setContentVisible] = useState(false)

    const toggleContents = () => {
        setContentVisible(!isContentVisible)
    }
    const categories = [
        { name: 'Trang chủ' },
        { name: 'Sản phẩm' },
        { name: 'Trang sản phẩm' },
        { name: 'Giới thiệu' },
        { name: 'Cẩm nang trang trí' },
        { name: 'Hệ thống cửa hàng' },
        { name: 'FAQs' },
        { name: 'Landing page' }
    ]
    // Mảng chứa các URL hình ảnh và tiêu đề bài viết
    const posts = [
        {
            imageUrl:
                'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.22.42_899b3463f971438b93e951e8475f69ea_compact.png',
            title: 'Thiết kế nội thất chung cư đẹp cho đôi vợ chồng trẻ',
            date: 'Tin tức - 13.07.2023'
        },
        {
            imageUrl:
                'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.21.03_744e96d8ac574728a4b81008f1f4131a.png',
            title: 'Những điều cần biết để lựa chọn bộ bàn ăn phù hợp',
            date: 'Tin tức - 14.07.2023'
        },
        {
            imageUrl:
                'https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.18.57_c2c5c9603d97452e8661433e95e159b3_compact.png',
            title: 'Mua sofa mang đến những cân hộ nhỏ xinh đẹp.',
            date: 'Tin tức - 15.07.2023'
        },
        {
            imageUrl: 'https://via.placeholder.com/100?text=Image+4',
            title: 'Nội thất chung cư đẹp cho đâi với chông trẻ...',
            date: 'Tin tức - 16.07.2023'
        }
    ]

    return (
        <div className='lg:px-[75px]'>
            <div className='flex flex-col md:flex-row p-4 mt-[10%]'>
                {/* Main content */}
                <div className='bg-white p-4 mb-6 lg:max-w-[987px] rounded-lg shadow-shadowUser'>
                    <div className='mb-4'>
                        <h1 className='text-2xl text-[#fca120] font-semibold text-gray-900'>
                            Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn
                        </h1>
                        <div className='text-sm text-gray-500 flex space-x-4'>
                            <span className='block'>bởi: Haven Home</span>
                            <span className='block'>
                                <time dateTime='2023-07-13'>13 Tháng 07, 2023</time>
                            </span>
                        </div>
                    </div>
                    <div className='article-content'>
                        <div className='mb-4'>
                            <img
                                className='w-full h-auto'
                                src='https://file.hstatic.net/200000748041/article/screen_shot_2023-07-13_at_10.21.03_744e96d8ac574728a4b81008f1f4131a.png'
                                alt='Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn'
                            />
                        </div>
                        <div id='table-content-container' className='mb-6'>
                            <div className='bg-[#f7fbf9] rounded-lg mt-9 max-w-[860px] mx-auto mb-[30px]'>
                                <div className='text-lg font-bold mb-2'>
                                    Các nội dung chính
                                    <span className='ml-2 text-sm text-gray-600'>
                                        [
                                        <a
                                            className='cursor-pointer'
                                            onClick={() => toggleContents()} // Sử dụng onClick để thay đổi trạng thái hiển thị
                                        >
                                            {isContentVisible ? 'Ẩn' : 'Hiện'}
                                        </a>
                                        ]
                                    </span>
                                </div>
                                <ul className={`mt-2 ${isContentVisible ? '' : 'hidden'}`}>
                                    {' '}
                                    {/* Thêm điều kiện hiển thị nội dung */}
                                    <li>
                                        <a href='#1-_su_dung_noi_that_thong_minh_va_tan_dung_khong_gian_de_luu_tru_do_dac'>
                                            1- Sử dụng nội thất thông minh và tận dụng không gian để lưu trữ đồ đạc
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#2-_su_tuong_phan_ve_mau_sac_giua_hai_khong_gian_phong' className='text-blue-500'>
                                            2- Sự tương phản về màu sắc giữa hai không gian phòng
                                        </a>
                                    </li>
                                    <li>
                                        <a href='#3-_su_dung_cac_buc_tuong_bang_kinh__cua_kinh_trong_suot' className='text-blue-500'>
                                            3- Sử dụng các bức tường bằng kính, cửa kính trong suốt
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='max-w-[860px] mx-auto mb-[30px]'>
                            <h1
                                id='1-_su_dung_noi_that_thong_minh_va_tan_dung_khong_gian_de_luu_tru_do_dac'
                                className='text-[40px] font-bold text-[#fca120] mb-4'
                            >
                                1- Sử dụng nội thất thông minh và tận dụng không gian để lưu trữ đồ đạc
                            </h1>
                            <p className='mb-4 text-gray-700 text-[14px]'>
                                Với một không gian chật hẹp thì điều đầu tiên bạn nghĩ đến là gì? Chắc hẳn đó chính là nơi nào sẽ dùng
                                để lưu trữ đồ đạc cá nhân trong nhà của bạn. Thấu hiểu nỗi lo này, Baya cung cấp giải pháp cho bạn chính
                                là thiết kế một giường ngủ thông minh kết hợp tủ lưu trữ ngay phía dưới gầm giường để lưu trữ đồ đạc cá
                                nhân{' '}
                            </p>
                            <div className='mb-10'>
                                <p className='mb-4 text-gray-700 text-[14px]'>
                                    Cánh cửa kéo ở một bên hông giường giúp đảm bảo tính riêng tư cho không gian phòng ngủ, và kệ tủ cũng
                                    ở cùng phía bên hông phòng ngủ giúp bản thiết kế chung cư trở nên hoàn thiện, thông minh và hiện đại
                                    hơn bao giờ hết. Một điểm đáng chú ý nữa ở đây là lớp sơn trắng cho phòng ngủ kết hợp với nội thất gỗ
                                    nâu vàng đã giúp không gian chung cư chật hẹp trở nên thật sự trang nhã và hợp mắt.
                                </p>
                            </div>
                            <div className='mr-4 lg:w-[767px]'>
                                <img
                                    className='w-full h-auto'
                                    src='//file.hstatic.net/1000409762/file/home03_1c392e3be6b543779d79a551a46aa2af.jpg'
                                />
                            </div>

                            <h1
                                id='2-_su_tuong_phan_ve_mau_sac_giua_hai_khong_gian_phong'
                                className='text-[40px] font-bold text-[#fca120] mt-10'
                            >
                                2- Sự tương phản về màu sắc giữa hai không gian phòng
                            </h1>
                            <p className='text-gray-700 text-[14px] mt-4 mb-4'>
                                Phòng khách ở bên cạnh được phủ một lớp màu sơn xanh lá mạ khác hoàn toàn với bức tường phòng ăn ở bên
                                cạnh. Có thể cảm tưởng không gian phòng khách ở bên cạnh như một thế giới khác hoàn toàn, có vẻ đẹp hút
                                mắt và khác lạ, sang trọng. Thiết kế này là ở một căn chung cư 3 phòng ngủ.
                            </p>
                            <p className='mb-4 lg:w-[360px]'>
                                <img
                                    className='w-full h-auto'
                                    src='//file.hstatic.net/1000409762/file/s4_58617e773c3a4421a02bb3b7cdb12dd9.jpg'
                                />
                            </p>
                            <h1
                                id='3-_su_dung_cac_buc_tuong_bang_kinh__cua_kinh_trong_suot'
                                className='text-[40px] font-bold text-[#fca120]'
                            >
                                3- Sử dụng các bức tường bằng kính, cửa kính trong suốt
                            </h1>
                            <p className='mb-4 text-gray-700 text-[14px]'>
                                Điểm nhấn của bản thiết kế này chính là bức tường kính trong suốt tương phản với bảng vật liệu nội thất
                                phong phú, hoa văn và màu sắc hết sức đa dạng xung quanh. Các yếu tố gỗ với màu vàng nâu nổi bật kết hợp
                                với tường kính trắng khiến không gian chung cư nhỏ hẹp cũng trở nên trang nhã và thoáng đãng, khơi gợi
                                trí tưởng tượng của người xem vượt qua những giới hạn về không gian.
                            </p>
                            <p className='mb-4 text-gray-700 text-[14px]'>
                                Giải pháp đặc biệt cho căn phòng có diện tích khiêm tốn là sử dụng kính phía sau bộ sofa để tạo cảm giác
                                không gian được mở rộng.
                            </p>
                            <p className='mb-4 text-gray-700 text-[14px] '>
                                Khung cửa kính ban công đón nắng giúp bạn hòa mình vào thiên nhiên thoáng đãng dễ chịu, thêm bức rèm
                                mang lại nét trang nhã cho không gian tiếp đón khách trong phòng khách và không gian ban công thư giãn
                                của riêng bạn.
                            </p>
                            <p className='border-b-2'></p>
                        </div>
                        <div className='flex justify-between items-center mt-6'>
                            <div className='text-gray-700'>
                                <p>
                                    Đang xem:
                                    <span className='font-semibold text-[#fca120]'>
                                        {' '}
                                        Những điều cần biết để lựa chọn bộ bàn ăn phù hợp với ngôi nhà bạn
                                    </span>
                                </p>
                            </div>
                            <div className='flex items-center'>
                                <span className='flex items-center text-blue-500'>
                                    <svg className='w-5 h-5' viewBox='0 0 11 18'>
                                        <path d='M9.5 1.5L1.5 9l8 7.5' strokeWidth={2} stroke='currentColor' fill='none' />
                                    </svg>
                                    <a href='/blogs/news/thiet-ke-noi-that-chung-cu-dep-cho-doi-vo-chong-tre'>Bài trước</a>
                                </span>
                                <span className='mx-4 text-gray-500'>|</span>
                                <span className='flex items-center text-blue-500'>
                                    <a href='/blogs/news/mua-sofa-giuong-mang-ca-thien-duong-den-nhung-can-ho-nho'>Bài sau</a>
                                    <svg className='w-5 h-5' viewBox='0 0 11 18'>
                                        <path d='M1.5 1.5l8 7.5-8 7.5' strokeWidth={2} stroke='currentColor' fill='none' />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Latest Posts */}
                <div className=''>
                    <div className='  w-[339px] pl-4'>
                        <div className='bg-white shadow-lg lg:w-[339px] rounded-lg '>
                            <div
                                className='flex items-center justify-between   shadow-shadowUser px-5 py-2 cursor-pointer'
                                onClick={togglePosts}
                            >
                                <h2 className='text-lg font-semibold text-[#fca120] '>Bài viết mới nhất</h2>
                                {isOpen ? (
                                    <UpOutlined className='text-gray-400' style={{ fontSize: '10px' }} />
                                ) : (
                                    <DownOutlined className='text-gray-400' style={{ fontSize: '10px' }} />
                                )}
                            </div>

                            {!isOpen && (
                                <div className='shadow-shadowUser mt-1 px-5 pb-4'>
                                    {/* Các bài viết với kích thước hình ảnh bằng nhau */}
                                    {posts.map((post, index) => (
                                        <div className='flex items-center  mb-4' key={index}>
                                            <div className='relative'>
                                                <img
                                                    className='w-28 h-14 object-cover' // Chiều rộng và chiều cao bằng nhau
                                                    src={post.imageUrl} // Lấy URL hình ảnh từ mảng
                                                    alt={`post thumbnail ${index + 1}`}
                                                />
                                                <span className='absolute top-1/4 left-[-16px] border-2 border-white h-[28px] w-[28px] leading-[26px] text-center rounded-full bg-[#fca120] text-[#fff] text-xs z-10'>
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className='ml-4'>
                                                <div className='mb-1'>
                                                    <p className='font-medium text-[13px] text-gray-800'>{post.title}</p> {/* Tiêu đề bài viết */}
                                                </div>
                                                <p className='text-sm text-gray-500'>{post.date}</p> {/* Ngày bài viết */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='w-[339px] pl-4'>
                        <div className='bg-white shadow-shadowUser lg:w-[339px] rounded-lg p-4'>
                            <div className='flex items-center justify-between shadow px-5 py-2 cursor-pointer' onClick={togglePosts2}>
                                <h2 className='text-lg font-semibold text-[#fca120]'>Danh mục bài viết</h2>
                                {isOpen2 ? (
                                    <UpOutlined className='text-gray-400' style={{ fontSize: '10px' }} />
                                ) : (
                                    <DownOutlined className='text-gray-400' style={{ fontSize: '10px' }} />
                                )}
                            </div>

                            {!isOpen2 && (
                                <div className='shadow mt-1 px-5 pb-4'>
                                    {/* Các danh mục bài viết */}
                                    {categories.map((category, index) => (
                                        <div className='flex items-center justify-between border-b border-gray-300 py-2' key={index}>
                                            <p className='text-sm text-gray-800'>{category.name}</p>
                                            <PlusOutlined className='text-gray-400' style={{ fontSize: '12px' }} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Linkone
