import React from 'react';
import './style.scss';
import { newton } from '../Methods';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SelectMenu from '../../components/SelectMenu/SelectMenu';

// import mathjs
// load math.js (using node.js)
import { create, all } from 'mathjs';
import { useRef } from 'react';

const Newton = () => {
  const config = {};
  const math = create(all, config);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [fx, setFx] = React.useState(null);
  const [xo, setXo] = React.useState(null);
  const [es, setEs] = React.useState(null);
  const [it, setIt] = React.useState(null);

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [errorMsg, setErrorMsg] = React.useState('');

  const examples = [
    {
      fx: '-0.9x^2 + 1.7x + 2.5',
      xo: 5,
      es: 0.7,
      conditionType: 'es',
    },
    {
      fx: '(-x)^2 + 1.8x + 2.5',
      xo: 5,
      it: 5,
      conditionType: 'it',
    },
  ];

  const calculate = () => {
    let error = false;

    if (fx === null) {
      setErrorMsg('Please enter a function');
      setShowSolution(false);
      error = true;
    }
    if (xo === null) {
      setErrorMsg('Please enter a value for Xo');
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

    console.log(fx, xo, es, it, conditionType);

    const result = newton(fx, xo, es, it, conditionType);

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
    setXo('');
    setEs('');
    setIt('');
    setConditionType('es');
    setShowSolution(false);
    setErrorMsg('');
  };

  const setExample = (example) => {
    setFx(example.fx);
    setXo(example.xo);
    setEs(example.es);
    setIt(example.it);
    setConditionType(example.conditionType);

    const result = newton(example.fx, example.xo, example.es, example.it, example.conditionType);

    if (result.error) {
      setErrorMsg(result.error);
      setShowSolution(false);
      return;
    }
    setErrorMsg('');
    setShowSolution(true);
    setData(result);
  };

  return (
    <div className="page">
      <div className="center-title">Newton Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="F(x)" type="text" placeholder="Mathematical Function" value={fx} onChange={setFx} />
        </div>
        <div className="variables-inline">
          <CustomInput label="X" sub="o" type="number" placeholder="eXtreme node" value={xo} onChange={setXo} />
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
                <th>xi</th>
                <th>f(xi)</th>
                <th>f'(xi)</th>
                <th>Ea</th>
              </tr>

              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.i}</td>
                    <td className="xr">{item.xi}</td>
                    <td>{item.fxi}</td>
                    <td>{item.dfxi}</td>
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

export default Newton;
