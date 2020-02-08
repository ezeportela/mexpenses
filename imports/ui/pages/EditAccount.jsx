import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from '../../api/accounts';
import Container from '../Container';
import TextInput from '../components/TextInput';
import M from 'materialize-css';

const EditAccount = props => {
  useEffect(() => {
    M.updateTextFields();
  });

  return (
    <Container>
      <form onSubmit={props.handleSubmit}>
        <TextInput
          id="name"
          name="name"
          onChange={props.handleChange}
          label="Account Name"
          icon="label"
          value={props.account.name}
        />

        <TextInput
          id="periodicity"
          name="periodicity"
          label="Periodicity"
          type="number"
          onChange={props.handleChange}
          value={props.account.periodicity}
          icon="calendar_today"
        />

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action">
          <i className="material-icons left">save</i>
          Submit
        </button>
      </form>
    </Container>
  );
};

// const EditAccountContainer = withTracker(props => {
//   const { id } = props;
//   const account = Accounts.findOne({ _id: id }) || {};

//   const handleChange = e =>
//     Object.assign(account, {
//       ...account,
//       [e.target.name]: e.target.value
//     });

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (id) {
//       updateAccount(id, acccount);
//     } else {
//       Meteor.call('createAccount', account);
//       props.history.push('/accounts');
//     }
//   };

//   return {
//     account,
//     handleChange,
//     handleSubmit
//   };
// })(EditAccountComponent);

export default EditAccountContainer = props => {
  const { accountId } = useParams();
  const [account, setAccount] = useState({ name: '', periodicity: 1 });

  useEffect(() => {
    const acc = Accounts.findOne({ _id: accountId });

    if (acc) setAccount(acc);
  }, []);

  const handleChange = e =>
    setAccount({
      ...account,
      [e.target.name]: e.target.value
    });

  const handleSubmit = e => {
    e.preventDefault();
    if (accountId) {
      Meteor.call('updateAccount', accountId, account);
    } else {
      Meteor.call('createAccount', account);
    }

    props.history.push('/accounts');
  };

  return (
    <EditAccount
      account={account}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
