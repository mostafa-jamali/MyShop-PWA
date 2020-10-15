import types from './auth.types';
import { api } from '../../WooCommerceRestApi/API';

export const userRegister = (data) => {
    return (dispatch) => {
        dispatch({ type: types.REGISTER_START })
        api.post('customers', data).then(res => {
            dispatch({ type: types.REGISTER_SUCCESS, payload: res.data })
        }).catch(error => {
            dispatch({ type: types.REGISTER_FAIL, payload: error.response.data })
        })
    }
}

export const userLogin = (data) => {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_START })
        api.post('customers', data).then(res => {
            dispatch({ type: types.LOGIN_SUCCESS, payload: res.data })
        }).catch(error => {
            dispatch({ type: types.LOGIN_FAIL, payload: error.response.data })
        })
    }
}
export const userLogout = () => {
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.auth;
        const config = {
            headers: { 'authorization': `Basic ${token}` },
        };
        dispatch({ type: types.LOGOUT_START })
        api.post('customers', null, config).then(res => {
            dispatch({ type: types.LOGOUT_SUCCESS })
        }).catch(error => {
            dispatch({ type: types.LOGOUT_FAIL, payload: error.response.data })
        })
    }
}