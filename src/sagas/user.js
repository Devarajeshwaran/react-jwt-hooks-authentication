import config from 'config';
import { put, takeLatest, all, select, call } from 'redux-saga/effects';
// import * as types from '../constants/actionTypes';
import { userConstants } from '../constants';
import { history } from '../helpers';
import { authHeader } from '../helpers';

function* login({username, password}) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response =  yield fetch(`${config.apiUrl}/users/authenticate`, requestOptions);
    const data = yield response.json();

    if(!data.message && response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        yield put({ type: userConstants.LOGIN_SUCCESS, payload: data, });
        history.push('/');
    } else {
        yield put({ type: userConstants.LOGIN_FAILURE, payload: data.message, });
    }

    handleResponse(response, data);
}

function* getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    
    const response =  yield fetch(`${config.apiUrl}/users`, requestOptions);

    const data = yield response.json();

    if (data) {
        yield put({ type: userConstants.USERS_GETALL_SUCCESS, payload: data, });
    }

}

function* logout() {

    localStorage.removeItem('user');
}

function* register({user}) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    
    const response =  yield fetch(`${config.apiUrl}/users/register`, requestOptions);

    if (response.ok) {
        yield put({ type: userConstants.USERS_REGISTER_SUCCESS });
    }
}

function* deleteUser({id}) {

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    
    const response =  yield fetch(`${config.apiUrl}/users/${id}`, requestOptions);

    if (response.ok) {
        yield put({ type: userConstants.USERS_DELETE_SUCCESS, id });
    }
}

export function* actionWatcher() {
    yield takeLatest(userConstants.LOGIN_REQUEST, login);
    yield takeLatest(userConstants.USERS_GETALL_REQUEST, getAll);
    yield takeLatest(userConstants.USERS_LOGOUT, logout);
    yield takeLatest(userConstants.USERS_REGISTER_REQUEST, register);
    yield takeLatest(userConstants.USERS_DELETE_REQUEST, deleteUser);
}

function* handleResponse(response, data) {
    // return response.text().then(text => {
        // const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    // });
}