import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Expenses } from '../../api/expenses';
import Container from '../components/Container';
import Card from '../components/Card';

const ExpensesList = props => {
  const [checkedList, setCheckedList] = useState([]);

  handleCheckboxChange = e => {
    setCheckedList({
      ...checkedList,
      [e.target.value]: e.target.checked
    });
  };

  const makeListItem = expense => {
    return (
      <Card key={expense._id} title={expense.accountName}>
        <form>
          <label>
            <input
              type="checkbox"
              className="filled-in"
              value={expense._id}
              onChange={handleCheckboxChange}
            />
            <span></span>
          </label>
        </form>
        <p>{expense.price}</p>
        <p>{expense.period}</p>
      </Card>
    );
  };

  const expenses = props.expenses.map(expense => makeListItem(expense));

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
