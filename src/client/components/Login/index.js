import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../../../services/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Đang xử lý đăng nhập...");

    try {
      const response = await login(data);
      if (response.token) {
        toast.dismiss(loadingToast);
        setIsLoading(true);
        setCookie('token', response.token, { path: '/' });

        setTimeout(() => {
          navigate('/profile'); // Điều hướng tới trang profile sau khi đăng nhập thành công
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Đăng nhập thất bại!");
    }
  };

  return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-success bg-opacity-50">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center text-success mb-4">Đăng Nhập</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>Tên Tài Khoản</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      {...register('username', { required: true })}
                  />
                  {errors.username && <p className="text-danger">Tên tài khoản là bắt buộc</p>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Mật Khẩu</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      {...register('password', { required: true })}
                  />
                  {errors.password && <p className="text-danger">Mật khẩu là bắt buộc</p>}
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  {isLoading ? <Spinner animation="border" size="sm" /> : 'Đăng Nhập'}
                </Button>
                <div className="mt-3 text-center">
                  <Link to="/register">Chưa có tài khoản? Đăng ký ngay</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
  );
};

export default Login;
