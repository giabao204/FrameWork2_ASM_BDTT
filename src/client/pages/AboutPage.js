import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="feature-item position-relative bg-success text-center p-3">
                <div className="border py-5 px-3">
                  <i className="fa fa-book fa-3x text-dark mb-4"></i>
                  <h5 className="text-white mb-0">Lựa Chọn Phong Phú</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="feature-item position-relative bg-success text-center p-3">
                <div className="border py-5 px-3">
                  <i className="fa fa-book-open fa-3x text-dark mb-4"></i>
                  <h5 className="text-white mb-0">Xem Trước Miễn Phí</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="feature-item position-relative bg-success text-center p-3">
                <div className="border py-5 px-3">
                  <i className="fa fa-user-graduate fa-3x text-dark mb-4"></i>
                  <h5 className="text-white mb-0">Đánh Giá Chuyên Gia</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <img className="img-fluid animated pulse infinite" src="img/shampoo-1.png" alt="Shampoo" />
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="text-success mb-4">Sách Hay <span className="fw-light text-dark">Là Kho Tàng Tri Thức</span></h1>
              <p className="mb-4">Mua sách trực tuyến mang lại nhiều lợi ích cho người dùng. Các trang web bán sách cung cấp một loạt các đầu sách từ nhiều thể loại khác nhau, giúp người đọc dễ dàng tìm thấy những cuốn sách yêu thích.</p>
              <p className="mb-4">Hơn nữa, dịch vụ giao hàng nhanh chóng và tiện lợi làm cho việc mua sách trở nên dễ dàng và thuận tiện hơn bao giờ hết.</p>
              <a className="btn btn-success py-2 px-4">
              <Nav.Link as={NavLink} to="/products" className="btn btn-success py-2 px-4">Mua ngay</Nav.Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
