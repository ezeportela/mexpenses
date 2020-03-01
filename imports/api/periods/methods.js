import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Periods } from './index';
import moment from 'moment';

Meteor.methods({
  'periods.insert'(value) {
    check(value, Number);
    const count = Periods.find({ value: moment(value, 'YYYYMM') }).count();

    if (count === 0) {
      const formated = moment(value, 'YYYYMM').format('MMM YYYY');
      Periods.insert({
        formated,
        value
      });
    }
  }
});
