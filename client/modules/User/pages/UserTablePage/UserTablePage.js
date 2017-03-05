import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import UserTable from '../../components/UserTable';
import UserCreateWidget from '../../components/UserCreateWidget/UserCreateWidget';

// Import Actions
import { addUserRequest, fetchUsers, deleteUserRequest } from '../../UserActions';
import { fetchRoles } from '../../../Role/RoleActions';
//import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getUsers } from '../../UserReducer';
import { getRoles } from '../../../Role/RoleReducer';

class UserTablePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchRoles());
  }

  handleDeleteUser = user => {
    if (confirm('Do you want to delete this user')) { // eslint-disable-line
      this.props.dispatch(deleteUserRequest(user));
    }
  };

  handleAddUser = (name, email, password, roles) => {
    this.props.dispatch(addUserRequest({ name, email, password, roles }));
  };

  render() {
    return (
      <div>
        <UserCreateWidget addUser={this.handleAddUser} roles={this.props.roles} />
        <UserTable handleDeleteUser={this.handleDeleteUser} users={this.props.users} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserTablePage.need = [() => { return fetchUsers(); },
                      () => { return fetchRoles(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
    roles: getRoles(state)
  };
}

UserTablePage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    roles: PropTypes.array,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  })).isRequired,
};

UserTablePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserTablePage);
