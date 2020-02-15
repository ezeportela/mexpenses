import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default Button = props => (
  <Link
    to={props.to}
    className={`btn waves-effect waves-light ${props.classNames}`}>
    {props.icon && <i className="material-icons left">{props.icon}</i>}
    {props.label && <span className="hide-on-small-only">{props.label}</span>}
  </Link>
);

Button.propTypes = {
  classNames: PropTypes.string,
  to: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string
};
