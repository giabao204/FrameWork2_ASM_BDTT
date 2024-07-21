import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const ClientFooter = () => {
  return (
    <div className="bg-light text-dark mt-5">
      <Container className="py-5">
        <Row className="g-5">
          <Col md={6} lg={3}>
            <a href="/" className="d-inline-block mb-3 text-decoration-none">
              <Nav.Link as={NavLink} to="/" className='fs-1 text-success'>BD3T</Nav.Link>
            </a>
            <p>Dịch vụ giao hàng nhanh chóng và tiện lợi làm cho việc mua sách trở nên dễ dàng và thuận tiện hơn bao giờ hết.</p>
          </Col>
          <Col md={6} lg={3}>
            <h5 className="mb-4">Liên lạc</h5>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />TP. Cần Thơ</p>
            <p><FontAwesomeIcon icon={faPhoneAlt} className="me-2" />+84 094578984</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="me-2" />bd3t@gmail.com</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-success rounded-circle me-2" href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a className="btn btn-outline-success rounded-circle me-2" href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a className="btn btn-outline-success rounded-circle me-2" href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </Col>
          <Col md={6} lg={3}>
            <h5 className="mb-4">Our Products</h5>
            <a className="d-block text-decoration-none text-dark mb-2" href="#">Products</a>
            <a className="d-block text-decoration-none text-dark mb-2" href="#">Products</a>
            <a className="d-block text-decoration-none text-dark mb-2" href="#">Products</a>
            <a className="d-block text-decoration-none text-dark mb-2" href="#">Products</a>
            <a className="d-block text-decoration-none text-dark mb-2" href="#">Products</a>
          </Col>
          <Col md={6} lg={3}>
            <h5 className="mb-4">Liên kết phổ biến</h5>
            <Nav className="flex-column">
              <Nav.Link as={NavLink} to="/" className="nav-item nav-link text-dark">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about" className="nav-item nav-link text-dark">About</Nav.Link>
              <Nav.Link as={NavLink} to="/products" className="nav-item nav-link text-dark">Products</Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="nav-item nav-link text-dark">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="border-top pt-4 mt-4">
          <Row>
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              &copy; <a className="text-decoration-none" href="#">Hairnic</a>, All Rights Reserved.
              Designed By <a className="text-decoration-none" href="https://htmlcodex.com">HTML Codex</a> Distributed by <a href="https://themewagon.com">ThemeWagon</a>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="d-inline-flex">
                <a className="me-3 text-decoration-none text-dark" href="#">Home</a>
                <a className="me-3 text-decoration-none text-dark" href="#">Cookies</a>
                <a className="me-3 text-decoration-none text-dark" href="#">Help</a>
                <a className="text-decoration-none text-dark" href="#">FAQs</a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ClientFooter;
