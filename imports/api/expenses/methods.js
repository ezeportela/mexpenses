import { Meteor } from 'meteor/meteor';
import { getPeriod } from '../common';
import { Expenses } from './index';
import { Accounts } from '../accounts';

Meteor.methods({
  'expenses.createFromAccount'(account) {
    if (account.nextPeriod === getPeriod() && account.active) {
      const {
        _id: accountId,
        name: accountName,
        nextPeriod: period,
        periodicity: accountPeriodicity,
        lastPrice: price,
        owner,
        email,
        displayName
      } = account;

      Expenses.insert({
        accountId,
        accountName,
        accountPeriodicity,
        period,
        price,
        realPrice: price,
        paid: false,
        type: 'fixed',
        owner,
        email,
        displayName
      });
    }
  },

  'expenses.createFromAccounts'() {
    const period = getPeriod();
    const accounts = Accounts.find({ nextPeriod: period });

    for (const account of accounts) {
      Meteor.call('expenses.createFromAccount', account);
    }
  },

  'expenses.pay'(expenseId) {
    Expenses.update(expenseId, { $set: { paid: true } });
  }
});
