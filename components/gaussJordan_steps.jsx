import React from 'react';
import Styles from '../styles/containers.module.scss';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';

const PrintStep = ({ stepX, name }) => {
  return (
    <div
      className={Styles.parts_container}
      data-aos="fade-up"
      data-aos-duration="400"
      data-aos-delay={['data-aos-delay'] ? ['data-aos-delay'] : '0'}
      data-aos-once="true">
      <div className={Styles.title}>{name}</div>
      {stepX.map((step, i) => {
        if (i === 0) {
          return (
            <div className={Styles.part_container} key={i}>
              {step.swap && (
                <div className={Styles.flexPaddingBottom}>
                  <div className={Styles.comment}>{step?.swap?.comment}</div>
                  <Matrix matrix={step?.swap?.finalMatrix} withSolution={true} label={step?.matrixLabel} />
                </div>
              )}
              <div className={Styles.comment}>{step.comment}</div>
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
        } else {
          return (
            <div className={Styles.part_container} key={i}>
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
        }
      })}
    </div>
  );
};

const GaussJordan_steps = ({ solution }) => {
  return (
    <FadeChildren>
      <Matrix matrix={solution.mainMatrix} withSolution={true} />
      <div className={Styles.steps_container}>
        <FadeChildren>
          <PrintStep stepX={solution.step1} name="1st Step" />
          <PrintStep stepX={solution.step2} name="2nd Step" />
          <PrintStep stepX={solution.step3} name="3rd Step" />
          <XsValues values={solution.xsValues} />
        </FadeChildren>
      </div>
    </FadeChildren>
  );
};

export default GaussJordan_steps;
