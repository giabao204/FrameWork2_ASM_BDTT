import React, { useState } from 'react';
import { useCart } from '../components/Cart';
import { Container, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { createOrder } from '../../services/Order';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            image: cart.map(item => item.image).join(','), // Kiểm tra cách gửi hình ảnh
            quantity: cart.reduce((total, item) => total + item.quantity, 0),
            total: calculateTotal()
        };

        try {
            await createOrder(orderData);
            clearCart();
            toast.success('Đặt hàng thành công!');
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Error creating order. Please try again later.');
        }
    };




    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Container>
            <h2 className="text-center text-success mb-4">Đặt Hàng</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Số Điện Thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Địa Chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <h3 className="text-center text-success mb-4">Giỏ Hàng</h3>
                <ListGroup>
                    {cart.length === 0 ? (
                        <ListGroup.Item>Giỏ hàng trống</ListGroup.Item>
                    ) : (
                        cart.map(item => (
                            <ListGroup.Item key={item.id} className="d-flex align-items-center">
                                <Image src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                <div className="flex-grow-1">
                                    {item.name} - {formatCurrency(item.price)} x {item.quantity}
                                </div>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
                <h4 className="text-center text-success mt-4">Tổng Tiền: {formatCurrency(calculateTotal())}</h4>
                <Button variant="primary" type="submit" className="mt-3 w-100">
                    Xác Nhận Đặt Hàng
                </Button>
            </Form>
        </Container>
    );
};

export default Checkout;
