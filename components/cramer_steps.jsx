import React from 'react';
import Styles from '../styles/containers.module.scss';
import Matrix from './Matrix';
import XsValues from './XsValues';
import FadeChildren from './FadeChildren';

const Cramer_steps = (props) => {
  return (
    <FadeChildren>
      <div className={Styles.part_container}>
        <div className={Styles.matrices_container}>
          <FadeChildren>
            <div className={Styles.inline_step}>
              <Matrix matrix={props.solution.A} label="A = " /> det A = {props.solution.detA}
            </div>
            <div className={Styles.inline_step}>
              <Matrix matrix={props.solution.A1} label="A₁ = " /> det A₁ = {props.solution.detA1}
            </div>
            <div className={Styles.inline_step}>
              <Matrix matrix={props.solution.A2} label="A₂ = " /> det A₂ = {props.solution.detA2}
            </div>
            <div className={Styles.inline_step}>
              <Matrix matrix={props.solution.A3} label="A₃ = " /> det A₃ = {props.solution.detA3}
            </div>
          </FadeChildren>
        </div>
      </div>
      <div className={Styles.part_container}>
        <div className={Styles.steps_container}>
          <div className={Styles.step}>
            x₁ = A₁/A = {props.solution.detA1}/{props.solution.detA}
          </div>
          <div className={Styles.step}>
            x₂ = A₂/A = {props.solution.detA2}/{props.solution.detA}
          </div>
          <div className={Styles.step}>
            x₃ = A₃/A = {props.solution.detA3}/{props.solution.detA}
          </div>
        </div>
      </div>
      <XsValues values={props.solution.xsValues} />
    </FadeChildren>
  );
};

export default Cramer_steps;
