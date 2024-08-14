import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { getAllOrders, updateOrder, deleteOrder } from '../../services/Order';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DanhSach = () => {
  const { handleSubmit, control, reset, setValue, setError, formState: { errors } } = useForm();
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [error, setErrorMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getAllOrders();
      setOrders(result);
    } catch (err) {
      console.error('Lỗi khi lấy đơn hàng:', err);
      toast.error('Lỗi khi lấy đơn hàng. Vui lòng thử lại sau.');
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditingOrder(null);
    setErrorMessage('');
    reset();
  };

  const handleShow = () => setShow(true);

  const handleCloseConfirmDelete = () => setShowConfirmDelete(false);

  const handleShowConfirmDelete = (order) => {
    setOrderToDelete(order);
    setShowConfirmDelete(true);
  };

  const onSubmit = async (data) => {
    try {
      if (editingOrder) {
        await updateOrder(editingOrder.id, data);
        toast.success('Cập nhật đơn hàng thành công.');
      }
      fetchOrders();
      handleClose();
    } catch (err) {
      console.error(editingOrder ? 'Lỗi khi cập nhật đơn hàng:' : 'Lỗi khi thêm đơn hàng:', err);
      toast.error(`Lỗi ${editingOrder ? 'cập nhật' : 'thêm'} đơn hàng. Vui lòng thử lại sau.`);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setValue('name', order.name);
    setValue('file', ''); // Clear file input value
    setValue('quantity', order.quantity);
    setValue('status', order.status);
    handleShow();
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      toast.success('Xóa đơn hàng thành công.');
      fetchOrders();
      handleCloseConfirmDelete();
    } catch (err) {
      console.error('Lỗi khi xóa đơn hàng:', err);
      toast.error('Lỗi khi xóa đơn hàng. Vui lòng thử lại sau.');
      handleCloseConfirmDelete();
    }
  };

  return (
      <div className="container table-container">
        <div className="table-actions">
          <h2>Danh sách đơn hàng</h2>
        </div>

        {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
        )}

        <Table striped bordered hover className="mt-3">
          <thead className="table-dark">
          <tr className="text-center">
            <th>#</th>
            <th>Tên khách hàng</th>
            <th>Hình sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Trạng thái</th>
            <th>Hành Động</th>
          </tr>
          </thead>
          <tbody className='text-center'>
          {orders.length > 0 ? (
              orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>
                      {order.image ? (
                          order.image.split(',').map((img, index) => (
                              <img
                                  key={index}
                                  src={`data:image/jpeg;base64,${img}`}
                                  alt={`Image ${index}`}
                                  style={{ width: '100px', marginRight: '5px' }}
                              />
                          ))
                      ) : (
                          <p>No images available</p>
                      )}
                    </td>
                    <td>{order.product_name}</td>
                    <td>{order.quantity}</td>
                    <td>
                      {order.status == '1' ? 'Chờ xác nhận' : 'Đã xác nhận'}
                    </td>
                    <td>
                      <Button
                          variant="warning"
                          onClick={() => handleEditOrder(order)}
                          className="me-2"
                      >
                        Sửa
                      </Button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="7">Không có đơn hàng nào</td>
              </tr>
          )}
          </tbody>
        </Table>

        {/* Modal for Add/Edit */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editingOrder ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {!editingOrder && (
                  <>
                    <Form.Group controlId="formOrderName" className="modal-form-group">
                      <Form.Label>Tên khách hàng</Form.Label>
                      <Controller
                          name="name"
                          control={control}
                          rules={{ required: 'Tên khách hàng là bắt buộc' }}
                          render={({ field }) => (
                              <Form.Control
                                  type="text"
                                  placeholder="Nhập tên khách hàng"
                                  {...field}
                                  isInvalid={!!errors.name}
                              />
                          )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formOrderImage" className="modal-form-group">
                      <Form.Label>Hình ảnh sản phẩm</Form.Label>
                      <Controller
                          name="file"
                          control={control}
                          rules={{ required: 'Hình ảnh sản phẩm là bắt buộc' }}
                          render={({ field }) => (
                              <Form.Control
                                  type="file"
                                  {...field}
                                  isInvalid={!!errors.file}
                              />
                          )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.file?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formOrderQuantity" className="modal-form-group">
                      <Form.Label>Số lượng</Form.Label>
                      <Controller
                          name="quantity"
                          control={control}
                          rules={{ required: 'Số lượng là bắt buộc', min: 1 }}
                          render={({ field }) => (
                              <Form.Control
                                  type="number"
                                  placeholder="Nhập số lượng"
                                  {...field}
                                  isInvalid={!!errors.quantity}
                              />
                          )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.quantity?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
              )}
              {editingOrder && (
                  <Form.Group controlId="formOrderStatus" className="modal-form-group">
                    <Form.Label>Trạng thái</Form.Label>
                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Trạng thái là bắt buộc' }}
                        render={({ field }) => (
                            <Form.Control
                                as="select"
                                {...field}
                                isInvalid={!!errors.status}
                            >
                              <option value="1">Chờ xác nhận</option>
                              <option value="2">Đã xác nhận</option>
                            </Form.Control>
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.status?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
              )}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
                <Button variant="primary" type="submit">
                  {editingOrder ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng'}
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        <ToastContainer />
      </div>
  );
};

export default DanhSach;
