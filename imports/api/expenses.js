import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Expenses = new Mongo.Collection('expenses');

Meteor.methods({
  createExpense(expense) {
    // check(seccion, {
    //     key: String,
    //     titleLink: Match.Maybe(String),
    //     title: Match.Maybe(String),
    //     body: Match.Maybe(String),
    //     bodyInvisible: Match.Maybe(String),
    // });
    Expenses.insert({
      ...expense,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  }
});
