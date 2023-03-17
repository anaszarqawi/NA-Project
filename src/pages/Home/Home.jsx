import React from 'react';
import './style.scss';
import SelectMenu from '../components/SelectMenu/SelectMenu';

const Home = () => {
  React.useEffect(() => {
    document.title = 'Numerical Analysis Methods';
  }, []);

  const Chapters = [
    {
      name: 'Chapter 1',
      methods: ['Bisection', 'False Position', 'Simple Fixed Point', 'Newton Raphson', 'Secant'],
    },
    {
      name: 'Chapter 2',
      methods: ['Gauss Elimination', 'LU Decomposition'],
    },
  ];

  return (
    <div className="page">
      <div className="center-title">Numerical Analysis Methods</div>
      <div className="chapters">
        <SelectMenu chapters={Chapters} type="methods" />
      </div>
    </div>
  );
};

export default Home;
