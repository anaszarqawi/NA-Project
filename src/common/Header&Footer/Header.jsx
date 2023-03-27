import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './style.scss';

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};

const Header = () => {
  const menuItems = [
    {
      name: 'Settings',
      path: '/settings',
    },
    {
      name: 'Methods',
      path: '/',
    },
  ];

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Logo />
        </div>
        <div className="header-buttons">
          {menuItems.map((item) => (
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <Link className={`header-button ${usePathname() === item.path && 'active-page'}`} to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
