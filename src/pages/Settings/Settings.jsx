import React from 'react';
import CustomInput from '../../../components/CustomInput';
import './style.scss';
import { useX } from '../../context/xContext';
import CustomCheckButton from '../../../components/CustomCheckButton';

const Settings = (props) => {
  React.useEffect(() => {
    document.title = 'Settings';
  }, []);

  const { settings, setSettings, decimalPoints, setDecimalPoints, withRounding, setWithRounding } = useX();

  return (
    <div className="page">
      <div className="center-title">Settings</div>

      <div className="settings-section">
        <div className="settings-section-title">Decimal precision</div>
        <CustomInput
          type="text"
          label="Decimal Points"
          labelPosition="right"
          value={decimalPoints}
          onChange={setDecimalPoints}
          extraClass="settings-input"
        />
        <CustomCheckButton value={withRounding} setValue={setWithRounding} label="With Rounding ?" />
      </div>
    </div>
  );
};

export default Settings;
