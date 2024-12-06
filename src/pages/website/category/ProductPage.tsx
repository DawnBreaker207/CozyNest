import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';
import { message } from 'antd';
import useCart from '@/hooks/useCart';
import instance from '@/configs/axios';
import { Cart } from '@/components/icons';
import { ICategory } from '@/types/category';
import { IProduct } from '@/types/product';

const CategoryProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Số sản phẩm mỗi trang
  const [messageApi, contextHolder] = message.useMessage();

  const { addToCart } = useCart();
  const { id } = useParams();
  const categoryId = id;

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await instance.get('/categories');
      setCategories(data.res);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await instance.get('/products');
      setProducts(data.res);
    };
    fetchProducts();
  }, [categoryId]);

  let filteredProducts: IProduct[] = [];
  if (categories != null) {
    filteredProducts = categories.find((category) => category._id === categoryId)?.products || [];
  }

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    messageApi.success('Thêm vào giỏ hàng thành công!');
  };

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h2>
      <div className="mx-auto container mt-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center gap-5 lg:mx-[40px] mt-4 mb-8">
          {currentProducts.map((product: IProduct, index: number) => (
            <div key={index} className="group overflow-hidden hover:shadow-lg rounded-lg pb-3">
              <Link to={`/detail/${product._id}`}>
                <div className="relative">
                  <div className="flex group-hover:-translate-x-full transition-transform ease-in-out duration-500">
                    <img
                      src="https://res.cloudinary.com/didbnrsmz/image/upload/v1732883284/CozyNest/VIENNA_202_iav7fc.webp"
                      alt={product?.name}
                      className="object-cover"
                    />
                    <img src={product?.thumbnail} alt={product?.name} className="object-cover" />
                  </div>
                  <FaRegEye
                    className="absolute left-[45%] top-[50%] bg-white text-[#6d6565] rounded-full size-7 md:size-8 px-1 py-[2px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-500 hover:bg-[#444444] hover:text-white hover:border hover:border-white"
                    title="Xem nhanh"
                  />
                  <span className="absolute top-1 left-1 bg-[#FF0000] px-[5px] py-[2px] text-white text-[12px] rounded">
                    -{product?.discount}%
                  </span>
                </div>
              </Link>
              <div className="mx-2 text-center space-y-2 mt-3">
                <h3>{product?.name}</h3>
                <div className="flex sm:flex-row flex-col items-center justify-center gap-2">
                  <span className="text-[#FF0000] font-semibold">
                    {product?.price - product?.price * (product?.discount / 100)}₫
                  </span>
                  <span className="text-[#878c8f] font-light line-through text-[13px]">
                    {product.price}₫
                  </span>
                </div>
                <button
                  className="flex items-center justify-center gap-1 border border-white hover:border-[#FCA120] rounded-full pl-2 mx-auto"
                  onClick={() => handleAddToCart(String(product._id))}
                >
                  <span className="text-[12px] uppercase font-semibold text-ellipsis ">
                    Thêm vào giỏ
                  </span>
                  <div className="p-[6px] bg-[#FCA120] rounded-full">
                    <Cart />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center items-center space-x-2">
          <button
            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
