import { Meteor } from 'meteor/meteor';

import '/imports/api/accounts/methods';
import '/imports/api/accounts/hooks';

import '/imports/api/expenses/methods';
import '/imports/api/expenses/hooks';

import '/imports/api/periods/methods';

import './schedule';

Meteor.startup(() => {
  Meteor.call('expenses.createFromAccounts');
  // SyncedCron.start();
});
