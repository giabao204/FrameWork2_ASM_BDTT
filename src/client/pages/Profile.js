import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserInfo();
        const loginMessage = localStorage.getItem('loginMessage');
        if (loginMessage) {
            toast.success(loginMessage);
            localStorage.removeItem('loginMessage', 'Đăng nhập thành công!');
        }
    }, []);

    const getUserInfo = async () => {
        try {
            const res = await getUser(cookies.token);
            setUser(res);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };

    const handleLogout = () => {
        removeCookie('token', { path: '/' });
        navigate('/login');
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Thông Tin Cá Nhân</h2>
                    <div className="bg-white p-4 rounded shadow-sm">
                        {user ? (
                            <>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Username:</strong> {user.username}</p>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <Button variant="danger" onClick={handleLogout} className="w-100">
                            Đăng Xuất
                        </Button>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Profile;
