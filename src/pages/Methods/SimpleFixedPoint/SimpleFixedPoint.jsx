import React from 'react';
import './style.scss';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomTable from '../components/CustomTable/CustomTable';
import ExamplesAndSaved from '../components/ExamplesAndSaved/ExamplesAndSaved';
import MethodButtons from '../components/MethodButtons/MethodButtons';

// import mathjs
// load math.js (using node.js)
import { create, all } from 'mathjs';
import { useRef } from 'react';
import { useX } from '../../../context/xContext';

const SimpleFixedPoint = () => {
  React.useEffect(() => {
    document.title = 'Simple Fixed Point Method';
  }, []);

  const config = {};
  const math = create(all, config);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [fx, setFx] = React.useState(null);
  const [x0, setX0] = React.useState(null);
  const [es, setEs] = React.useState(null);
  const [it, setIt] = React.useState(null);

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [values, SetValues] = React.useState({});
  const methodName = 'Simple Fixed Point';

  const [errorMsg, setErrorMsg] = React.useState('');

  const { calculate } = useX();

  const examples = [
    {
      fx: 'sqrt(1.9x + 2.8)',
      x0: 5,
      conditionType: 'es',
      es: 0.7,
    },
  ];
  React.useEffect(() => {
    SetValues({
      fx,
      x0,
      es,
      it,
      conditionType,
    });
  }, [fx, x0, es, it, conditionType]);

  const validationData = () => {
    if (fx === '') {
      return {
        status: false,
        error: 'Please enter a function',
      };
    }
    if (x0 === '') {
      return {
        status: false,
        error: 'Please enter a value for X0',
      };
    }
    if (es === 0 && conditionType === 'es') {
      return {
        status: false,
        error: 'Please enter a value for Es',
      };
    }
    if (it === 0 && conditionType === 'it') {
      return {
        status: false,
        error: 'Please enter a value for Maximum Iterations',
      };
    }

    return {
      status: true,
    };
  };

  const handleCalculate = (operation, example) => {
    if (example) {
      setFx(example.fx);
      setX0(example.x0);
      setEs(example.es);
      setIt(example.it);
      setConditionType(example.conditionType);
    }

    calculate({
      name: methodName,
      values,
      example,
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
    setX0('');
    setEs('');
    setIt('');
    setConditionType('es');
    setShowSolution(false);
    setErrorMsg('');
  };

  return (
    <div className="page">
      <div className="center-title">Simple Fixed Point Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="SFP" type="text" placeholder="Simple Fixed Point" value={fx} onChange={setFx} />
        </div>
        <div className="variables-inline">
          <CustomInput label="X" sub="0" type="number" placeholder="eXtreme node" value={x0} onChange={setX0} />
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
              headers={[{ name: 'i' }, { name: 'X', sub: 'i' }, { name: 'f(xi)' }, { name: 'Ea' }]}
              data={data}
              priority={['i', 'xi', 'fxi', 'ea']}
              highlight="xi"
            />
          </div>
        </>
      )}
      <ExamplesAndSaved method={methodName} examples={examples} setter={handleCalculate} />
    </div>
  );
};

export default SimpleFixedPoint;
