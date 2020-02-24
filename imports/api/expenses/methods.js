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
        displayName,
        expireDay
      } = account;

      const expireDate = parseInt(`${period}${expireDay}`);
      Expenses.insert({
        accountId,
        accountName,
        accountPeriodicity,
        period,
        price,
        realPrice: price,
        expireDate,
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

  'expenses.save'(id, expense) {
    Expenses.update(id, expense);
  },

  'expenses.pay'(items) {
    for (const id of Object.keys(items)) {
      if (items[id]) {
        Expenses.update(id, { $set: { paid: true } });
      }
    }
  },

  'expenses.deleteByAccountId'(id) {
    Expenses.remove({ accountId: id });
  },

  'expenses.delete'(id) {
    Expenses.remove(id);
  }
});
