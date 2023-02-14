import React from 'react';
import './style.scss';
import { bisection } from '../Methods';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SelectMenu from '../../components/SelectMenu/SelectMenu';

// import mathjs
// load math.js (using node.js)
import { create, all } from 'mathjs';
import { useRef } from 'react';

const Bisection = () => {
  const config = {};
  const math = create(all, config);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [fx, setFx] = React.useState(null);
  const [xl, setXl] = React.useState(null);
  const [xu, setXu] = React.useState(null);
  const [es, setEs] = React.useState(null);
  const [it, setIt] = React.useState(null);

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [errorMsg, setErrorMsg] = React.useState('');

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
      fx: 'x^3 - 8',
      xl: -10,
      xu: 10,
      conditionType: 'es',
      es: 5,
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

  const calculate = () => {
    let error = false;

    if (fx === null) {
      setErrorMsg('Please enter a function');
      setShowSolution(false);
      error = true;
    }
    if (xl === null) {
      setErrorMsg('Please enter a value for Xl');
      setShowSolution(false);
      error = true;
    }
    if (xu === null) {
      setErrorMsg('Please enter a value for Xu');
      setShowSolution(false);
      error = true;
    }
    if (es === 0 && conditionType === 'es') {
      setErrorMsg('Please enter a value for Es');
      setShowSolution(false);
      error = true;
    }
    if (it === 0 && conditionType === 'it') {
      setErrorMsg('Please enter a value for Maximum Iterations');
      setShowSolution(false);
      error = true;
    }
    if (error) {
      return;
    }

    console.log(fx, xl, xu, es, it, conditionType);

    const result = bisection(fx, xl, xu, es, it, conditionType);

    if (result.error) {
      setErrorMsg(result.error);
      setShowSolution(false);
      return;
    }
    setErrorMsg('');
    setShowSolution(true);
    setData(result);
  };

  const clear = () => {
    setFx('');
    setXl('');
    setXu('');
    setEs('');
    setIt('');
    setConditionType('es');
    setShowSolution(false);
    setErrorMsg('');
  };

  return (
    <div className="page">
      <div className="center-title">Bisection Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="F(x)" type="text" placeholder="Mathematical Function" value={fx} onChange={setFx} />
        </div>
        <div className="variables-inline">
          <CustomInput label="X" sub="l" type="number" placeholder="eXtreme Lower" value={xl} onChange={setXl} />
          <CustomInput label="X" sub="u" type="number" placeholder="eXtreme Upper" value={xu} onChange={setXu} />
        </div>
        <div className="variables-block">
          <div className="variables-title">Condition</div>
          <CustomInput
            label="ES"
            type="number"
            placeholder="Error Sum %"
            onChange={setEs}
            value={es}
            options={[
              { label: '=', value: '=' },
              { label: '<', value: '<' },
              { label: '>', value: '>' },
              { label: '<=', value: '<=' },
              { label: '>=', value: '>=' },
            ]}
            withCheckbox={true}
            name="es"
            onClick={setConditionType}
            condition={conditionType}
          />
          <CustomInput
            label="MAXi"
            type="number"
            placeholder="Max Iteration"
            withCheckbox={true}
            value={it}
            onChange={setIt}
            name="it"
            onClick={setConditionType}
            condition={conditionType}
          />
        </div>
      </div>
      {errorMsg !== '' && <div className="error-msg">{errorMsg}</div>}
      <div className="buttons-container">
        <CustomButton label="Calculate" onClick={calculate} type="primary" />
        <CustomButton label="Clear" onClick={clear} type="secondary" />
      </div>
      {showSolution && (
        <>
          <hr className="line-divider"></hr>
          <div ref={myRef} className="center-title" name="solution">
            Solution
          </div>
          <div className="solution-table-container">
            <table className="solution-table">
              <tr>
                <th>i</th>
                <th>Xl</th>
                <th>f(xl)</th>
                <th>Xr</th>
                <th>f(xr)</th>
                <th>Xu</th>
                <th>f(xu)</th>
                <th>Ea</th>
              </tr>

              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.i}</td>
                    <td>{item.xl}</td>
                    <td>{item.fxl}</td>
                    <td className="xr">{item.xr}</td>
                    <td>{item.fxr}</td>
                    <td>{item.xu}</td>
                    <td>{item.fxu}</td>
                    <td>{item.ea}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      )}
      <hr className="line-divider"></hr>
      <div className="center-title">Examples</div>
      <div className="examples-container">
        <SelectMenu
          examples={examples}
          type="examples"
          setFx={setFx}
          setXl={setXl}
          setXu={setXu}
          setConditionType={setConditionType}
          setEs={setEs}
          setIt={setIt}
          setShowSolution={setShowSolution}
          setErrorMsg={setErrorMsg}
          setData={setData}
          scrollToRef={executeScroll}
        />
      </div>
    </div>
  );
};

export default Bisection;
