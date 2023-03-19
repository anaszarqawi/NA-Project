import React from 'react';
// import { app } from '../utils/firebase-config.js';
// import { getAnalytics, logEvent } from 'firebase/analytics';

const xContext = React.createContext({});

export const useX = () => React.useContext(xContext);

export default function XProvider({ children }) {
  const [currentExample, setCurrentExample] = React.useState();
  const [variables, setVariables] = React.useState({});
  const [settings, setSettings] = React.useState({});
  const [saved, setSaved] = React.useState(JSON.parse(localStorage.getItem('saved')) || {});

  const addToSaved = (method, data) => {
    if (saved[method]) {
      saved[method].push(data);
    } else {
      saved[method] = [data];
    }
  };

  React.useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(saved));
  }, [saved]);

  // const analytics = getAnalytics(app);

  React.useEffect(() => {
    if (window.location.pathname === '/settings') {
      document.title = 'Settings';
      return;
    }

    if (window.location.pathname === '/') {
      document.title = 'Home';
      return;
    }

    document.title = window.location.pathname
      .slice(1)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }, []);

  const value = {
    currentExample,
    setCurrentExample,
    variables,
    setVariables,
    settings,
    setSettings,
    saved,
    addToSaved,
  };

  return <xContext.Provider value={value}>{children}</xContext.Provider>;
}
