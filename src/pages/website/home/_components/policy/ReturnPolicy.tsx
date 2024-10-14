import FooterPolicy from './FooterPolicy'

const ReturnPolicy = () => {
  return (
    <>
      <div className='container'>
        <div className='row wrapper-row pd-page max-w-[1190px] mx-auto mt-6'>
          <div className='col-md-12 col-sm-12 col-xs-12 col-md-push-0'>
            <div className='page-wrapper'>
              <div className='heading-page'>
                <b className='text-[1.8em] block'>Chính Sách Đổi Trả</b>
              </div>
              <div className='wrapbox-content-page'>
                <div className='content-page '>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    <strong className='text-black'>1. Chính sách đổi hàng: </strong>trong vòng 3 ngày tính từ ngày giao
                    hàng thành công, không tính chủ nhật và các ngày lễ, tết; quý khách hàng được đổi sản phẩm miễn phí
                    khi <strong className='text-black'>đủ 2 điều kiện</strong>:
                  </p>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    - Sản phẩm bị hư hỏng do lỗi chất liệu (không bao gồm yếu tố màu sắc do mỗi đợt sản xuất màu gỗ, vân
                    gỗ và mắt gỗ&nbsp;có thể chênh lệch đôi chút vì đặc tính tự nhiên của&nbsp;gỗ), lỗi kỹ thuật và lỗi
                    lắp đặt từ phía MOHO.
                  </p>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    - Đổi sang sản phẩm khác bằng giá trị hoặc có giá trị cao hơn sản phẩm đã giao.
                  </p>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    Sau 3 ngày tính từ ngày giao hàng thành công, MOHO sẽ áp dụng sang chính sách bảo hành cho các sản
                    phẩm bị hư hỏng do lỗi chất liệu, lỗi kỹ thuật và lỗi lắp đặt từ phía MOHO, không áp dụng đổi sang
                    sản phẩm khác.
                  </p>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    <strong className='text-black'>2. Chính sách trả hàng:</strong> quý khách hàng chỉ được trả hàng tại
                    thời điểm giao hàng nếu sản phẩm không đúng như thông tin đặt hàng do quý khách hàng đặt nhầm hoặc
                    thay đổi ý kiến, nhưng phải thanh toán phí giao hàng cho MOHO là 300,000đ và chi phí lắp đặt tùy
                    theo sản phẩm cho các khu vực miễn phí giao hàng và lắp đặt.
                  </p>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    - Quyết định của <a href='https://moho.com.vn/'>Nội Thất</a> MOHO là quyết định cuối cùng và có thể
                    thay đổi mà không cần thông báo trước.&nbsp;
                  </p>
                  <p className='mt-[0.6em] mb-[0.6em] text-[#666] block'>
                    - Chính sách này không áp dụng cho các sản phẩm trong danh mục Đồ Trang Trí.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPolicy />
    </>
  )
}

export default ReturnPolicy
