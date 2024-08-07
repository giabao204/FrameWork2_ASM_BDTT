import React, { useEffect, useState } from 'react';
import { getProduct, getProductsByCategory } from '../../services/Product';
import { getCategory } from '../../services/Category';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../components/Cart';
import { useCookies } from 'react-cookie';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const { addItemToCart } = useCart();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId = '') => {
    try {
      const result = categoryId
          ? await getProductsByCategory(categoryId)
          : await getProduct();
      const productsWithImageURL = result.map(product => ({
        ...product,
        image: `data:image/jpeg;base64,${product.image}`
      }));
      setProducts(productsWithImageURL);
    } catch (err) {
      console.error('Error fetching products:', err);
      toast.error('Error fetching products. Please try again later.');
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getCategory();
      setCategories(result);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Error fetching categories. Please try again later.');
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    fetchProducts(event.target.value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleAddToCart = (product) => {
    if (!cookies.token) {
      toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
      navigate('/login');
      return;
    }
    try {
      addItemToCart({ ...product, quantity: 1 });
      toast.success('Thêm sản phẩm vào giỏ hàng thành công.');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart. Please try again later.');
    }
  };

  return (
      <div className="container-fluid p-0">
        <div className="container-fluid bg-success hero-header mb-5" style={{ padding: '50px 0' }}>
          <div className="container text-center">
            <h1 className="display-4 text-white mb-3 animated slideInDown">Products</h1>
          </div>
        </div>
        <div className="container-fluid py-5">
          <div className="container">
            <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
              <h1 className="text-success mb-3"><span className="fw-light text-dark">Sản phẩm</span> Sách của chúng tôi</h1>
              <p className="mb-5">Dịch vụ giao hàng nhanh chóng và tiện lợi làm cho việc mua sách trở nên dễ dàng và thuận tiện hơn bao giờ hết.</p>
            </div>
            <div className="row mb-4">
              <div className="col-md-12 text-center">
                <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="">Tất cả</option>
                  {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row g-4">
              {products.map((value) => (
                  <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s" key={value.id}>
                    <div className="product-item text-center border h-100 p-4">
                      <Link to={`/products/${value.id}`}>
                        <div style={{ height: '250px' }}>
                          <img className="img-fluid mb-4 product-image" src={value.image} alt={value.name} style={{ width: '100%' }} />
                        </div>
                      </Link>
                      <Link to={`/products/${value.id}`} className="h6 d-inline-block mb-2 text-decoration-none">
                        {value.name}
                      </Link>
                      <h6 className="text-danger mb-3">{formatCurrency(value.price)}</h6>
                      <button className="btn btn-outline-success px-3" style={{ fontSize: '14px' }}
                              onClick={() => handleAddToCart(value)}>Add To Cart</button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductsPage;
