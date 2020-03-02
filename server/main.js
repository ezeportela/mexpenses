import { Meteor } from 'meteor/meteor';

import '/imports/api/accounts/methods';
import '/imports/api/accounts/hooks';

import '/imports/api/expenses/methods';
import '/imports/api/expenses/hooks';

import '/imports/api/periods/methods';

import './schedule';
import { getPeriod } from '../imports/api/common';

Meteor.startup(() => {
  Meteor.call('periods.insert', getPeriod());
  Meteor.call('expenses.createFromAccounts');
  // SyncedCron.start();
});
