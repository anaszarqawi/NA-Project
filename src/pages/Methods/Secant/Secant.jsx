import React from 'react';
import './style.scss';
import { secant } from '../Methods';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SelectMenu from '../../components/SelectMenu/SelectMenu';

// import mathjs
// load math.js (using node.js)
import { create, all } from 'mathjs';
import { useRef } from 'react';

const Secant = () => {
  const config = {};
  const math = create(all, config);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [fx, setFx] = React.useState(null);
  const [xa, setXa] = React.useState(null);
  const [xb, setXb] = React.useState(null);
  const [es, setEs] = React.useState(null);
  const [it, setIt] = React.useState(null);

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [errorMsg, setErrorMsg] = React.useState('');

  const examples = [
    {
      fx: '0.95x^3 - 5.9x^2 + 10.9x - 6',
      xa: 2.5,
      xb: 3.5,
      conditionType: 'es',
      es: 0.5,
    },
    {
      fx: '2x^3 - 11.7x^2 + 17.7x - 5',
      xa: 3,
      xb: 4,
      conditionType: 'es',
      es: 0.5,
    },
    {
      fx: 'x^4 - 3x^2 + 1.5x -3',
      xa: 1.5,
      xb: 2,
      conditionType: 'es',
      es: 0.01,
    },
    {
      fx: '-1 + 5.5x - 4x^2 + 0.5x^3',
      xa: 1.5,
      xb: 2,
      conditionType: 'es',
      es: 0.2,
    },
    {
      fx: '-x^3 + 7.89x + 11',
      xa: 3,
      xb: 5,
      conditionType: 'es',
      es: 0.1,
    },
    {
      fx: '-x^3 + 7.89x + 11',
      xa: 3,
      xb: 5,
      conditionType: 'es',
      es: 0.1,
    },
    {
      fx: 'x^3 - 6x^2 + 11x - 6.1',
      xa: 0,
      xb: 0.5,
      conditionType: 'es',
      es: 0.5,
    },
    {
      fx: 'x^7 - 1.5x^2 + 7x - 6',
      xa: 0,
      xb: 0.5,
      conditionType: 'es',
      es: 0.1,
    },
  ];

  const setExample = (example) => {
    setFx(example.fx);
    setXa(example.xa);
    setXb(example.xb);
    setEs(example.es);
    setIt(example.it);
    setConditionType(example.conditionType);

    const result = secant(example.fx, example.xa, example.xb, example.es, example.it, example.conditionType);

    if (result.error) {
      setErrorMsg(result.error);
      setShowSolution(false);
      return;
    }
    setErrorMsg('');
    setShowSolution(true);
    setData(result);
  };

  const calculate = () => {
    let error = false;

    if (fx === null) {
      setErrorMsg('Please enter a function');
      setShowSolution(false);
      error = true;
    }
    if (xa === null) {
      setErrorMsg('Please enter a value for X-1');
      setShowSolution(false);
      error = true;
    }
    if (xb === null) {
      setErrorMsg('Please enter a value for X0');
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

    const result = secant(fx, xa, xb, es, it, conditionType);

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
    setXa('');
    setXb('');
    setEs('');
    setIt('');
    setConditionType('es');
    setShowSolution(false);
    setErrorMsg('');
  };

  return (
    <div className="page">
      <div className="center-title">Secant Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="F(x)" type="text" placeholder="Mathematical Function" value={fx} onChange={setFx} />
        </div>
        <div className="variables-inline">
          <CustomInput label="X" sub="a" type="number" placeholder="eXtreme node" value={xa} onChange={setXa} />
          <CustomInput label="X" sub="b" type="number" placeholder="eXtreme node" value={xb} onChange={setXb} />
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
                <th>
                  X<sub>i-1</sub>
                </th>
                <th>
                  f(x<sub>i-1</sub>)
                </th>
                <th>
                  x<sub>i</sub>
                </th>
                <th>
                  f(x<sub>i</sub>)
                </th>
                <th>Ea%</th>
              </tr>

              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.i}</td>
                    <td>{item.xa}</td>
                    <td>{item.fxa}</td>
                    <td>{item.xb}</td>
                    <td>{item.fxb}</td>
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
        <SelectMenu examples={examples} type="examples" setter={setExample} />
      </div>
    </div>
  );
};

export default Secant;
