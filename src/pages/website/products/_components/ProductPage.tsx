import { Cart } from '@/components/icons'
import useCart from '@/hooks/useCart'
import { useCategoryQuery } from '@/hooks/useCategoryQuery'
import { useFilterProducts, usePaginate, useSortProducts } from '@/hooks/useProduct'
import { useProductQuery } from '@/hooks/useProductQuery'
import { ICategory } from '@/types/category'
import { IProduct } from '@/types/product'
import { CheckOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Drawer, Dropdown, MenuProps, message } from 'antd'
import { useEffect, useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { GrNext } from 'react-icons/gr'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { data: categories } = useCategoryQuery()
  const { data } = useProductQuery()
  const [products, setProducts] = useState<IProduct[]>(data?.res || [])
  const [selectedKey, setSelectedKey] = useState('')
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const { addToCart } = useCart() // Sử dụng hook useCart
  const [, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const { sortProducts } = useSortProducts(products)
  const { filterProductsByPrice } = useFilterProducts(products)
  const filteredProducts = filterProductsByPrice(selectedPriceRanges)

  const {
    currentPage,
    totalPages,
    currentItems: currentProducts,
    handleNextPage,
    handlePrevPage
  } = usePaginate(filteredProducts, 15)

  useEffect(() => {
    if (data) setProducts(data.res)
  }, [data])
  const show = () => {
    // setVisible(true)
    setOpen(true)
  }
  const onClose = () => {
    setVisible(false)
    setOpen(false)
  }
  const handleAddToCart = (productId: string) => {
    addToCart(productId) // Thêm sản phẩm vào giỏ hàng
    messageApi.success('Thêm vào giỏ hàng thành công!')
  }
  const handleMenuClick = (key: string) => {
    setProducts(sortProducts(key))
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
  return (
    <>
      {contextHolder}
      {window.innerWidth > 800 ? (
        <div className='wrapper-collection-header banner-header '>
          <div className='flex my-auto d-flex flex-wrap'>
            <div className='w-[50%] collection-banner  col-lg-6 col-12 pl-0 pr-0'>
              <img
                src='https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22-768x488.jpg'
                alt='Products'
              />
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
              <img
                src='https://nhaxinh.com/wp-content/uploads/2022/09/banner-phong-an-nha-xinh-12-9-22-768x488.jpg'
                alt='Products'
              />
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

              {categories?.res?.map((category: ICategory) => (
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
