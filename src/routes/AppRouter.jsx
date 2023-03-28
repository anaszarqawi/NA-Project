import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// components
import Home from '../pages/Home/Home';
import Header from '../common/Header&Footer/Header';
import Footer from '../common/Header&Footer/Footer';
import Settings from '../pages/Settings/Settings';

// Methods
import Bisection from '../pages/Methods/Bisection/Bisection';
import FalsePosition from '../pages/Methods/FalsePosition/FalsePosition';
import SimpleFixedPoint from '../pages/Methods/SimpleFixedPoint/SimpleFixedPoint';
import Newton from '../pages/Methods/Newton/Newton';
import Secant from '../pages/Methods/Secant/Secant';
import GaussElimination from '../pages/Methods/GaussElimination/GaussElimination';

const AppRouter = () => {
  const routes = [
    {
      path: '/',
      component: <Home />,
    },
    {
      path: '/settings',
      component: <Settings />,
    },
    {
      path: '/bisection-method',
      component: <Bisection />,
    },
    {
      path: '/false-position-method',
      component: <FalsePosition />,
    },
    {
      path: '/simple-fixed-point-method',
      component: <SimpleFixedPoint />,
    },
    {
      path: '/newton-raphson-method',
      component: <Newton />,
    },
    {
      path: '/secant-method',
      component: <Secant />,
    },
    {
      path: '/gauss-elimination-method',
      component: <GaussElimination />,
    },
    {
      path: '/lu-decomposition-method',
      component: <GaussElimination />,
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
      <ToastContainer limit={3} />
      <Footer />
    </Router>
  );
};

export default AppRouter;
