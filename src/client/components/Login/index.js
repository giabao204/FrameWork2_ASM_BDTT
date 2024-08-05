import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../../../services/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });
      if (response.token) {
        alert("Đăng nhập thành công");
        setCookie('token', response.token, { path: '/' });
        navigate('/profile'); // Điều hướng tới trang profile sau khi đăng nhập thành công
      }
    } catch (error) {
      alert("Đăng nhập thất bại");
    }
  };

  return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-success bg-opacity-50">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center text-success mb-4">Đăng Nhập</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>Tên Tài Khoản</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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

                <Button variant="success" type="submit" className="w-100">
                  Đăng Nhập
                </Button>
                <div className="mt-3 text-center">
                  <Link to="/register">Chưa có tài khoản? Đăng ký ngay</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default Login;
