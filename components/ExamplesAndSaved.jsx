import React from 'react';
import { useX } from '../context/xContext';
import SelectMenu from './SelectMenu';
import FadeChildren from './FadeChildren';

const ExamplesAndSaved = (props) => {
  const { saved } = useX();
  const [methodName, setMethodName] = React.useState(props.method.replace(/ /g, '_'));

  const isInSaved = () => {
    if (Object.keys(saved).length !== 0) if (methodName in saved) if (saved[methodName].length !== 0) return true;
    return false;
  };

  return (
    <div>
      {isInSaved() && (
        <FadeChildren once={true}>
          <hr className="line-divider"></hr>
          <div className="center-title">Saved</div>
          <div className="examples-container">
            <SelectMenu method={methodName} examples={saved[methodName]} type="saved" setter={props.setter} />
          </div>
        </FadeChildren>
      )}
      <FadeChildren once={true}>
        <hr className="line-divider"></hr>
        <div className="center-title">Test Me!</div>
        <div className="examples-container">
          <SelectMenu examples={props.examples} type="examples" setter={props.setter} />
        </div>
      </FadeChildren>
    </div>
  );
};

export default ExamplesAndSaved;
