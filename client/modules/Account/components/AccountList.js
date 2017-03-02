import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import AccountListItem from './AccountListItem/AccountListItem';

function AccountList(props) {
  return (
    <div className="listView">
      {
        props.accounts.map(account => (
          <AccountListItem
            account={account}
            key={account.cuid}
            onDelete={() => props.handleDeleteAccount(account.cuid)}
          />
        ))
      }
    </div>
  );
}

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps)(AccountList);
