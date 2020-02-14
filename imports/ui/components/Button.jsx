import React from 'react';
import PropTypes from 'prop-types';

export default Button = props => (
  <button
    className={`btn waves-effect waves-light ${props.classNames}`}
    type={props.type || 'button'}
    onClick={props.onClick}>
    <i className="material-icons left">{props.icon}</i>
    <span className="hide-on-small-only">{props.label}</span>
  </button>
);

Button.propTypes = {
  classNames: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};
