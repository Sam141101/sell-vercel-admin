import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { BASE_URL_API } from './requestMethods';

export const refreshToken = async (id) => {
    try {
        // const res = await axios.post('http://localhost:5000/api/auth/refresh/' + id);
        const res = await axios.post(BASE_URL_API + 'auth/refresh/' + id);

        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    // console.log('user', user);
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            // Kiểm tra user và user.token
            if (user && user.token) {
                const decodedToken = jwt_decode(user.token);
                if (decodedToken.exp < date.getTime() / 1000) {
                    const data = await refreshToken(user._id);
                    // console.log('data', data);
                    const refreshUser = { ...user, token: data.token };
                    // console.log('tâọ 1 cái token mới ', refreshUser);
                    dispatch(stateSuccess(refreshUser));
                    // Thiết lập header "Authorization"
                    config.headers['token'] = `Bearer ${data.token}`;
                }
            }
            // Thiết lập header "Content-Type"
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        (err) => {
            console.log('err-instance', err);
            return Promise.reject(err);
        },
    );

    return newInstance;
};
