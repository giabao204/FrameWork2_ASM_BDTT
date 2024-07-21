import React from 'react';
import { useCart } from '../components/Cart/index';
import { Container, ListGroup, Button } from 'react-bootstrap';

const Cart = () => {
  const { cart, removeItemFromCart, clearCart } = useCart();

  return (
    <Container>
      <h2 className="text-center text-success mb-4">Giỏ Hàng</h2>
      <ListGroup>
        {cart.length === 0 ? (
          <ListGroup.Item>Giỏ hàng trống</ListGroup.Item>
        ) : (
          cart.map(item => (
            <ListGroup.Item key={item.id}>
              {item.name} - {item.price} 
              <Button variant="danger" onClick={() => removeItemFromCart(item.id)} className="float-end">
                Xóa
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      {cart.length > 0 && (
        <Button variant="danger" onClick={() => clearCart()} className="mt-3 w-100">
          Xóa Tất Cả
        </Button>
      )}
    </Container>
  );
};

export default Cart;
