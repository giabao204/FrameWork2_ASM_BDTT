import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();

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
                        <p><strong>Email:</strong> user@example.com</p> {/* Thay thế bằng thông tin thực tế */}
                        <p><strong>Username:</strong> user123</p> {/* Thay thế bằng thông tin thực tế */}
                        <Button variant="danger" onClick={handleLogout} className="w-100">
                            Đăng Xuất
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
