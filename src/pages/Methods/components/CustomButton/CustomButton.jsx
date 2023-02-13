import React from 'react';

const CustomButton = (props) => {
  return (
    <div className="custom-button" disabled={props.disabled} onClick={props.onClick}>
      {props.label}
    </div>
  );
};

export default CustomButton;
