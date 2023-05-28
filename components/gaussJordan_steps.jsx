import React from 'react';
import Styles from '../styles/containers.module.scss';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';
import { useX } from '../context/xContext';

const PrintStep = ({ stepX, name }) => {
  return (
    <div
      className={Styles.step_container}
      data-aos={['data-aos'] ? ['data-aos'] : null}
      data-aos-duration={['data-aos-duration'] ? ['data-aos-duration'] : null}
      data-aos-delay={['data-aos-delay'] ? ['data-aos-delay'] : null}
      data-aos-once={['data-aos-once'] ? ['data-aos-once'] : null}>
      <div className={Styles.step}>
        <div className={Styles.title}>{name}</div>
        {stepX.map((step, i) => {
          if (step) {
            if (i === 0) {
              return (
                <div className={Styles.sub_step} key={i}>
                  {step.swap && (
                    <div className={Styles.flexPaddingBottom}>
                      <div className={Styles.comment}>{step?.swap?.comment}</div>
                      <Matrix matrix={step?.swap?.finalMatrix} withSolution={true} label={step?.matrixLabel} />
                    </div>
                  )}
                  <div className={Styles.comment}>{step.comment}</div>
                  <div className={Styles.rule}>{step.rule}</div>
                  <div className={Styles.sub_step}>
                    {step.steps.map((step, i) => {
                      return (
                        <div className={Styles.sub_in_rule} key={i}>
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
                <div className={Styles.sub_step} key={i}>
                  <div className={Styles.comment}>{step.comment}</div>
                  <div className={Styles.rule}>{step.rule}</div>
                  <div className={Styles.sub_step}>
                    {step.steps.map((step, i) => {
                      return (
                        <div className={Styles.sub_in_rule} key={i}>
                          {step}
                        </div>
                      );
                    })}
                  </div>
                  <Matrix matrix={step.finalMatrix} withSolution={true} label={step?.matrixLabel} />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

const GaussJordan_steps = ({ solution }) => {
  const { checkIfEmpty } = useX();
  return (
    <FadeChildren>
      <Matrix matrix={solution.mainMatrix} withSolution={true} />
      <div className={Styles.steps_container}>
        <FadeChildren>
          {!checkIfEmpty(solution.step1) && <PrintStep stepX={solution.step1} name="1st Step" />}
          {!checkIfEmpty(solution.step2) && <PrintStep stepX={solution.step2} name="2nd Step" />}
          {!checkIfEmpty(solution.step3) && <PrintStep stepX={solution.step3} name="3rd Step" />}
          <XsValues values={solution.xsValues} />
        </FadeChildren>
      </div>
    </FadeChildren>
  );
};

export default GaussJordan_steps;
