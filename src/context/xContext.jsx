import React from 'react';
import { bisection, falsePosition, simpleFixedPoint, newton, secant } from '../pages/Methods/Methods';
// import { app } from '../utils/firebase-config.js';
// import { getAnalytics, logEvent } from 'firebase/analytics';

const xContext = React.createContext({});

export const useX = () => React.useContext(xContext);

export default function XProvider({ children }) {
  const [currentExample, setCurrentExample] = React.useState();
  const [variables, setVariables] = React.useState({});
  const [settings, setSettings] = React.useState({});
  const [saved, setSaved] = React.useState(JSON.parse(localStorage.getItem('saved')) || {});
  const [isSaved, setIsSaved] = React.useState(false);

  const addToSaved = (method, data) => {
    let temp = saved;
    if (temp[method]) temp[method].push(data);
    else temp[method] = [data];
    setSaved(temp);

    // logEvent(analytics, 'save', {
    //   method: method,
    //   data: data,
    // });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
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

  const matchMethod = (name, values) => {
    if (name === 'Bisection') return bisection(values);
    else if (name === 'False Position') return falsePosition(values);
    else if (name === 'Simple Fixed Point') return simpleFixedPoint(values);
    else if (name === 'Newton') return newton(values);
    else if (name === 'Secant') return secant(values);
  };

  const calculate = (props) => {
    if (!props.operation === 'setExample') {
      const isValidData = props.validationData();
      if (!isValidData.status) {
        props.setShowSolution(false);
        props.setErrorMsg(isValidData.error);
        return;
      }
    }

    if (props.operation === 'addToSaved') {
      const isValidData = props.validationData();
      if (!isValidData.status) {
        props.setShowSolution(false);
        props.setErrorMsg(isValidData.error);
        return;
      }
      addToSaved(props.name.replace(/ /g, ''), props.values);
      return;
    }

    const result =
      props.operation === 'setExample' ? matchMethod(props.name, props.example) : matchMethod(props.name, props.values);

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
