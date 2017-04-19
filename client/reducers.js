/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';
import auth from './modules/Auth/AuthReducer';
import users from './modules/User/UserReducer';
import roles from './modules/Role/RoleReducer';
import accounts from './modules/Account/AccountReducer';
import assigners from './modules/Assigner/AssignerReducer';
import mentorship from './modules/Mentorship/MentorshipReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  users,
  intl,
  auth,
  roles,
  accounts,
  assigners,
  mentorship
});
