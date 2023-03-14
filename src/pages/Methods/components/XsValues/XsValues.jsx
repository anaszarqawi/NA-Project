import React from 'react';
import './style.scss';

const XsValues = (props) => {
  return (
    <div className="xs-values-container">
      {props.values.map((x, i) => {
        return (
          <div className="x-value">
            {x.name}
            <sub>{x.sub}</sub> = {x.value}
          </div>
        );
      })}
    </div>
  );
};

export default XsValues;
