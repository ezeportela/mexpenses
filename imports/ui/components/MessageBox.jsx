import React from 'react';
import PropTypes from 'prop-types';
import './styles/MessageBox.css';

export default MessageBox = props => {
  const { message, icon } = props;
  return (
    <div className="message-box">
      <i className="material-icons">{icon}</i>
      {message}
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.string
};
