import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faList, faFileInvoiceDollar, faUser, faSignInAlt, faUserPlus, faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useCookies } from 'react-cookie';

const Sidebar = () => {
  const [cookies, , removeCookie] = useCookies(['token', 'role']);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và role khỏi cookies
    removeCookie('token');
    removeCookie('role');
    // Điều hướng về trang đăng nhập hoặc trang chính
    navigate('/login');
  };

  return (
      <div id="sidebar-wrapper" style={{ backgroundColor: '#343a40' }}>
        <div className="sidebar-heading py-4 text-center text-white">ADMIN</div>
        <Nav className="flex-column">
          <Nav.Link as={NavLink} to="/admin/dashboard" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" /> Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/category" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faList} className="me-2" /> Loại sản phẩm
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/user" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faList} className="me-2" /> Người dùng
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/danhsach" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faList} className="me-2" /> Danh Sách
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/billing" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" /> Billing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/profile" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faUser} className="me-2" /> Profile
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/signin" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faSignInAlt} className="me-2" /> Sign In
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin/signup" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Sign Up
          </Nav.Link>
          <Nav.Link className="sidebar-link" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Đăng Xuất
          </Nav.Link>
          <Nav.Link as={NavLink} to="/" className="sidebar-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Quay Lại
          </Nav.Link>
        </Nav>
      </div>
  );
};

export default Sidebar;
