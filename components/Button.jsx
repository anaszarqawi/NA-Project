import React from 'react';
import Styles from '../styles/button.module.scss';
import NewLabel from './NewLabel';

const Button = (props) => {
  return (
    <button
      type={props.type ? props.type : 'button'}
      name={props.name}
      value={props.value}
      className={
        Styles.button + ' ' + (props.isPrimary ? Styles.primary : '') + ' ' + (props.className ? props.className : '')
      }
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.label}
      {props.isNew && <NewLabel />}
    </button>
  );
};

export default Button;
