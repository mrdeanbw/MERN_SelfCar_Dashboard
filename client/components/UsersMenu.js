import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Settings from 'material-ui/svg-icons/action/settings-applications';
import { white } from 'material-ui/styles/colors';
import { Link } from 'react-router';

const styles = {
  menuItem: {
    color: white,
    fontSize: 14,
  },
};

const UsersMenu = () => (
  <MenuItem
    style={styles.menuItem}
    primaryText="Users Menu"
    leftIcon={<Settings />}
    containerElement={<Link to="/usersmenu" />}
  />
);

export default UsersMenu;