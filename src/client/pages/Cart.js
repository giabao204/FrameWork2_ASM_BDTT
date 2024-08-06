import React, { useEffect, useState } from 'react';
import { useCart } from '../components/Cart';
import { Container, ListGroup, Button, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getOneProduct } from '../../services/Product';

const Cart = () => {
    const { id } = useParams();
    const { cart, addItemToCart, removeItemFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const result = await getOneProduct(id);
                    setProduct(result);
                } catch (err) {
                    console.error('Error fetching product details:', err);
                }
            };
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            addItemToCart({ ...product, quantity: 1 });
        }
    }, [product, addItemToCart]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container>
            <h2 className="text-center text-success mb-4">Giỏ Hàng</h2>
            <ListGroup>
                {cart.length === 0 ? (
                    <ListGroup.Item>Giỏ hàng trống</ListGroup.Item>
                ) : (
                    cart.map(item => (
                        <ListGroup.Item key={item.id} className="d-flex align-items-center">
                            <Image src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                            <div className="flex-grow-1">
                                {item.name} - {formatCurrency(item.price)} x {item.quantity}
                                <div className="mt-2">
                                    <Button variant="outline-success" size="sm" onClick={() => incrementQuantity(item.id)}>+</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => decrementQuantity(item.id)}>-</Button>
                                </div>
                            </div>
                            <Button variant="danger" onClick={() => removeItemFromCart(item.id)} className="float-end">
                                Xóa
                            </Button>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
            {cart.length > 0 && (
                <>
                    <h3 className="text-center text-success mt-4">Tổng Tiền: {formatCurrency(calculateTotal())}</h3>
                    <Button variant="danger" onClick={() => clearCart()} className="mt-3 w-100">
                        Xóa Tất Cả
                    </Button>
                    <Button variant="primary" onClick={handleCheckout} className="mt-3 w-100">
                        Đặt Hàng
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Cart;
