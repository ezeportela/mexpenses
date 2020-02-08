import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Router from './Router';

const App = props => <Router currentUser={props.currentUser} />;

export default AppContainer = withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(App);
