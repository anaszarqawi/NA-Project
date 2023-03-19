import React from 'react';
import './style.scss';
import { simpleFixedPoint } from '../Methods';

import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import SelectMenu from '../../components/SelectMenu/SelectMenu';
import CustomTable from '../components/CustomTable/CustomTable';
import ExamplesAndSaved from '../components/ExamplesAndSaved/ExamplesAndSaved';

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

  const { addToSaved } = useX();
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [fx, setFx] = React.useState(null);
  const [xo, setXo] = React.useState(null);
  const [es, setEs] = React.useState(null);
  const [it, setIt] = React.useState(null);

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [isSaved, setIsSaved] = React.useState(false);

  const [errorMsg, setErrorMsg] = React.useState('');

  const examples = [
    {
      fx: 'sqrt(1.9x + 2.8)',
      xo: 5,
      conditionType: 'es',
      es: 0.7,
    },
  ];

  const calculate = (toAddToSaved) => {
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

    if (toAddToSaved) {
      addToSaved('fixedPoint', {
        fx,
        xo,
        es,
        it,
        conditionType,
      });
      setIsSaved(true);
      setInterval(() => {
        setIsSaved(false);
      }, 2000);
      return;
    }

    console.log(fx, xo, es, it, conditionType);

    const result = simpleFixedPoint(fx, xo, es, it, conditionType);

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

    const result = simpleFixedPoint(example.fx, example.xo, example.es, example.it, example.conditionType);

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
      <div className="center-title">Simple Fixed Point Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="SFP" type="text" placeholder="Simple Fixed Point" value={fx} onChange={setFx} />
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
        <CustomButton label="Clear" onClick={clear} type="secondary" />
        <CustomButton label={isSaved ? 'Saved!' : 'Save'} onClick={() => calculate(true)} type="secondary" />
        <CustomButton label="Calculate" onClick={calculate} type="primary" />
      </div>
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
      <ExamplesAndSaved method="fixedPoint" examples={examples} setter={setExample} />
    </div>
  );
};

export default SimpleFixedPoint;
