/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
require('./favicon.ico');
import './styles.scss';
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import { setCurrentUser } from './modules/Auth/AuthActions';
import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from './util/apiCaller';
import { IntlWrapper } from './modules/Intl/IntlWrapper';

injectTapEventPlugin();

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__;
// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__;

const store = configureStore(preloadedState);
const token = localStorage.getItem('jwtToken');

//console.log(token);

if (token) {
  setAuthorizationToken(token);
  store.dispatch(setCurrentUser(jwtDecode(token)));
}

render(
    <Provider store={store}>
        <IntlWrapper>
            <Router history={browserHistory} >
                {routes}
            </Router>
        </IntlWrapper>
    </Provider>, document.getElementById('root')
);
