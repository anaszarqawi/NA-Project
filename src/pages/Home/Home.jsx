import React from 'react';
import './style.scss';
import SelectMenu from '../components/SelectMenu/SelectMenu';

const Home = () => {
  const Chapters = [
    {
      name: 'Chapter 1',
      methods: [
        {
          name: 'Bisection',
        },
        {
          name: 'False Position',
        },
        {
          name: 'Fixed Point',
        },
        {
          name: 'Newton Raphson',
        },
        {
          name: 'Secant',
        },
      ],
    },
  ];

  return (
    <div className="page">
      <div className="center-title">Choose The Method :)</div>
      <div className="chapters">
        <SelectMenu chapters={Chapters} type="methods" />
      </div>
    </div>
  );
};

export default Home;
