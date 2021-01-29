import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './action-types';
import { resetMessages } from './notification-actions';
import store from '../reducers/store';

function loginSuccess() {
  store.dispatch({ type: LOGIN_SUCCESS });
}

export function loginFailure() {
  store.dispatch({ type: LOGIN_FAILURE });
}

function backendLogin(username, password) {
  console.log('backendLogin', username, password);
  if (password === undefined) {
    return false;
  }
  return true;
}

export function login(username, password) {
  resetMessages();

  if (backendLogin(username, password)) {
    loginSuccess();
  } else {
    loginFailure();
  }
}

export function logout() {
  resetMessages();
  store.dispatch({ type: LOGOUT });
}
