import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useFilterProducts, usePaginate } from '@/hooks/useProduct'
import { useProductQuery } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { CheckOutlined, DownOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { GrNext } from 'react-icons/gr'
import { MdOutlineArrowBackIos } from 'react-icons/md'

const ProductsPage = () => {
  const { data: categories } = useCategoryQuery()
  const { data } = useProductQuery()
  const [products, setProducts] = useState<IProduct[]>(data?.res || [])
  const [selectedKey, setSelectedKey] = useState('')
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const { filterProductsByPrice } = useFilterProducts(products)
  const filteredProducts = filterProductsByPrice(selectedPriceRanges)
  const [hoveredImages, setHoveredImages] = useState({})
  const [hoveredPrices, setHoveredPrices] = useState({})
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  console.log(data)
  const filteredProductsByCategoryAndPrice = filteredProducts.filter((product) => {
    const isInCategory = selectedCategories.length
      ? product.category_id && selectedCategories.includes(String(product.category_id._id))
      : true

    const isInPriceRange = selectedPriceRanges.length
      ? selectedPriceRanges.some((priceRange) => {
          // Kiểm tra sự tồn tại của giá trị SKU và giá trước khi truy cập
          const productPrice = product?.variants?.[0]?.sku_id?.price
          if (productPrice === undefined) return false

          switch (priceRange) {
            case 'Dưới 1.000.000₫':
              return productPrice < 1000000
            case '1.000.000₫ - 2.000.000₫':
              return productPrice >= 1000000 && productPrice <= 2000000
            case '2.000.000₫ - 3.000.000₫':
              return productPrice >= 2000000 && productPrice <= 3000000
            case '3.000.000₫ - 4.000.000₫':
              return productPrice >= 3000000 && productPrice <= 4000000
            case 'Trên 4.000.000₫':
              return productPrice > 4000000
            default:
              return true
          }
        })
      : true

    return isInCategory && isInPriceRange
  })

  // const filteredProductsByCategory = selectedCategories.length
  //   ? products.filter((product) => product.category_id && selectedCategories.includes(String(product.category_id._id)))
  //   : products

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    handleNextPage,
    handlePrevPage
  } = usePaginate(filteredProductsByCategoryAndPrice, 15)
  useEffect(() => {
    if (data) setProducts(data.res)
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

  const handlePriceRangeChange = (priceRange: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(priceRange) ? prev.filter((range) => range !== priceRange) : [...prev, priceRange]
    )
  }

  // Bỏ lọc
  const removeFilter = (itemToRemove: string) => {
    setSelectedPriceRanges((prev) => prev.filter((item) => item !== itemToRemove))
  }
  const removeCategoryFilter = (category: string) => {
    setSelectedCategories((prevCategories) => prevCategories.filter((cat) => cat !== category))
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
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Nếu đã có -> bỏ chọn
          : [...prev, categoryId] // Nếu chưa có -> thêm vào
    )
  }

  return (
    <>
      <div className='wrapper-collection-header banner-header'>
        <div className='flex flex-col my-auto'>
          <div className='w-full collection-banner'>
            <img
              src='https://file.hstatic.net/200000065946/collection/banner_web_1920x450-0410__1__6f2_c39476d703c04384bf6b292d1aef8d19_2048x2048.jpg'
              alt='Products'
              className='w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[482px] object-cover'
            />
          </div>
        </div>
      </div>
      <div>
        {/* Tiêu đề */}
        <div className='w-full flex justify-center mt-6 px-4 md:px-8 lg:px-12'>
          <h1 className='text-[#FFCC00] text-center w-[90%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium'>
            Tất cả sản phẩm
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
                  <Checkbox checked={selectedCategories.length === 0} onChange={() => setSelectedCategories([])}>
                    Tất cả sản phẩm
                  </Checkbox>
                  {categories?.res
                    ?.filter((category) => category.isHidden === false)
                    ?.map((category: ICategory) => (
                      <div key={category._id}>
                        <Checkbox
                          checked={selectedCategories.includes(String(category._id))}
                          onChange={() => handleCategorySelect(String(category._id))}
                        >
                          {category.name}
                        </Checkbox>
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
        <div className='flex flex-row justify-left ml-20 my-4 px-8 space-x-2 md:space-x-4'>
          {/* Hiển thị selectedPriceRanges */}
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

          {/* Hiển thị selectedCategories */}
          {selectedCategories?.map((categoryId) => {
            // Tìm danh mục có ID khớp với categoryId trong danh sách categories
            const category = categories?.res?.find((cat) => cat._id === categoryId)
            return (
              category && (
                <div
                  key={categoryId}
                  className='flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1 bg-gray-50'
                >
                  <p className='mr-2'>{category.name}</p>
                  <button onClick={() => removeCategoryFilter(categoryId)} className='text-red-500 hover:text-red-700'>
                    &times;
                  </button>
                </div>
              )
            )
          })}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-2 my-4 px-5 sm:gap-4'>
          {/* Hiển thị selectedPriceRanges */}
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

          {/* Hiển thị selectedCategories */}
          {selectedCategories?.map((categoryId) => {
            // Tìm danh mục có ID khớp với categoryId trong danh sách categories
            const category = categories?.res?.find((cat) => cat._id === categoryId)
            return (
              category && (
                <div
                  key={categoryId}
                  className='flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1 bg-gray-50'
                >
                  <p className='mr-2'>{category.name}</p>
                  <button onClick={() => removeCategoryFilter(categoryId)} className='text-red-500 hover:text-red-700'>
                    &times;
                  </button>
                </div>
              )
            )
          })}
        </div>
      )}

      {/* sản phẩm  */}
      <div className='mx-auto container mt-12'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 lg:mx-[40px] mt-4 mb-8'>
          {currentProducts
            .filter((product: any) => !product.is_hidden && !product.category_id.isHidden)
            .map((product: any) => {
              // Kiểm tra các variant và lấy giá trị từ sku_id
              const firstVariant = product?.variants?.[0]

              return (
                <div key={product._id} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
                  <div className='relative'>
                    <div className='flex transition-transform ease-in-out duration-500'>
                      <p className='absolute top-1 left-1 bg-[#FF0000] px-[4px] py-[2px] text-white text-sm rounded-md'>
                        {firstVariant?.sku_id?.price_discount_percent}
                        <span className='text-xs'>%</span>
                      </p>
                      <a href={`/detail/${product._id}`}>
                        <img
                          src={
                            firstVariant?.sku_id?.image?.[0] || 'default-image.jpg' // Ảnh mặc định ban đầu
                          }
                          alt={product?.name}
                          className='object-cover'
                        />
                        <FaRegEye
                          className='absolute left-[45%] top-[30%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                          title='Xem nhanh'
                        />
                        <div className='mx-2 text-center space-y-2 mt-3'>
                          <h3 className='line-clamp-2'>{firstVariant?.sku_id?.name}</h3>
                          <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                            {/* Hiển thị giá thay đổi khi hover */}
                            <span className='text-[#FF0000] font-semibold'>
                              {firstVariant?.sku_id?.price.toLocaleString()}₫
                            </span>
                            <span className='text-gray-500 line-through font-medium text-sm'>
                              {firstVariant?.sku_id?.price_before_discount.toLocaleString()}₫
                            </span>
                          </div>
                          <Button>xem chi tiết</Button>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Nếu không có sản phẩm nào, hiển thị thông báo */}
        {currentProducts.filter((product) => !product.is_hidden).length === 0 && (
          <div className='text-center text-2xl text-gray-600 mt-4'>Không có sản phẩm nào đúng theo yêu cầu!</div>
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

export default ProductsPage
