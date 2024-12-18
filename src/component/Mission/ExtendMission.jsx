import React from 'react'
import './Mission.css'
import gif1 from '/gif/mission1.gif'
import gif2 from '/gif/mission2.gif'
import gif3 from '/gif/mission3.gif'

const ExtendMission = () => {
  return (
    <div className='' style={{width:"100%"}} id='mission'>
      {/* <div className='mission-title'>
        <h3 className=' text-2xl xsm:text-2xl jb:text-4xl lg:text-5xl'>OUR MISSION</h3>
      </div> */}
      <div className="mission-wrapper">
        <div className='mission-sections'>
          <div className='section1'>
            <div className='img-wrapper'>
              <img src={gif1} alt="Mission 1"/>
            </div>
            <div className='text-wrapper'>
              <p className="font-ppnue"><span>Struggling</span> with the ever</p>
              <p className="font-ppnue">changing landscape of</p>
              <p className="font-ppnue"><span>Blockchain</span> and<span> Web3?</span></p>
              
            </div>
          </div>
          <div className='section2'>
            <div className='img-wrapper'>
              <img src={gif2} alt="Mission 2"/>
            </div>
            <div className='text-wrapper'>
              <p className="font-ppnue">We're here to help you</p>
              <p className="font-ppnue">tackle <span className="font-ppnue">every challenge</span></p>
              <p className="font-ppnue">along the way.</p>
            </div>
          </div>
          <div className='section3'>
            <div className='img-wrapper'>
              <img src={gif3} alt="Mission 3"/>
            </div>
            <div className='text-wrapper'>
              <p className="font-ppnue">Begin your journey to</p>
              <p className="font-ppnue">digital excellence in</p>
              <p className="font-ppnue"><span className="font-ppnue">Web3</span> right here!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtendMission
