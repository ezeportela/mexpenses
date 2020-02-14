import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

export default Select = props => {
  const {
    col,
    icon,
    id,
    value,
    onChange,
    label,
    name,
    defaultOption,
    valueProp,
    displayProp,
    options
  } = props;

  const inputCol = col || 's12';
  const cssClasses = `input-field col ${inputCol}`;

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  });
  const renderOptions = _options =>
    _options.map(item => (
      <option key={item[valueProp]} value={item[valueProp]}>
        {item[displayProp]}
      </option>
    ));

  return (
    <div className={cssClasses}>
      <i className="material-icons prefix">{icon}</i>
      <select id={id} name={name} onChange={onChange} value={value}>
        {defaultOption && (
          <option value="" disabled>
            {defaultOption}
          </option>
        )}
        {renderOptions(options)}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  valueProp: PropTypes.string.isRequired,
  displayProp: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  col: PropTypes.string,
  value: PropTypes.string,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func
};
