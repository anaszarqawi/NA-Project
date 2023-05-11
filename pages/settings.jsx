import React from 'react';
import Head from 'next/head';

import Input from '../components/Input';
import Button from '../components/Button';

import { useX } from '../context/xContext';

import Styles from '../styles/containers.module.scss';

const Settings = (props) => {
  const [settings, setSettings] = React.useState({});
  const { showMsg } = useX();

  React.useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      setSettings(settings);
      console.log(settings);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    const settingsData = {
      decimalPrecision: {
        decimalPlaces: +e.target.decimalPlaces.value,
        withRounding: e.target.withRounding.checked,
      },
    };

    setSettings(settingsData);
    showMsg('success', 'Settings saved successfully');

    localStorage.setItem('settings', JSON.stringify(settingsData));
  };

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="page">
        <div className="center-title">Settings</div>
        <form className={Styles.flexColumnFullWidth} onSubmit={handleSave}>
          <div className={Styles.inputs_Container}>
            <div className="inputs-title">Decimal precision</div>
            <Input
              type="number"
              name="decimalPlaces"
              label="Decimal Places"
              labelPosition="inside-right"
              defaultValue={settings?.decimalPrecision?.decimalPlaces}
              min={0}
              max={4}
            />
            <Input
              type="checkbox"
              name="withRounding"
              defaultChecked={settings?.decimalPrecision?.withRounding}
              label="With Rounding ?"
            />
          </div>
          <Button label="Save" type="submit" isPrimary={true} />
        </form>
      </div>
    </>
  );
};

export default Settings;
