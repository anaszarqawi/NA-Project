import React from 'react';

const Matrix = (props) => {
  return (
    <div className="matrix-container">
      {props.label && <div className="matrix-label">{props.label}</div>}
      <div className={`matrix ${props.withSolution ? 'withSolution' : ''}`}>
        {props.matrix.map((row, i) => {
          return (
            <div className="matrix-row">
              {row.map((col, j) => {
                if (!props.withSolution) return <div className="matrix-cell">{col}</div>;
                else if (j !== row.length - 1) return <div className="matrix-cell">{col}</div>;
              })}
            </div>
          );
        })}
      </div>
      {props.withSolution && (
        <div className="matrix-solution">
          {props.matrix.map((row, i) => {
            return (
              <div className="matrix-row">
                {row.map((col, j) => {
                  if (j === row.length - 1) return <div className="matrix-cell">{col}</div>;
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Matrix;
