import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { getProduct, postProduct, updateProduct, deleteProduct } from '../../../services/Product';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategory } from "../../../services/Category";
import { convertFileToBase64 } from "../../../utils/Helper";
import { BASE_URL } from "../../../api";

const Product = () => {
    const { handleSubmit, control, reset, setValue, setError, formState: { errors } } = useForm();
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [error, setErrorMessage] = useState('');

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await getProduct();
            const productsWithImageURL = result.map(product => ({
                ...product,
                image: `data:image/jpeg;base64,${product.image}` // assuming the image is in jpeg format
            }));
            setProducts(productsWithImageURL);
        } catch (err) {
            console.error('Error fetching products:', err);
            toast.error('Error fetching products. Please try again later.');
        }
    };

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
        setEditingProduct(null);
        setErrorMessage('');
        reset();
    };
    const handleShow = () => setShow(true);

    const handleCloseConfirmDelete = () => setShowConfirmDelete(false);

    const onSubmit = async (data) => {
        if (data.image && data.image.length > 0 && data.image[0] instanceof Blob) {
            const resultBase64 = await convertFileToBase64(data.image[0]);
            data.image = resultBase64?.result?.split(",")[1];
        } else {
            setError('image', { type: 'manual', message: 'Hình ảnh sản phẩm không hợp lệ.' });
            return;
        }

        // Validations
        if (!data.name.trim()) {
            setError('name', { type: 'manual', message: 'Tên sản phẩm không được bỏ trống.' });
            return;
        }
        if (!data.price|| isNaN(data.price)) {
            setError('price', { type: 'manual', message: 'Giá sản phẩm không được bỏ trống.' });
            return;
        }
        if (!data.content.trim()) {
            setError('content', { type: 'manual', message: 'Mô tả sản phẩm không được bỏ trống.' });
            return;
        }
        if (!data.cate_id|| (typeof data.cate_id === 'string' && !data.cate_id.trim())) {
            setError('cate_id', { type: 'manual', message: 'Thể loại sản phẩm không được bỏ trống.' });
            return;
        }

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, data);
                toast.success('Cập nhật sản phẩm thành công.');
            } else {
                await postProduct(data);
                toast.success('Thêm sản phẩm thành công.');
            }
            fetchProducts();
            handleClose();
        } catch (err) {
            console.error(editingProduct ? 'Error updating product:' : 'Error adding product:', err);
            toast.error(`Error ${editingProduct ? 'updating' : 'adding'} product. Please try again later.`);
        }
    };

    const handleShowConfirmDelete = (product) => {
        setProductToDelete(product);
        setShowConfirmDelete(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('image', product.image);
        setValue('cate_id', product.cate_id);
        setValue('content', product.content);
        handleShow();
    };

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            toast.success('Xóa sản phẩm thành công.');
            fetchProducts();
            handleCloseConfirmDelete();
        } catch (err) {
            console.error('Error deleting product:', err);
            toast.error('Error deleting product. Please try again later.');
            handleCloseConfirmDelete();
        }
    };

    return (
        <div className="container table-container">
            <div className="table-actions">
                <h2>Danh Sách Sản Phẩm</h2>
                <Button variant="primary" onClick={handleShow}>
                    Thêm Sản Phẩm
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
                    <th>Tên Sản Phẩm</th>
                    <th>Loại Sản Phẩm</th>
                    <th>Mô Tả</th>
                    <th>Giá</th>
                    <th>Hình Ảnh</th>
                    <th>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {products.map((value, index) => (
                    <tr key={value.id}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.cate_id}</td>
                        <td>{value.content}</td>
                        <td>{value.price}</td>
                        <td>
                            <img src={value.image} alt={value.name} style={{width: '100px'}}/>
                        </td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditProduct(value)} className="me-2">
                                Sửa
                            </Button>
                            <Button variant="danger" onClick={() => handleShowConfirmDelete(value)}>
                                Xóa
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProduct ? 'Chỉnh sửa' : 'Thêm'} sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="formProductName" className="modal-form-group">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tên sản phẩm"
                                        {...field}
                                        isInvalid={!!errors.name}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formProductCate" className="modal-form-group">
                            <Form.Label>Loại sản phẩm</Form.Label>
                            <Controller
                                name="cate_id"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Form.Select
                                        {...field}
                                        isInvalid={!!errors.cate_id}
                                    >
                                        <option value="">Chọn loại sản phẩm</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cate_id?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formProductContent" className="modal-form-group">
                            <Form.Label>Mô tả</Form.Label>
                            <Controller
                                name="content"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập mô tả sản phẩm"
                                        {...field}
                                        isInvalid={!!errors.content}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.content?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formProductPrice" className="modal-form-group">
                            <Form.Label>Giá</Form.Label>
                            <Controller
                                name="price"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập giá sản phẩm"
                                        {...field}
                                        isInvalid={!!errors.price}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formProductImage" className="modal-form-group" encType="multipart/form-data">
                            <Form.Label>Hình Ảnh</Form.Label>
                            <Controller
                                name="image"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => field.onChange(e.target.files)}
                                        isInvalid={!!errors.image}
                                    />
                                )}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.image?.message}
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
                                {editingProduct ? 'Cập Nhật' : 'Thêm'} Sản Phẩm
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác Nhận Xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmDelete}>
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => productToDelete && handleDeleteProduct(productToDelete.id)}
                    >
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default Product;
