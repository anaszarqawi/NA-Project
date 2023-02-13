import React from 'react';
import { createRoot } from 'react-dom/client';

// components
import App from './App';

const MainContent = () => {
  return <App />;
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<MainContent />);
