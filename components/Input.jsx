import React from 'react';
import Styles from '../styles/inputs.module.scss';

const Input = (props) => {
  if (props.type === 'radio&input') {
    const [checked, setChecked] = React.useState(null);
    return (
      <div className={Styles.inputs_container}>
        {props.options.map((option, i) => {
          const inputId = React.useId();
          return (
            <div className={Styles.standard_input_container + ' ' + Styles.radio_with_input_container}>
              <label className={Styles.input_radio}>
                <input
                  type="radio"
                  name={props.name}
                  value={option.value}
                  checked={option.checked ? option.checked : null}
                  defaultChecked={option.checked ? option.checked : i === 0 ? true : null}
                  onChange={(e) => {
                    setChecked(e.target.value);
                  }}
                />
                {option.label}
              </label>
              <input
                id={inputId}
                className={Styles.input_field}
                name={option.value ? option.value : null}
                type={props.inputType ? props.inputType : 'text'}
                placeholder={option.placeholder}
                defaultValue={option.defaultValue ? option.defaultValue : null}
                // disabled={checked !== option.value ? true : null}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    const inputId = React.useId();
    return (
      <div className={Styles.standard_input_container}>
        <label className={Styles.input_label} htmlFor={inputId}>
          {props.label}
          {props.sub ? <sub>{props.sub}</sub> : null}
        </label>
        <input
          id={inputId}
          name={props.name ? props.name : null}
          className={Styles.input_field}
          type={props.inputType ? props.inputType : 'text'}
          placeholder={props.placeholder ? props.placeholder : null}
          defaultValue={props.defaultValue !== undefined || props.defaultValue !== null ? props.defaultValue : null}
          disabled={props.disabled ? props.disabled : null}
          onChange={props.onChange ? (e) => props.onChange(e.target.value) : null}
        />
      </div>
    );
  }
};

export default Input;
