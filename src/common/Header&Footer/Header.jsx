import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Logo />
        </div>
        <div className="header-buttons">
          <Link className="header-button" to="/settings">
            Settings
          </Link>
          <Link className="header-button" to="/">
            Methods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
