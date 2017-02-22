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

injectTapEventPlugin();

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__;
// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__;

const store = configureStore(preloadedState);

render(
    <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
    </Provider>, document.getElementById('root')
);
