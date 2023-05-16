import React from 'react';
import Input from './Input';
import { useX } from '../context/xContext';
import Styles from '../styles/containers.module.scss';

const MatrixInputs = () => {
  const { currentExample } = useX();
  return (
    <>
      <div className={Styles.flex_Row}>
        <Input
          type="text"
          name="x1_1"
          label="X"
          sub="1"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[0][0]}
        />
        <Input
          type="text"
          name="x2_1"
          label="X"
          sub="2"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[0][1]}
        />
        <Input
          type="text"
          name="x3_1"
          label="X"
          sub="3"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[0][2]}
        />
        <Input
          type="text"
          name="sol_1"
          label="="
          placeholder="Eq1 solution"
          defaultValue={currentExample?.matrix[0][3]}
        />
      </div>
      <div className={Styles.flex_Row}>
        <Input
          type="text"
          name="x1_2"
          label="X"
          sub="1"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[1][0]}
        />
        <Input
          type="text"
          name="x2_2"
          label="X"
          sub="2"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[1][1]}
        />
        <Input
          type="text"
          name="x3_2"
          label="X"
          sub="3"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[1][2]}
        />
        <Input
          type="text"
          name="sol_2"
          label="="
          placeholder="Eq2 solution"
          defaultValue={currentExample?.matrix[1][3]}
        />
      </div>
      <div className={Styles.flex_Row}>
        <Input
          type="text"
          name="x1_3"
          label="X"
          sub="1"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[2][0]}
        />
        <Input
          type="text"
          name="x2_3"
          label="X"
          sub="2"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[2][1]}
        />
        <Input
          type="text"
          name="x3_3"
          label="X"
          sub="3"
          labelPosition="inside-right"
          defaultValue={currentExample?.matrix[2][2]}
        />
        <Input
          type="text"
          name="sol_3"
          label="="
          placeholder="Eq3 solution"
          defaultValue={currentExample?.matrix[2][3]}
        />
      </div>
    </>
  );
};

export default MatrixInputs;
