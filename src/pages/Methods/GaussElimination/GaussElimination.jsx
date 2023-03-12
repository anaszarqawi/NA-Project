import React from 'react';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SelectMenu from '../../components/SelectMenu/SelectMenu';
import Matrix from '../components/Matrix/Matrix';

const GaussElimination = () => {
  const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [matrix, setMatrix] = React.useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [matrix_2, setMatrix_2] = React.useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

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

  const [m21, setM21] = React.useState(0);
  const [m31, setM31] = React.useState(0);
  const [m32, setM32] = React.useState(0);

  const [errorMsg, setErrorMsg] = React.useState('');
  const [showSolution, setShowSolution] = React.useState(false);

  const examples = [
    {
      fx: '-2 + 7x - 5x^2 + 6x^3',
      xl: 0,
      xu: 1,
      conditionType: 'es',
      es: 10,
    },
    {
      fx: '4x^3 - 6x^2 + 7x - 2.3',
      xl: 0,
      xu: 1,
      conditionType: 'es',
      es: 1,
    },
    {
      fx: 'x^3 - 4x^2 - 8x -1',
      xl: 2,
      xu: 3,
      conditionType: 'es',
      es: 0.5,
    },
    {
      fx: '-0.6x^2 + 2.4x + 5.5',
      xl: 5,
      xu: 10,
      conditionType: 'es',
      es: 0.5,
    },
    {
      fx: '-13 - 20x + 19x^2 - 3x^3',
      xl: -1,
      xu: 0,
      conditionType: 'it',
      it: 10,
    },
    {
      fx: 'x^3 + 3x - 5',
      xl: 1,
      xu: 2,
      conditionType: 'es',
      es: 2,
    },
    {
      fx: 'x^4 - 8x^3 - 35x^2 + 450x - 1001',
      xl: 4.5,
      xu: 6,
      conditionType: 'es',
      es: 0.1,
    },
    {
      fx: 'x^5 - x^4 - x^3 - 1',
      xl: 1,
      xu: 2,
      conditionType: 'es',
      es: 0.5,
    },
    {
      fx: 'x^3 + 2x^2 + 10x - 20',
      xl: 1,
      xu: 2,
      conditionType: 'es',
      es: 4,
    },
    {
      fx: '-26 + 82.3x - 88x^2 + 45.4x^3 - 9x^4 + 0.65x^5',
      xl: 0.5,
      xu: 1,
      conditionType: 'es',
      es: 0.2,
    },
  ];

  React.useEffect(() => {
    setMatrix([
      [x1_1, x2_1, x3_1, sol_1],
      [x1_2, x2_2, x3_2, sol_2],
      [x1_3, x2_3, x3_3, sol_3],
    ]);

    setMatrix_2([
      [x1_1, x2_1, x3_1, sol_1],
      [
        x1_2 - (x1_2 / x1_1) * x1_1,
        x2_2 - (x1_2 / x1_1) * x2_1,
        x3_2 - (x1_2 / x1_1) * x3_1,
        sol_2 - (x1_2 / x1_1) * sol_1,
      ],
      [
        x1_3 - (x1_3 / x1_1) * x1_1,
        x2_3 - (x1_3 / x1_1) * x2_1,
        x3_3 - (x1_3 / x1_1) * x3_1,
        sol_3 - (x1_3 / x1_1) * sol_1,
      ],
    ]);

    setM21(x1_2 / x1_1);
    setM31(x1_3 / x1_1);
  }, [x1_1, x2_1, x3_1, x1_2, x2_2, x3_2, x1_3, x2_3, x3_3, sol_1, sol_2, sol_3]);

  //   const gaussElimination = () => {
  //     let n = matrix.length;
  //     let x = new Array(n);

  //     for (let i = 0; i < n; i++)
  //       for (let j = 0; j < n; j++)
  //         if (j !== i) {
  //           let ratio = matrix[j][i] / matrix[i][i];
  //           for (let k = 0; k < n + 1; k++) matrix[j][k] = matrix[j][k] - ratio * matrix[i][k];
  //         }

  //     for (let i = 0; i < n; i++) x[i] = matrix[i][n] / matrix[i][i];

  //     console.table(x);
  //   };

  const gaussElimination = () => {};

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

    setMatrix([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  };

  return (
    <div className="page">
      <div className="center-title">Gauss Elimination Method</div>
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
        <CustomButton label="Calculate" onClick={gaussElimination} type="primary" />
        <CustomButton label="Clear" onClick={clear} type="secondary" />
      </div>
      {/* {showSolution && ( */}
      {1 && (
        <>
          <hr className="line-divider"></hr>
          <div ref={myRef} className="center-title" name="solution">
            Solution
          </div>
          <div className="solution-container">
            <Matrix matrix={matrix} withSolution={true} label="[A/B] = " />
            <div className="steps-container">
              <div className="inline-step rule">
                m<sub>rc</sub> = x<sub>rc</sub> / Pivot Element of R<sub>n</sub>
              </div>
              <div className="inline-step">
                m<sub>21</sub> = {x1_2} / {x1_1} = {x1_2 / x1_1}
              </div>
              <div className="inline-step">
                m<sub>31</sub> = {x1_3} / {x1_1} = {x1_3 / x1_1}
              </div>
            </div>
            <div className="steps-container">
              <div className="inline-step rule">
                R<sub>2</sub> - (m<sub>21</sub> * R<sub>1</sub>) = R<sub>2</sub>
              </div>
              <div className="inline-step">
                {x1_2} - ({x1_2 / x1_1} * {x1_1}) = {x1_2 - (x1_2 / x1_1) * x1_1}
              </div>
              <div className="inline-step">
                {x2_2} - ({x1_2 / x1_1} * {x2_1}) = {x2_2 - (x1_2 / x1_1) * x2_1}
              </div>
              <div className="inline-step">
                {x3_2} - ({x1_2 / x1_1} * {x3_1}) = {x3_2 - (x1_2 / x1_1) * x3_1}
              </div>
              <div className="inline-step">
                {sol_2} - ({x1_2 / x1_1} * {sol_1}) = {sol_2 - (x1_2 / x1_1) * sol_1}
              </div>
            </div>
            <div className="steps-container">
              <div className="inline-step rule">
                R<sub>3</sub> - (m<sub>31</sub> * R<sub>1</sub>) = R<sub>3</sub>
              </div>
              <div className="inline-step">
                {x1_3} - ({x1_3 / x1_1} * {x1_1}) = {x1_3 - (x1_3 / x1_1) * x1_1}
              </div>
              <div className="inline-step">
                {x2_3} - ({x1_3 / x1_1} * {x2_1}) = {x2_3 - (x1_3 / x1_1) * x2_1}
              </div>
              <div className="inline-step">
                {x3_3} - ({x1_3 / x1_1} * {x3_1}) = {x3_3 - (x1_3 / x1_1) * x3_1}
              </div>
              <div className="inline-step">
                {sol_3} - ({x1_3 / x1_1} * {sol_1}) = {sol_3 - (x1_3 / x1_1) * sol_1}
              </div>
            </div>
            <Matrix matrix={matrix_2} withSolution={true} label="[A/B] = " />
            <div className="steps-container">
              <div className="inline-step">
                {/* m<sub>32</sub> = {matrix_2[3][2]} / {matrix_2[2][2]} = {matrix_2[3][2] / matrix_2[2][2]} */}
              </div>
            </div>
          </div>
        </>
      )}
      <hr className="line-divider"></hr>
      <div className="center-title">Examples</div>
      <div className="examples-container">
        <SelectMenu examples={examples} type="examples" />
      </div>
    </div>
  );
};

export default GaussElimination;
