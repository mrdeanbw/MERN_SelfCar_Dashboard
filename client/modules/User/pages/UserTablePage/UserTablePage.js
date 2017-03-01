import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import UserTable from '../../components/UserTable';
import UserCreateWidget from '../../components/UserCreateWidget/UserCreateWidget';

// Import Actions
import { addUserRequest, fetchUsers, deleteUserRequest } from '../../UserActions';
//import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getUsers } from '../../UserReducer';

class UserTablePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  handleDeletePost = user => {
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
        <UserCreateWidget addUser={this.handleAddUser} roles={[{name:'Admin', id:'jhjhj'},{name:'Manager', id:'jhjhj'} ]} />
        <UserTable handleDeleteUser={this.handleDeleteUser} users={this.props.users} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserTablePage.need = [() => { return fetchUsers(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
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
};

UserTablePage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserTablePage);
