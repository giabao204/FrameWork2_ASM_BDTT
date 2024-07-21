import React from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaCog, FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom px-4">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/admin/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={NavLink} to="/admin/danhsach">Danh Sách</Nav.Link>
          <Nav.Link as={NavLink} to="/admin/billing">Billing</Nav.Link>
        </Nav>
        <Form className="d-flex mx-auto" style={{ width: '300px' }}>
          <FormControl
            type="search"
            placeholder="Search here"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Nav>
          <Nav.Link href="#profile">
            <FaUser />
          </Nav.Link>
          <Nav.Link href="#settings">
            <FaCog />
          </Nav.Link>
          <Nav.Link href="#notifications">
            <FaBell />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
