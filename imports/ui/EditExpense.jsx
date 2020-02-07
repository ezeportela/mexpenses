import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

class EditExpense extends Component {
  state = {
    form: {
      name: '',
      month: '',
      year: '',
      price: ''
    }
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    Meteor.call('createExpense', this.state.form);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="month"
          name="month"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="year"
          name="year"
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="price"
          name="price"
          onChange={this.handleChange}
        />
        <input type="submit" value="submit changes" />
      </form>
    );
  }
}

export default EditExpense;
