import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHeadset, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css';
import { toast, ToastContainer } from "react-toastify";
import { getProduct } from '../../services/Product'; // Import hàm lấy sản phẩm

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProduct();
        setProducts(result.slice(0, 4)); // Chỉ lấy 4 sản phẩm đầu tiên
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const adminAccessError = localStorage.getItem('adminAccessError');
    if (adminAccessError) {
      toast.error(adminAccessError);
      localStorage.removeItem('adminAccessError');
    }
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
      <div>
        {/* Phần hình to với văn bản */}
        <div className="hero-image">
          <img src="/images/anh-sach.jpg" alt="Hero" className="img-fluid" />
          <div className="hero-text">
            <h1>Chào Mừng Đến Với MyWebsite</h1>
            <p>Mua sắm thỏa thích với những sản phẩm chất lượng</p>
            <NavLink to="/products" className="btn btn-dark">Khám Phá Ngay</NavLink>
          </div>
        </div>

        {/* Sản phẩm bán chạy */}
        <div className="container-fluid py-5">
          <div className="container">
            <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
              <h1 className="text-primary mb-3"><span className="fw-light text-dark">Nguồn</span> Sách</h1>
              <p className="mb-5">Mua sách trực tuyến mang lại nhiều lợi ích cho người dùng. Các trang web bán sách cung cấp một loạt các đầu sách từ nhiều thể loại khác nhau, giúp người đọc dễ dàng tìm thấy những cuốn sách yêu thích.</p>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <div className="row g-4">
                  {products.map((product) => (
                      <div key={product.id} className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
                        <div className="product-item text-center border h-100 p-4">
                          <NavLink to={`/products/${product.id}`} className="d-block">
                            <img className="img-fluid mb-4 product-image" src={`data:image/jpeg;base64,${product.image}`} alt={product.name} />
                            <h6 className="h6 d-inline-block mb-2 text-decoration-none">{product.name}</h6>
                            <h5 className="text-primary mb-3">{formatCurrency(product.price)}</h5>
                            <NavLink to={`/products/${product.id}`} className="btn btn-outline-primary px-3">Mua Ngay</NavLink>
                          </NavLink>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>

        {/* Hình to thứ hai với văn bản */}
        <div className="large-image">
          <img src="/images/anh-sach-2.jpg" alt="Large" className="img-fluid" />
          <div className="large-image-text">
            <h2>Ưu Đãi Đặc Biệt</h2>
            <p>Đừng bỏ lỡ cơ hội mua sắm tuyệt vời!</p>
          </div>
        </div>

        {/* Phần thông tin */}
        <Container className="my-5">
          <Row>
            <Col md={4} className="text-center">
              <FontAwesomeIcon icon={faTruck} size="3x" className="mb-3" />
              <h4>GIAO HÀNG NHANH VÀ MIỄN PHÍ</h4>
              <p>Giao hàng miễn phí đơn hàng trên 1000k</p>
            </Col>
            <Col md={4} className="text-center">
              <FontAwesomeIcon icon={faHeadset} size="3x" className="mb-3" />
              <h4>HỖ TRỢ KHÁCH HÀNG 24/7</h4>
              <p>Hỗ trợ khách hàng thân thiện 24/7</p>
            </Col>
            <Col md={4} className="text-center">
              <FontAwesomeIcon icon={faShieldAlt} size="3x" className="mb-3" />
              <h4>HOÀN TIỀN NHANH CHÓNG</h4>
              <p>Trả lại tiền trong vòng 30 ngày</p>
            </Col>
          </Row>
        </Container>

        {/* Phần đăng ký nhận bản tin */}
        <div className="container-fluid newsletter bg-success py-5 my-5">
          <div className="container py-5">
            <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '900px' }}>
              <h1 className="text-white mb-3"><span className="fw-light text-dark">Let's Subscribe</span> The Newsletter</h1>
              <p className="text-white mb-4">Subscribe now to get 30% discount on any of our products</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-7 wow fadeIn" data-wow-delay="0.5s">
                <div className="position-relative w-100 mt-3 mb-2">
                  <input className="form-control w-100 py-4 ps-4 pe-5" type="text" placeholder="Enter Your Email" style={{ height: '48px' }} />
                  <button type="button" className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2">
                    <i className="fa fa-paper-plane text-white fs-4"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
  );
};

export default HomePage;
