import isEmpty from 'lodash/isEmpty';

// Import Actions
import { SET_CURRENT_USER } from './AuthActions';

// Initial State
const initialState = {
  isAuthenticated: false,
  user: {}
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};

export default AuthReducer;
