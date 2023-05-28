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

const Bisection = () => {
  const router = useRouter();
  const { calculate, currentExample, setCurrentExample, examples } = useX();
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);
  const methodName = 'Secant';
  const formRef = React.useRef(null);

  const validationData = ({ fx, xl, xu, condition }) => {
    if (fx === '') return { status: false, error: 'Please enter a function' };

    if (xl === '' && xl === NaN) return { status: false, error: 'Please enter a value for Xl' };

    if (xu === '' && xu === NaN) return { status: false, error: 'Please enter a value for Xu' };

    if ((condition?.type === 'es' && (condition?.value === '' || condition?.value === NaN)) || !condition)
      return {
        status: false,
        error: 'Please enter a value for Es',
      };

    if ((condition?.type === 'it' && (condition?.value === '' || condition?.value === NaN)) || !condition)
      return {
        status: false,
        error: 'Please enter a value for Maximum Iterations',
      };

    if (+xl >= +xu) return { status: false, error: 'Xl must be less than Xu' };

    return {
      status: true,
    };
  };

  const handleCalculate = ({ e, operation, example }) => {
    e && e.preventDefault();

    const values = e
      ? {
          fx: e.target.fx.value,
          x_1: +e.target.x_1.value,
          x0: +e.target.x0.value,
          condition: {
            type: e.target.conditionType.value,
            value: e.target.conditionType.value === 'es' ? +e.target.es.value : +e.target.it.value,
          },
        }
      : !example
      ? {
          fx: formRef.current.fx.value,
          x_1: +formRef.current.x_1.value,
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
        fx: router?.query?.fx,
        x_1: +router?.query?.x_1,
        x0: +router?.query?.x0,
        condition: router?.query?.condition && JSON.parse(router.query.condition),
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
        <title>Secant Method</title>
      </Head>
      <div className="page">
        <div className="center-title">Secant Method</div>
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
                label="F(x)"
                type="text"
                placeholder="Mathematical Function"
                defaultValue={currentExample?.fx}
              />
              <div className={Styles.flex_Row}>
                <Input
                  name="x_1"
                  label="X"
                  sub="-1"
                  type="number"
                  placeholder="X-1"
                  defaultValue={currentExample?.x_1}
                />
                <Input name="x0" label="X" sub="0" type="number" placeholder="X0" defaultValue={currentExample?.x0} />
              </div>
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
              priority={['i', 'x_1', 'fxa', 'x0', 'fxb', 'ea']}
              highlight="x0"
            />
          </FadeChildren>
        )}
        <ExamplesAndSaved method={methodName} examples={examples.secant} setter={handleCalculate} />
      </div>
    </>
  );
};

export default Bisection;
