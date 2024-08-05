import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { getCategory, postCategory, updateCategory, deleteCategory } from '../../../services/Category';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const { handleSubmit, control, reset, setValue, setError, clearErrors, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [error, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const result = await getCategory();
      setCategories(result);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Error fetching categories. Please try again later.');
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditingCategory(null);
    setErrorMessage('');
    reset();
  };

  const handleShow = () => setShow(true);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);

  const handleShowConfirmDelete = (category) => {
    setCategoryToDelete(category);
    setShowConfirmDelete(true);
  };

  const onSubmit = async (data) => {
    if (!data.name.trim()) {
      setError('name', { type: 'manual', message: 'Tên thể loại sản phẩm không được bỏ trống.' });
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
        toast.success('Cập nhật thể loại sản phẩm thành công.');
      } else {
        await postCategory(data);
        toast.success('Thêm thể loại sản phẩm thành công.');
      }
      fetchCategories();
      handleClose();
    } catch (err) {
      console.error(editingCategory ? 'Error updating category:' : 'Error adding category:', err);
      toast.error(`Error ${editingCategory ? 'updating' : 'adding'} category. Please try again later.`);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setValue('name', category.name);
    handleShow();
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      toast.success('Xóa thể loại sản phẩm thành công.');
      fetchCategories();
      handleCloseConfirmDelete();
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Error deleting category. Please try again later.');
      handleCloseConfirmDelete();
    }
  };

  return (
    <div className="container table-container">
      <div className="table-actions">
        <h2>Danh Sách thể loại sản phẩm</h2>
        <Button variant="primary" onClick={handleShow}>
          Thêm thể loại sản phẩm
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
            <th>Tên thể loại sản phẩm</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((value) => (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditCategory(value)}
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
              <td colSpan="3">Không có thể loại sản phẩm nào</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategory ? 'Chỉnh sửa' : 'Thêm'} thể loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formCategoryName" className="modal-form-group">
              <Form.Label>Tên thể loại sản phẩm</Form.Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên thể loại sản phẩm"
                    {...field}
                    isInvalid={!!errors.name}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                {editingCategory ? 'Cập Nhật' : 'Thêm'} Thể Loại
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
          Bạn có chắc chắn muốn xóa thể loại sản phẩm này?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmDelete}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => categoryToDelete && handleDeleteCategory(categoryToDelete.id)}
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

export default Category;
