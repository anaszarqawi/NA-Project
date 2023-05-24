import React from 'react';
import Styles from '../styles/containers.module.scss';
import Matrix from './Matrix';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';

const PrintAx = ({ Ax }) => {
  return (
    <div className={Styles.inline_step}>
      <Matrix matrix={Ax.matrix} label={Ax.matrixLabel} /> {Ax.det}
    </div>
  );
};

const PrintXEqs = ({ xEq }) => {
  return (
    <>
      {xEq.map((eq, i) => {
        return (
          <div className={Styles.sub_step} key={i}>
            <div className={Styles.rule}>{eq.rule}</div>
            <div className={Styles.sub_step}>{eq.sub_in_rule}</div>
          </div>
        );
      })}
    </>
  );
};

const Cramer_steps = ({ solution }) => {
  return (
    <FadeChildren>
      <div className={Styles.steps_container}>
        <div className={Styles.step_container}>
          <FadeChildren>
            <PrintAx Ax={solution.A} />
            <PrintAx Ax={solution.A1} />
            <PrintAx Ax={solution.A2} />
            <PrintAx Ax={solution.A3} />
          </FadeChildren>
        </div>
        <div className={Styles.step_container}>
          <PrintXEqs xEq={solution.xEq} />
        </div>
        <XsValues values={solution.xValues} />
      </div>
    </FadeChildren>
  );
};

export default Cramer_steps;
