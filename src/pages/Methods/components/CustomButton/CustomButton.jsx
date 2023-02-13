import React from 'react';
import './style.scss';

const CustomButton = (props) => {
  return (
    <div className="custom-button" disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </div>
  );
};

export default CustomButton;
