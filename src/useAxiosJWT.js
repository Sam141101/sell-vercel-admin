import { createAxios } from './createInstance';
import { loginSuccess } from './redux/userRedux';
// import { loginSuccess } from './redux/authRedux';

export const createAxiosInstance = (user, dispatch) => {
    return createAxios(user, dispatch, loginSuccess);
};
