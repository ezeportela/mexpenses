import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Expenses } from '../../api/expenses';
import Container from '../components/Container';
import Card from '../components/Card';
import './styles/ExpenseList.css';
import { formatPeriod, getPeriod } from '../../api/common';
import Checkbox from '../components/Checkbox';
import { Periods } from '../../api/periods';
import Select from '../components/Select';

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
  const { period, handlePeriodChange } = props;

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
      <div className="row">
        <Select
          id="period"
          name="period"
          label="Period"
          value={period.toString()}
          icon="calendar_today"
          options={props.periods}
          valueProp="value"
          displayProp="formated"
          onChange={handlePeriodChange}
        />
      </div>
      <div className="row">{expenses}</div>
    </Container>
  );
};

const ExpensesTracker = withTracker(props => {
  const { userId, period, handlePeriodChange } = props;
  return {
    period,
    handlePeriodChange,
    periods: Periods.find({ owner: userId }).fetch(),
    expenses: Expenses.find({ owner: userId, period }).fetch()
  };
})(ExpensesList);

export default ExpensesContainer = () => {
  const userId = Meteor.user()._id;
  const [period, setPeriod] = useState(getPeriod());

  handlePeriodChange = e => {
    setPeriod(parseInt(e.target.value));
  };

  return (
    <ExpensesTracker
      userId={userId}
      period={period}
      handlePeriodChange={handlePeriodChange}
    />
  );
};
