import React from 'react';
import Head from 'next/head';

import Input from '../components/Input';
import Button from '../components/Button';

import { useX } from '../context/xContext';

import Styles from '../styles/containers.module.scss';
import BtnStyles from '../styles/button.module.scss';
import FadeChildren from '../components/FadeChildren';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Settings = (props) => {
  const [settings, setSettings] = React.useState({});
  const { showMsg, lastMethod } = useX();
  const router = useRouter();

  React.useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    if (settings) {
      setSettings(settings);
    } else {
      const settingsData = {
        decimalPrecision: {
          decimalPlaces: 4,
          withRounding: false,
        },
      };
      setSettings(settingsData);
      localStorage.setItem('settings', JSON.stringify(settingsData));
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
        <FadeChildren>
          <div className="center-title">Settings</div>
          <form className={Styles.flexColumnFullWidth} onSubmit={handleSave}>
            <div className={Styles.inputs_Container}>
              <div className="inputs-title">Decimal precision</div>
              <FadeChildren>
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
              </FadeChildren>
            </div>
            <div className={lastMethod !== null && BtnStyles.buttons_container}>
              <Button label="Save" type="submit" isPrimary={true} />
            </div>
          </form>
        </FadeChildren>
      </div>
    </>
  );
};

export default Settings;
