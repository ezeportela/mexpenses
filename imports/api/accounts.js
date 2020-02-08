import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Accounts = new Mongo.Collection('accounts');

Meteor.methods({
  createAccount(account) {
    // check(seccion, {
    //     key: String,
    //     titleLink: Match.Maybe(String),
    //     title: Match.Maybe(String),
    //     body: Match.Maybe(String),
    //     bodyInvisible: Match.Maybe(String),
    // });
    Accounts.insert({
      ...account,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    });
  },

  updateAccount(id, account) {
    // check(seccion, {
    //     key: String,
    //     titleLink: Match.Maybe(String),
    //     title: Match.Maybe(String),
    //     body: Match.Maybe(String),
    //     bodyInvisible: Match.Maybe(String),
    // });
    Accounts.upsert(id, account);
  }
});
