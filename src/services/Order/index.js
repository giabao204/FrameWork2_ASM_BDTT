import request from '../../api';

export const getAllOrders = () => {
    return request({
        method: 'GET',
        path: 'orders'
    });
};

export const getOneOrder = (id) => {
    return request({
        method: 'GET',
        path: `orders/${id}`
    });
};

export const createOrder = (orderData) => {
    return request({
        method: 'POST',
        path: 'orders',
        orderData
    });
};

export const updateOrder = (id, data) => {
    return request({
        method: 'PUT',
        path: `orders/${id}`,
        data
    });
};

export const deleteOrder = (id) => {
    return request({
        method: 'DELETE',
        path: `products/${id}`
    });
};
