import {setAuthorizationToken} from '../../util/apiCaller';
import callApi from '../../util/apiCaller';
import jwtDecode from 'jwt-decode';


// Export Constants
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// Export Actions

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return callApi('auth/login', 'post', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}