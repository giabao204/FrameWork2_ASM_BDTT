import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { getUser, postUser, updateUser, deleteUser } from '../../../services/User';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const { handleSubmit, control, reset, setValue, setError, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await getUser();
      setUsers(result);
    } catch (err) {
      console.error('Error fetching users:', err);
      toast.error('Error fetching users. Please try again later.');
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditingUser(null);
    setErrorMessage('');
    reset();
  };

  const handleShow = () => setShow(true);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);

  const handleShowConfirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmDelete(true);
  };

  const onSubmit = async (data) => {
    let hasErrors = false;
    if (!data.username.trim()) {
      setError('username', { type: 'manual', message: 'Tên người dùng không được bỏ trống.' });
      hasErrors = true;
    }
    if (!editingUser && !data.password.trim()) {
      setError('password', { type: 'manual', message: 'Mật khẩu người dùng không được bỏ trống.' });
      hasErrors = true;
    } else if (!editingUser && !data.password.trim() || data.password.length < 6) {
      setError('password', { type: 'manual', message: 'Mật khẩu người dùng phải có ít nhất 6 kí tự.' });
      hasErrors = true;
    }
    if (!data.email.trim()) {
      setError('email', { type: 'manual', message: 'Email người dùng không được bỏ trống.' });
      hasErrors = true;
    }
    if (!data.role.trim()) {
      setError('role', { type: 'manual', message: 'Quyền người dùng không được bỏ trống.' });
      hasErrors = true;
    }
    if (hasErrors) return;
    try {
      if (editingUser) {
        await updateUser(editingUser.id, data);
        toast.success('Cập nhật người dùng thành công.');
      } else {
        await postUser(data);
        toast.success('Thêm người dùng thành công.');
      }
      fetchUsers();
      handleClose();
    } catch (err) {
      console.error(editingUser ? 'Error updating user:' : 'Error adding user:', err);
      toast.error(`Error ${editingUser ? 'updating' : 'adding'} user. Please try again later.`);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setValue('username', user.username);
    setValue('password', user.password);
    setValue('email', user.email);
    setValue('role', user.role);
    handleShow();
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      toast.success('Xóa người dùng thành công.');
      fetchUsers();
      handleCloseConfirmDelete();
    } catch (err) {
      console.error('Error deleting user:', err);
      toast.error('Error deleting user. Please try again later.');
      handleCloseConfirmDelete();
    }
  };

  return (
    <div className="container table-container">
      <div className="table-actions">
        <h2>Danh Sách người dùng</h2>
        <Button variant="primary" onClick={handleShow}>
          Thêm người dùng
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <Table striped bordered hover className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Tên người dùng</th>
            <th>Email người dùng</th>
            <th>Quyền người dùng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.username}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditUser(value)}
                    className="me-2"
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowConfirmDelete(value)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không có người dùng nào</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? 'Chỉnh sửa' : 'Thêm'} người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formUserUsername" className="modal-form-group">
              <Form.Label>Tên người dùng</Form.Label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên người dùng"
                    {...field}
                    isInvalid={!!errors.username}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {!editingUser && (
              <Form.Group controlId="formUserPassword" className="modal-form-group">
                <Form.Label>Mật khẩu người dùng</Form.Label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Form.Control
                      type="password"
                      placeholder="Nhập mật khẩu người dùng"
                      {...field}
                      isInvalid={!!errors.password}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group controlId="formUserEmail" className="modal-form-group">
              <Form.Label>Email người dùng</Form.Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    type="email"
                    placeholder="Nhập email người dùng"
                    {...field}
                    isInvalid={!!errors.email}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formUserRole" className="modal-form-group">
              <Form.Label>Quyền người dùng</Form.Label>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    as="select"
                    {...field}
                    isInvalid={!!errors.role}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.role?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                {editingUser ? 'Cập Nhật' : 'Thêm'} người dùng
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Confirm Delete */}
      <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xác Nhận Xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa người dùng này?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => userToDelete && handleDeleteUser(userToDelete.id)}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default User;
