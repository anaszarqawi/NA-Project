import React from 'react';
// import { useSearchParams } from 'react-router-dom';
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

const Bisection = () => {
  React.useEffect(() => {
    document.title = 'Bisection Method';
  }, []);

  const config = {};
  const math = create(all, config);

  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const { calculate } = useX();
  // const [searchParams, setSearchParams] = useSearchParams();

  const [fx, setFx] = React.useState('');
  const [xl, setXl] = React.useState('');
  const [xu, setXu] = React.useState('');
  const [es, setEs] = React.useState('');
  const [it, setIt] = React.useState('');

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [values, setValues] = React.useState({});
  const methodName = 'Bisection';

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
      fx: 'x^3 - 4x^2 - 8x - 1',
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
    setValues({
      fx,
      xl: xl,
      xu: xu,
      es: es,
      it: it,
      conditionType,
    });
    // setSearchParams({ fx, xl, xu, es, it, conditionType });
  }, [fx, xl, xu, es, it, conditionType]);

  // React.useEffect(() => {
  //   if (searchParams.get('fx')) {
  //     setFx(searchParams.get('fx'));
  //     setXl(searchParams.get('xl'));
  //     setXu(searchParams.get('xu'));
  //     setEs(searchParams.get('es'));
  //     setIt(searchParams.get('it'));
  //     setConditionType(searchParams.get('conditionType'));

  //     React.lazy(() => handleCalculate());
  //     //
  //   }
  // }, []);

  const validationData = () => {
    console.log({ validation: { fx, xl, xu, es, it, conditionType } });

    if (fx === '')
      return {
        status: false,
        error: 'Please enter a function',
      };

    if (xl === '')
      return {
        status: false,
        error: 'Please enter a value for Xl',
      };

    if (xu === '')
      return {
        status: false,
        error: 'Please enter a value for Xu',
      };

    if ((es === '' || es === null || es === undefined) && conditionType === 'es')
      return {
        status: false,
        error: 'Please enter a value for Es',
      };

    if ((it === '' || it === null || it === undefined) && conditionType === 'it')
      return {
        status: false,
        error: 'Please enter a value for Maximum Iterations',
      };

    if (+xl >= +xu)
      return {
        status: false,
        error: 'Xl must be less than Xu',
      };

    return {
      status: true,
    };
  };

  const handleCalculate = (operation, example) => {
    if (example) {
      setFx(example.fx);
      setXl(example.xl);
      setXu(example.xu);
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
    setXl('');
    setXu('');
    setEs('');
    setFx('');
    setIt('');
    setConditionType('es');
    setShowSolution(false);
    setErrorMsg('');
    return;
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
          <CustomInput label="X" sub="l" type="text" placeholder="eXtreme Lower" value={xl} onChange={setXl} />
          <CustomInput label="X" sub="u" type="text" placeholder="eXtreme Upper" value={xu} onChange={setXu} />
        </div>
        <div className="variables-block">
          <div className="variables-title">Condition</div>
          <CustomInput
            label="ES"
            type="text"
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
            type="text"
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
      <MethodButtons method="Bisection" calculate={handleCalculate} clear={clear} />
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
                { name: 'X', sub: 'l' },
                { name: 'f(xl)' },
                { name: 'X', sub: 'r' },
                { name: 'f(xr)' },
                { name: 'X', sub: 'u' },
                { name: 'f(xu)' },
                { name: 'Ea' },
              ]}
              data={data}
              priority={['i', 'xl', 'fxl', 'xr', 'fxr', 'xu', 'fxu', 'ea']}
              highlight="xr"
            />
          </div>
        </>
      )}
      <ExamplesAndSaved method="Bisection" examples={examples} setter={handleCalculate} />
    </div>
  );
};

export default Bisection;
