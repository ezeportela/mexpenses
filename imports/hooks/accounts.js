import { Accounts } from '../api/accounts';

Accounts.before.insert((id, doc) => {
  Object.assign(doc, {
    createdAt: new Date(),
    inServer: true
  });
});
