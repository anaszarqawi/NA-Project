import React from 'react';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';

const LU_steps = (props) => {
  return (
    <>
      <div className="subtitle">Solve by LU Decomposition</div>
      <div className="steps-container">
        <Matrix matrix={props.solution.A} label="A = " />
        <Matrix matrix={props.solution.B} label="B = " />
        <Matrix matrix={props.solution.U} label="U = " />
        <Matrix matrix={props.solution.L} label="L = " />
        <div className="step rule">L . C = B</div>
        <div className="inline-statement">
          <Matrix matrix={props.solution.L} />
          <Matrix matrix={[['C1'], ['C2'], ['C3']]} /> =
          <Matrix matrix={props.solution.B} />
        </div>
        <Equations matrix={props.solution.C} var="C" withAnswer={true} />
        <div className="inline-statement">
          <Matrix matrix={[['C1'], ['C2'], ['C3']]} /> =
          <Matrix matrix={props.solution.C_Values} />
        </div>
        <div className="step rule">U . X = C</div>
        <div className="inline-statement">
          <Matrix matrix={props.solution.U} />
          <Matrix matrix={[['X1'], ['X2'], ['X3']]} /> =
          <Matrix matrix={props.solution.C_Values} />
        </div>
        <Equations matrix={props.solution.X} var="X" withAnswer={true} />
        <XsValues values={props.solution.X_Values} />
      </div>
    </>
  );
};

export default LU_steps;
