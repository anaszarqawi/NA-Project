/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import Button from '../components/Button';

// Context
import { useX } from '../context/xContext';

// Assets
import Logo from '../assets/svg/logo.svg';
import LightIcon from '../assets/svg/lightIcon';
import DarkIcon from '../assets/svg/darkIcon';
import SettingsIcon from '../assets/svg/settingsIcon';
import FunctionIcon from '../assets/svg/functionIcon';
import InfoIcon from '../assets/svg/infoIcon';
import HistoryIcon from '../assets/svg/historyIcon';
import BookmarkIcon from '../assets/svg/bookmarkIcon';
import BookmarksIcon from '../assets/svg/bookmarksIcon';

const Header = () => {
  const router = useRouter();
  const { lastMethod } = useX();
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = React.useState('light');
  // const [themeLabel, setThemeLabel] = React.useState('Dark');

  // React.useEffect(() => {
  //   if (theme === 'dark') setTheme('dark');
  //   else setTheme('light');
  // }, []);

  const menuItems = [
    {
      name: 'Settings',
      path: '/settings',
      icon: <SettingsIcon />,
    },
    {
      name: 'History',
      path: '/history',
      icon: <HistoryIcon />,
    },
    {
      name: 'Saved',
      path: '/saved',
      icon: <BookmarksIcon />,
    },

    {
      name: 'Methods',
      path: '/methods',
      icon: <FunctionIcon />,
    },
  ];

  React.useEffect(() => {
    if (theme !== 'system') setMode(theme);
    else setMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, [theme]);

  return (
    <div className="header">
      <div className="header-container">
        <Link href="/">
          <div className="logo">
            <Logo />
          </div>
        </Link>
        <div className="header-buttons">
          {menuItems.map((item) => (
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <Link className={`header-button ${router.pathname === item.path && 'active-page'}`} href={item.path}>
              {item.icon && <div className="header-button-icon">{item.icon}</div>}
              {/* <div className="header-button-text">{item.name}</div> */}
            </Link>
          ))}
          <div
            className="header-button header-button-static"
            onClick={() => (mode === 'dark' ? setTheme('light') : setTheme('dark'))}>
            <div className="header-button-icon">{mode === 'dark' ? <LightIcon /> : <DarkIcon />}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
