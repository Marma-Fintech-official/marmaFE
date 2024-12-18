import React from 'react';
import './Bgvedio.css'

const Bgvedio = () => {
  return (
    <>
      <div className="video-container min-h-screen relative" >
        <div className='linear-bg min-h-screen'>
          <video autoPlay loop muted playsInline className="background-video">
            <source src='/vedio/Bgvedio.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='flex items-center justify-center py-56 px-4'>
            <div className="content " id='animate-word'>
              <p className='font-ppnue '>  "Redifining  global <br /> engagement in digital <br /> world with <span style={{ color: 'rgb(239, 235, 235)' }}> Web3 innovation"</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bgvedio;





