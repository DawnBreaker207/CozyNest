import { useProductQuery } from '@/hooks/useProductQuery'
import ProductList from '../products/_components/ProductList'
import AboutUs from './_components/AboutUs'
import Banner from './_components/Banner'
import BannerSection from './_components/BannerSection'
import Category from './_components/Category'
import HomeBanner from './_components/HomeBanner'
import News from './_components/News'
import Service from './_components/Service'
import BestProduct from './_components/BestProduct'

const HomePage = () => {
  const { data } = useProductQuery({ _limit: 5 })
  const products = data?.res

  return (
    <div>
      <Banner />
      <HomeBanner />
      <Category />
      <ProductList products={products} />
      <BannerSection />
      <BestProduct />
      <News />
      <AboutUs />
      <Service />
    </div>
  )
}

export default HomePage
