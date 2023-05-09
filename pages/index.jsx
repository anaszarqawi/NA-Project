import React from 'react';
import Head from 'next/head';
import Styles from '../styles/classes.module.scss';

// Components
import SelectMenu from '../components/SelectMenu';

const Home = () => {
  const Chapters = [
    {
      name: 'Chapter 1',
      methods: [
        {
          name: 'Bisection',
          path: '/methods/bisection',
        },
        {
          name: 'False Position',
          path: '/methods/false-position',
        },
        {
          name: 'Simple Fixed Point',
          path: '/methods/simple-fixed-point',
        },
        {
          name: 'Newton',
          path: '/methods/newton',
        },
        {
          name: 'Secant',
          path: '/methods/secant',
        },
      ],
    },
    {
      name: 'Chapter 2',
      methods: [
        {
          name: 'Gauss Elimination',
          path: '/methods/gauss-elimination',
        },
        {
          name: 'LU Decomposition',
          path: '/methods/gauss-elimination?lu=true',
        },
      ],
    },
  ];

  // methods: ['Gauss Elimination', 'LU Decomposition'],

  return (
    <div className="page">
      <div className={Styles['center-title']}>Numerical Analysis Methods</div>
      <div className="chapters">
        <SelectMenu chapters={Chapters} type="methods" />
      </div>
    </div>
  );
};

export default Home;
