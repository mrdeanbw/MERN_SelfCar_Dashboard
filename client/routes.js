import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
import requireAuth from './util/requireAuth';
import requireRole from './util/requireRole';
import UserTable from './components/UserTable';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={requireAuth(Dashboard)}/>
      <Route path="dashboard" component={requireAuth(Dashboard)}  />
      <Route path="form" component={requireAuth(FormPage)}/>
      <Route path="table" component={requireAuth(TablePage)}/>
      <Route path="users" component={requireAuth(requireRole(UserTable, 'admin'))} />
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
