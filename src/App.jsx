import AppRouter from './routes/AppRouter';
import XContextProvider from './context/xContext';

// Styles
import './common/constants.scss';
import './style.scss';
import './pages/Methods/style.scss';

function App() {
  return (
    <XContextProvider>
      <AppRouter />
    </XContextProvider>
  );
}

export default App;
