import request from '../../api';

export const getProduct = () => {
    return request({
        method: 'GET',
        path: 'products'
    });
};

export const getProductsByCategory = (categoryId) => {
    return request({
        method: 'GET',
        path: `products/category/${categoryId}`
    });
};
export const getOneProduct = (id) => {
    return request({
        method: 'GET',
        path: `products/${id}`
    });
};

export const postProduct = (data) => {
    return request({
        method: 'POST',
        path: 'products',
        data
    });
};

export const updateProduct = (id, data) => {
    return request({
        method: 'PUT',
        path: `products/${id}`,
        data
    });
};

export const deleteProduct = (id) => {
    return request({
        method: 'DELETE',
        path: `products/${id}`
    });
};
