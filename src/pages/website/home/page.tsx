import HomeBanner from './_components/HomeBanner'
import BannerSection from './_components/BannerSection'
import Category from './_components/Category'
import Banner from './_components/Banner'
import ProductList from './_components/ProductList'
import News from './_components/News'
import AboutUs from './_components/AboutUs'
import Service from './_components/Service'

const HomePage = () => {
  return (
    <div>
      <Banner />
      <HomeBanner />
      <Category />
      <ProductList />
      <BannerSection />
      <ProductList />
      <News />
      <AboutUs />
      <Service />
    </div>
  )
}

export default HomePage
