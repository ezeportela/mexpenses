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
import MessageBox from '../components/MessageBox';
import moment from 'moment';
import LinkButton from '../components/LinkButton';

const ExpenseItem = props => {
  const {
    _id,
    accountName,
    period,
    price,
    realPrice,
    handleCheckboxChange,
    expireDate,
    canSelect,
    canEdit
  } = props;

  const formatedExpireDate = moment(expireDate, 'YYYYMMDD').format(
    'DD MMM YYYY'
  );
  const formatedPeriod = formatPeriod(period);

  const cardFloatingActionButton = (
    <LinkButton
      to="/expenses"
      classNames="btn-floating halfway-fab"
      icon="edit"
    />
  );

  const handleClickPayButton = e => Meteor.call('expenses.pay', _id);

  return (
    <Card cardImagePlaceholder={canEdit && cardFloatingActionButton}>
      <div className="row expense-card-row">
        {canSelect && (
          <Checkbox
            col="s1 expense-card-checkbox"
            value={_id}
            onChange={handleCheckboxChange}
          />
        )}

        <div className="col s11">
          <div className="row expense-card-row">
            <div className="col s5">
              <span className="card-title">{accountName}</span>
              <p>{formatedPeriod}</p>
            </div>
            <div className="col s5">
              <span className="expense-card-content valign-wrapper">
                {formatedExpireDate}
              </span>
            </div>
            <div className="col s2">
              <div className="expense-card-content valign-wrapper">
                <span className="expense-card-price">$ {realPrice}</span>
                {realPrice !== price && <span>($ {price})</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ExpenseList = props => {
  const { expenses, title, handleCheckboxChange, canSelect, canEdit } = props;

  const renderExpenses = expenses.map(expense => (
    <ExpenseItem
      key={expense._id}
      {...expense}
      handleCheckboxChange={handleCheckboxChange}
      canSelect={canSelect}
      canEdit={canEdit}
    />
  ));

  return (
    <div className="expenses-list">
      <h4>{title}</h4>
      {expenses.length === 0 && (
        <MessageBox
          message="There aren't expenses for the selected period."
          icon="info"
        />
      )}
      <div className="row">{renderExpenses}</div>
    </div>
  );
};

const ExpensesList = props => {
  const {
    period,
    handlePeriodChange,
    checkedList,
    handleCheckboxChange,
    expensesToPay,
    payments,
    periods
  } = props;

  return (
    <Container>
      <div className="row">
        <Select
          id="period"
          name="period"
          label="Period"
          value={period.toString()}
          icon="calendar_today"
          options={periods}
          valueProp="value"
          displayProp="formated"
          onChange={handlePeriodChange}
        />
      </div>
      <ExpenseList
        expenses={expensesToPay}
        title="Expenses to Pay"
        handleCheckboxChange={handleCheckboxChange}
        canSelect={true}
        canEdit={true}
      />
      <ExpenseList expenses={payments} title="Payments" />
    </Container>
  );
};

const ExpensesTracker = withTracker(props => {
  const {
    userId,
    period,
    handlePeriodChange,
    checkedList,
    handleCheckboxChange
  } = props;

  const fetchExpenses = paid =>
    Expenses.find({ owner: userId, period, type: 'fixed', paid }).fetch();

  return {
    period,
    handlePeriodChange,
    checkedList,
    handleCheckboxChange,
    periods: Periods.find({ owner: userId }).fetch(),
    expensesToPay: fetchExpenses(false),
    payments: fetchExpenses(true)
  };
})(ExpensesList);

export default ExpensesContainer = () => {
  const userId = Meteor.user()._id;
  const [period, setPeriod] = useState(getPeriod());
  const [checkedList, setCheckedList] = useState([]);

  handlePeriodChange = e => {
    setPeriod(parseInt(e.target.value));
  };

  handleCheckboxChange = e => {
    setCheckedList({
      ...checkedList,
      [e.target.value]: e.target.checked
    });
  };

  const componentProps = {
    userId,
    period,
    handlePeriodChange,
    checkedList,
    handleCheckboxChange
  };

  return <ExpensesTracker {...componentProps} />;
};
