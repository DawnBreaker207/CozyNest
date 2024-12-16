import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useFilterProducts, usePaginate } from '@/hooks/useProduct'
import { useProductQuery } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { CheckOutlined, DownOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Dropdown, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { GrNext } from 'react-icons/gr'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

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
              src='https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22-768x488.jpg'
              alt='Products'
              className='w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[482px] object-cover'
            />
          </div>
          <div className='w-full place-content-center collection-heading mt-[30px]'>
            <h1 className='text-[#FFCC00] w-[85%] mb-[1%] mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium'>
              Tất cả sản phẩm
            </h1>
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between items-center my-4 px-8'>
        {/* Bộ lọc và Sắp xếp */}
        <div className='flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12 w-full'>
          {/* Bộ lọc */}
          <div className='flex items-center ml-20'>
            <Button icon={<FilterOutlined />} className='text-sm md:text-base pr-4'>
              Bộ lọc
            </Button>
            {/* <div className='h-8 border-r-2 border-gray-300 ml-12 md:block invisible md:visible' /> */}
          </div>

          {/* Danh mục sản phẩm */}
          <Dropdown
            overlay={
              <div className='p-4 bg-white shadow-lg rounded-lg'>
                <Checkbox
                  checked={selectedCategories.length === 0} // Không chọn danh mục nào
                  onChange={() => setSelectedCategories([])} // Reset danh mục
                >
                  Tất cả sản phẩm
                </Checkbox>
                <br />
                {categories?.res?.map((category: ICategory) => (
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
            <Button className='text-sm md:text-base min-w-[200px] flex items-center'>
              Danh mục sản phẩm
              <DownOutlined className='mr-2' />
            </Button>
          </Dropdown>

          {/* Lọc giá */}
          <Dropdown
            overlay={
              <div className='p-4 bg-white shadow-lg rounded-lg'>
                <Checkbox
                  checked={selectedPriceRanges.includes('Dưới 1.000.000₫')}
                  onChange={() => handlePriceRangeChange('Dưới 1.000.000₫')}
                >
                  Dưới 1.000.000₫
                </Checkbox>
                <br />
                <Checkbox
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
            }
          >
            <Button className='text-sm md:text-base min-w-[200px] flex items-center'>
              Giá sản phẩm
              <DownOutlined className='mr-2' />
            </Button>
          </Dropdown>
        </div>

        {/* Sắp xếp (đẩy sang bên phải) */}
        <div className='ml-auto mr-20 mb-24 sm:mb-0'>
          <Dropdown
            className='w-full sm:w-auto'
            menu={{
              items: menuItems,
              onClick: (e) => handleMenuClick(e.key)
            }}
          >
            <Button icon={<SortAscendingOutlined />}>Sắp xếp</Button>
          </Dropdown>
        </div>
      </div>

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
            .filter((product) => !product.is_hidden)
            .map((product) => {
              console.log(product)

              // Kiểm tra các variant và lấy giá trị từ sku_id
              const firstVariant = product?.variants?.[0]
              console.log(firstVariant)

              const price = firstVariant?.sku_id?.price || 0 // Sử dụng giá mặc định là 0 nếu không có giá
              // const priceDiscountPercent = firstVariant?.sku_id?.price_discount_percent || 0
              // const discountedPrice = price - price * (priceDiscountPercent / 100)

              return (
                <div key={product._id} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
                  <Link to={`/detail/${product._id}`}>
                    <div className='relative'>
                      <div className='flex transition-transform ease-in-out duration-500'>
                        <img
                          src={
                            hoveredImages[product._id] || // Ảnh hiện tại được hover
                            product?.variants?.[0]?.sku_id?.image?.[0] || // Ảnh mặc định ban đầu
                            'default-image.jpg' // Ảnh mặc định nếu không có
                          }
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
                        {/* Hiển thị giá thay đổi khi hover */}
                        <span className='text-[#FF0000] font-semibold'>
                          {(hoveredPrices[product._id] || price).toLocaleString()}₫
                        </span>
                      </div>
                      <Button>xem chi tiết</Button>
                    </div>
                  </Link>
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
