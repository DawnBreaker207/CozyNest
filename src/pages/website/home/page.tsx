import { useProductQuery } from '@/hooks/useProductQuery'
import ProductList from '../products/_components/ProductList'
import AboutUs from './_components/AboutUs'
import Banner from './_components/Banner'
import BannerSection from './_components/BannerSection'
import Category from './_components/Category'
import HomeBanner from './_components/HomeBanner'
import News from './_components/News'
import Service from './_components/Service'

const HomePage = () => {
  const { data } = useProductQuery({ _limit: 10 })
  const products = data

  return (
    <div>
      <Banner />
      <HomeBanner />
      <Category />
      <ProductList products={products} />
      <BannerSection />
      <ProductList products={products} />
      <News />
      <AboutUs />
      <Service />
    </div>
  )
}

export default HomePage
