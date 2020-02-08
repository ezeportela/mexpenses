import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from '../../api/accounts';
import Container from '../Container';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class AccountsList extends Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.fixed-action-btn');
    const instances = M.FloatingActionButton.init(elems, {});
  }

  render() {
    const accounts = this.props.accounts.map(account =>
      this.makeListItem(account)
    );

    return (
      <Container>
        <div className="fixed-action-btn">
          <Link to="/accounts/create" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>

        <ul className="collection">{accounts}</ul>
      </Container>
    );
  }

  makeListItem(account) {
    const to = `/accounts/${account._id}/edit`;
    return (
      <Link key={account._id} className="collection-item" to={to}>
        <h5>{account.name}</h5>
        <p>each {account.periodicity} month/s</p>
      </Link>
    );
  }
}

export default AccountsContainer = withTracker(() => {
  return {
    accounts: Accounts.find({ owner: Meteor.user()._id }).fetch()
  };
})(AccountsList);
