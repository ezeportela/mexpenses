import { Expenses } from './index';
import { getPeriod } from '../common';

Expenses.before.insert((id, doc) => {
  Object.assign(doc, {
    createdAt: new Date(),
    inServer: true
  });
});

Expenses.after.insert((id, doc) => {
  const {
    accountId,
    period: lastPeriod,
    accountPeriodicity: periodicity
  } = doc;
  const nextPeriod = getPeriod(periodicity, [lastPeriod, 'YYYYMM']);
  Meteor.call('updatePeriodsAccount', accountId, {
    lastPeriod,
    nextPeriod
  });
});
