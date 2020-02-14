import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';

import '/imports/api/accounts/methods';
import '/imports/api/accounts/hooks';

import '/imports/api/expenses/methods';
import '/imports/api/expenses/hooks';

import './schedule';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  Meteor.call('createExpensesFromAccounts');
  SyncedCron.start();
});
