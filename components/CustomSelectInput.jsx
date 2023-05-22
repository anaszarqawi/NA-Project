import React from 'react';

const CustomSelectInput = (props) => {
  return (
    <select
      className="custom-select-input"
      onChange={(e) => {
        props.onChange(e.target.value);
      }}>
      {props.options.map((option) => {
        return <option value={option.value}>{option.label}</option>;
      })}
    </select>
  );
};

export default CustomSelectInput;
