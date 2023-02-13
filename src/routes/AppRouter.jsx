import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components
import Home from '../pages/Home/Home';
import Header from '../common/Header/Header';

// Methods
import Bisection from '../pages/Methods/Bisection/Bisection';

const AppRouter = () => {
  const routes = [
    {
      path: '/',
      component: <Home />,
    },
    {
      path: '/bisection-method',
      component: <Bisection />,
    },
  ];

  return (
    <Router>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
