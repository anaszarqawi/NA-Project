import React from 'react';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';
import Styles from '../styles/containers.module.scss';

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
                    <Matrix matrix={swap.finalMatrix} withSolution={false} label={step.matrixLabel} />
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
            <Matrix matrix={step.finalMatrix} withSolution={false} label={step?.matrixLabel} />
          </div>
        );
      })}
    </div>
  );
};

const PrintMatrixStep = ({ step }) => {
  console.log(step);
  return (
    <div
      className={Styles.parts_container}
      data-aos="fade-up"
      data-aos-duration="400"
      data-aos-delay={['data-aos-delay'] ? ['data-aos-delay'] : '0'}
      data-aos-once="true">
      {step.comment && <div className={Styles.comment}>{step.comment}</div>}
      {step.rule && <Matrix matrix={step.rule} withSolution={false} label={step.matrixLabel} />}
      {step.matricesInline && (
        <div className={Styles.flexRowFitContent}>
          {step.matricesInline.map((matrix, i) => {
            return (
              <>
                {i === step.matricesInline.length - 1 ? '=' : ''}
                <Matrix matrix={matrix} withSolution={false} />
              </>
            );
          })}
        </div>
      )}
      {step.matrices &&
        step.matrices.map((matrix, i) => {
          return (
            <div className={Styles.part_container} key={i}>
              <Matrix matrix={matrix.matrix} withSolution={false} label={matrix.matrixLabel} />
            </div>
          );
        })}
      {step.commentMatrix && <div className={Styles.comment}>{step.commentMatrix}</div>}
      {step.finalMatrix && <Matrix matrix={step.finalMatrix} withSolution={false} label={step?.matrixLabel} />}
      {step.matrix && <Matrix matrix={step.matrix} withSolution={false} label={step?.matrixLabel} />}
      {step.matricesInline && step.finalMatrix && <Equations matrix={step.finalMatrix} var="c" />}
      {step.xsValues && <XsValues values={step.xsValues} />}
    </div>
  );
};

const LU_steps = ({ solution }) => {
  console.log(solution);
  return (
    <>
      <FadeChildren>
        <div className={Styles.steps_container}>
          <FadeChildren>
            <PrintStep stepX={solution.step1} mij_rule={solution.mij_rule} name="1st Step" />
            <PrintStep stepX={solution.step2} name="2nd Step" />
            <PrintMatrixStep step={solution.U} />
            <PrintMatrixStep step={solution.L} />
            <PrintMatrixStep step={solution.AxEqB} />
            <PrintMatrixStep step={solution.LcEqB} />
            <PrintMatrixStep step={solution.UxEqC} />
          </FadeChildren>
        </div>
      </FadeChildren>
    </>
  );
};

export default LU_steps;
