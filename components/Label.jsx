import React from 'react';

const Label = (props) => {
  return (
    <span>
      {props.value ? props.value : null}
      {props.sub ? <sub>{props.sub}</sub> : null}
    </span>
  );
};

export default Label;
