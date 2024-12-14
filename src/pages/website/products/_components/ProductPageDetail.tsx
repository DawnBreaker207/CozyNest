import { Cart } from '@/components/icons'
import useCart from '@/hooks/useCart'
import { IProduct } from '@/types/product'
import { CheckOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Drawer, Dropdown, MenuProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { GrNext } from 'react-icons/gr'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { ICategory } from '@/types/category'

const ProductsPageDetail = () => {
  const { id } = useParams()
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await instance.get(`/categories`)
  })
  const { data } = useQuery({
    queryKey: ['RELATED_PRODUCT', id],
    queryFn: async () => {
      const { data } = await instance.get(`/categories/${id}`)
      return data
    }
  })

  const [products, setProducts] = useState<IProduct[]>(data?.res?.products || [])

  const product = products.length > 0 ? products : data?.res?.products || []

  const { addToCart } = useCart()
  const [messageApi, contextHolder] = message.useMessage()
  const handleAddToCart = (productId: string) => {
    addToCart(productId)
    messageApi.success('Thêm vào giỏ hàng thành công!')
  }

  const [, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const show = () => {
    setOpen(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpen(false)
  }

  // Sắp xếp
  useEffect(() => {
    if (data?.res?.productss) {
      setProducts(data.res.productss)
    }
  }, [data])
  const sortPriceAsc = (products: IProduct[]) => {
    return products.sort((a, b) => a.price - b.price)
  }

  const sortPriceDesc = (products: IProduct[]) => {
    return products.sort((a, b) => b.price - a.price)
  }

  const sortNameAsc = (products: IProduct[]) => {
    return products.sort((a, b) => a.name.localeCompare(b.name))
  }

  const sortNameDesc = (products: IProduct[]) => {
    return products.sort((a, b) => b.name.localeCompare(a.name))
  }

  const [selectedKey, setSelectedKey] = useState('')
  const handleMenuClick = (key: string) => {
    let sortedProducts: IProduct[] = []
    switch (key) {
      case '1':
        sortedProducts = sortPriceAsc([...product])
        break
      case '2':
        sortedProducts = sortPriceDesc([...product])
        break
      case '3':
        sortedProducts = sortNameAsc([...product])
        break
      case '4':
        sortedProducts = sortNameDesc([...product])
        break
      case '5':
        sortedProducts = [...product]
        break
      default:
        return
    }
    setProducts([...sortedProducts])
    setSelectedKey(key)
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className='flex items-center'>
          {selectedKey === '1' && <CheckOutlined className='mr-2' />}
          Giá: Thấp đến Cao
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div className='flex items-center'>
          {selectedKey === '2' && <CheckOutlined className='mr-2' />}
          Giá: Cao đến Thấp
        </div>
      )
    },
    {
      key: '3',
      label: (
        <div className='flex items-center'>
          {selectedKey === '3' && <CheckOutlined className='mr-2' />}
          Từ A - Z
        </div>
      )
    },
    {
      key: '4',
      label: (
        <div className='flex items-center'>
          {selectedKey === '4' && <CheckOutlined className='mr-2' />}
          Từ Z - A
        </div>
      )
    },
    {
      key: '5',
      label: (
        <div className='flex items-center'>
          {selectedKey === '5' && <CheckOutlined className='mr-2' />}
          Sản phẩm bán chạy
        </div>
      )
    }
  ]

  // Bộ lọc
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  const handlePriceRangeChange = (priceRange: string) => {
    setSelectedPriceRanges((prev) => {
      if (prev.includes(priceRange)) {
        return prev.filter((range) => range !== priceRange) // Bỏ chọn
      } else {
        return [...prev, priceRange] // Chọn
      }
    })
  }

  const filterProductsByPrice = (products: IProduct[], priceRanges: string[]) => {
    if (priceRanges.length === 0) return products // Nếu không có khoảng giá nào được chọn, trả về tất cả sản phẩm

    return products.filter((product) => {
      console.log(product)

      // Duyệt qua các variants của sản phẩm để lấy giá từ sku_id
      return product.variants.some((variant) => {
        console.log(variant)

        const price = variant.sku_id.price // Lấy giá từ sku_id, bỏ qua giảm giá nếu không có dữ liệu
        console.log(price)

        if (priceRanges.includes('Dưới 1.000.000₫') && price < 1000000) return true
        if (priceRanges.includes('1.000.000₫ - 2.000.000₫') && price >= 1000000 && price <= 2000000) return true
        if (priceRanges.includes('2.000.000₫ - 3.000.000₫') && price >= 2000000 && price <= 3000000) return true
        if (priceRanges.includes('3.000.000₫ - 4.000.000₫') && price >= 3000000 && price <= 4000000) return true
        if (priceRanges.includes('Trên 4.000.000₫') && price > 4000000) return true
        return false
      })
    })
  }

  const filteredProducts = filterProductsByPrice(product, selectedPriceRanges)

  // Bỏ lọc
  const removeFilter = (itemToRemove: string) => {
    setSelectedPriceRanges((prev) => prev.filter((item) => item !== itemToRemove))
  }

  // Phân trang
  const productsPerPage = 15 // Số lượng sản phẩm trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  console.log(currentProducts)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <>
      {contextHolder}
      {window.innerWidth > 800 ? (
        <div className='wrapper-collection-header banner-header mt-8'>
          <div className='flex my-auto d-flex flex-wrap'>
            <div className='w-[50%] collection-banner col-lg-6 col-12 pl-0 pr-0'>
              <img
                src={data?.res?.thumbnail}
                alt='Products'
                className=' h-[482px] md:h-[450px] sm:h-[300px] h-[240px] sm:h-[200px] object-cover'
              />
            </div>
            <div className='w-[50%] place-content-center bg-gray-100 collection-heading col-lg-6 col-12 '>
              <h1 className='text-[#FFCC00] ml-10 text-5xl font-medium'>{data?.res?.name}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className='wrapper-collection-header banner-header mt-8'>
          <div className='flex my-auto d-flex flex-wrap'>
            <div className='w-[50%] collection-banner col-lg-6 col-12 pl-0 pr-0'>
              <img
                src={data?.res?.thumbnail}
                alt='Products'
                className=' h-[482px] md:h-[450px] sm:h-[300px] h-[240px] sm:h-[200px] object-cover'
              />
            </div>
            <div className='w-[50%] place-content-center bg-gray-100 collection-heading col-lg-6 col-12 '>
              <h1 className='text-[#FFCC00] ml-10 text-5xl font-medium'>{data?.res?.name}</h1>
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-row justify-between items-center my-4 px-8 space-x-2 md:space-x-4'>
        {/* Nút Bộ lọc */}
        <Button icon={<FilterOutlined />} onClick={show} className='flex items-center text-sm md:text-base'>
          Bộ lọc
        </Button>

        {/* Dropdown Sắp xếp */}
        <Dropdown
          className=''
          menu={{
            items: menuItems,
            onClick: (e) => handleMenuClick(e.key)
          }}
        >
          <Button icon={<SortAscendingOutlined />}>Sắp xếp</Button>
        </Dropdown>
      </div>
      <hr className='my-4 ' />
      {window.innerWidth >= 600 ? (
        <div className='flex flex-row justify-left my-4 px-8 space-x-2 md:space-x-4'>
          {selectedPriceRanges?.map((item) => (
            <div
              key={item}
              className='flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1 bg-gray-50'
            >
              <p className='mr-2'>{item}</p>
              <button onClick={() => removeFilter(item)} className='text-red-500 hover:text-red-700'>
                &times;
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-2 my-4 px-5 sm:gap-4'>
          {selectedPriceRanges?.map((item) => (
            <div
              key={item}
              className='flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1 bg-gray-50'
            >
              <p className='mr-2 text-xs'>{item}</p>
              <button onClick={() => removeFilter(item)} className='text-red-500 hover:text-red-700'>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <Drawer width={280} title='BỘ LỌC' onClose={onClose} open={open} placement='left'>
        <div>
          <div className='p-2'>
            {/* Product Categories */}
            <div className='my-4'>
              <h4 className='mb-2 text-lg'>Danh mục sản phẩm</h4>

              <Link className='text-black hover:text-yellow-500' to={`/products_page`}>
                Tất cả sản phẩm
              </Link>
              <br />

              {categories?.data?.res?.map((category: ICategory) => (
                <div key={category._id}>
                  {' '}
                  {/* Thêm key để tránh lỗi React */}
                  <a href={`/products_page/${category._id}`} className='text-black hover:text-yellow-500'>
                    {category.name}
                  </a>
                  <br />
                </div>
              ))}
            </div>

            <hr />
            {/* Supplier */}
            {/* <div className='my-4'>
              <h4 className='mb-2 text-lg'>Nhà cung cấp</h4>
              <Checkbox>Khác</Checkbox>
            </div> */}
            {/* <hr /> */}
            {/* Price Filter */}
            <div className='my-4'>
              <h4 className='mb-2 text-lg'>Lọc giá</h4>
              <Checkbox
                checked={selectedPriceRanges.includes('Dưới 1.000.000₫')}
                onChange={() => handlePriceRangeChange('Dưới 1.000.000₫')}
              >
                Dưới 1.000.000₫
              </Checkbox>
              <br />
              <Checkbox
                className=''
                checked={selectedPriceRanges.includes('1.000.000₫ - 2.000.000₫')}
                onChange={() => handlePriceRangeChange('1.000.000₫ - 2.000.000₫')}
              >
                1.000.000₫ - 2.000.000₫
              </Checkbox>
              <br />
              <Checkbox
                checked={selectedPriceRanges.includes('2.000.000₫ - 3.000.000₫')}
                onChange={() => handlePriceRangeChange('2.000.000₫ - 3.000.000₫')}
              >
                2.000.000₫ - 3.000.000₫
              </Checkbox>
              <br />
              <Checkbox
                checked={selectedPriceRanges.includes('3.000.000₫ - 4.000.000₫')}
                onChange={() => handlePriceRangeChange('3.000.000₫ - 4.000.000₫')}
              >
                3.000.000₫ - 4.000.000₫
              </Checkbox>
              <br />
              <Checkbox
                checked={selectedPriceRanges.includes('Trên 4.000.000₫')}
                onChange={() => handlePriceRangeChange('Trên 4.000.000₫')}
              >
                Trên 4.000.000₫
              </Checkbox>
            </div>

            <hr />
          </div>
        </div>
      </Drawer>
      {/* sản phẩm  */}
      <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 items-center gap-8 mx-8 mb-4'>
        {currentProducts?.length === 0 ? (
          <div className='col-span-5 text-center'>
            <h2 className='text-2xl text-gray-600'>Không có sản phẩm nào đúng theo yêu cầu!</h2>
          </div>
        ) : (
          currentProducts
            .filter((product) => !product.is_hidden)
            .map((product: IProduct) => {
              const firstVariant = product?.variants?.[0]
              const price = firstVariant?.sku_id?.price || 0 // Giá mặc định là 0 nếu không có giá

              return (
                <div key={product._id} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
                  <Link to={`/detail/${product._id}`}>
                    <div className='relative'>
                      <div className='flex transition-transform ease-in-out duration-500'>
                        <img
                          src={product?.variants?.[0]?.sku_id?.image?.[0] || 'default-image.jpg'}
                          alt={product?.name}
                          className='object-cover'
                        />
                      </div>

                      <FaRegEye
                        className='absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                        title='Xem nhanh'
                      />
                    </div>

                    <div className='mx-2 text-center space-y-2 mt-3'>
                      <h3>{product?.name}</h3>
                      <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                        <span className='text-[#FF0000] font-semibold'>{price.toLocaleString()}₫</span>
                        {price !== firstVariant?.sku_id?.price && (
                          <span className='text-[#878c8f] font-light line-through text-[13px]'>
                            {firstVariant?.sku_id?.price?.toLocaleString()}₫
                          </span>
                        )}
                      </div>
                      <Button>xem chi tiết</Button>
                    </div>
                  </Link>
                </div>
              )
            })
        )}
      </div>

      <div className='flex justify-center w-[22%] items-center my-4 gap-8 max-w-screen-lg mx-auto'>
        <button
          title='Previous'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className='border-solid border-2 text-white px-3 py-2 rounded'
        >
          <MdOutlineArrowBackIos className='text-black' />
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button
          title='Next'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='border-solid border-2 text-white px-3 py-2 rounded'
        >
          <GrNext className='text-black' />
        </button>
      </div>
    </>
  )
}

export default ProductsPageDetail
