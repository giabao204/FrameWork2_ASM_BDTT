import request from '../../api';

export const getUser = () => {
    return request({
        method: 'GET',
        path: 'users'
    });
};

export const getOneUser = (id) => {
    return request({
        method: 'GET',
        path: `users/${id}`
    });
};

export const postUser = (data) => {
    return request({
        method: 'POST',
        path: 'users',
        data
    });
};

export const updateUser = (id, data) => {
    return request({
        method: 'PUT',
        path: `users/${id}`,
        data
    });
};

export const deleteUser = (id) => {
    return request({
        method: 'DELETE',
        path: `users/${id}`
    });
};
