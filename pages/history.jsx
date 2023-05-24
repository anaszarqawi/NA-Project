import React from 'react';
import Styles from '../styles/containers.module.scss';
import FadeChildren from '../components/FadeChildren';
import Head from 'next/head';
import { useX } from '../context/xContext';
import SelectMenu from '../components/SelectMenu';
import ErrorIcon from '../assets/svg/errorIcon';
import MiniLabel from '../components/MiniLabel';

const History = () => {
  const { history, checkObjIsEmpty } = useX();
  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <div className="page">
        <FadeChildren once={true}>
          <div className="center-title">
            History
            <MiniLabel label="New" />
          </div>
          <div className={Styles.flexColumnFullWidth}>
            {checkObjIsEmpty('history') ? (
              <div className="error-page">
                <ErrorIcon />
                No history yet!
              </div>
            ) : (
              <SelectMenu items={history} name="history" type="multiMenus" />
            )}
          </div>
        </FadeChildren>
      </div>
    </>
  );
};

export default History;
