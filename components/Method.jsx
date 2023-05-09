import React from 'react';

// Components
import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';
import CustomTable from '../CustomTable/CustomTable';
import ExamplesAndSaved from '../ExamplesAndSaved/ExamplesAndSaved';

// Context
import { useX } from '../../../../context/xContext';

// Functions
import { bisection, falsePosition, simpleFixedPoint, newton, secant } from '../../Methods';

const Method = (props) => {
  const { addToSaved } = useX();

  React.useEffect(() => {
    document.title = props.name + ' Method';
  }, []);

  const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const [showSolution, setShowSolution] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);
  const [data, setData] = React.useState([]);

  const matchMethod = (values) => {
    if (props.name === 'Bisection') return bisection(values);
    else if (props.name === 'False Position') return falsePosition(values);
    else if (props.name === 'Simple Fixed Point') return simpleFixedPoint(values);
    else if (props.name === 'Newton') return newton(values);
    else if (props.name === 'Secant') return secant(values);
  };

  const calculate = (operation, example) => {
    const isValidData = props.validationData();
    if (!isValidData.status) {
      setShowSolution(false);
      setErrorMsg(isValidData.error);
      return;
    }

    if (operation === 'addToSaved') {
      addToSaved(props.name.replace(/ /g, ''), props.values);
      setIsSaved(true);
      setInterval(() => {
        setIsSaved(false);
      }, 2000);
      return;
    }

    const result = operation === 'setExample' ? matchMethod(example) : matchMethod(props.values);

    if (result.error) {
      setErrorMsg(result.error);
      setShowSolution(false);
      return;
    }
    setErrorMsg('');
    setShowSolution(true);
    setData(result);
    executeScroll();
  };

  return (
    <div className="page">
      <div className="center-title">{props.name} Method</div>
      {props.variables}
      {errorMsg !== '' && <div className="error-msg">{errorMsg}</div>}
      <div className="buttons-container">
        <CustomButton label="Clear" onClick={props.clear} type="secondary" />
        <CustomButton label={isSaved ? 'Saved!' : 'Save'} onClick={() => calculate(true)} type="secondary" />
        <CustomButton label="Calculate" onClick={calculate} type="primary" />
      </div>
      {showSolution && (
        <>
          <hr className="line-divider"></hr>
          <div ref={myRef} className="center-title" name="solution">
            Solution
          </div>
          <div className="solution-table-container">{props.table}</div>
        </>
      )}
      <ExamplesAndSaved method={props.name} examples={props.examples} setter={calculate} />
    </div>
  );
};

export default Method;
