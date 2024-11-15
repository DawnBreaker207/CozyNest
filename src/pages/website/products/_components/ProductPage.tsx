import { Cart } from '@/components/icons'
import useCart from '@/hooks/useCart'
import { useProductQuery } from '@/hooks/useProductQuery'
import { IProduct } from '@/types/product'
import { CheckOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Drawer, Dropdown, MenuProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GrNext } from 'react-icons/gr'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import instance from '@/configs/axios'
import { useQuery } from '@tanstack/react-query'
import { ICategory } from '@/types/category'

const ProductsPage = () => {
  const { data } = useProductQuery()
  const [products, setProducts] = useState<IProduct[]>(data?.res || [])

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await instance.get(`/categories`)
  })

  const { addToCart } = useCart() // Sử dụng hook useCart
  const [messageApi, contextHolder] = message.useMessage()
  const handleAddToCart = (productId: string) => {
    addToCart(productId) // Thêm sản phẩm vào giỏ hàng
    messageApi.success('Thêm vào giỏ hàng thành công!')
  }

  const [, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const show = () => {
    // setVisible(true)
    setOpen(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpen(false)
  }

  // Sắp xếp
  useEffect(() => {
    if (data?.res) {
      setProducts(data.res) // Cập nhật trạng thái khi có dữ liệu từ API
    }
  }, [data])
  // Chức năng sắp xếp giá từ thấp đến cao
  const sortPriceAsc = (products: IProduct[]) => {
    return products.sort((a, b) => a.price - b.price)
  }

  // Chức năng sắp xếp giá từ cao đến thấp
  const sortPriceDesc = (products: IProduct[]) => {
    return products.sort((a, b) => b.price - a.price)
  }

  // Chức năng sắp xếp theo tên từ A-Z
  const sortNameAsc = (products: IProduct[]) => {
    return products.sort((a, b) => a.name.localeCompare(b.name))
  }

  // Chức năng sắp xếp theo tên từ Z-A
  const sortNameDesc = (products: IProduct[]) => {
    return products.sort((a, b) => b.name.localeCompare(a.name))
  }

  const [selectedKey, setSelectedKey] = useState('')
  const handleMenuClick = (key: string) => {
    let sortedProducts: IProduct[] = []
    switch (key) {
      case '1':
        sortedProducts = sortPriceAsc([...products])
        break
      case '2':
        sortedProducts = sortPriceDesc([...products])
        break
      case '3':
        sortedProducts = sortNameAsc([...products])
        break
      case '4':
        sortedProducts = sortNameDesc([...products])
        break
      case '5':
        return products
        break
      default:
        break
    }
    setProducts(sortedProducts) // Cập nhật lại danh sách sản phẩm sau khi sắp xếp
    setSelectedKey(key) // Lưu lại mục đã chọn
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
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]) // Lưu trạng thái checkbox

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
      if (
        priceRanges.includes('Dưới 1.000.000₫') &&
        product?.price - product?.price * (product?.discount / 100) < 1000000
      )
        return true
      if (
        priceRanges.includes('1.000.000₫ - 2.000.000₫') &&
        product?.price - product?.price * (product?.discount / 100) >= 1000000 &&
        product?.price - product?.price * (product?.discount / 100) <= 2000000
      )
        return true
      if (
        priceRanges.includes('2.000.000₫ - 3.000.000₫') &&
        product?.price - product?.price * (product?.discount / 100) >= 2000000 &&
        product?.price - product?.price * (product?.discount / 100) <= 3000000
      )
        return true
      if (
        priceRanges.includes('3.000.000₫ - 4.000.000₫') &&
        product?.price - product?.price * (product?.discount / 100) >= 3000000 &&
        product?.price - product?.price * (product?.discount / 100) <= 4000000
      )
        return true
      if (
        priceRanges.includes('Trên 4.000.000₫') &&
        product?.price - product?.price * (product?.discount / 100) > 4000000
      )
        return true
      return false
    })
  }

  const filteredProducts = filterProductsByPrice(products, selectedPriceRanges)

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
              <img src='//theme.hstatic.net/200000748041/1001116292/14/collection_banner.jpg?v=31' alt='Products' />
            </div>
            <div className='w-[50%] place-content-center bg-gray-100 collection-heading col-lg-6 col-12 '>
              <h1 className='text-[#FFCC00] w-[80%] ml-12 text-5xl font-medium'>Tất cả sản phẩm</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className='wrapper-collection-header banner-header mt-8'>
          <div className='my-auto d-flex flex-wrap'>
            <div className='w-[100%] collection-banner col-lg-6 col-12 pl-0 pr-0'>
              <img src='//theme.hstatic.net/200000748041/1001116292/14/collection_banner.jpg?v=31' alt='Products' />
            </div>
            <div className='w-[100%] h-[80px] place-content-center bg-gray-100 collection-heading col-lg-6 col-12 '>
              <h1 className='text-[#FFCC00] ml-5 text-3xl font-medium'>Tất cả sản phẩm</h1>
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
                  <Link className='text-black hover:text-yellow-500' to={`/products_page/${category._id}`}>
                    {category.name}
                  </Link>
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
            {/* Color Filter */}
            <div className='my-4'>
              <h4 className='mb-2'>Màu sắc</h4>
              <div className='flex flex-wrap gap-2'>
                {[
                  'bg-pink-500',
                  'bg-orange-500',
                  'bg-red-500',
                  'bg-gray-400',
                  'bg-white',
                  'bg-black',
                  'bg-green-500',
                  'bg-yellow-500',
                  'bg-blue-500'
                ].map((colorClass, index) => (
                  <div key={index} className={`w-6 h-6 border rounded cursor-pointer ${colorClass}`} />
                ))}
              </div>
            </div>
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
          currentProducts.map((product: IProduct, index: number) => (
            <div key={index} className='group overflow-hidden hover:shadow-lg rounded-lg pb-3'>
              <Link to={`/detail/${product._id}`}>
                <div className='relative'>
                  <div className='flex group-hover:-translate-x-full transition-transform ease-in-out duration-500'>
                    <img src={product?.thumbnail} alt={product?.name} className='object-cover' />
                    <img src={product?.thumbnail} alt={product?.name} className='object-cover' />
                  </div>
                  <FaRegEye
                    className='absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white'
                    title='Xem nhanh'
                  />
                  <span className='absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded'>
                    -{product?.discount}%
                  </span>
                </div>
              </Link>
              <div className='mx-2 text-center space-y-2 mt-3'>
                <h3>{product?.name}</h3>
                <div className='flex sm:flex-row flex-col items-center justify-center gap-2'>
                  <span className='text-[#FF0000] font-semibold'>
                    {product?.price - product?.price * (product?.discount / 100)}₫
                  </span>
                  <span className='text-[#878c8f] font-light line-through text-[13px]'>{product?.price}₫</span>
                </div>
                <button
                  className='flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto'
                  onClick={() => handleAddToCart(String(product._id))}
                >
                  <span className='text-[12px] uppercase font-semibold text-ellipsis'>Thêm vào giỏ</span>
                  <div className='p-[6px] bg-[#FCA120] rounded-full'>
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='flex justify-center w-[22%] items-center my-4 gap-8 max-w-screen-lg mx-auto'>
        <button
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
