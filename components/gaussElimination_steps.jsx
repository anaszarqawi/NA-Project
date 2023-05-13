import React from 'react';
import Styles from '../styles/containers.module.scss';
import Matrix from './Matrix';
import Equations from './Equations';
import XsValues from './XsValues';

const GaussElimination_steps = (props) => {
  return (
    <>
      <Matrix matrix={props.solution.matrix_1} withSolution={true} label="[A/B] = " />
      <div className={Styles.part_container}>
        <div className={Styles.rule}>
          m<sub>rc</sub> = x<sub>rc</sub> / Pivot Element of R<sub>n</sub>
        </div>
        <div className={Styles.steps_container}>
          <div className={Styles.step}>
            m<sub>21</sub> = {props.solution.m21.equation}
          </div>
          <div className={Styles.step}>
            m<sub>31</sub> = {props.solution.m31.equation}
          </div>
        </div>
      </div>
      <div className={Styles.part_container}>
        <div className={Styles.rule}>
          R<sub>2</sub> = R<sub>2</sub> - (m<sub>21</sub> * R<sub>1</sub>)
        </div>
        <div className={Styles.steps_container}>
          {props.solution.R2.steps.map((step, i) => {
            return (
              <div className={Styles.step} key={i}>
                R<sub>2{i}</sub> = {step}
              </div>
            );
          })}
        </div>
      </div>
      <div className={Styles.part_container}>
        <div className={Styles.rule}>
          R<sub>3</sub> = R<sub>3</sub> - (m<sub>31</sub> * R<sub>1</sub>)
        </div>
        <div className={Styles.steps_container}>
          {props.solution.R3_1.steps.map((step, i) => {
            return (
              <div className={Styles.step} key={i}>
                R<sub>3{i}</sub> = {step}
              </div>
            );
          })}
        </div>
      </div>
      <Matrix matrix={props.solution.matrix_2} withSolution={true} label="[A/B] = " />
      <div className={Styles.steps_container}>
        <div className={Styles.step}>
          m<sub>32</sub> = {props.solution.m32.equation}
        </div>
      </div>
      <div className={Styles.part_container}>
        <div className={Styles.rule}>
          R<sub>3</sub> = R<sub>3</sub> - (m<sub>32</sub> * R<sub>2</sub>)
        </div>
        <div className={Styles.steps_container}>
          {props.solution.R3_2.steps.map((step, i) => {
            return (
              <div className={Styles.step} key={i}>
                R<sub>3{i}</sub> = {step}
              </div>
            );
          })}
        </div>
      </div>
      <Matrix matrix={props.solution.matrix_3} withSolution={true} label="[A/B] = " />
      <Equations matrix={props.solution.matrix_3} var="x" withAnswer={true} />
      <XsValues values={props.solution.xsValues} />
    </>
  );
};

export default GaussElimination_steps;
