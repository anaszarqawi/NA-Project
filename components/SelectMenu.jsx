import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useX } from '../context/xContext';
import RemoveIcon from '../assets/svg/delete-icon';
import FadeChildren from './FadeChildren';

const SelectMenu = (props) => {
  const { saved, setSaved, setLastMethod, setCurrentExample } = useX();

  const isOne = (value) => {
    if (value === 1) return ' + ';
    if (value === -1) return ' - ';
    if (value > 0) return ' + ' + value;
    if (value < 0) return ' - ' + Math.abs(value);
  };

  const generateDetails = (example) => {
    let details = {};
    example?.fx !== undefined && (details.fx = example.fx);
    example?.xl !== undefined && (details.xl = example.xl);
    example?.xu !== undefined && (details.xu = example.xu);
    example?.x0 !== undefined && (details.x0 = example.x0);
    example?.xa !== undefined && (details.xa = example.xa);
    example?.xb !== undefined && (details.xb = example.xb);
    example?.condition?.type === 'es' && (details.es = example?.condition?.value);
    example?.condition?.type === 'it' && (details.it = example?.condition?.value);
    example?.equations !== undefined && (details.equations = example?.equations);

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
    return (
      <FadeChildren>
        {props.chapters.map((chapter, i) => {
          return (
            <div className="select-menu">
              <div className="select-menu-title">{chapter.name}</div>
              <div className="select-menu-list">
                {chapter.methods.map((method) => {
                  return (
                    <Link className="select-menu-item" onClick={() => setLastMethod(method.path)} href={method.path}>
                      {method.name + ' Method'}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </FadeChildren>
    );
  }

  if (props.type === 'examples' || props.type === 'saved') {
    return (
      <div className="select-menu">
        <div className="select-menu-list">
          {props.examples.map((example, index) => {
            return (
              <div
                className={`select-menu-item ${example.length === 3 ? 'equations' : ''} ${
                  props.type === 'examples' && 'examples'
                } ${props.type === 'saved' && 'saved'}`.replace(/false |undefined /g, '')}
                onClick={(e) => {
                  // setCurrentExample(example);
                  if (
                    e.target.className !== 'select-menu-item-button' &&
                    e.target.tagName !== 'path' &&
                    e.target.tagName !== 'svg'
                  ) {
                    // setCurrentExample(example);
                    console.log(example);
                    props.setter({ operation: 'setExample', example });
                  }
                }}>
                {example.length > 0 ? (
                  <div className="select-menu-item-equations-container">
                    {example.map((equation, eqIndex) => {
                      return (
                        <>
                          <div className="select-menu-item-equation">
                            {equation[0] !== 0 && (
                              <>
                                {equation[0] > 0 ? equation[0] : equation[0]}X<sub>1</sub>
                              </>
                            )}
                            {equation[1] !== 0 && (
                              <>
                                {isOne(equation[1])}X<sub>2</sub>
                              </>
                            )}
                            {equation[2] !== 0 && (
                              <>
                                {isOne(equation[2])}X<sub>3</sub>
                              </>
                            )}
                            {` = ${equation[3]}`}
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="select-menu-item-function">
                      <div className="select-menu-item-title">{example.fx}</div>
                      <div className="select-menu-item-details">
                        <div className="select-menu-item-detail">{generateDetails(example)}</div>
                      </div>
                    </div>
                  </>
                )}
                {props.type === 'saved' && (
                  <div className="select-menu-item-buttons">
                    <div className="select-menu-item-button" onClick={() => handleRemoveItem(index)}>
                      <RemoveIcon />
                    </div>
                  </div>
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
