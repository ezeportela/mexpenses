import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Info from './Info';
import Signin from './pages/Signin';
import EditAccount from './pages/EditAccount';
import AccountsList from './pages/AccountsList';
import ExpensesList from './pages/ExpensesList';
import EditExpense from './pages/EditExpense';

export default Router = props => (
  <BrowserRouter>
    <Layout currentUser={props.currentUser}>
      <Switch>
        <Route exact path="/" component={Info} />

        {props.currentUser ? (
          <React.Fragment>
            <Route exact path="/expenses" component={ExpensesList} />
            <Route exact path="/accounts" component={AccountsList} />
            <Route exact path="/accounts/create" component={EditAccount} />
            <Route
              exact
              path="/accounts/:accountId/edit"
              component={EditAccount}
            />
            <Route
              exact
              path="/expenses/:expenseId/edit"
              component={EditExpense}
            />
          </React.Fragment>
        ) : (
          <Route exact path="/signin" component={Signin} />
        )}
      </Switch>
    </Layout>
  </BrowserRouter>
);
