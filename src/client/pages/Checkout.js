import React from 'react';
import { useCart } from '../components/Cart';
import { Container, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { createOrder } from '../../services/Order';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (formData) => {
        const orderData = {
            ...formData,
            image: cart.map(item => item.image).join(','), // Combining images as a string
            quantity: cart.reduce((total, item) => total + item.quantity, 0),
            total: calculateTotal()
        };

        try {
            const response = await createOrder(orderData);
            console.log('API Response:', response); // Debugging log for API response
            clearCart();
            reset(); // Clear the form fields
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('name', { required: 'Tên là bắt buộc' })}
                    />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register('email', {
                            required: 'Email là bắt buộc',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Email không hợp lệ'
                            }
                        })}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Số Điện Thoại</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('phone', { required: 'Số điện thoại là bắt buộc' })}
                    />
                    {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Địa Chỉ</Form.Label>
                    <Form.Control
                        type="text"
                        {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                    />
                    {errors.address && <p className="text-danger">{errors.address.message}</p>}
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
