import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from '../../api/accounts';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import M from 'materialize-css';
import { usePrevious } from '../hooks';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const EditAccount = props => {
  const { id } = props;
  const [account, setAccount] = useState({
    name: '',
    periodicity: 1,
    lastPrice: 0
  });
  const prevFetch = usePrevious(props.account);

  useEffect(() => {
    if (
      prevFetch !== props.account &&
      !_.isEmpty(props.account) &&
      (_.isEmpty(prevFetch) ||
        confirm('The record has been updated. Would you like to reload it?'))
    ) {
      setAccount(props.account);
    }
    M.updateTextFields();
  });

  const handleChange = e =>
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });

  const handleSubmit = e => {
    e.preventDefault();
    const { periodicity, lastPrice } = account;
    Object.assign(account, {
      periodicity: parseInt(periodicity),
      lastPrice: parseInt(lastPrice)
    });
    Meteor.call('saveAccount', id, account);
    props.history.push('/accounts');
  };

  return (
    <Container>
      <Card hoverable={false} title={props.title}>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="name"
            name="name"
            onChange={handleChange}
            label="Account Name"
            icon="label"
            value={account.name}
          />

          <TextInput
            id="periodicity"
            name="periodicity"
            label="Periodicity"
            type="number"
            onChange={handleChange}
            value={account.periodicity}
            icon="calendar_today"
          />

          <TextInput
            id="price"
            name="lastPrice"
            label="Price"
            type="number"
            onChange={handleChange}
            value={account.lastPrice}
            icon="attach_money"
          />

          <div className="card-actions">
            <Link
              to="/accounts"
              className="btn grey lighten-3 black-text waves-effect waves-light">
              <i className="material-icons left">clear</i>
              Cancel
            </Link>

            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action">
              <i className="material-icons left">save</i>
              Save
            </button>
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default EditAccountContainer = withTracker(props => {
  const { accountId: id } = props.match.params;

  return {
    id,
    account: Accounts.findOne({ _id: id }) || {},
    title: id ? 'Edit Account' : 'New Account'
  };
})(EditAccount);
