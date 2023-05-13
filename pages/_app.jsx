import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Context
import XProvider from '../context/xContext';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <XProvider>
      <main id="app">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
      <ToastContainer bodyClassName="toast-body" toastClassName="toast" limit={3} />
    </XProvider>
  );
};

export default App;
