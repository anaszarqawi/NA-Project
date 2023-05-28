import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Components
import CustomTable from '../../components/CustomTable';
import ExamplesAndSaved from '../../components/ExamplesAndSaved';
import MethodButtons from '../../components/MethodButtons';
import Input from '../../components/Input';
import FadeChildren from '../../components/FadeChildren';

// Context
import { useX } from '../../context/xContext';

// Styles
import Styles from '../../styles/containers.module.scss';

const SimpleFixedPoint = () => {
  const router = useRouter();
  const { calculate, currentExample, setCurrentExample, examples } = useX();
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);
  const methodName = 'Newton';
  const formRef = React.useRef(null);

  const validationData = ({ fx, x0, condition }) => {
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

    if ((condition?.type === 'es' && condition?.value === '') || !condition)
      return {
        status: false,
        error: 'Please enter a value for Es',
      };

    if ((condition?.type === 'it' && condition?.value === '') || !condition)
      return {
        status: false,
        error: 'Please enter a value for Maximum Iterations',
      };

    return {
      status: true,
    };
  };

  const handleCalculate = ({ e, operation, example }) => {
    e && e.preventDefault();

    const values = e
      ? {
          fx: e.target.fx.value,
          x0: +e.target.x0.value,
          condition: {
            type: e.target.conditionType.value,
            value: e.target.conditionType.value === 'es' ? +e.target.es.value : +e.target.it.value,
          },
        }
      : !example
      ? {
          fx: formRef.current.fx.value,
          x0: +formRef.current.x0.value,
          condition: {
            type: formRef.current.conditionType.value,
            value: formRef.current.conditionType.value === 'es' ? +formRef.current.es.value : +formRef.current.it.value,
          },
        }
      : example;

    example && setCurrentExample(values);

    if (operation !== 'save' && operation !== 'calculateFromQuery' && validationData(values).status) {
      router.query = { operation: 'calculateQuery', ...values, condition: JSON.stringify(values.condition) };
      router.push(router);
    }

    calculate({
      name: methodName,
      values,
      validationData,
      setShowSolution,
      operation,
      setData,
    });
  };

  React.useEffect(() => {
    if (router.query.operation === 'calculateQuery' && formRef.current.fx.value === '') {
      const values = {
        fx: router.query.fx && router.query.fx,
        x0: router.query.x0 && +router.query.x0,
        condition: router.query?.condition && JSON.parse(router.query.condition),
      };

      setCurrentExample(values);

      calculate({
        name: methodName,
        values,
        validationData,
        setShowSolution,
        operation: 'calculateFromQuery',
        setData,
      });
    }
  }, [router.query]);

  const handleReset = (e) => {
    setCurrentExample(null);
    setShowSolution(false);
    setData(null);
    router.query = {};
    router.push(router);
    e.target.reset();
  };

  return (
    <>
      <Head>
        <title>Newton Method</title>
      </Head>
      <div className="page">
        <div className="center-title">Newton Method</div>
        <form
          ref={formRef}
          className={Styles.flexColumnFullWidth}
          onSubmit={(e) => handleCalculate({ e, operation: 'calculate' })}
          onReset={handleReset}>
          <FadeChildren>
            <div className={Styles.inputs_Container}>
              <div className="inputs-title">Variables</div>
              <Input
                name="fx"
                label="f(x)"
                type="text"
                placeholder="Mathematical Function"
                defaultValue={currentExample?.fx}
              />
              <Input
                name="x0"
                label="X"
                sub="0"
                type="number"
                placeholder="eXtreme node"
                defaultValue={currentExample?.x0}
              />
            </div>
            <div className={Styles.inputs_Container}>
              <div className="inputs-title">Condition</div>
              <Input
                name="conditionType"
                type="radio&input"
                inputType="number"
                options={[
                  {
                    label: 'ES',
                    value: 'es',
                    checked: currentExample?.condition?.type === 'es',
                    placeholder: 'Error Sum %',
                    defaultValue: currentExample?.condition?.type === 'es' ? currentExample?.condition?.value : '',
                  },
                  {
                    label: 'MAXi',
                    value: 'it',
                    checked: currentExample?.condition?.type === 'it',
                    placeholder: 'Max Iteration',
                    defaultValue: currentExample?.condition?.type === 'it' ? currentExample?.condition?.value : '',
                  },
                ]}
              />
            </div>
            <MethodButtons method={methodName} calculate={handleCalculate} />
          </FadeChildren>
        </form>
        {showSolution && (
          <FadeChildren>
            <hr className="line-divider"></hr>
            <div className="center-title" name="solution">
              Solution
            </div>
            <div className="solution-table-container">
              <CustomTable
                headers={[
                  { name: 'i' },
                  { name: 'X', sub: 'i' },
                  { name: 'f(xi)' },
                  { name: "f'(xi)" },
                  { name: 'Ea' },
                ]}
                data={data}
                priority={['i', 'xi', 'fxi', 'dfxi', 'ea']}
                highlight="xi"
              />
            </div>
          </FadeChildren>
        )}
        <ExamplesAndSaved method={methodName} examples={examples.newton} setter={handleCalculate} />
      </div>
    </>
  );
};

export default SimpleFixedPoint;
