import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Accounts } from './index';

Meteor.methods({
  'accounts.save'(id, account) {
    const user = Meteor.users.findOne(this.userId);

    if (!id) {
      check(account, {
        name: String,
        periodicity: Match.Integer,
        lastPrice: Number,
        lastPeriod: Number,
        expireDay: Number,
        active: Boolean
      });

      Object.assign(account, {
        active: true,
        owner: this.userId,
        displayName: user.profile.displayName,
        email: user.emails[0].address
      });
      return Accounts.insert(account);
    }

    Accounts.update(id, account);
  },

  'accounts.updatePeriods'(id, { lastPeriod, nextPeriod }) {
    check(id, String);
    check(lastPeriod, Match.Integer);
    check(nextPeriod, Match.Integer);

    Accounts.update(id, { $set: { lastPeriod, nextPeriod } });
  },

  'accounts.delete'(id) {
    check(id, String);

    Accounts.remove(id);
  },

  'accounts.updatePrice'(id, lastPrice) {
    check(id, String);
    check(lastPrice, Match.Integer);

    Accounts.update(id, { $set: { lastPrice } });
  }
});
