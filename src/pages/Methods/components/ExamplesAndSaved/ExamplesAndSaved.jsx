import React from 'react';
import SelectMenu from '../../../components/SelectMenu/SelectMenu';
import { useX } from '../../../../context/xContext';

const ExamplesAndSaved = (props) => {
  const { saved } = useX();
  return (
    <div>
      {Object.keys(saved).length !== 0 && saved[props.method].length !== 0 && (
        <>
          <hr className="line-divider"></hr>
          <div className="center-title">Saved</div>
          <div className="examples-container">
            <SelectMenu examples={saved[props.method]} type="examples" setter={props.setter} />
          </div>
        </>
      )}
      <hr className="line-divider"></hr>
      <div className="center-title">Examples</div>
      <div className="examples-container">
        <SelectMenu examples={props.examples} type="examples" setter={props.setter} />
      </div>
    </div>
  );
};

export default ExamplesAndSaved;
