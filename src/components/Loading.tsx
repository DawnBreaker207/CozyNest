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
      <Spin size='large' tip='Preparing your experience...' />
    </div>
  )
}

export default CustomLoadingPage
