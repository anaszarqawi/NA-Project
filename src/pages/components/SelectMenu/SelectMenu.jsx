import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.scss';
import { bisection } from '../../Methods/Methods';
import $ from 'jquery';
import { useX } from '../../../context/xContext';

import { ReactComponent as RemoveIcon } from '../../../assets/svg/delete-icon.svg';

const SelectMenu = (props) => {
  const { saved, setSaved, lastMethod, setLastMethod } = useX();

  const isOne = (value) => {
    if (value === 1) return ' + ';
    if (value === -1) return ' - ';
    if (value > 0) return ' + ' + value;
    if (value < 0) return ' - ' + Math.abs(value);
  };

  const generateDetails = (example) => {
    let details = {};
    example.fx !== undefined && (details.fx = example.fx);
    example.xl !== undefined && (details.xl = example.xl);
    example.xu !== undefined && (details.xu = example.xu);
    example.x0 !== undefined && (details.x0 = example.x0);
    example.xa !== undefined && (details.xa = example.xa);
    example.xb !== undefined && (details.xb = example.xb);
    example.conditionType === 'es' && (details.es = example.es);
    example.conditionType === 'it' && (details.it = example.it);
    example.equations !== undefined && (details.equations = example.equations);

    // create string and add '|' between each detail
    let detailsString = '';

    for (let detail in details) {
      if (detail !== 'fx') {
        detailsString += ' | ' + detail + ': ' + details[detail];
      }
    }

    return detailsString.slice(3);
  };

  const handleRemoveItem = (index) => {
    let newSaved = { ...saved };
    newSaved[props.method].splice(index, 1);
    setSaved(newSaved);
    console.log(saved);
    localStorage.setItem('saved', JSON.stringify(newSaved));
  };

  if (props.type === 'methods') {
    return props.chapters.map((chapter) => {
      return (
        <div className="select-menu">
          <div className="select-menu-title">{chapter.name}</div>
          <div className="select-menu-list">
            {chapter.methods.map((method) => {
              const path = method.toLowerCase().replace(/\s/g, '-') + '-method';
              return (
                <Link className="select-menu-item" onClick={() => setLastMethod(path)} to={path}>
                  {method + ' Method'}
                </Link>
              );
            })}
          </div>
        </div>
      );
    });
  }

  if (props.type === 'examples' || props.type === 'saved') {
    return (
      <div className="select-menu">
        <div className="select-menu-list">
          {props.examples.map((example, index) => {
            return (
              <div
                className={`select-menu-item ${example.matrix ? 'equations' : ''} ${
                  props.type === 'examples' && 'examples'
                } ${props.type === 'saved' && 'saved'}`.replace(/false |undefined /g, '')}
                onClick={(e) => {
                  // setCurrentExample(example);
                  if (
                    e.target.className !== 'select-menu-item-button' &&
                    e.target.tagName !== 'path' &&
                    e.target.tagName !== 'svg'
                  ) {
                    props.setter('setExample', example);
                    console.log(example);
                  }
                }}>
                {example.matrix ? (
                  example.matrix.map((equation, eqIndex) => {
                    return (
                      <>
                        <div className="select-menu-item-equation">
                          {equation.x1 !== 0 && (
                            <>
                              {equation.x1 > 0 ? equation.x1 : equation.x1}X<sub>1</sub>
                            </>
                          )}
                          {equation.x2 !== 0 && (
                            <>
                              {isOne(equation.x2)}X<sub>2</sub>
                            </>
                          )}
                          {equation.x3 !== 0 && (
                            <>
                              {isOne(equation.x3)}X<sub>3</sub>
                            </>
                          )}
                          {` = ${equation.sol}`}
                        </div>
                        {props.type === 'saved' && eqIndex === 2 && (
                          <div className="select-menu-item-button" onClick={() => handleRemoveItem(index)}>
                            <RemoveIcon />
                          </div>
                        )}
                      </>
                    );
                  })
                ) : (
                  <>
                    <div className="select-menu-item-title">{example.fx}</div>
                    <div className="select-menu-item-details">
                      <div className="select-menu-item-detail">{generateDetails(example)}</div>
                      {props.type === 'saved' && (
                        <div className="select-menu-item-button" onClick={() => handleRemoveItem(index)}>
                          <RemoveIcon />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default SelectMenu;
