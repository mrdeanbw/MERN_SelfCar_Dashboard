// Import Actions
import { ADD_ROLES } from './RoleActions';

// Initial State
const initialState = { data: [] };

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROLES :
      return {
        data: action.roles,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get all roles
export const getRoles = state => state.roles.data;

export default RoleReducer;
