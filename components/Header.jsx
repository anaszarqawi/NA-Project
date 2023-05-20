/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Context
import { useX } from '../context/xContext';

// Assets
import Logo from '../assets/svg/logo.svg';

const Header = () => {
  const router = useRouter();
  const { lastMethod } = useX();

  const menuItems = [
    {
      name: 'Settings',
      path: '/settings',
    },
    {
      name: 'Methods',
      path: '/methods',
    },
  ];

  return (
    <div className="header">
      <div className="header-container">
        <Link href="/">
          <div className="logo">
            <Logo />
          </div>
        </Link>
        <div className="header-buttons">
          {lastMethod !== null && router.pathname === '/settings' && (
            <Link className="header-button" href={`/${lastMethod}`}>
              Back
            </Link>
          )}
          {menuItems.map((item) => (
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <Link className={`header-button ${router.pathname === item.path && 'active-page'}`} href={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
