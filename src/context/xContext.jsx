import React from 'react';
import { bisection, falsePosition, simpleFixedPoint, newton, secant } from '../pages/Methods/Methods';
import { app } from '../utils/firebase-config.js';
import { getAnalytics, logEvent } from 'firebase/analytics';

import { ToastContainer, toast } from 'react-toastify';

const xContext = React.createContext({});

export const useX = () => React.useContext(xContext);

export default function XProvider({ children }) {
  const [currentExample, setCurrentExample] = React.useState();
  const [variables, setVariables] = React.useState({});
  const [settings, setSettings] = React.useState({});
  const [saved, setSaved] = React.useState({});
  const [isSaved, setIsSaved] = React.useState(false);

  const addToSaved = (method, data) => {
    let temp = saved;
    if (temp[method]) temp[method].push(data);
    else temp[method] = [data];
    setSaved(temp);

    localStorage.setItem('saved', JSON.stringify(saved));

    logEvent(analytics, 'save');

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const analytics = getAnalytics(app);

  React.useEffect(() => {
    const tempSaved = JSON.parse(localStorage.getItem('saved'));
    if (tempSaved) {
      setSaved(tempSaved);
    }
  }, []);

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

  const matchMethod = (name, values) => {
    if (name === 'Bisection') return bisection(values);
    else if (name === 'False Position') return falsePosition(values);
    else if (name === 'Simple Fixed Point') return simpleFixedPoint(values);
    else if (name === 'Newton') return newton(values);
    else if (name === 'Secant') return secant(values);
  };

  const calculate = (props) => {
    if (props.operation !== 'setExample') {
      const isValidData = props.validationData();
      if (!isValidData.status) {
        props.setShowSolution(false);
        // props.setErrorMsg(isValidData.error);
        toast.error(isValidData.error);
        return;
      }
    }

    let result = [];

    if (props.operation === 'addToSaved') {
      addToSaved(props.name.replace(/ /g, ''), props.values);
      return;
    }

    if (props.operation === 'setExample') {
      logEvent(analytics, 'example');
      result = matchMethod(props.name, props.values);
    }

    if (props.operation === 'calculate') {
      logEvent(analytics, 'calculate');
      result = matchMethod(props.name, props.values);
    }

    props.setErrorMsg('');
    props.setShowSolution(true);
    props.setData(result);
    props.executeScroll();
  };

  const value = {
    currentExample,
    setCurrentExample,
    variables,
    setVariables,
    settings,
    setSettings,
    saved,
    setSaved,
    addToSaved,
    calculate,
    isSaved,
  };

  return <xContext.Provider value={value}>{children}</xContext.Provider>;
}
