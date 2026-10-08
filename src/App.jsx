import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { useAuthStore } from './stores/authStore';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import clsx from 'clsx';

const App = () => {
  const { checkAuth } = useAuthStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;