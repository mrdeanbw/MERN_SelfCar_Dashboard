import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { typography } from 'material-ui/styles';
import { white, cyan600 } from 'material-ui/styles/colors';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionUpdate from 'material-ui/svg-icons/action/update'
import IconButton from 'material-ui/IconButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan600,
    color: white,
  },
  headerProps: {
    enableSelectAll: false,
    displaySelectAll: false,
    adjustForCheckbox: false,
  },
  checkbox: {
    fontSize: 11,
  },
};

const UserTable = (props) => {
  return (
    <Paper>
      <Subheader style={styles.subheader} >Users</Subheader>
      <Table>
        <TableHeader {...styles.headerProps}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Roles</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {props.users.map((user, index) => {
            return (
              <TableRow
                key={index}
              >
                <TableRowColumn>{user.name}</TableRowColumn>
                <TableRowColumn>{user.email}</TableRowColumn>
                <TableRowColumn><DropDownMenu style={styles.checkbox} >{user.roles.map((role, i) => {
                  return (<Checkbox
                    key={i}
                    label={role.name}
                    style={styles.checkbox}
                    defaultChecked
                  />);
                })}</DropDownMenu></TableRowColumn>
                <TableRowColumn>
                  <IconButton className={styles['post-action']} onClick={() => props.handleDeleteUser(user.cuid)}><ActionDelete /></IconButton>
                  <IconButton className={styles['post-action']} onClick={() => props.handleDeleteUser(user.cuid)}><ActionUpdate /></IconButton>
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    roles: PropTypes.array.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps)(UserTable);
