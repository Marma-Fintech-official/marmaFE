import React, { useEffect, useState } from 'react';
import './Home.css';
import Spline from '@splinetool/react-spline';
import Menu from '../Menuicon/Menu';
import logo from '/logo.png';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    // Handle scroll for translateY
    const handleScroll = () => setScrollPosition(window.scrollY);

    // Update scale based on viewport width
    const updateScale = () => {
      if (window.innerWidth >= 1400 && window.innerWidth <= 1700) {
        setScaleFactor(2.5);
      } else if (window.innerWidth >= 1024) {
        setScaleFactor(2.6); // Adjust as needed
      } else if (window.innerWidth >= 768) {
        setScaleFactor(2);
      } else {
        setScaleFactor(1.2); // Default for smaller screens
      }
    };

    handleScroll();
    updateScale(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <section className="home-section min-h-screen">
      <div id="spline-overlay"></div>
      <iframe
        src="https://my.spline.design/energycube-856d259987bc8058b6eb5d42d67f784a/"
        
        style={{
          transform: `scale(${scaleFactor}) translateY(${scrollPosition * 0.5}px)`,
          transformOrigin: 'center',
          transition: 'transform 0.1s ease-out',
          width: '100%', 
          maxWidth: '100%',
          height: '100vh', 
        }}
      ></iframe>
      <div className="logo-comp-wrapper" id="logo-wrapper">
        <img src={logo} alt="Logo" />
      </div>
    </section>
  );
};

export default Home;
