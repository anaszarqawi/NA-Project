import React from 'react';
import Styles from '../styles/containers.module.scss';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';

const PrintStep = ({ stepX, name, mij_rule }) => {
  return (
    <div
      className={Styles.parts_container}
      data-aos="fade-up"
      data-aos-duration="400"
      data-aos-delay={['data-aos-delay'] ? ['data-aos-delay'] : '0'}
      data-aos-once="true">
      <div className={Styles.title}>{name}</div>
      {stepX.map((step, i) => {
        return (
          <div className={Styles.part_container} key={i}>
            {step.swap &&
              step.swap.map((swap) => {
                return (
                  <div className={Styles.part_container}>
                    <div className={Styles.comment}>{swap.comment}</div>
                    <Matrix matrix={swap.finalMatrix} withSolution={true} label={step.matrixLabel} />
                  </div>
                );
              })}
            {i === 0 && mij_rule && <div className={Styles.rule}>{mij_rule}</div>}
            <div className={Styles.one_step}>{step.mij}</div>
            <div className={Styles.comment}>{step.comment}</div>
            <div className={Styles.rule}>{step.rule}</div>
            <div className={Styles.steps_container}>
              {step.steps.map((step, i) => {
                return (
                  <div className={Styles.step} key={i}>
                    {step}
                  </div>
                );
              })}
            </div>
            <Matrix matrix={step.finalMatrix} withSolution={true} label={step?.matrixLabel} />
          </div>
        );
      })}
    </div>
  );
};

const GaussElimination_steps = ({ solution }) => {
  return (
    <FadeChildren>
      <Matrix matrix={solution.mainMatrix} withSolution={true} />
      <div className={Styles.steps_container}>
        <FadeChildren>
          <PrintStep stepX={solution.step1} mij_rule={solution.mij_rule} name="1st Step" />
          <PrintStep stepX={solution.step2} name="2nd Step" />
          <XsValues values={solution.xsValues} />
        </FadeChildren>
      </div>
    </FadeChildren>
  );
};

export default GaussElimination_steps;
