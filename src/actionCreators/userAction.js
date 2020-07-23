import { userConstants } from '../constants';

export function onLoginRequest(username, password) {
    return {
        type: userConstants.LOGIN_REQUEST,
        username: username,
        password: password
    };
}

export function onLoginSuccess(data) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        data,
    };
}

export function onLoginFailure(error) {
    return {
        type: userConstants.LOGIN_FAILURE,
        error,
    };
}

export function onLogout() {
    return {
        type: userConstants.USERS_LOGOUT,
    };
}

export function onDelete(id) {
    return {
        type: userConstants.USERS_DELETE_REQUEST,
        id
    };
}

export function onGetAll() {
    return {
        type: userConstants.USERS_GETALL_REQUEST,
    };
}

export function onRegister(data) {
    return {
        type: userConstants.USERS_REGISTER_REQUEST,
        user: data,
    };
}