import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import './Admin.css';
import DanhSach from './pages/DanhSach';

const AdminApp = () => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper">
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="danhsach" element={<DanhSach />} />
            {/* Các route khác */}
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminApp;
