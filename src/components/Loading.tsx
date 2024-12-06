import { Spin } from 'antd'

const CustomLoadingPage = () => {
  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5'
      }}
    >
      <Spin size='large' tip='Preparing your experience...'>
        {/* Nội dung bạn muốn hiển thị khi đang loading */}
        <div>Loading content...</div>
      </Spin>
    </div>
  )
}

export default CustomLoadingPage
