import React from 'react';
import EditExpense from './EditExpense';
import ExpenseList from './ExpenseList';
import AccountsUIWrapper from './AccountsUIWrapper';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

const App = props => (
  <div>
    <AccountsUIWrapper />

    {props.currentUser ? (
      <div className="section">
        <EditExpense />
        <ExpenseList />
      </div>
    ) : (
      ''
    )}
  </div>
);

export default AppContainer = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);
