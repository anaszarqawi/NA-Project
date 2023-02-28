import React from 'react';
import $ from 'jquery';

const xContext = React.createContext({});

export const useX = () => React.useContext(xContext);

export default function XProvider({ children }) {
  const [currentExample, setCurrentExample] = React.useState();

  const value = {
    currentExample,
    setCurrentExample,
  };

  return <xContext.Provider value={value}>{children}</xContext.Provider>;
}
