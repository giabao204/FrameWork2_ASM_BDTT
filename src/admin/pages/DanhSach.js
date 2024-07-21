import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './DanhSach.css'; // Đảm bảo bạn đã import tệp CSS

const DanhSach = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', content: 'Nội dung sản phẩm 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Sản phẩm 2', content: 'Nội dung sản phẩm 2', price: 200, image: 'https://via.placeholder.com/150' },
  ]);
  
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', content: '', price: '', image: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setNewProduct({ name: '', content: '', price: '', image: '' });
    handleClose();
  };

  const handleEditProduct = (id) => {
    // Logic chỉnh sửa sản phẩm
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container table-container">
      <div className="table-actions">
        <h2>Danh Sách Sản Phẩm</h2>
        <Button variant="primary" onClick={handleShow}>
          Thêm Sản Phẩm
        </Button>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Tên Sản Phẩm</th>
            <th>Nội Dung</th>
            <th>Giá</th>
            <th>Hình Ảnh</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.content}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditProduct(product.id)} className="me-2">
                  Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Sản Phẩm Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName" className="modal-form-group">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductContent" className="modal-form-group">
              <Form.Label>Nội Dung</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập nội dung sản phẩm"
                value={newProduct.content}
                onChange={(e) => setNewProduct({ ...newProduct, content: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice" className="modal-form-group">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formProductImage" className="modal-form-group">
              <Form.Label>Hình Ảnh</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập URL hình ảnh"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Thêm Sản Phẩm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DanhSach;
