import React from 'react';
import FadeChildren from './FadeChildren';

const XsValues = (props) => {
  return (
    <div className="xs-values-container">
      <FadeChildren>
        {props.values.map((x, i) => {
          return (
            <div className="x-value">
              {x.name}
              <sub>{x.sub}</sub> = {x.value}
            </div>
          );
        })}
      </FadeChildren>
    </div>
  );
};

export default XsValues;
