import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Expenses } from '../../api/expenses';
import Container from '../components/Container';
import TextInput from '../components/TextInput';
import { usePrevious } from '../hooks';
import Card from '../components/Card';
import _ from 'lodash';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import { formatPeriod } from '../../api/common';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const EditExpense = props => {
  const { id } = props;
  const [expense, setExpense] = useState({
    accountName: '',
    price: 0,
    realPrice: 0,
    period: '',
    expireDate: ''
  });
  const prevFetch = usePrevious(props.expense);

  const formatedExpireDate = moment(expense.expireDate, 'YYYYMMDD').format(
    'DD MMM YYYY'
  );

  useEffect(() => {
    if (
      prevFetch !== props.expense &&
      !_.isEmpty(props.expense) &&
      (_.isEmpty(prevFetch) ||
        confirm('The record has been updated. Would you like to reload it?'))
    ) {
      setExpense(props.expense);
    }
  });

  const handleChange = e =>
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    });

  const handleCheckboxChange = e =>
    setExpense({
      ...expense,
      [e.target.name]: e.target.checked
    });

  const handleClickDelete = () => {
    if (confirm('Are you sure do you want to delete the expense?')) {
      Meteor.call('expenses.delete', expense._id);
      props.history.push('/expenses');
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { price, realPrice } = expense;
    Object.assign(expense, {
      price: parseInt(price),
      realPrice: parseInt(realPrice)
    });
    Meteor.call('expenses.save', id, expense);
    props.history.push('/expenses');
  };

  return (
    <Container>
      <Card hoverable={false} title={props.title}>
        <form onSubmit={handleSubmit} className="row">
          <TextInput
            col="s12 m6"
            id="name"
            name="name"
            label="expense Name"
            icon="label"
            readOnly={true}
            value={expense.accountName}
          />

          <Checkbox
            name="paid"
            col="input-field s12 m6"
            label="Paid"
            checked={expense.paid}
            onChange={handleCheckboxChange}
          />

          <TextInput
            col="s12 m6"
            id="price"
            name="price"
            label="List Price"
            type="number"
            onChange={handleChange}
            value={expense.price}
            icon="attach_money"
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="realPrice"
            name="realPrice"
            label="Real Price"
            type="number"
            onChange={handleChange}
            value={expense.realPrice}
            icon="attach_money"
            validate={true}
          />

          <TextInput
            col="s12 m6"
            id="period"
            name="period"
            label="Period"
            type="text"
            value={formatPeriod(expense.period)}
            readOnly={true}
            icon="calendar_today"
          />

          <TextInput
            col="s12 m6"
            id="expireDay"
            name="expireDate"
            label="Expire Date"
            type="text"
            value={formatedExpireDate}
            icon="history"
            readOnly={true}
          />

          <div className="card-actions col s12">
            <LinkButton
              to="/expenses"
              classNames="grey lighten-3 black-text"
              icon="clear"
              label="Cancel"
            />

            {expense._id && (
              <Button
                type="button"
                icon="delete"
                label="Delete"
                classNames="grey lighten-3 black-text"
                onClick={handleClickDelete}
              />
            )}

            <Button type="submit" icon="save" label="Save" />
          </div>
        </form>
      </Card>
    </Container>
  );
};

export default EditExpenseContainer = withTracker(props => {
  const { expenseId: id } = props.match.params;
  return {
    id,
    expense: Expenses.findOne({ _id: id }) || {},
    title: id ? 'Edit Expense' : 'New Expense'
  };
})(EditExpense);
