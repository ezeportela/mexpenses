import React from 'react';
import PropTypes from 'prop-types';

export default Checkbox = props => {
  const { col, value, onChange, label, checked, name } = props;
  const inputCol = col || 's12';
  const cssClasses = `col ${inputCol}`;
  return (
    <div className={cssClasses}>
      <label>
        <input
          name={name}
          type="checkbox"
          className="filled-in"
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  classNames: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  col: PropTypes.string,
  checked: PropTypes.bool
};
