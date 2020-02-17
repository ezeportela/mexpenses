import React, { useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from '../../api/accounts';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import Container from '../components/Container';
import Card from '../components/Card';
import MessageBox from '../components/MessageBox';

const AccountsList = props => {
  useEffect(() => {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {});
  });

  const makeListItem = account => {
    const to = `/accounts/${account._id}/edit`;
    return (
      <Card key={account._id} title={account.name} to={to} hoverable={true}>
        <p>each {account.periodicity} month/s</p>
      </Card>
    );
  };

  const accounts = props.accounts.map(account => makeListItem(account));

  return (
    <Container>
      {accounts.length === 0 && (
        <MessageBox message="There aren't accounts." icon="info" />
      )}

      <div className="row">{accounts}</div>

      <div className="fixed-action-btn">
        <Link to="/accounts/create" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </Container>
  );
};

export default AccountsContainer = withTracker(() => {
  return {
    accounts: Accounts.find({ owner: Meteor.user()._id }).fetch()
  };
})(AccountsList);
