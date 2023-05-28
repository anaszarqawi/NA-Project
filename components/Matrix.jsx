import React from 'react';

const Matrix = (props) => {
  const reverseMatrix = (matrix) => {
    const newMatrix = [];
    for (let i = 0; i < matrix[0].length; i++) {
      const newCol = [];
      for (let j = 0; j < matrix.length; j++) {
        newCol.push(matrix[j][i]);
      }
      newMatrix.push(newCol);
    }
    return newMatrix;
  };

  const matrix = reverseMatrix(props.matrix);
  return (
    // <div className="matrix-container">
    //   {props.label && <div className="matrix-label">{props.label}</div>}
    //   <div className={`matrix ${props.withSolution ? 'withSolution' : ''}`}>
    //     {props.matrix.map((row, i) => {
    //       return (
    //         <div className="matrix-row">
    //           {row.map((col, j) => {
    //             if (!props.withSolution) return <div className="matrix-cell">{col}</div>;
    //             else if (j !== row.length - 1) return <div className="matrix-cell">{col}</div>;
    //           })}
    //         </div>
    //       );
    //     })}
    //   </div>
    //   {props.withSolution && (
    //     <div className="matrix-solution">
    //       {props.matrix.map((row, i) => {
    //         return (
    //           <div className="matrix-row">
    //             {row.map((col, j) => {
    //               if (j === row.length - 1) return <div className="matrix-cell">{col}</div>;
    //             })}
    //           </div>
    //         );
    //       })}
    //     </div>
    //   )}
    // </div>
    <div className="matrix-container">
      {props.label && <div className="matrix-label">{props.label}</div>}
      <div className={`matrix ${props.withSolution ? 'withSolution' : ''}`}>
        {matrix.map((col, i) => {
          if (props.withSolution && i === matrix.length - 1) return null;
          return (
            <div className="matrix-col">
              {col.map((col, j) => {
                return <div className="matrix-cell">{col}</div>;
              })}
            </div>
          );
        })}
      </div>
      {props.withSolution && (
        <div className="matrix-solution">
          {matrix.map((col, i) => {
            if (i !== matrix.length - 1) return null;
            return (
              <div className="matrix-col">
                {col.map((col, j) => {
                  return <div className="matrix-cell">{col}</div>;
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
