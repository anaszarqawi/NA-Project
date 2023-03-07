import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.scss';
import { bisection } from '../../Methods/Methods';
import $ from 'jquery';
import { useX } from '../../../context/xContext';

const SelectMenu = (props) => {
  const { setCurrentExample, currentExample } = useX();

  const generateDetails = (example) => {
    let details = {};
    example.fx && (details.fx = example.fx);
    example.xl && (details.xl = example.xl);
    example.xu && (details.xu = example.xu);
    example.xo && (details.xo = example.xo);
    example.xa && (details.xa = example.xa);
    example.xb && (details.xb = example.xb);
    example.conditionType === 'es' && (details.es = example.es);
    example.conditionType === 'it' && (details.it = example.it);

    // create string and add '|' between each detail
    let detailsString = '';
    for (let detail in details) {
      if (detail !== 'fx') {
        detailsString += ' | ' + detail + ': ' + details[detail];
      }
    }

    console.log(details);
    return detailsString;
  };

  if (props.type === 'methods') {
    return props.chapters.map((chapter) => {
      return (
        <div className="select-menu">
          <div className="select-menu-title">{chapter.name}</div>
          <div className="select-menu-list">
            {chapter.methods.map((method) => {
              return (
                <Link className="select-menu-item" to={method.name.toLowerCase().replace(/\s/g, '-') + '-method'}>
                  {method.name + ' Method'}
                </Link>
              );
            })}
          </div>
        </div>
      );
    });
  }

  if (props.type === 'examples') {
    return (
      <div className="select-menu">
        <div className="select-menu-list">
          {props.examples.map((example) => {
            return (
              <div
                className="select-menu-item"
                onClick={() => {
                  // setCurrentExample(example);
                  props.setter(example);
                }}>
                <div className="select-menu-item-title">{example.fx}</div>
                <div className="select-menu-item-details">
                  <div className="select-menu-item-detail">{generateDetails(example)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default SelectMenu;
