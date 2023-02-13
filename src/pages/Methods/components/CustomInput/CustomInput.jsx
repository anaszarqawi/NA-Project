import React from 'react';
import './style.scss';

const CustomInput = (props) => {
  return (
    <div className="custom-input">
      <div className="custom-input-title">
        {props.label}
        {props.sub ? <sub>{props.sub}</sub> : null}
      </div>
      {props.withSelect ? (
        <select
          className="custom-select-input"
          onChange={(e) => {
            props.onChange(e.target.value);
          }}>
          {props.options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      ) : null}
      <input
        className={`custom-input-field ${props.isBlock && 'block'}`}
        type={props.type}
        placeholder={props.placeholder}
        onChange={
          props.onChange
            ? (e) => {
                props.onChange(e.target.value);
              }
            : null
        }
      />
    </div>
  );
};

export default CustomInput;
