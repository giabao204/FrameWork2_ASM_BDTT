import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getOneProduct} from '../../services/Product';
import {toast} from "react-toastify";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const result = await getOneProduct(id);
            if (result) {
                setProduct({
                    ...result,
                    image: `data:image/jpeg;base64,${result.image}`
                });
            } else {
                setProduct(null);
                setError('Product not found.');
            }
        } catch (err) {
            console.error('Error fetching product:', err);
            setError('Error fetching product. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);



    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const handleAddToCart = (id) => {
        // Handle adding the product to the cart
        console.log(`Product with id ${id} added to cart`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }


    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6 mb-4 mb-md-0">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded shadow"
                            style={{maxHeight: '400px', objectFit: 'cover', marginLeft: '80px'}}
                        />
                    ) : (
                        <div className="d-flex align-items-center justify-content-center"
                             style={{height: '400px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
                            <p className="text-muted">No image available</p>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <div style={{marginLeft: '40px', position: 'relative'}}>
                        <div style={{position: 'absolute', top: '40px'}}>
                            <h6 className="mb-3">{product.name}</h6>
                            <h6 className="text-danger mb-3">{formatCurrency(product.price)}</h6>
                        </div>
                        <div style={{position: 'absolute', top: '250px'}}>
                            <div className="d-flex align-items-center mb-4">
                                <button className="btn btn-outline-success me-0">-</button>
                                <p className="mb-0" style={{width: '40px', textAlign: 'center'}}>0</p>
                                <button className="btn btn-outline-success ms-0">+</button>
                            </div>
                            <button
                                className="btn btn-outline-success"
                                onClick={() => handleAddToCart(product.id)}
                                style={{fontSize: '14px'}}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5" style={{marginLeft: '80px'}}>
                <h6 className="mb-3">Thông tin sản phẩm:</h6>
                <p style={{
                    fontSize: '14px',
                    wordWrap: "break-word",
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    maxWidth: '90%'
                }}>{product.content}</p>
            </div>
        </div>
    )
}

export default ProductDetail;