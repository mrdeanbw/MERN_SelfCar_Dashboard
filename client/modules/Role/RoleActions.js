import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_ROLES = 'ADD_ROLES';

// Export Actions

export function addRoles(roles) {
  return {
    type: ADD_ROLES,
    roles,
  };
}

export function fetchRoles() {
  return (dispatch) => {
    return callApi('roles').then(res => {
      dispatch(addRoles(res.roles));
    });
  };
}