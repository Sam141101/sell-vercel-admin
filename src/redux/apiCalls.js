import {
    loginFailure,
    loginStart,
    loginSuccess,
    logoutFailure,
    logoutStart,
    logoutSuccess,
} from './userRedux';
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductFailure,
    addProductSuccess,
    addProductStart,
    resetProduct,
} from './productRedux';
import axios from 'axios';
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    getUserFailure,
    getUserStart,
    getUserSuccess,
    resetUsers,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess,
} from './usersRedux';
import { BASE_URL_API } from '../requestMethods';

export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());

    try {
        const res = await axios.post(BASE_URL_API + 'auth/login', user);
        dispatch(loginSuccess(res.data));
        // navigate("/home");
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logout = async (dispatch, id, token, axiosJWT, history, BASE_URL_API) => {
    console.log('dispatch', id);
    dispatch(logoutStart());

    try {
        await axiosJWT.post(
            BASE_URL_API + 'auth/logout',
            {
                userId: id,
            },
            {
                headers: { token: `Bearer ${token}` },
            },
        );
        dispatch(logoutSuccess());
        dispatch(resetProduct());
        dispatch(resetUsers());
        history.push('/login');
    } catch (err) {
        console.log(err);
        dispatch(logoutFailure());
    }
};

// ------------- User -------------
export const getUsers = async (dispatch, token, axiosJWT) => {
    dispatch(getUserStart());

    try {
        const res = await axiosJWT.get(BASE_URL_API + 'users/', {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

export const updateUser = async (token, dispatch, id, update, axiosJWT) => {
    dispatch(updateUserStart());

    try {
        const res = await axiosJWT.put(BASE_URL_API + `users/${id}`, update, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
        console.log(err);
    }
};

export const deleteUser = async (id, dispatch, token, axiosJWT) => {
    dispatch(deleteUserStart());

    try {
        await axiosJWT.delete(BASE_URL_API + `users/${id}`, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

// ------------- Product -------------
export const getProducts = async (dispatch, axiosJWT) => {
    dispatch(getProductStart());

    try {
        const res = await axiosJWT.get(BASE_URL_API + 'products/list-product');
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch, token, axiosJWT) => {
    dispatch(deleteProductStart());

    try {
        // const res = await axios.delete(BASE_URL_API + "products/${id}`, {
        await axiosJWT.delete(BASE_URL_API + `products/${id}`, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, dispatch, token, axiosJWT) => {
    dispatch(updateProductStart());

    try {
        const res = await axiosJWT.put(BASE_URL_API + `products/${id}`, product, {
            headers: { token: `Bearer ${token}` },
        });
        // dispatch(updateProductSuccess({ id, product }));
        dispatch(updateProductSuccess(id, res.data));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (product, dispatch, token, axiosJWT) => {
    dispatch(addProductStart());

    try {
        const res = await axiosJWT.post(BASE_URL_API + 'products', product, {
            headers: { token: `Bearer ${token}` },
        });
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};

// ------------ Order ----------------------
// export const getOrders = async (dispatch) => {
//     dispatch(getProductStart());
//     try {
//         const res = await axios.get(BASE_URL_API + 'products');
//         dispatch(getProductSuccess(res.data.resultProducts));
//     } catch (err) {
//         dispatch(getProductFailure());
//     }
// };
