import React, { useState, useEffect, useRef } from 'react';
import './Menu.css';
import { FaXTwitter } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
import { AiOutlineInstagram } from "react-icons/ai";


export default function Menu() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);


  return (
    <div className="hamburger-menu ">
      <button
        onClick={toggleMenu}
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
      </button>

      {isOpen && (

        <nav className="menu-content  bg-[#FFFFFF1A]   rounded-lg  backdrop-blur-md">
          <ul>
            <li>
              <a href="#mission" onClick={toggleMenu}>Mission</a>
            </li>
            <li>
              <a href="#products" onClick={toggleMenu}>Products</a>
            </li>
            <li>
              <a href="#team" onClick={toggleMenu}>Team</a>
            </li>
            <li>
              <a href="#event" onClick={toggleMenu}>Event</a>
            </li>
            <li>
              <a href="#contact" onClick={toggleMenu} className="contact-us">Contact us</a>
            </li>
          </ul>

          <div className="social-icons">
            <a href="#" aria-label="Twitter" className='custom-icon'>
              <img src='/icons/x.png' alt="" />
            </a>
            <a href="#" aria-label="LinkedIn" className='custom-icon'>
              <img src='/icons/linkedin.png' alt="" />
            </a>
            <a href="#" aria-label="Instagram" className='custom-icon'>
              <img src='/icons/insta.png' alt="" />
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}


