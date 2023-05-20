import React from 'react';
import Head from 'next/head';
// Components
import SelectMenu from '../../components/SelectMenu';
import FadeChildren from '../../components/FadeChildren';
import { useX } from '../../context/xContext';

// Styles
import Styles from '../../styles/containers.module.scss';

const Home = () => {
  const { currentExample, setCurrentExample, examples } = useX();
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
        {
          name: 'Gauss Jordan',
          path: '/methods/gauss-jordan',
        },
        {
          name: 'Cramer',
          path: '/methods/cramer',
        },
      ],
    },
    // {
    //   name: 'Chapter 3',
    //   methods: [
    //     {
    //       name: 'Golden Section',
    //       path: '/methods/golden-section',
    //     },
    //   ],
    // },
  ];

  React.useEffect(() => {
    currentExample && setCurrentExample(null);
  }, []);

  return (
    <>
      <Head>
        <title>Methods</title>
      </Head>
      <div className="page">
        <FadeChildren>
          <div className="center-title">Numerical Analysis Methods</div>
        </FadeChildren>
        <div className={Styles.flexColumnFullWidth}>
          <SelectMenu chapters={Chapters} type="methods" />
        </div>
      </div>
    </>
  );
};

export default Home;
