import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../../services/Auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      const response = await register({ username, email, password });
      if (response) {
        alert("Đăng ký thành công");
        navigate('/login');
      }
    } catch (error) {
      alert("Đăng ký thất bại");
    }
  };

  return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-success bg-opacity-50">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center text-success mb-4">Đăng Ký</h2>
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>Tên Tài Khoản</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Mật Khẩu</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                  <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Đăng Ký
                </Button>
                <div className="mt-3 text-center">
                  <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default Register;
