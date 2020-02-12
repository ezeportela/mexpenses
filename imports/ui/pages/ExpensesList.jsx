import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Expenses } from '../../api/expenses';
import Container from '../components/Container';
import Card from '../components/Card';

const ExpensesList = props => {
  const makeListItem = expenses => {
    const to = `/expenses/${expenses._id}/edit`;
    return (
      <Card key={expenses._id} title={expenses.accountName}>
        <p>{expenses.price}</p>
        <p>{expenses.period}</p>
      </Card>
    );
  };

  const expenses = props.expenses.map(expenses => makeListItem(expenses));

  return (
    <Container>
      <div className="row">{expenses}</div>
    </Container>
  );
};

export default ExpensesContainer = withTracker(() => {
  return {
    expenses: Expenses.find({ owner: Meteor.user()._id }).fetch()
  };
})(ExpensesList);
