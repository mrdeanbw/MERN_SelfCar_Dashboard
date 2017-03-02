import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/AccountListItem/AccountListItem.css';

// Import Actions
import { fetchAccount } from '../../AccountActions';

// Import Selectors
import { getAccount } from '../../AccountReducer';

export function AccountDetailPage(props) {
  return (
    <div>
      <Helmet title={props.account.email} />
      <div className={`${styles['single-account']} ${styles['account-detail']}`}>
        <h3 className={styles['account-title']}>{props.account.email}</h3>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
AccountDetailPage.need = [params => {
  return fetchAccount(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    account: getAccount(state, props.params.cuid),
  };
}

AccountDetailPage.propTypes = {
  account: PropTypes.shape({
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(AccountDetailPage);
