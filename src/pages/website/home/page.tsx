import HomeBanner from './_components/HomeBanner'
import BannerSection from './_components/BannerSection'
import Category from './_components/Category'
import Banner from './_components/Banner'
import ProductList from './_components/ProductList'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <ProductList />
      <HomeBanner />
      <Category />
      <BannerSection />
    </div>
  )
}

export default HomePage
