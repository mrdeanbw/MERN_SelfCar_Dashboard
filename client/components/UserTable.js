import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { typography } from 'material-ui/styles';
import { white, cyan600 } from 'material-ui/styles/colors';

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

const UserTable = ({ usersTable }) => {
  return (
    <Paper>
      <Subheader style={styles.subheader} >Users Menu</Subheader>
      <Table>
        <TableHeader {...styles.headerProps}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Roles</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
        >
          {usersTable.map((user, index) => {
            return (
              <TableRow
                key={index}
              >
                <TableRowColumn>{user.name}</TableRowColumn>
                <TableRowColumn>{user.email}</TableRowColumn>
                <TableRowColumn><DropDownMenu style={styles.checkbox} >{user.roles.map((role, i) => {
                  return (<Checkbox
                    key={i}
                    label={role.roleName}
                    style={styles.checkbox}
                    defaultChecked
                  />);
                })}</DropDownMenu></TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

UserTable.propTypes = {
  usersTable: PropTypes.array,
};

const mapStateToProps = (state) => ({
  usersTable: state.credentials.table,
});

export default connect(mapStateToProps)(UserTable);
