import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import DropDownMenu from 'material-ui/DropDownMenu';
import Checkbox from 'material-ui/Checkbox';
import find from 'lodash/find';

// Import Style
import styles from './UserCreateWidget.css';

export class UserCreateWidget extends Component {
  addUser = () => {
    const nameRef = this.refs.name;
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    const refs = this.refs;
    const rolesRef = find(this.props.roles, (role) => {
      if (refs[role._id].isChecked()) {
        return role._id;
      }
    });
    if (nameRef.value && emailRef.value && passwordRef.value) {
      this.props.addUser(nameRef.value, emailRef.value, passwordRef.value, rolesRef || []);
      nameRef.value = emailRef.value = passwordRef.value = '';
      this.props.roles.forEach(function(role) {
        this.refs[role._id].setChecked(false);
      }, this);
    }
  };

  render() {
    const cls = `${styles.form} ${styles.appear}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>Create New User</h2>
          <input placeholder="Name" className={styles['form-field']} ref="name" />
          <input placeholder="Email" className={styles['form-field']} ref="email" />
          <input placeholder="Password" type="password" className={styles['form-field']} ref="password" />
          {this.props.roles.map((role, i) => {
                  return (<Checkbox
                    key={i}
                    label={role.name}
                    style={styles.checkbox}
                    defaultUnChecked
                    ref={role._id}
                  />);
                })}<br />
          <a className={styles['user-submit-button']} href="#" onClick={this.addUser}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

UserCreateWidget.propTypes = {
  addUser: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(UserCreateWidget);
