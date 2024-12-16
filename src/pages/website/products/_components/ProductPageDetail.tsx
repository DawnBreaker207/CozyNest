import { IProduct } from '@/types/product'
import { CheckOutlined, DownOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, MenuProps } from 'antd'
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

  // Sắp xếp
  const [selectedKey, setSelectedKey] = useState('')
  useEffect(() => {
    if (selectedKey) {
      handleMenuClick(selectedKey) // Gọi hàm sắp xếp khi selectedKey thay đổi
    }
  }, [selectedKey])

  useEffect(() => {
    if (data?.res?.products) {
      setProducts(data.res.products) // Cập nhật dữ liệu
    }
  }, [data])
  const handleMenuClick = (key: string) => {
    let sortedProducts = [...products] // Clone mảng sản phẩm để tránh thay đổi trạng thái gốc

    switch (key) {
      case '1': // Giá: Thấp đến Cao
        sortedProducts.sort((a, b) => {
          const priceA = a?.variants?.[0]?.sku_id?.price || 0
          const priceB = b?.variants?.[0]?.sku_id?.price || 0
          return priceA - priceB
        })
        break
      case '2': // Giá: Cao đến Thấp
        sortedProducts.sort((a, b) => {
          const priceA = a?.variants?.[0]?.sku_id?.price || 0
          const priceB = b?.variants?.[0]?.sku_id?.price || 0
          return priceB - priceA
        })
        break
      case '3': // Từ A - Z
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case '4': // Từ Z - A
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case '5': // Sản phẩm bán chạy (tuỳ chỉnh logic nếu cần)
        sortedProducts.sort((a, b) => {
          // Sắp xếp theo số lượng sold giảm dần
          const soldA = a?.variants?.[0]?.sku_id.sold || 0
          const soldB = b?.variants?.[0]?.sku_id.sold || 0
          return soldB - soldA
        }) // Giả sử có trường "sold" biểu thị số lượng bán
        break
      default:
        break
    }

    setProducts(sortedProducts)
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
  // console.log(currentProducts)

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
      <div className='wrapper-collection-header banner-header'>
        <div className='flex flex-col my-auto'>
        <div className='w-full collection-banner'>
            <img
              src={data?.res?.thumbnail}
              alt='Products'
              className='w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[482px] object-cover'
            />
          </div>
        </div>
      </div>

      <div>
        {/* Tiêu đề */}
        <div className='w-full flex justify-center  px-4 md:px-8 lg:px-12 mt-5'>
          <h1 className='text-[#FFCC00] text-center w-[90%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium'>
            {data?.res?.name}
          </h1>
        </div>
        {/* Bộ lọc và Sắp xếp */}
        <div className='flex flex-col md:flex-row justify-between items-center my-6 px-4 md:px-8 space-y-4 md:space-y-0'>
          {/* Bộ lọc */}
          <div className='flex items-center space-x-2 md:space-x-4 lg:ml-[150px]'>
            <h1 className='text-black text-lg md:text-2xl font-medium '>Bộ lọc |</h1>
          </div>

          {/* Các dropdown */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full lg:-mr-16 md:w-auto'>
            {/* Danh mục */}
            <Dropdown
              overlay={
                <div className='p-4 bg-white shadow-lg rounded-lg'>
                  <Link className='text-black hover:text-yellow-500' to={`/products_page`}>
                    Tất cả sản phẩm
                  </Link>
                  {categories?.data?.res?.map((category: ICategory) => (
                    <div key={category._id}>
                      <a href={`/products_page/${category._id}`} className='text-black hover:text-yellow-500'>
                        {category.name}
                      </a>
                    </div>
                  ))}
                </div>
              }
            >
              <Button className='text-sm md:text-base w-full flex items-center justify-between'>
                Danh mục sản phẩm
                <DownOutlined />
              </Button>
            </Dropdown>

            {/* Giá sản phẩm */}
            <Dropdown
              overlay={
                <div className='p-4 bg-white shadow-lg rounded-lg'>
                  {[
                    'Dưới 1.000.000₫',
                    '1.000.000₫ - 2.000.000₫',
                    '2.000.000₫ - 3.000.000₫',
                    '3.000.000₫ - 4.000.000₫',
                    'Trên 4.000.000₫'
                  ].map((range) => (
                    <div key={range}>
                      <Checkbox
                        checked={selectedPriceRanges.includes(range)}
                        onChange={() => handlePriceRangeChange(range)}
                      >
                        {range}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              }
            >
              <Button className='text-sm md:text-base w-full flex items-center justify-between'>
                Giá sản phẩm
                <DownOutlined />
              </Button>
            </Dropdown>

            {/* Sắp xếp */}
            <Dropdown menu={{ items: menuItems, onClick: (e) => handleMenuClick(e.key) }}>
              <Button className='text-sm md:text-base w-full flex items-center justify-between'>
                Sắp xếp
                <SortAscendingOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
      <hr />

      {window.innerWidth >= 600 ? (
        <div className='flex flex-row justify-left my-4 ml-20 px-8 space-x-2 md:space-x-4'>
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
