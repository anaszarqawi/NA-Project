import React from 'react';

import { useX } from '../../context/xContext';

import Input from '../../components/Input';
import MethodButtons from '../../components/MethodButtons';
import Styles from '../../styles/containers.module.scss';
import ExamplesAndSaved from '../../components/ExamplesAndSaved';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Cramer_steps from '../../components/cramer_steps';

const Cramer = () => {
  const formRef = React.useRef(null);
  const router = useRouter();

  const { calculate, currentExample, setCurrentExample, examples } = useX();

  const [showSolution, setShowSolution] = React.useState(false);
  const [solution, setSolution] = React.useState([]);

  const methodName = 'Cramer';

  const validationData = ([eq1, eq2, eq3]) => {
    if (eq1[0] === 0 && eq1[1] === 0 && eq1[2] === 0)
      return { status: false, error: 'Please enter the first Equation' };
    if (eq2[0] === 0 && eq2[1] === 0 && eq2[2] === 0)
      return { status: false, error: 'Please enter the second Equation' };
    if (eq3[0] === 0 && eq3[1] === 0 && eq3[2] === 0)
      return { status: false, error: 'Please enter the third Equation' };
    if (eq1[3] === 0) return { status: false, error: 'Please enter the solution of the first Equation' };
    if (eq2[3] === 0) return { status: false, error: 'Please enter the solution of the second Equation' };
    if (eq3[3] === 0) return { status: false, error: 'Please enter the solution of the third Equation' };

    return { status: true };
  };

  const handleCalculate = ({ e, operation, example }) => {
    e && e.preventDefault();

    const values = e
      ? [
          [e.target.x1_1.value, e.target.x2_1.value, e.target.x3_1.value, e.target.sol_1.value],
          [e.target.x1_2.value, e.target.x2_2.value, e.target.x3_2.value, e.target.sol_2.value],
          [e.target.x1_3.value, e.target.x2_3.value, e.target.x3_3.value, e.target.sol_3.value],
        ]
      : !example
      ? [
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
        ]
      : example;

    example && setCurrentExample(values);

    console.log(operation);
    if (operation !== 'save' && operation !== 'calculateFromQuery' && validationData(values).status) {
      router.query = {
        ...router.query,
        operation: 'calculateQuery',
        x1_1: values[0][0],
        x2_1: values[0][1],
        x3_1: values[0][2],
        sol_1: values[0][3],
        x1_2: values[1][0],
        x2_2: values[1][1],
        x3_2: values[1][2],
        sol_2: values[1][3],
        x1_3: values[2][0],
        x2_3: values[2][1],
        x3_3: values[2][2],
        sol_3: values[2][3],
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
      const values = [
        [+router.query.x1_1, +router.query.x2_1, +router.query.x3_1, +router.query.sol_1],
        [+router.query.x1_2, +router.query.x2_2, +router.query.x3_2, +router.query.sol_2],
        [+router.query.x1_3, +router.query.x2_3, +router.query.x3_3, +router.query.sol_3],
      ];
      console.log(values);

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
  };

  return (
    <>
      <Head>
        <title>{methodName}</title>
      </Head>
      <div className="page">
        <div className="center-title">{methodName} Method</div>
        <form
          ref={formRef}
          className={Styles.flexColumnFullWidth}
          onSubmit={(e) => handleCalculate({ e, operation: 'calculate' })}
          onReset={handleReset}>
          <div className={Styles.inputs_Container}>
            <div className="inputs-title">Variables</div>
            <div className={Styles.flex_Row}>
              <Input
                type="text"
                name="x1_1"
                label="X"
                sub="1"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[0][0] : null}
              />
              <Input
                type="text"
                name="x2_1"
                label="X"
                sub="2"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[0][1] : null}
              />
              <Input
                type="text"
                name="x3_1"
                label="X"
                sub="3"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[0][2] : null}
              />
              <Input
                type="text"
                name="sol_1"
                label="="
                placeholder="Eq1 solution"
                defaultValue={currentExample ? currentExample[0][3] : null}
              />
            </div>
            <div className={Styles.flex_Row}>
              <Input
                type="text"
                name="x1_2"
                label="X"
                sub="1"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[1][0] : null}
              />
              <Input
                type="text"
                name="x2_2"
                label="X"
                sub="2"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[1][1] : null}
              />
              <Input
                type="text"
                name="x3_2"
                label="X"
                sub="3"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[1][2] : null}
              />
              <Input
                type="text"
                name="sol_2"
                label="="
                placeholder="Eq2 solution"
                defaultValue={currentExample ? currentExample[1][3] : null}
              />
            </div>
            <div className={Styles.flex_Row}>
              <Input
                type="text"
                name="x1_3"
                label="X"
                sub="1"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[2][0] : null}
              />
              <Input
                type="text"
                name="x2_3"
                label="X"
                sub="2"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[2][1] : null}
              />
              <Input
                type="text"
                name="x3_3"
                label="X"
                sub="3"
                labelPosition="inside-right"
                defaultValue={currentExample ? currentExample[2][2] : null}
              />
              <Input
                type="text"
                name="sol_3"
                label="="
                placeholder="Eq3 solution"
                defaultValue={currentExample ? currentExample[2][3] : null}
              />
            </div>
          </div>
          <MethodButtons method={methodName} calculate={handleCalculate} />
        </form>
        {showSolution && solution && (
          <>
            <hr className="line-divider"></hr>
            <div className="center-title" name="solution">
              Solution
            </div>
            <div className={Styles.flexColumnFullWidthStart}>
              <Cramer_steps solution={solution} />
            </div>
          </>
        )}
        <ExamplesAndSaved method={methodName} examples={examples.cramer} setter={handleCalculate} />
      </div>
    </>
  );
};

export default Cramer;
