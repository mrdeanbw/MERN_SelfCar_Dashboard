import React from 'react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import map from 'lodash/map'
//import { addFlashMessage } from '../actions/flashMessages';

export default function(ComposedComponent, requiredRole) {
  class Authorize extends React.Component {
    componentWillMount() {
      if (!includes(this.props.userRoles, requiredRole)) {
        //this.props.addFlashMessage({
          //type: 'error',
          //text: 'You need to login to access this page'
        //});
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
       if (!includes(nextProps.userRoles, requiredRole)) {
        this.context.router.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authorize.propTypes = {
    userRoles: React.PropTypes.array.isRequired,
  }

  Authorize.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      userRoles: state.auth.user.roles ? state.auth.user.roles : []
    };
  }

  return connect(mapStateToProps
        )(Authorize);
}