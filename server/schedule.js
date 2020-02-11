import Links from '/imports/api/links';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: parser => parser.text('every 5 seconds'),
  job: () => {
    insertLink('test cron', 'http://guide.meteor.com');
  }
});
