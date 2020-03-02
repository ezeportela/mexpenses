import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Periods } from './index';
import { formatPeriod } from '../common';

Meteor.methods({
  'periods.insert'(value) {
    check(value, Number);
    const count = Periods.find({ value }).count();

    if (count === 0) {
      const formated = formatPeriod(value);
      Periods.insert({
        formated,
        value
      });
    }
  }
});
