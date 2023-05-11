import React from 'react';
import Styles from '../styles/inputs.module.scss';

const Input = (props) => {
  if (props.type === 'radio&input') {
    const [checked, setChecked] = React.useState(true);
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
                  defaultChecked={option.checked && option.checked}
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
                step="any"
                placeholder={option.placeholder}
                defaultValue={option.defaultValue ? option.defaultValue : null}
              />
            </div>
          );
        })}
      </div>
    );
  } else if (props.type === 'checkbox') {
    const [checked, setChecked] = React.useState(null);
    return (
      <div className={Styles.standard_input_container + ' ' + Styles.checkbox_container}>
        <label className={Styles.input_checkbox}>
          <input
            type="checkbox"
            name={props.name}
            value={props.value}
            defaultChecked={props.defaultChecked && props.defaultChecked}
            onChange={props.onChange ? (e) => props.onChange(e.target.checked) : null}
          />
          {props.label}
        </label>
      </div>
    );
  } else {
    const inputId = React.useId();
    return (
      <div className={Styles.standard_input_container}>
        {!props.labelPosition && (
          <label className={Styles.input_label} htmlFor={inputId}>
            {props.label}
            {props.sub ? <sub>{props.sub}</sub> : null}
          </label>
        )}

        {props.labelPosition === 'inside-right' && (
          <label className={Styles.input_label + ' ' + Styles.input_label_inside_right} htmlFor={inputId}>
            {props.label}
            {props.sub ? <sub>{props.sub}</sub> : null}
          </label>
        )}
        <input
          id={inputId}
          name={props.name ? props.name : null}
          className={Styles.input_field + ' ' + (props.className ? props.className : '')}
          type={props.type ? props.type : 'text'}
          min={props.min ? props.min : null}
          max={props.max ? props.max : null}
          step="any"
          placeholder={props.placeholder ? props.placeholder : null}
          defaultValue={props.defaultValue !== undefined || props.defaultValue !== null ? props.defaultValue : null}
          disabled={props.disabled ? props.disabled : null}
          onChange={props.onChange ? (e) => props.onChange(e.target.value) : null}
        />
        {props.labelPosition === 'right' && (
          <label className={Styles.input_label} htmlFor={inputId}>
            {props.label}
            {props.sub ? <sub>{props.sub}</sub> : null}
          </label>
        )}
      </div>
    );
  }
};

export default Input;
