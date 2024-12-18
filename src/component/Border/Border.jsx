import React from 'react'
import Team from '../Team/Team'
import Explore from '../Explore/Explore'
import Bgvedio from '../Bg-vedio/Bgvedio'
import Contact from '../contact/Contact'
import Openings from '../Openings/Openings'
import ExtendMission from '../Mission/ExtendMission'
import Menu from '../Menuicon/Menu'
import Extendproduct from '../Product/Extendproduct'
import Home from '../Home/Home'
import Example from '../ExtendProduct/File'
const Border = () => {
    return (
        <>
            <div>
                <Menu/>
                <Home/>
                <Bgvedio/>
                <ExtendMission/>
                <Extendproduct/>
                <Team />
                <Openings />
                <Explore />
                <Contact />
            </div>
        </>
    )
}
export default Border