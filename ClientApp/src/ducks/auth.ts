import axios from 'axios';
import initialState from '../store/initialState';

export const enum AuthActionTypes {
  login = '[@auth] login successful',
  register = '[@auth] register successful',
  loginLocal = '[@auth] login locally successful',
  logoutLocal = '[@auth] logout locally successful'
}

export function loginSuccess(authObject) {
  return {
    type: AuthActionTypes.login,
    payload: authObject
  }
}

export function loginLocallySuccess(email) {
  return {
    type: AuthActionTypes.loginLocal,
    payload: email
  }
}

export function logoutLocallySuccess() {
  return {
    type: AuthActionTypes.logoutLocal
  }
}

export function registerSuccess(user) {
  return {
    type: AuthActionTypes.register,
    payload: user
  }
}

export function login(authObject) {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/account/login', authObject);
      storeToken(result.data.token);
      dispatch(loginSuccess({ loggedIn: true, user: { email: authObject.email } }));
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function register(authObject) {
  return async (dispatch) => {
    try {
      const result = await axios.post('/api/account/register', authObject);
      dispatch(registerSuccess(authObject.email));
      dispatch({ type: 'RESPONSE', payload: result });
    } catch (error) {
      dispatch({ type: '[@errors]', payload: error });
    }
  }
}

export function storeToken(token) {
  sessionStorage.setItem('jwtToken', token);
}

export function reducer(state = initialState.auth, action) {
  switch (action.type) {
    case AuthActionTypes.loginLocal:
      return { loggedIn: true, user: action.payload };
    case AuthActionTypes.logoutLocal:
      // TODO: move outside of reducer
      sessionStorage.removeItem('email');
      return initialState.auth;
    default:
      return state;
  }
}

export default reducer;