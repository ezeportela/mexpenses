import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';

import '/imports/api/accounts/methods';
import '/imports/api/accounts/hooks';

import '/imports/api/expenses/methods';
import '/imports/api/expenses/hooks';

import './schedule';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // SyncedCron.start();
  // Meteor.setTimeout(function() {
  //   SyncedCron.stop();
  // }, 15 * 1000);
  // If the Links collection is empty, add some data.
  // if (Links.find().count() === 0) {
  //   insertLink(
  //     'Do the Tutorial',
  //     'https://www.meteor.com/tutorials/react/creating-an-app'
  //   );
  //   insertLink('Follow the Guide', 'http://guide.meteor.com');
  //   insertLink('Read the Docs', 'https://docs.meteor.com');
  //   insertLink('Discussions', 'https://forums.meteor.com');
  // }
});
