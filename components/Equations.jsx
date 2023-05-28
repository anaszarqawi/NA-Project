import React from 'react';
import { create, all, fix, i, re, matrix } from 'mathjs';
const config = {};
const math = create(all, config);

const Equations = (props) => {
  const frac = (value) => {
    const num = math.number(value);
    const f = math.fraction(num);
    if (f.d === 1) return `${f.n}`;
    else return `${f.n}/${f.d}`;
  };

  const handleSign = (value, isFirst) => {
    const handelValue = (num) => {
      if (`${num}`.includes('.')) return frac(num);
      return Math.abs(num);
    };

    if (value === 1) return isFirst ? '' : ' + ';
    if (value === -1) return isFirst ? ' -' : ' - ';
    if (value > 0) return isFirst ? handelValue(value) : ' + ' + handelValue(value);
    if (value < 0) return isFirst ? handelValue(value) : ' - ' + handelValue(value);
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
          <div className="step">
            {row.map((col, i) => {
              if (i === 0)
                return (
                  col !== 0 && (
                    <span>
                      {handleSign(col, true)}
                      <span className="equation-var">
                        {props.var}
                        <sub>{i + 1}</sub>
                      </span>
                    </span>
                  )
                );
              else if (i === 1)
                return (
                  col !== 0 && (
                    <span>
                      {handleSign(col, row[0] === 0)}
                      <span className="equation-var">
                        {props.var}
                        <sub>{i + 1}</sub>
                      </span>
                    </span>
                  )
                );
              else if (i === row.length - 1) return <span> = {col}</span>;
              else {
                return (
                  col !== 0 && (
                    <span>
                      {handleSign(col, row[0] === 0 && row[1] === 0)}
                      <span className="equation-var">
                        {props.var}
                        <sub>{i + 1}</sub>
                      </span>
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
