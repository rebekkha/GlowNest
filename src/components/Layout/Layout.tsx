import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/category/women') {
      document.body.setAttribute('data-theme', 'pink');
    } else if (path === '/category/men') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme'); // Defaults to Light
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
