import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

export default TextInput = props => {
  const {
    col,
    icon,
    id,
    type,
    value,
    onChange,
    label,
    name,
    readOnly,
    required,
    validate
  } = props;

  useEffect(() => M.updateTextFields());

  const inputCol = col || 's12';
  const cssClasses = `input-field col ${inputCol}`;
  const _validate = validate ? 'validate' : '';

  return (
    <div className={cssClasses}>
      <i className="material-icons prefix">{icon}</i>
      <input
        id={id}
        name={name}
        type={type || 'text'}
        className={_validate}
        value={value}
        onChange={onChange}
        required={required || true}
        readOnly={readOnly || false}
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
  onChange: PropTypes.func,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  validate: PropTypes.bool
};
