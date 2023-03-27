import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import { useX } from '../../../../context/xContext';

const MethodButtons = (props) => {
  const { isSaved, setSaved, saved } = useX();

  return (
    <div className="buttons-container">
      <CustomButton label="Calculate" onClick={() => props.calculate('calculate')} type="primary" />
      <CustomButton label="Clear" onClick={props.clear} type="secondary" />

      <CustomButton
        label={isSaved ? 'Saved!' : 'Save'}
        onClick={() => props.calculate('addToSaved')}
        type="secondary"
      />
      <CustomButton
        label="Clear Saved"
        onClick={() => {
          setSaved({ ...saved, [props.method]: [] });
        }}
        type="secondary"
      />
    </div>
  );
};

export default MethodButtons;
