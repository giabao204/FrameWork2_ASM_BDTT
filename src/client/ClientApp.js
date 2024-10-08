import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientNavbar from './components/ClientNavbar';
import ClientFooter from './components/ClientFooter';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import Login from './components/Login/index';
import Register from './components/Register/index';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './components/Cart';
import Checkout from "./pages/Checkout";
import {ToastContainer} from "react-toastify";

const ClientApp = () => {
    return (
        <CartProvider>
            <ClientNavbar />
            <div className="container my-4">
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/:id" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </div>
            <ClientFooter />
        </CartProvider>
    );
};

export default ClientApp;
