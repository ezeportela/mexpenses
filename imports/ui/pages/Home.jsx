import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import BarChart from 'react-bar-chart';
import { Periods } from '../../api/periods';
import { Expenses } from '../../api/expenses';
import './styles/Home.css';

const margin = { top: 20, right: 20, bottom: 30, left: 60 };

class Home extends Component {
  state = { width: 500 };

  componentDidMount() {
    window.onresize = () => {
      this.setState({ width: this.refs.root.offsetWidth });
    };
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <h2>Expense tracker to keep your accounts paided!</h2>
          <div style={{ width: '50%' }}>
            <BarChart
              ylabel="expenses"
              width={this.state.width}
              height={500}
              margin={margin}
              data={this.props.data}
              colorByLabel={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer = withTracker(() => {
  const user = Meteor.user();

  const data = user
    ? Periods.find({}, { sort: { value: 1 }, limit: 10 })
        .fetch()
        .map(period => ({
          text: period.formated,
          value: Expenses.find({
            owner: user._id,
            period: period.value,
            paid: true
          })
            .fetch()

            .reduce((total, value) => total + value.price, 0)
        }))
    : [];

  return {
    data
  };
})(Home);
