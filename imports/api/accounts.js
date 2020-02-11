import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Accounts = new Mongo.Collection('accounts');

Meteor.methods({
  saveAccount(id, account) {
    // check(seccion, {
    //     key: String,
    //     titleLink: Match.Maybe(String),
    //     title: Match.Maybe(String),
    //     body: Match.Maybe(String),
    //     bodyInvisible: Match.Maybe(String),
    // });
    const user = Meteor.users.findOne(this.userId);

    if (!id) {
      Object.assign(account, {
        active: true,
        owner: this.userId,
        displayName: user.profile.displayName,
        email: user.emails[0].address
      });
      return Accounts.insert(account);
    }

    Accounts.update(id, account);
  }
});
