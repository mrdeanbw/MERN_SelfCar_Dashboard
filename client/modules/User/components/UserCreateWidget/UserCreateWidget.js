import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import DropDownMenu from 'material-ui/DropDownMenu';
import Checkbox from 'material-ui/Checkbox';

// Import Style
import styles from './UserCreateWidget.css';

export class UserCreateWidget extends Component {
  addUser = () => {
    const nameRef = this.refs.name;
    const emailRef = this.refs.email;
    const passwordRef = this.refs.password;
    const rolesRef = this.refs.roles;
    if (nameRef.value && emailRef.value && passwordRef.value) {
      this.props.addUser(nameRef.value, emailRef.value, passwordRef.value, rolesRef.value);
      nameRef.value = emailRef.value = passwordRef.value = '';
      rolesRef.value = [];
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
                    key={role.id}
                    label={role.name}
                    style={styles.checkbox}
                    defaultUnChecked
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
