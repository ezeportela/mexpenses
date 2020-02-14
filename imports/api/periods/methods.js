import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Periods } from './index';
import moment from 'moment';

Meteor.methods({
  'periods.insert'(value) {
    check(value, Number);
    const user = Meteor.users.findOne(this.userId);

    const count = Periods.find({ owner: this.userId }).count();

    if (count === 0) {
      const formated = moment(value, 'YYYYMM').format('MMM YYYY');
      Periods.insert({
        formated,
        value,
        owner: this.userId,
        displayName: user.profile.displayName,
        email: user.emails[0].address
      });
    }
  }
});
