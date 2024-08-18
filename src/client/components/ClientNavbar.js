import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import './ClientNavbar.css';

const ClientNavbar = () => {
  const [cookies] = useCookies(['token']);
  const isLoggedIn = !!cookies.token;

  return (
      <div className="container-fluid bg-success sticky-top">
        <Container>
          <Navbar expand="lg" className="p-0">
            <Navbar.Brand href="/" className="text-white">
              <h2>BD3T</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto me-0" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto mx-auto">
                <Nav.Link as={NavLink} to="/" className="nav-item nav-link text-white">Trang Chủ</Nav.Link>
                <Nav.Link as={NavLink} to="/about" className="nav-item nav-link text-white">Giới Thiệu</Nav.Link>
                <Nav.Link as={NavLink} to="/products" className="nav-item nav-link text-white">Sản Phẩm</Nav.Link>
                <Nav.Link as={NavLink} to="/contact" className="nav-item nav-link text-white">Liên Hệ</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link as={NavLink} to="/admin" className="nav-item nav-link text-white">Admin</Nav.Link>
                {isLoggedIn ? (
                    <Nav.Link as={NavLink} to="/profile" className="nav-item nav-link text-white">
                      <FontAwesomeIcon icon={faUser} /> Hồ Sơ
                    </Nav.Link>
                ) : (
                    <Nav.Link as={NavLink} to="/login" className="nav-item nav-link text-white">
                      <FontAwesomeIcon icon={faUser} /> Đăng Nhập
                    </Nav.Link>
                )}
                <Nav.Link as={NavLink} to="/cart" className="nav-item nav-link text-white">
                  <FontAwesomeIcon icon={faShoppingCart} /> Giỏ Hàng
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
  );
};

export default ClientNavbar;
