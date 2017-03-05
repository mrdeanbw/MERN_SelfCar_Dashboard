import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './AccountListItem.css';

function AccountListItem(props) {
  return (
    <div className={styles['single-account']}>
      <h3 className={styles['account-title']}>
        <Link to={`/accounts/${props.account.cuid}`} >
          {props.account.email}
        </Link>
      </h3>
      <p className={styles['account-action']}><a href="#" onClick={props.onDelete}>Delete Account</a></p>
      <hr className={styles.divider} />
    </div>
  );
}

AccountListItem.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AccountListItem;
