import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

// Context
import XProvider from '../context/xContext';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTopBtn from '../components/BackToTopBtn';

// Styles
import '../styles/globals.scss';
import '../styles/header_footer.scss';
import '../styles/selectMenu.scss';
import '../styles/classes.scss';
import '../styles/matrix.scss';
import '../styles/xsValues.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Numerical Analysis Methods</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <XProvider>
        <ThemeProvider attribute="class">
          <main id="app">
            <Header />
            <Component {...pageProps} />
            <Footer />
            <BackToTopBtn />
          </main>
          <ToastContainer bodyClassName="toast-body" toastClassName="toast" limit={3} />
        </ThemeProvider>
      </XProvider>
    </>
  );
};

export default App;
