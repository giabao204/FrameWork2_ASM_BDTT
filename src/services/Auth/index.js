import request from '../../api';

export const register = (data) => {
    return request({
        method: 'POST',
        path: 'register',
        data
    });
};

export const login = (data) => {
    return request({
        method: 'POST',
        path: 'login',
        data
    });
};

export const getUser = (data) => {
    return request({
        method: 'GET',
        path: 'users/:id',
        data
    });
};

