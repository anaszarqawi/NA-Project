import React from 'react';
import CustomInput from '../Methods/components/CustomInput/CustomInput';
import './style.scss';
import { useX } from '../../context/xContext';

const Settings = (props) => {
  React.useEffect(() => {
    document.title = 'Settings';
  }, []);

  const { settings, setSettings } = useX();
  const [decimalPoints, setDecimalPoints] = React.useState(3);

  React.useEffect(() => {
    const tempSettings = {
      decimalPrecision: {
        decimalPoints: 3,
        withRounding: true,
      },
    };

    setSettings(tempSettings);
  }, []);

  return (
    <div className="page">
      <div className="settings-section">
        <div className="settings-section-title">Decimal precision</div>
        <CustomInput
          type="number"
          label="Decimal Points"
          labelPosition="right"
          value={decimalPoints}
          onChange={setDecimalPoints}
          extraClass="settings-input"
        />
      </div>
    </div>
  );
};

export default Settings;
