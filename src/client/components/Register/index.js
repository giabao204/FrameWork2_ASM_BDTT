import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../../services/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { register: registerInput, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await register(data);
      if (response) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => {
          navigate('/login', { state: { message: 'Đăng ký thành công!' } });
        }, 2000);
      }
    } catch (error) {
      toast.error("Đăng ký thất bại!");
    }
  };

  const password = watch("password", "");

  return (
      <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-success bg-opacity-50">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="text-center text-success mb-4">Đăng Ký</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>Tên Tài Khoản</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      {...registerInput('username', { required: "Tên tài khoản là bắt buộc" })}
                  />
                  {errors.username && <p className="text-danger">{errors.username.message}</p>}
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      {...registerInput('email', {
                        required: "Email là bắt buộc",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z.-]+\.[A-Z]{2,4}$/i,
                          message: "Email không hợp lệ"
                        }
                      })}
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Mật Khẩu</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu"
                      {...registerInput('password', { required: "Mật khẩu là bắt buộc" })}
                  />
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                  <Form.Label>Xác Nhận Mật Khẩu</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      {...registerInput('confirmPassword', {
                        required: "Xác nhận mật khẩu là bắt buộc",
                        validate: value => value === password || "Mật khẩu không khớp"
                      })}
                  />
                  {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
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
        <ToastContainer />
      </Container>
  );
};

export default Register;
