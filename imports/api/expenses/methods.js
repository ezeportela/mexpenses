import { Meteor } from 'meteor/meteor';
import { getPeriod } from '../common';
import { Expenses } from './index';

Meteor.methods({
  createExpenseFromAccount(account) {
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
        paid: false,
        type: 'fixed',
        owner,
        email,
        displayName
      });
    }
  }
});
