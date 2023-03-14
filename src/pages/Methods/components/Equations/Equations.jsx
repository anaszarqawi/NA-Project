import React from 'react';

const Equations = (props) => {
  const handleSign = (value, isFirst) => {
    if (value === 1) return isFirst ? '' : ' + ';
    if (value === -1) return isFirst ? ' -' : ' - ';
    if (value > 0) return isFirst ? value : ' + ' + value;
    if (value < 0) return isFirst ? value : ' - ' + Math.abs(value);
  };

  //   <div className="inline-step">
  //     {isOne(props.matrix[0][0])}x<sub>1</sub> + {isOne(props.matrix[0][1])}x<sub>2</sub> +{' '}
  //     {isOne(props.matrix[0][2])}x<sub>3</sub> = {props.matrix[0][3]}
  //   </div>
  //   <div className="inline-step">
  //     {isOne(props.matrix[1][1])}x<sub>2</sub> + {isOne(props.matrix[1][2])}x<sub>3</sub> = {props.matrix[1][3]}
  //   </div>
  //   <div className="inline-step">
  //     {isOne(props.matrix[2][2])}x<sub>3</sub> = {props.matrix[2][3]}
  //   </div>

  return (
    <div className="equations-container">
      {props.matrix.map((row) => {
        return (
          <div className="inline-step">
            {row.map((col, i) => {
              if (i === 0)
                return (
                  col !== 0 && (
                    <span>
                      {handleSign(col, true)}
                      {props.var}
                      <sub>{i + 1}</sub>
                    </span>
                  )
                );
              else if (i === 1)
                return (
                  col !== 0 && (
                    <span>
                      {handleSign(col)}
                      {props.var}
                      <sub>{i + 1}</sub>
                    </span>
                  )
                );
              else if (i === row.length - 1) return <span> = {col}</span>;
              else {
                return (
                  col !== 0 && (
                    <span>
                      {handleSign(col)}
                      {props.var}
                      <sub>{i + 1}</sub>
                    </span>
                  )
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Equations;
