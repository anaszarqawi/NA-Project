import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useX } from '../context/xContext';
import RemoveIcon from '../assets/svg/RemoveIcon';

import FadeChildren from './FadeChildren';
import MiniLabel from './MiniLabel';
import DeleteIcon from '../assets/svg/deleteIcon';
import { useRouter } from 'next/router';
import BookmarkRemoveIcon from '../assets/svg/bookmarkRemoveIcon';

const PrintEquations = (equations) => {
  const isOne = (value) => {
    if (value === 1) return ' + ';
    if (value === -1) return ' - ';
    if (value > 0) return ' + ' + value;
    if (value < 0) return ' - ' + Math.abs(value);
  };

  const PrintEquation = ({ equation }) => {
    const [x1, x2, x3, sol] = equation;
    return (
      <>
        {x1 !== 0 && (
          <>
            {x1 > 0 ? x1 : x1}X<sub>1</sub>
          </>
        )}
        {x2 !== 0 && (
          <>
            {isOne(x2)}X<sub>2</sub>
          </>
        )}
        {x3 !== 0 && (
          <>
            {isOne(x3)}X<sub>3</sub>
          </>
        )}
        {` = ${sol}`}
      </>
    );
  };

  return (
    <div className="select-menu-item-equations-container">
      {equations.matrix
        ? equations.matrix.map((equation) => {
            return (
              <div className="select-menu-item-equation">
                <PrintEquation equation={equation} />
              </div>
            );
          })
        : equations.map((equation) => {
            return (
              <div className="select-menu-item-equation">
                <PrintEquation equation={equation} />
              </div>
            );
          })}
    </div>
  );
};

const PrintSimpleExample = (example) => {
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

  return (
    <>
      <div className="select-menu-item-function">
        <div className="select-menu-item-title">{example.fx}</div>
        <div className="select-menu-item-details">
          <div className="select-menu-item-detail">{generateDetails(example)}</div>
        </div>
      </div>
    </>
  );
};

const SelectMenu = (props) => {
  const { removeFromObj } = useX();
  const router = useRouter();

  const generateUrl = (methodName, data) => {
    let query = '';

    if (data.matrix) {
      let [x1_1, x2_1, x3_1, sol_1] = data.matrix[0];
      let [x1_2, x2_2, x3_2, sol_2] = data.matrix[1];
      let [x1_3, x2_3, x3_3, sol_3] = data.matrix[2];

      const values = {
        operation: 'calculateQuery',
        lu: data?.lu,
        x1_1,
        x2_1,
        x3_1,
        sol_1,
        x1_2,
        x2_2,
        x3_2,
        sol_2,
        x1_3,
        x2_3,
        x3_3,
        sol_3,
        withPP: data.withPP,
      };
      if (methodName === 'LU Decomposition') {
        values.lu = true;
        methodName = 'Gauss Elimination';
      }

      query = values;
    } else {
      query = { operation: 'calculateQuery', ...data, condition: JSON.stringify(data.condition) };
    }

    let pathName = '/methods/' + methodName.replace(' ', '-').toLowerCase();

    return {
      pathName,
      query,
    };
  };

  if (props.type === 'methods') {
    return (
      <FadeChildren>
        {props.chapters.map((chapter, i) => {
          return (
            <div className="select-menu">
              <div className="select-menu-title">
                {chapter.name}
                {chapter.isNew && <MiniLabel label="New" />}
              </div>
              <div className="select-menu-list">
                {chapter.methods.map((method) => {
                  return (
                    <Link className="select-menu-item" href={method.path}>
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
                key={index}
                className={
                  'select-menu-item' +
                  (example.length === 3 ? ' equations' : '') +
                  (props.type === 'examples' ? ' examples' : '') +
                  (props.type === 'saved' ? ' saved' : '')
                }
                onClick={(e) => {
                  if (
                    e.target.className !== 'select-menu-item-button' &&
                    e.target.tagName !== 'path' &&
                    e.target.tagName !== 'svg'
                  ) {
                    console.log(example);
                    props.setter({ operation: 'setExample', example });
                  }
                }}>
                {example.length > 0 ? PrintEquations(example) : PrintSimpleExample(example)}
                {props.type === 'saved' && (
                  <div className="select-menu-item-buttons">
                    <div
                      className="select-menu-item-button"
                      onClick={() => removeFromObj('saved', props.method, index)}>
                      <BookmarkRemoveIcon />
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

  if (props.type === 'multiMenus') {
    const itemKeys = Object.keys(props.items);
    return (
      <FadeChildren once={true}>
        {itemKeys.map((methodKey, i) => {
          const method = props.items[methodKey];
          const methodName = methodKey.replace('_', ' ');
          return (
            method.length > 0 && (
              <div className="select-menu" key={i}>
                <div className="select-menu-title">{methodName} Method</div>
                <div className="select-menu-list">
                  {method.map((example, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          'select-menu-item' +
                          (example.length === 3 ? ' equations' : '') +
                          (props.type === 'examples' ? ' examples' : '') +
                          (props.name === 'saved' || props.type === 'multiMenus' ? ' saved' : '')
                        }
                        onClick={(e) => {
                          if (
                            e.target.className !== 'select-menu-item-button' &&
                            e.target.tagName !== 'path' &&
                            e.target.tagName !== 'svg'
                          ) {
                            router.query = generateUrl(methodName, example).query;
                            router.pathname = generateUrl(methodName, example).pathName;
                            router.push(router);
                          }
                        }}>
                        {example.matrix ? PrintEquations(example.matrix) : PrintSimpleExample(example)}
                        {(props.name === 'history' || props.name === 'saved') && (
                          <div className="select-menu-item-buttons">
                            <div
                              className="select-menu-item-button"
                              onClick={() => removeFromObj(props.name, methodKey, index)}>
                              <DeleteIcon />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}
      </FadeChildren>
    );
  }
};

export default SelectMenu;
