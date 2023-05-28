import React from 'react';
import Styles from '../styles/containers.module.scss';
import FadeChildren from '../components/FadeChildren';
import Head from 'next/head';
import { useX } from '../context/xContext';
import SelectMenu from '../components/SelectMenu';
import ErrorIcon from '../assets/svg/errorIcon';
import MiniLabel from '../components/MiniLabel';

const Saved = () => {
  const { saved, checkObjIsEmpty } = useX();

  return (
    <div>
      <>
        <Head>
          <title>Saved</title>
        </Head>
        <div className="page">
          <FadeChildren once={true}>
            <div className="center-title">
              Saved Problems
              <MiniLabel label="New" />
            </div>
            <div className={Styles.flexColumnFullWidth}>
              {checkObjIsEmpty('saved') ? (
                <div className="error-page">
                  <ErrorIcon />
                  No saved problems yet!
                </div>
              ) : (
                <SelectMenu items={saved} name="saved" type="multiMenus" />
              )}
            </div>
          </FadeChildren>
        </div>
      </>
    </div>
  );
};

export default Saved;
