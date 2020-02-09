import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from '../../api/accounts';
import Container from '../Container';
import TextInput from '../components/TextInput';
import M from 'materialize-css';
import { usePrevious } from '../hooks';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const EditAccount = props => {
  const { id } = props;
  const [account, setAccount] = useState({ name: '', periodicity: 1 });
  const prevFetch = usePrevious(props.account);

  useEffect(() => {
    if (prevFetch != props.account) {
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
    if (id) {
      Meteor.call('updateAccount', id, account);
    } else {
      Meteor.call('createAccount', account);
    }

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
              Submit
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
