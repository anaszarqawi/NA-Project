import React, { useId } from 'react';
import './style.scss';

const CustomCheckButton = (props) => {
  return (
    <div className="custom-input-checkbox-container">
      <div
        className={`custom-input-checkbox ${props.value && 'checked'}`}
        onClick={() => {
          props.setValue(!props.value);
          console.log(props.value);
        }}></div>
      <label
        className="custom-input-checkbox-label"
        onClick={() => {
          props.setValue(!props.value);
        }}>
        {props.label}
      </label>
    </div>
  );
};

export default CustomCheckButton;
