import { Accounts } from './index';
import { getPeriod } from '../common';

Accounts.before.insert((id, doc) => {
  const nextPeriod = getPeriod(doc.periodicity - 1);

  Object.assign(doc, {
    nextPeriod,
    createdAt: new Date(),
    inServer: true
  });
});

Accounts.after.insert((id, doc) => {
  Meteor.call('expenses.createFromAccount', doc);
});

Accounts.before.remove((id, doc) => {
  console.log('data', id, doc);
  Meteor.call('expenses.deleteByAccountId', doc._id);
});
