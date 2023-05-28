import React from 'react';
import Input from './Input';
import { useX } from '../context/xContext';
import Styles from '../styles/inputs.module.scss';
import FadeChildren from './FadeChildren';

const MatrixInputs = (props) => {
  const { currentExample } = useX();

  return (
    <>
      <div className="matrix-container">
        <div className="matrix-inputs withSolution">
          <div className="matrix-row">
            <Input
              type="text"
              name="x1_1"
              className={Styles.input_inside_container}
              placeholder="a11"
              defaultValue={currentExample?.matrix[0][0]}
            />
            <Input
              type="text"
              name="x2_1"
              className={Styles.input_inside_container}
              placeholder="a12"
              defaultValue={currentExample?.matrix[0][1]}
            />
            <Input
              type="text"
              name="x3_1"
              className={Styles.input_inside_container}
              placeholder="a13"
              defaultValue={currentExample?.matrix[0][2]}
            />
          </div>
          <div className="matrix-row">
            <Input
              type="text"
              name="x1_2"
              className={Styles.input_inside_container}
              placeholder="a21"
              defaultValue={currentExample?.matrix[1][0]}
            />
            <Input
              type="text"
              name="x2_2"
              className={Styles.input_inside_container}
              placeholder="a22"
              defaultValue={currentExample?.matrix[1][1]}
            />
            <Input
              type="text"
              name="x3_2"
              className={Styles.input_inside_container}
              placeholder="a23"
              defaultValue={currentExample?.matrix[1][2]}
            />
          </div>
          <div className="matrix-row">
            <Input
              type="text"
              name="x1_3"
              className={Styles.input_inside_container}
              placeholder="a31"
              defaultValue={currentExample?.matrix[2][0]}
            />
            <Input
              type="text"
              name="x2_3"
              className={Styles.input_inside_container}
              placeholder="a32"
              defaultValue={currentExample?.matrix[2][1]}
            />
            <Input
              type="text"
              name="x3_3"
              className={Styles.input_inside_container}
              placeholder="a33"
              defaultValue={currentExample?.matrix[2][2]}
            />
          </div>
        </div>
        <div className="matrix-solution-inputs">
          <div className="matrix-row">
            <Input
              type="text"
              name="sol_1"
              className={Styles.input_inside_container}
              placeholder="sol. 1"
              defaultValue={currentExample?.matrix[0][3]}
            />
          </div>
          <div className="matrix-row">
            <Input
              type="text"
              name="sol_2"
              className={Styles.input_inside_container}
              placeholder="sol. 2"
              defaultValue={currentExample?.matrix[1][3]}
            />
          </div>
          <div className="matrix-row">
            <Input
              type="text"
              name="sol_3"
              className={Styles.input_inside_container}
              placeholder="sol. 3"
              defaultValue={currentExample?.matrix[2][3]}
            />
          </div>
        </div>
      </div>
      {props.withPP && (
        <Input type="checkbox" name="withPP" label="With Partial Pivoting" defaultChecked={currentExample?.withPP} />
      )}
    </>
  );
};

export default MatrixInputs;
