import Links from '/imports/api/links';
import moment from 'moment';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

SyncedCron.add({
  name: 'Crunch test',
  schedule: parser => parser.text('every 30 mins'),
  job: () => {
    insertLink(
      `executed at ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
      'http://localhost:3000'
    );
  }
});
