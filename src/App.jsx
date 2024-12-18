import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Border from './component/Border/Border';
import Root from './component/MarmaAdmin/components/Auth/Root';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth <= 900; // Adjust the width as needed (e.g., 480 for smaller screens)

    if (isMobile && location.pathname.startsWith('/admin')) {
      // Redirect to a PC/laptop recommendation page or show a message
      document.body.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center;">
                                    <h1>Please use a PC or laptop to view this site.</h1>
                                  </div>`;
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Border />} />
        <Route path="/admin/*" element={<Root />} />
      </Routes>
    </>
  );
};

export default App;
