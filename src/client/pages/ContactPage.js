import React from 'react';

const ContactPage = () => {
  return (
    <div>
      {/* Hero Header Start */}
      <div className="container-fluid bg-success hero-header mb-5" style={{ padding: '50px 0' }}>
        <div className="container text-center">
          <h1 className="display-4 text-white mb-3 animated slideInDown">Liên Hệ</h1>
        </div>
      </div>
      {/* Hero Header End */}
      
      {/* Contact Info Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="contact-info-item position-relative bg-success text-center p-3">
                <div className="border py-5 px-3">
                  <i className="fa fa-map-marker-alt fa-3x text-dark mb-4"></i>
                  <h5 className="text-white">Địa Chỉ Văn phòng</h5>
                  <h5 className="fw-light text-white">TP. Cần Thơ</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="contact-info-item position-relative bg-success text-center p-3">
                <div className="border py-5 px-3">
                  <i className="fa fa-phone-alt fa-3x text-dark mb-4"></i>
                  <h5 className="text-white">Gọi .Cho Chúng Tôi</h5>
                  <h5 className="fw-light text-white">+84 094578984</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="contact-info-item position-relative bg-success text-center p-3">
                <div className="border py-5 px-3">
                  <i className="fa fa-envelope fa-3x text-dark mb-4"></i>
                  <h5 className="text-white">Mail Của Chúng Tôi</h5>
                  <h5 className="fw-light text-white">bd3t@gmail.com</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Info End */}

      {/* Contact Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="mx-auto text-center wow fadeIn" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
            <h1 className="text-success mb-5"><span className="fw-light text-dark">Nếu Bạn Có Bất Kỳ Câu Hỏi Nào,</span> Vui Lòng Liên Hệ Với Chúng Tôi</h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-7 wow fadeIn" data-wow-delay="0.1s">
              <div className="wow fadeIn" data-wow-delay="0.3s">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="Your Name" />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" placeholder="Your Email" />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="subject" placeholder="Subject" />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: '150px' }}></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-success w-100 py-3" type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 wow fadeIn" data-wow-delay="0.5s">
              <iframe className="w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.420494742025!2d105.75565247479341!3d9.982081490122424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08906415c355f%3A0x416815a99ebd841e!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1721524973812!5m2!1svi!2s" frameBorder="0" style={{ minHeight: '300px', border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </div>
  );
};

export default ContactPage;
