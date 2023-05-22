import React from 'react';
import {
  bisection,
  falsePosition,
  simpleFixedPoint,
  newton,
  secant,
  gaussElimination,
  luDecomposition,
  cramer,
  gaussJordan,
} from '../utils/Methods.js';
import { app } from '../utils/firebase-config.js';
import { getAnalytics, logEvent } from 'firebase/analytics';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ToastContainer, cssTransition, toast } from 'react-toastify';

const xContext = React.createContext({});

export const useX = () => React.useContext(xContext);

export default function XProvider({ children }) {
  const [lastMethod, setLastMethod] = React.useState(null);
  const [currentExample, setCurrentExample] = React.useState(null);
  const [variables, setVariables] = React.useState({});
  const [settings, setSettings] = React.useState({});
  const [saved, setSaved] = React.useState({});
  const [decimalPoints, setDecimalPoints] = React.useState(3);
  const [withRounding, setWithRounding] = React.useState(false);

  const examples = {
    bisection: [
      {
        fx: '-2 + 7x - 5x^2 + 6x^3',
        xl: 0,
        xu: 1,
        condition: {
          type: 'es',
          value: 10,
        },
      },
      {
        fx: '4x^3 - 6x^2 + 7x - 2.3',
        xl: 0,
        xu: 1,
        condition: {
          type: 'es',
          value: 1,
        },
      },
      {
        fx: 'x^3 - 4x^2 - 8x - 1',
        xl: 2,
        xu: 3,
        condition: {
          type: 'es',
          value: 0.5,
        },
      },
      {
        fx: '-0.6x^2 + 2.4x + 5.5',
        xl: 5,
        xu: 10,
        condition: {
          type: 'es',
          value: 0.5,
        },
      },
      {
        fx: '-13 - 20x + 19x^2 - 3x^3',
        xl: -1,
        xu: 0,
        condition: {
          type: 'it',
          value: 10,
        },
      },
      {
        fx: 'x^3 + 3x - 5',
        xl: 1,
        xu: 2,
        conditionType: 'es',
        es: 2,
        condition: {
          type: 'es',
          value: 2,
        },
      },
      {
        fx: 'x^4 - 8x^3 - 35x^2 + 450x - 1001',
        xl: 4.5,
        xu: 6,
        condition: {
          type: 'es',
          value: 0.1,
        },
      },
      {
        fx: 'x^5 - x^4 - x^3 - 1',
        xl: 1,
        xu: 2,
        conditionType: 'es',
        es: 0.5,
        condition: {
          type: 'es',
          value: 0.5,
        },
      },
      {
        fx: 'x^3 + 2x^2 + 10x - 20',
        xl: 1,
        xu: 2,
        condition: {
          type: 'es',
          value: 4,
        },
      },
      {
        fx: '-26 + 82.3x - 88x^2 + 45.4x^3 - 9x^4 + 0.65x^5',
        xl: 0.5,
        xu: 1,
        condition: {
          type: 'es',
          value: 0.2,
        },
      },
    ],
    simpleFixedPoint: [
      {
        fx: 'sqrt(1.9x + 2.8)',
        x0: 5,
        condition: {
          type: 'es',
          value: 0.7,
        },
      },
    ],
    newton: [
      {
        fx: '-0.9x^2 + 1.7x + 2.5',
        x0: 5,
        condition: {
          type: 'es',
          value: 0.7,
        },
      },
      {
        fx: '(-x)^2 + 1.8x + 2.5',
        x0: 5,
        condition: {
          type: 'it',
          value: 5,
        },
      },
      {
        fx: '2sin(sqrt(x)) - x',
        x0: 0.5,
        es: 0.001,
        conditionType: 'es',
        condition: {
          type: 'es',
          value: 0.001,
        },
      },
      {
        fx: '-12 - 21x + 18x^2 - 2.4x^3',
        x0: 1,
        condition: {
          type: 'es',
          value: 2,
        },
      },
      {
        fx: '-1 + 5.5x -4x^2 + 0.5x^3',
        x0: 5,
        condition: {
          type: 'es',
          value: 5,
        },
      },
    ],
    secant: [
      {
        fx: '0.95x^3 - 5.9x^2 + 10.9x - 6',
        x_1: 2.5,
        x0: 3.5,
        condition: {
          type: 'es',
          value: 0.5,
        },
      },
      {
        fx: '2x^3 - 11.7x^2 + 17.7x - 5',
        x_1: 3,
        x0: 4,
        condition: {
          type: 'es',
          value: 0.5,
        },
      },
      {
        fx: 'x^4 - 3x^2 + 1.5x -3',
        x_1: 1.5,
        x0: 2,
        condition: {
          type: 'es',
          value: 0.01,
        },
      },
      {
        fx: '-1 + 5.5x - 4x^2 + 0.5x^3',
        x_1: 1.5,
        x0: 2,
        condition: {
          type: 'es',
          value: 0.2,
        },
      },
      {
        fx: '-x^3 + 7.89x + 11',
        x_1: 3,
        x0: 5,
        condition: {
          type: 'es',
          value: 0.1,
        },
      },
      {
        fx: '-x^3 + 7.89x + 11',
        x_1: 3,
        x0: 5,
        condition: {
          type: 'es',
          value: 0.1,
        },
      },
      {
        fx: 'x^3 - 6x^2 + 11x - 6.1',
        x_1: 0,
        x0: 0.5,
        condition: {
          type: 'es',
          value: 0.5,
        },
      },
      {
        fx: 'x^7 - 1.5x^2 + 7x - 6',
        x_1: 0,
        x0: 0.5,
        condition: {
          type: 'es',
          value: 0.1,
        },
      },
    ],
    gaussElimination: [
      [
        [2, 1, 1, 8],
        [4, 1, 0, 11],
        [-2, 2, 1, 3],
      ],
      [
        [2, 1, -1, 1],
        [5, 2, 2, -4],
        [3, 1, 1, 5],
      ],
    ],
    cramer: [
      [
        [6, 1, 1, 6],
        [5, 1, 2, 4],
        [4, 1, -1, -2],
      ],
    ],
  };

  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  React.useEffect(() => {
    const tempSaved = JSON.parse(localStorage.getItem('saved'));
    if (tempSaved) {
      setSaved(tempSaved);
    }
    // const analytics = getAnalytics(app);
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

  React.useEffect(() => {
    console.log(currentExample);
  }, [currentExample]);

  const addToSaved = (method, data) => {
    let temp = saved;
    if (temp[method]) temp[method].push(data);
    else temp[method] = [data];
    setSaved(temp);

    localStorage.setItem('saved', JSON.stringify(saved));

    // logEvent(analytics, 'save');

    showMsg('success', 'Saved successfully!');
  };

  const matchMethod = (name, values) => {
    if (name === 'Bisection') return bisection(values);
    else if (name === 'False Position') return falsePosition(values);
    else if (name === 'Simple Fixed Point') return simpleFixedPoint(values);
    else if (name === 'Newton') return newton(values);
    else if (name === 'Secant') return secant(values);
    else if (name === 'Gauss Elimination') return gaussElimination(values);
    else if (name === 'LU Decomposition') return luDecomposition(values);
    else if (name === 'Gauss Jordan') return gaussJordan(values);
    else if (name === 'Cramer') return cramer(values);
  };

  const ToastTransition = cssTransition({
    enter: 'animate__animated animate__fadeInUp animate__faster',
    exit: 'animate__animated animate__fadeOutDown animate__faster',
    appendPosition: false,
    collapse: false,
    collapseDuration: 1,
  });

  const showMsg = (type, msg) => {
    if (type === 'error')
      toast.error(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
    else if (type === 'success')
      toast.success(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
    else if (type === 'info')
      toast.info(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
    else if (type === 'warning')
      toast.warning(msg, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: ToastTransition,
        theme: 'colored',
      });
  };

  const calculate = ({ name, operation, values, validationData, setShowSolution, setData, executeScroll }) => {
    if (operation !== 'setExample') {
      console.log({ name, operation, values, validationData, setShowSolution, setData, executeScroll });

      const isValidData = validationData(
        name === 'Gauss Jordan' || name === 'Gauss Elimination' || name === 'LU Decomposition' || name === 'Cramer'
          ? values.matrix
          : { ...values }
      );

      if (!isValidData.status) {
        setShowSolution(false);
        showMsg('error', isValidData.error);
        return;
      }
    }

    let result = [];

    if (operation === 'save') {
      // logEvent(analytics, 'save');
      if (values.matrix) addToSaved(name.replace(/ /g, ''), values.matrix);
      else addToSaved(name.replace(/ /g, ''), values);
      return;
    }

    if (operation === 'setExample') {
      // logEvent(analytics, 'example');
      result = matchMethod(name, values);
      console.log(result);
    }

    if (operation === 'calculate') {
      // logEvent(analytics, 'calculate');
      result = matchMethod(name, values);
    }

    if (operation === 'calculateFromQuery') {
      // logEvent(analytics, 'calculateFromQuery');
      result = matchMethod(name, values);
    }

    if (result.error) {
      showMsg('warning', result.error);
      setShowSolution(false);
      return;
    }

    setShowSolution(true);
    setData(result);
  };

  const round = (value) => {
    if (value.toString().includes('.')) {
      if (withRounding) {
        return Number(Math.round(value + 'e' + decimalPoints) + 'e-' + decimalPoints);
      } else {
        let tempArr = value.toString().split('.');
        if (tempArr[1]) {
          if (tempArr[1].length > decimalPoints) return Number(tempArr[0] + '.' + tempArr[1].slice(0, decimalPoints));
          else return value;
        }
      }
    } else {
      return value;
    }
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
    decimalPoints,
    setDecimalPoints,
    withRounding,
    setWithRounding,
    round,
    lastMethod,
    setLastMethod,
    showMsg,
    examples,
  };

  return <xContext.Provider value={value}>{children}</xContext.Provider>;
}
