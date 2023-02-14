import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.scss';
import { bisection } from '../../Methods/Methods';
import $ from 'jquery';

const SelectMenu = (props) => {
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
                  props.setFx(example.fx);
                  props.setXl(example.xl);
                  props.setXu(example.xu);
                  props.setConditionType(example.conditionType);
                  example.it && props.setIt(example.it);
                  example.es && props.setEs(example.es);

                  const result = bisection(
                    example.fx,
                    example.xl,
                    example.xu,
                    example.es,
                    example.it,
                    example.conditionType
                  );

                  if (result.error) {
                    props.setErrorMsg(result.error);
                    props.setShowSolution(false);
                    return;
                  }
                  props.setShowSolution(true);
                  props.setData(result);
                  props.setErrorMsg('');

                  // const SolutionTitle = $('.center-title[name="solution"]');
                  // if (SolutionTitle) {
                  //   SolutionTitle.scrollIntoView({ behavior: 'smooth' });
                  // }

                  props.scrollToRef();
                }}>
                <div className="select-menu-item-title">{example.fx}</div>
                <div className="select-menu-item-details">
                  <div className="select-menu-item-detail">
                    {'Xl = ' + example.xl} | {'Xu = ' + example.xu} |{' '}
                    {example.conditionType === 'it' ? 'It = ' + example.it : 'Es = ' + example.es + '%'}
                  </div>
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
