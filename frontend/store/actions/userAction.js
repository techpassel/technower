import Axios from '../../utils/customAxios';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../constants/userConstants';

export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await Axios.post(
            '/auth/login',
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : error.response && error.response.data
                        ? error.response.data : error.response
        });
    }
};

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    window.location.href = "/";
}

export const registerAction = (name, email, phone, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await Axios.post(
            '/auth/signup',
            { name, email, phone, password },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};