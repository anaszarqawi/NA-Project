import React from 'react';

import { useX } from '../../context/xContext';

import Input from '../../components/Input';
import MethodButtons from '../../components/MethodButtons';
import Styles from '../../styles/containers.module.scss';
import ExamplesAndSaved from '../../components/ExamplesAndSaved';

import { useRouter } from 'next/router';
import Head from 'next/head';
import GaussJordan_steps from '../../components/gaussJordan_steps';
import MatrixInputs from '../../components/MatrixInputs';
import FadeChildren from '../../components/FadeChildren';

const GaussJordan = () => {
  const formRef = React.useRef(null);
  const router = useRouter();

  const { calculate, currentExample, setCurrentExample, examples } = useX();

  const [showSolution, setShowSolution] = React.useState(false);
  const [solution, setSolution] = React.useState([]);

  const methodName = 'Gauss Jordan';

  const validationData = ([eq1, eq2, eq3]) => {
    if (eq1[0] == 0 && eq1[1] == 0 && eq1[2] == 0) return { status: false, error: 'Please enter the first Equation' };
    if (eq2[0] == 0 && eq2[1] == 0 && eq2[2] == 0) return { status: false, error: 'Please enter the second Equation' };
    if (eq3[0] == 0 && eq3[1] == 0 && eq3[2] == 0) return { status: false, error: 'Please enter the third Equation' };
    if (eq1[3] == 0) return { status: false, error: 'Please enter the solution of the first Equation' };
    if (eq2[3] == 0) return { status: false, error: 'Please enter the solution of the second Equation' };
    if (eq3[3] == 0) return { status: false, error: 'Please enter the solution of the third Equation' };

    return { status: true };
  };

  const handleCalculate = ({ e, operation, example }) => {
    e && e.preventDefault();

    const values = e
      ? {
          matrix: [
            [e.target.x1_1.value, e.target.x2_1.value, e.target.x3_1.value, e.target.sol_1.value],
            [e.target.x1_2.value, e.target.x2_2.value, e.target.x3_2.value, e.target.sol_2.value],
            [e.target.x1_3.value, e.target.x2_3.value, e.target.x3_3.value, e.target.sol_3.value],
          ],
          withPP: e.target.withPP.checked,
        }
      : !example
      ? {
          matrix: [
            [
              formRef.current.x1_1.value,
              formRef.current.x2_1.value,
              formRef.current.x3_1.value,
              formRef.current.sol_1.value,
            ],
            [
              formRef.current.x1_2.value,
              formRef.current.x2_2.value,
              formRef.current.x3_2.value,
              formRef.current.sol_2.value,
            ],
            [
              formRef.current.x1_3.value,
              formRef.current.x2_3.value,
              formRef.current.x3_3.value,
              formRef.current.sol_3.value,
            ],
          ],
          withPP: formRef.current.withPP.checked,
        }
      : { matrix: example, withPP: false };

    example && setCurrentExample(values);

    if (operation !== 'save' && operation !== 'calculateFromQuery' && validationData(values.matrix).status) {
      router.query = {
        ...router.query,
        operation: 'calculateQuery',
        x1_1: values.matrix[0][0],
        x2_1: values.matrix[0][1],
        x3_1: values.matrix[0][2],
        sol_1: values.matrix[0][3],
        x1_2: values.matrix[1][0],
        x2_2: values.matrix[1][1],
        x3_2: values.matrix[1][2],
        sol_2: values.matrix[1][3],
        x1_3: values.matrix[2][0],
        x2_3: values.matrix[2][1],
        x3_3: values.matrix[2][2],
        sol_3: values.matrix[2][3],
        withPP: values.withPP,
      };
      router.push(router);
    }

    calculate({
      name: methodName,
      values,
      validationData,
      setShowSolution,
      operation,
      setData: setSolution,
    });
  };

  React.useEffect(() => {
    if (router.query.operation === 'calculateQuery' && formRef.current.sol_1.value === '') {
      const values = {
        matrix: [
          [+router.query.x1_1, +router.query.x2_1, +router.query.x3_1, +router.query.sol_1],
          [+router.query.x1_2, +router.query.x2_2, +router.query.x3_2, +router.query.sol_2],
          [+router.query.x1_3, +router.query.x2_3, +router.query.x3_3, +router.query.sol_3],
        ],
        withPP: !router.query.withPP ? false : router.query.withPP === 'true' ? true : false,
      };

      setCurrentExample(values);

      calculate({
        name: methodName,
        values,
        validationData,
        setShowSolution,
        operation: 'calculateFromQuery',
        setData: setSolution,
      });
    }
  }, [router.query]);

  const handleReset = (e) => {
    setCurrentExample(null);
    setShowSolution(false);
    setSolution(null);
    router.query = {};
    router.push(router);
    e.target.reset();
    console.clear();
  };

  return (
    <>
      <Head>
        <title>{methodName}</title>
      </Head>
      <div className="page">
        <FadeChildren>
          <div className="center-title">{methodName} Method</div>
        </FadeChildren>
        <form
          ref={formRef}
          className={Styles.flexColumnFullWidth}
          onSubmit={(e) => handleCalculate({ e, operation: 'calculate' })}
          onReset={handleReset}>
          <FadeChildren>
            <div className={Styles.inputs_Container}>
              <div className="inputs-title">Variables</div>
              <MatrixInputs withPP={true} />
            </div>
            <MethodButtons method={methodName} calculate={handleCalculate} />
          </FadeChildren>
        </form>
        {showSolution && solution && (
          <FadeChildren>
            <hr className="line-divider"></hr>
            <div className="center-title" name="solution">
              Solution
            </div>
            <div className={Styles.flexColumnFullWidthStart}>
              <GaussJordan_steps solution={solution} />
            </div>
          </FadeChildren>
        )}
        <ExamplesAndSaved method={methodName} examples={examples.matrices} setter={handleCalculate} />
      </div>
    </>
  );
};

export default GaussJordan;
