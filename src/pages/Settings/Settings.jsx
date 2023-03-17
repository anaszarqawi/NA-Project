import React from 'react';
import CustomInput from '../Methods/components/CustomInput/CustomInput';

const Settings = (props) => {
  React.useEffect(() => {
    document.title = 'Settings';
  }, []);

  const [decimalPoints, setDecimalPoints] = React.useState(3);

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
        />
      </div>
    </div>
  );
};

export default Settings;
