import React from 'react';
import PropTypes from 'prop-types';

export default TextInput = props => {
  const { col, icon, id, type, value, onChange, label, name } = props;
  const inputCol = col || 's12';
  const inputType = type || 'text';
  const cssClasses = `input-field col ${inputCol}`;

  return (
    <div className={cssClasses}>
      <i className="material-icons prefix">{icon}</i>
      <input
        id={id}
        name={name}
        type={inputType}
        className="validate"
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};
