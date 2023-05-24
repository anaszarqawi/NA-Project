import React from 'react';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';
import Styles from '../styles/containers.module.scss';

const PrintStep = ({ stepX, name, mij_rule }) => {
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
          return (
            <div className={Styles.sub_step} key={i}>
              {step.swap &&
                step.swap.map((swap) => {
                  return (
                    <div className={Styles.inside_step}>
                      <div className={Styles.comment}>{swap.comment}</div>
                      <Matrix matrix={swap.finalMatrix} withSolution={false} label={step.matrixLabel} />
                    </div>
                  );
                })}
              {i === 0 && mij_rule && <div className={Styles.rule}>{mij_rule}</div>}
              <div className={Styles.step_rule}>{step.mij}</div>
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
              <Matrix matrix={step.finalMatrix} withSolution={false} label={step?.matrixLabel} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PrintMatrixStep = ({ step }) => {
  return (
    <div className={Styles.step}>
      <div className={Styles.sub_step}>
        {step.comment && <div className={Styles.comment}>{step.comment}</div>}
        {step.ruleMat && <Matrix matrix={step.ruleMat} withSolution={false} label={step.matrixLabel} />}
        {step.rule && <div className={Styles.rule}>{step.rule}</div>}
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
        {step.equations && <Equations matrix={step.equations} var={step.var} />}
        {step.xsValues && <XsValues values={step.xsValues} />}
      </div>
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
            <div className={Styles.step_container}>
              <PrintMatrixStep step={solution.U} />
            </div>
            <div className={Styles.step_container}>
              <PrintMatrixStep step={solution.L} />
            </div>
            <div className={Styles.step_container}>
              <PrintMatrixStep step={solution.AxEqB} />
            </div>
            <div className={Styles.step_container}>
              <PrintMatrixStep step={solution.LcEqB} />
            </div>
            <div className={Styles.step_container}>
              <PrintMatrixStep step={solution.UxEqC} />
            </div>
          </FadeChildren>
        </div>
      </FadeChildren>
    </>
  );
};

export default LU_steps;
