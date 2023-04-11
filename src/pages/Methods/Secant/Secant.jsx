import React from 'react';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomTable from '../components/CustomTable/CustomTable';
import MethodButtons from '../components/MethodButtons/MethodButtons';
import ExamplesAndSaved from '../components/ExamplesAndSaved/ExamplesAndSaved';

import { useRef } from 'react';
import { useX } from '../../../context/xContext';

const Secant = () => {
  React.useEffect(() => {
    document.title = 'Secant Method';
  }, []);

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
  const [values, SetValues] = React.useState({});
  const methodName = 'Secant';

  const [errorMsg, setErrorMsg] = React.useState('');
  const { calculate } = useX();

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

  const validationData = () => {
    if (fx === '')
      return {
        status: false,
        error: 'Please enter a function',
      };

    if (xa === '')
      return {
        status: false,
        error: 'Please enter a value for Xa',
      };

    if (xb === '')
      return {
        status: false,
        error: 'Please enter a value for Xb',
      };

    if (es === 0 && conditionType === 'es')
      return {
        status: false,
        error: 'Please enter a value for Es',
      };

    if (it === 0 && conditionType === 'it')
      return {
        status: false,
        error: 'Please enter a value for Maximum Iterations',
      };

    return {
      status: true,
    };
  };

  React.useEffect(() => {
    SetValues({
      fx,
      xa,
      xb,
      es,
      it,
      conditionType,
    });
  }, [fx, xa, xb, es, it, conditionType]);

  const handleCalculate = (operation, example) => {
    if (example) {
      setFx(example.fx);
      setXa(example.xa);
      setXb(example.xb);
      setEs(example.es);
      setIt(example.it);
      setConditionType(example.conditionType);
    }

    calculate({
      name: methodName,
      values: operation === 'setExample' ? example : values,
      validationData,
      setShowSolution,
      setErrorMsg,
      operation,
      setData,
      executeScroll,
    });
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
      <MethodButtons method={methodName} calculate={handleCalculate} clear={clear} />
      {showSolution && (
        <>
          <hr className="line-divider"></hr>
          <div ref={myRef} className="center-title" name="solution">
            Solution
          </div>
          <div className="solution-table-container">
            <CustomTable
              headers={[
                { name: 'i' },
                { name: 'X', sub: 'i-1' },
                { name: 'f(xi-1)' },
                { name: 'X', sub: 'i' },
                { name: 'f(xi)' },
                { name: 'ea' },
              ]}
              data={data}
              priority={['i', 'xa', 'fxa', 'xb', 'fxb', 'ea']}
              highlight="xb"
            />
          </div>
        </>
      )}
      <ExamplesAndSaved method={methodName} examples={examples} setter={handleCalculate} />
    </div>
  );
};

export default Secant;
