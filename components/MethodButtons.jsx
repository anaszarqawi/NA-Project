import React from 'react';
import Button from './Button';
import { useRouter } from 'next/router';

import { useX } from '../context/xContext';
import Styles from '../styles/button.module.scss';
import Styles2 from '../styles/containers.module.scss';

const MethodButtons = (props) => {
  const { setSaved, saved, showMsg } = useX();
  const router = useRouter();

  const copyLink = async () => {
    const URL = window.location.href;
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(URL);
      showMsg('success', 'Solution Link Copied 😉');
    } else {
      document.execCommand('copy', true, URL);
      showMsg('success', 'Solution Link Copied 😉');
    }
  };

  return (
    <div className={Styles.buttons_container}>
      {router.query.operation === 'calculateQuery' && (
        <Button label="Copy question link" type="button" onClick={copyLink} isNew={true} className={Styles.desktop} />
      )}
      {/* <div className={Styles2.flexRowCenter}> */}
      <Button label="Save" type="button" onClick={() => props.calculate({ operation: 'save' })} />
      <Button label="Clear" type="reset" />
      <Button label="Calculate" type="submit" value="calculate" isPrimary={true} />
      {/* </div> */}
      {router.query.operation === 'calculateQuery' && (
        <Button label="Copy question link" type="button" onClick={copyLink} isNew={true} className={Styles.mobile} />
      )}
    </div>
  );
};

export default MethodButtons;
