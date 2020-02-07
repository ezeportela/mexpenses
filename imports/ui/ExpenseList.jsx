import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Expenses } from '../api/expenses';

class ExpenseList extends Component {
  render() {
    const expenses = this.props.expenses.map(expense =>
      this.makeListItem(expense)
    );

    return <div className="row">{expenses}</div>;
  }

  makeListItem(expense) {
    return (
      <div className="col s12 m8 offset-m2" key={expense._id}>
        <div className="card hoverable">
          <div className="card-content card-header">
            <div className="row">
              <div className="col s12">
                <h3>{expense.name}</h3>
              </div>
            </div>
          </div>

          <div className="card-content">
            {expense.month}/{expense.year} ${expense.price}
          </div>
        </div>
      </div>
    );
  }
}

export default ExpenseListContainer = withTracker(() => {
  return {
    expenses: Expenses.find({ owner: Meteor.user()._id }).fetch()
  };
})(ExpenseList);
