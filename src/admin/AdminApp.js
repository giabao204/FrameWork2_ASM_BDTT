import React, { useEffect, useState } from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import './Admin.css';
import DanhSach from './pages/DanhSach';
import { getUser } from '../services/Auth';
import { useCookies } from 'react-cookie';
import Category from './pages/Category/index';
import User from './pages/User/index';
import Product from "./pages/Product/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminApp = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'role']);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await getUser();
                if (res?.role && res.role !== cookies.role) {
                    setCookie('role', res.role, { path: '/' });
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                setLoading(false);
            }
        };

        if (cookies.token) {
            getUserInfo();
        } else {
            setLoading(false);
        }
    }, [cookies.role, cookies.token, setCookie]);

    if (loading) {
        return <div>Loading...</div>; // Hoặc một spinner nào đó để hiển thị trong khi chờ đợi
    }

    if (!cookies?.token || cookies?.role !== 'admin') {
        localStorage.setItem('adminAccessError', 'Bạn không có quyền truy cập trang này!');
        navigate('/');
        return null;
    }

    return (
        <div className="d-flex" id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <Header />
                <div className="container-fluid">
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="product" element={<Product />} />
                        <Route path="category" element={<Category />} />
                        <Route path="user" element={<User/>} />
                        {/* Các route khác */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default AdminApp;
