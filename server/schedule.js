SyncedCron.add({
  name: 'Crunch create expenses from accounts',
  schedule: parser => parser.text('every 1 hours'),
  job: () => {
    Meteor.call('expenses.createFromAccounts');
  }
});
