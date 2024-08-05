import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import './Admin.css';
import DanhSach from './pages/DanhSach';
import { getUser } from '../services/Auth';
import { useCookies } from 'react-cookie';

const AdminApp = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'role']);
    const [loading, setLoading] = useState(true);

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

    return cookies?.token && cookies?.role === 'admin' ? (
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
    ) : (
        <Navigate to="/login" />
    );
};

export default AdminApp;
