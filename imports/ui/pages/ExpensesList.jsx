import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Expenses } from '../../api/expenses';
import Container from '../components/Container';
import Card from '../components/Card';
import './styles/ExpenseList.css';
import { formatPeriod } from '../../api/common';
import Checkbox from '../components/Checkbox';

const ExpenseItem = props => {
  const {
    _id,
    accountName,
    period,
    price,
    realPrice,
    handleCheckboxChange
  } = props;
  const formatedPeriod = formatPeriod(period);
  const handleClickPayButton = e => Meteor.call('expenses.pay', _id);
  return (
    <Card>
      <div className="row expense-card-row">
        <Checkbox
          col="s1 expense-card-checkbox"
          value={_id}
          onChange={handleCheckboxChange}
        />

        <div className="col s11">
          <div className="row expense-card-row">
            <div className="col s5">
              <span className="card-title">{accountName}</span>
              <p>{formatedPeriod}</p>
            </div>
            <div className="col s5">
              <p className="expense-card-price">$ {realPrice}</p>
            </div>
            <div className="col s2">
              <button
                className="btn"
                type="button"
                onClick={handleClickPayButton}>
                <i className="material-icons left">payment</i>
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
const ExpensesList = props => {
  const [checkedList, setCheckedList] = useState([]);

  handleCheckboxChange = e => {
    setCheckedList({
      ...checkedList,
      [e.target.value]: e.target.checked
    });
  };

  const expenses = props.expenses.map(expense => (
    <ExpenseItem
      key={expense._id}
      {...expense}
      handleCheckboxChange={handleCheckboxChange}
    />
  ));

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
