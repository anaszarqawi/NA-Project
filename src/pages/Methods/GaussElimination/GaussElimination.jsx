import React from 'react';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SelectMenu from '../../components/SelectMenu/SelectMenu';
import Matrix from '../components/Matrix/Matrix';
import XsValues from '../components/XsValues/XsValues';
import Equations from '../components/Equations/Equations';

import { gaussElimination, luDecomposition } from '../Methods';

const GaussElimination = () => {
  const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [x1_1, setX1_1] = React.useState(0);
  const [x2_1, setX2_1] = React.useState(0);
  const [x3_1, setX3_1] = React.useState(0);
  const [sol_1, setSol_1] = React.useState(0);

  const [x1_2, setX1_2] = React.useState(0);
  const [x2_2, setX2_2] = React.useState(0);
  const [x3_2, setX3_2] = React.useState(0);
  const [sol_2, setSol_2] = React.useState(0);

  const [x1_3, setX1_3] = React.useState(0);
  const [x2_3, setX2_3] = React.useState(0);
  const [x3_3, setX3_3] = React.useState(0);
  const [sol_3, setSol_3] = React.useState(0);

  const [errorMsg, setErrorMsg] = React.useState('');
  const [showSolution, setShowSolution] = React.useState(false);
  const [steps, setSteps] = React.useState([]);

  const [withLUDecomposition, setWithLUDecomposition] = React.useState(
    window.location.pathname === '/lu-decomposition-method'
  );

  const [title, setTitle] = React.useState(withLUDecomposition ? 'LU Decomposition' : 'Gauss Elimination');

  const examples = [
    {
      matrix: [
        {
          x1: 2,
          x2: 1,
          x3: 1,
          sol: 8,
        },
        {
          x1: 4,
          x2: 1,
          x3: 0,
          sol: 11,
        },
        {
          x1: -2,
          x2: 2,
          x3: 1,
          sol: 3,
        },
      ],
    },
    {
      matrix: [
        {
          x1: 2,
          x2: 1,
          x3: -1,
          sol: 1,
        },
        {
          x1: 5,
          x2: 2,
          x3: 2,
          sol: -4,
        },
        {
          x1: 3,
          x2: 1,
          x3: 1,
          sol: 5,
        },
      ],
    },
  ];

  React.useEffect(() => {
    console.log('withLUDecomposition', withLUDecomposition);
  }, []);

  const solution = () => {
    if (x1_1 === 0 && x2_1 === 0 && x3_1 === 0) {
      setErrorMsg('Please enter the first Equation');
      return;
    }
    if (x1_2 === 0 && x2_2 === 0 && x3_2 === 0) {
      setErrorMsg('Please enter the second Equation');
      return;
    }

    if (x1_3 === 0 && x2_3 === 0 && x3_3 === 0) {
      setErrorMsg('Please enter the third Equation');
      return;
    }

    if (sol_1 === 0) {
      setErrorMsg('Please enter the solution of the first Equation');
      return;
    }

    if (sol_2 === 0) {
      setErrorMsg('Please enter the solution of the second Equation');
      return;
    }

    if (sol_3 === 0) {
      setErrorMsg('Please enter the solution of the third Equation');
      return;
    }
    console.clear();

    const matrix = [
      [x1_1, x2_1, x3_1, sol_1],
      [x1_2, x2_2, x3_2, sol_2],
      [x1_3, x2_3, x3_3, sol_3],
    ];
    console.log(matrix);
    const result = withLUDecomposition ? luDecomposition(matrix) : gaussElimination(matrix);

    setSteps(result);

    console.log(steps);
    setErrorMsg('');
    setShowSolution(true);
  };

  const clear = () => {
    setX1_1(0);
    setX2_1(0);
    setX3_1(0);
    setSol_1(0);
    setX1_2(0);
    setX2_2(0);
    setX3_2(0);
    setSol_2(0);
    setX1_3(0);
    setX2_3(0);
    setX3_3(0);
    setSol_3(0);

    setShowSolution(false);
  };

  const setExample = (example) => {
    setX1_1(example.matrix[0].x1);
    setX2_1(example.matrix[0].x2);
    setX3_1(example.matrix[0].x3);
    setSol_1(example.matrix[0].sol);
    setX1_2(example.matrix[1].x1);
    setX2_2(example.matrix[1].x2);
    setX3_2(example.matrix[1].x3);
    setSol_2(example.matrix[1].sol);
    setX1_3(example.matrix[2].x1);
    setX2_3(example.matrix[2].x2);
    setX3_3(example.matrix[2].x3);
    setSol_3(example.matrix[2].sol);

    const matrix = [
      [example.matrix[0].x1, example.matrix[0].x2, example.matrix[0].x3, example.matrix[0].sol],
      [example.matrix[1].x1, example.matrix[1].x2, example.matrix[1].x3, example.matrix[1].sol],
      [example.matrix[2].x1, example.matrix[2].x2, example.matrix[2].x3, example.matrix[2].sol],
    ];

    const result = withLUDecomposition ? luDecomposition(matrix) : gaussElimination(matrix);
    setSteps(result);

    console.log(steps);
    setErrorMsg('');
    setShowSolution(true);
    executeScroll();
  };

  const isOne = (value) => {
    if (value === 1) return;
    return value;
  };

  return (
    <div className="page">
      <div className="center-title">{title} Method</div>
      <div className="variables">
        <div className="variables-title">Variables</div>
        <div className="variables-inline">
          <CustomInput type="number" label="X" sub="1" labelPosition="right" value={x1_1} onChange={setX1_1} />
          <CustomInput type="number" label="X" sub="2" labelPosition="right" value={x2_1} onChange={setX2_1} />
          <CustomInput type="number" label="X" sub="3" labelPosition="right" value={x3_1} onChange={setX3_1} />
          <CustomInput type="number" label="=" value={sol_1} onChange={setSol_1} />
        </div>
        <div className="variables-inline">
          <CustomInput type="number" label="X" sub="1" labelPosition="right" value={x1_2} onChange={setX1_2} />
          <CustomInput type="number" label="X" sub="2" labelPosition="right" value={x2_2} onChange={setX2_2} />
          <CustomInput type="number" label="X" sub="3" labelPosition="right" value={x3_2} onChange={setX3_2} />
          <CustomInput type="number" label="=" value={sol_2} onChange={setSol_2} />
        </div>
        <div className="variables-inline">
          <CustomInput type="number" label="X" sub="1" labelPosition="right" value={x1_3} onChange={setX1_3} />
          <CustomInput type="number" label="X" sub="2" labelPosition="right" value={x2_3} onChange={setX2_3} />
          <CustomInput type="number" label="X" sub="3" labelPosition="right" value={x3_3} onChange={setX3_3} />
          <CustomInput type="number" label="=" value={sol_3} onChange={setSol_3} />
        </div>
      </div>
      {errorMsg !== '' && <div className="error-msg">{errorMsg}</div>}
      <div className="buttons-container">
        <CustomButton label="Calculate" onClick={solution} type="primary" />
        <CustomButton label="Clear" onClick={clear} type="secondary" />
      </div>
      {showSolution && steps && (
        <>
          <hr className="line-divider"></hr>
          <div ref={myRef} className="center-title" name="solution">
            Solution
          </div>
          <div className="solution-container">
            <Matrix matrix={steps.matrix_1} withSolution={true} label="[A/B] = " />
            <div className="steps-container">
              <div className="inline-step rule">
                m<sub>rc</sub> = x<sub>rc</sub> / Pivot Element of R<sub>n</sub>
              </div>
              <div className="inline-step">
                m<sub>21</sub> = {steps.m21.equation}
              </div>
              <div className="inline-step">
                m<sub>31</sub> = {steps.m31.equation}
              </div>
            </div>
            <div className="steps-container">
              <div className="inline-step rule">
                R<sub>2</sub> = R<sub>2</sub> - (m<sub>21</sub> * R<sub>1</sub>)
              </div>
              {steps.R2.steps.map((step, i) => {
                return (
                  <div className="inline-step" key={i}>
                    R<sub>2{i}</sub> = {step}
                  </div>
                );
              })}
            </div>
            <div className="steps-container">
              <div className="inline-step rule">
                R<sub>3</sub> = R<sub>3</sub> - (m<sub>31</sub> * R<sub>1</sub>)
              </div>
              {steps.R3_1.steps.map((step, i) => {
                return (
                  <div className="inline-step" key={i}>
                    R<sub>3{i}</sub> = {step}
                  </div>
                );
              })}
            </div>
            <Matrix matrix={steps.matrix_2} withSolution={true} label="[A/B] = " />
            <div className="steps-container">
              <div className="inline-step">
                m<sub>32</sub> = {steps.m32.equation}
              </div>
            </div>
            <div className="steps-container">
              <div className="inline-step rule">
                R<sub>3</sub> = R<sub>3</sub> - (m<sub>32</sub> * R<sub>2</sub>)
              </div>
              {steps.R3_2.steps.map((step, i) => {
                return (
                  <div className="inline-step" key={i}>
                    R<sub>3{i}</sub> = {step}
                  </div>
                );
              })}
            </div>
            <Matrix matrix={steps.matrix_3} withSolution={true} label="[A/B] = " />
            <Equations matrix={steps.matrix_3} var="X" withAnswer={true} />
            <XsValues values={steps.xsValues} />
            {withLUDecomposition && (
              <>
                <div className="subtitle">Solve by LU Decomposition</div>
                <div className="steps-container">
                  <Matrix matrix={steps.A} label="A = " />
                  <Matrix matrix={steps.B} label="B = " />
                  <Matrix matrix={steps.U} label="U = " />
                  <Matrix matrix={steps.L} label="L = " />
                  <div className="inline-step rule">L . C = B</div>
                  <div className="inline-statement">
                    <Matrix matrix={steps.L} />
                    <Matrix matrix={[['C1'], ['C2'], ['C3']]} /> =
                    <Matrix matrix={steps.B} />
                  </div>
                  <Equations matrix={steps.C} var="C" withAnswer={true} />
                  <div className="inline-statement">
                    <Matrix matrix={[['C1'], ['C2'], ['C3']]} /> =
                    <Matrix matrix={steps.C_Values} />
                  </div>
                  <div className="inline-step rule">U . X = C</div>
                  <div className="inline-statement">
                    <Matrix matrix={steps.U} />
                    <Matrix matrix={[['X1'], ['X2'], ['X3']]} /> =
                    <Matrix matrix={steps.C_Values} />
                  </div>
                  <Equations matrix={steps.X} var="X" withAnswer={true} />
                  <XsValues values={steps.X_Values} />
                </div>
              </>
            )}
          </div>
        </>
      )}
      <hr className="line-divider"></hr>
      <div className="center-title">Examples</div>
      <div className="examples-container">
        <SelectMenu examples={examples} type="examples" setter={setExample} />
      </div>
    </div>
  );
};

export default GaussElimination;
