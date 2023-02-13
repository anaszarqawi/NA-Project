import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.scss';

const SelectMenu = (props) => {
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
};

export default SelectMenu;
