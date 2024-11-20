import HomeBanner from './_components/HomeBanner'
import BannerSection from './_components/BannerSection'
import Category from './_components/Category'
import Banner from './_components/Banner'
import News from './_components/News'
import AboutUs from './_components/AboutUs'
import Service from './_components/Service'
import { useProductQuery } from '@/hooks/useProductQuery'
import ProductList from './_components/ProductList'

const HomePage = () => {
  const { data } = useProductQuery({ _limit: 10 })
  const products = data?.res
  return (
    <div>
      <Banner />
      <HomeBanner />
      <Category />
      <ProductList products={products} />
      <BannerSection />
      <News />
      <AboutUs />
      <Service />
    </div>
  )
}

export default HomePage
