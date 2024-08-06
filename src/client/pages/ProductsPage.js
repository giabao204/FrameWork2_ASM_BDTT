import React, {useEffect, useState} from 'react';
import { getProduct } from '../../services/Product';
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await getProduct();
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`); // Navigate to the product detail page
  };

  const handleAddToCart = (id) => {
    // Handle adding the product to the cart
    console.log(`Product with id ${id} added to cart`);
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
          <div className="row g-4">
            {products.map((value) => (
                <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s"  key={value.id}>
                  <div className="product-item text-center border h-100 p-4">
                    <Link to={`/products/${value.id}`}>
                      <div style={{height: '250px'}}>
                        <img className="img-fluid mb-4 product-image" src={value.image} alt={value.name}
                             style={{width: '100%'}}/>
                      </div>
                    </Link>
                    <Link to={`/products/${value.id}`} className="h6 d-inline-block mb-2 text-decoration-none">
                      {value.name}
                    </Link>
                    <h6 className="text-danger mb-3">{formatCurrency(value.price)}</h6>
                    <a href="#" className="btn btn-outline-success px-3" style={{fontSize: '14px'}} onClick={() => handleAddToCart(value.id)}>Add To Cart</a>
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
