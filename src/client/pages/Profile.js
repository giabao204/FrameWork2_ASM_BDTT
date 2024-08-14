import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/Auth';
import { getAllOrders, deleteOrder } from '../../services/Order';
import ConfirmModal from '../components/ConfirmModal'; // Import ConfirmModal
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    useEffect(() => {
        getUserInfo();
        getOrders();
        const loginMessage = localStorage.getItem('loginMessage');
        if (loginMessage) {
            toast.success(loginMessage);
            localStorage.removeItem('loginMessage');
        }
    }, []);

    const getUserInfo = async () => {
        try {
            const res = await getUser(cookies.token);
            setUser(res);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    const getOrders = async () => {
        try {
            const res = await getAllOrders();
            console.log('Orders data:', res); // In ra dữ liệu nhận được
            // Xử lý hình ảnh Base64
            const processedOrders = res.map(order => {
                if (order.image) {
                    // Chia chuỗi Base64 thành mảng nếu có nhiều hình ảnh
                    const imagesArray = order.image.split(',');
                    return { ...order, images: imagesArray };
                }
                return order;
            });
            setOrders(processedOrders);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    const handleLogout = () => {
        removeCookie('token', { path: '/' });
        navigate('/login');
    };

    const handleDeleteOrder = (id) => {
        setOrderToDelete(id);
        setShowConfirm(true);
    };

    const confirmDeleteOrder = async () => {
        try {
            await deleteOrder(orderToDelete);
            toast.success('Đơn hàng đã được hủy.');
            setOrders(orders.filter(order => order.id !== orderToDelete));
        } catch (error) {
            toast.error('Hủy đơn hàng thất bại.');
            console.error('Error deleting order:', error);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Thông Tin Cá Nhân</h2>
                    <div className="bg-white p-4 rounded shadow-sm mb-4">
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
                    <h3 className="text-center mb-4">Đơn Hàng</h3>
                    <ListGroup>
                        {orders.length === 0 ? (
                            <p>Bạn chưa có đơn hàng nào.</p>
                        ) : (
                            orders.map(order => (
                                <ListGroup.Item key={order.id} className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            {order.images && order.images.length > 0 ? (
                                                order.images.map((image, index) => (
                                                    <Image
                                                        key={index}
                                                        src={`data:image/jpeg;base64,${image}`}
                                                        className="me-2"
                                                        style={{ width: '100px', height: 'auto' }}
                                                    />
                                                ))
                                            ) : (
                                                <p>No images available</p>
                                            )}
                                        </div>
                                        <div>
                                            <p><strong>Sản phẩm:</strong> {order.product_name}</p>
                                            <p><strong>Số lượng:</strong> {order.quantity}</p>
                                            <p><strong>Tổng tiền:</strong> {order.total}</p>
                                            <p>
                                                <strong>Trạng thái: </strong>
                                                {order.status === 1 ? 'Chờ xác nhận' : 'Đã xác nhận'}
                                            </p>
                                        </div>
                                    </div>
                                    {order.status === 1 && (
                                        <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>
                                            Hủy
                                        </Button>
                                    )}
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Col>
            </Row>
            <ConfirmModal
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={confirmDeleteOrder}
                message="Bạn có chắc chắn muốn hủy đơn hàng này?"
            />
            <ToastContainer />
        </Container>
    );
};

export default Profile;
