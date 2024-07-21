import React from 'react';

const ProductsPage = () => {
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
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-1.jpg" alt="Hair Shining Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 1</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-1.jpg" alt="Anti-dandruff Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 1</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-1.jpg" alt="Anti Hair Fall Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 1</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-1.jpg" alt="Hair Growing Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 1</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            {/* Fixed duplicate product items with correct HTML */}
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-2.jpg" alt="Hair Shining Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 2</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-2.jpg" alt="Anti-dandruff Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 2</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-2.jpg" alt="Anti Hair Fall Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 2</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
              <div className="product-item text-center border h-100 p-4">
                <img className="img-fluid mb-4 product-image" src="images/anh-san-pham-2.jpg" alt="Hair Growing Shampoo"/>
                <div className="mb-2">
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small className="fa fa-star text-warning"></small>
                  <small>(99)</small>
                </div>
                <a href="#" className="h6 d-inline-block mb-2">Sách 2</a>
                <h5 className="text-danger mb-3">$99.99</h5>
                <a href="#" className="btn btn-outline-success px-3">Add To Cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
