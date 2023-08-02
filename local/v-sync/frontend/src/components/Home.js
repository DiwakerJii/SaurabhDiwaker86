import React from 'react'
import Navbar from './Navbar'
import Login from './Login'
import Logout from './Logout'
import { Hero, CTA, Contact } from './'
import { useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import HealthQuestions from './HealthQuestions'

const Home = ({ loginIsVisible, toggleVisibilityLogin, logoutIsVisible, toggleVisibilityLogout }) => {

    const [healthQuesVisible, toggleHealthQuestion] = useState(true)
    const ref_cta = useRef(null)
    const { auth } = useAuth()
    return (

        <>
            <div className='min-h-[50%] w-[50%] overflow-auto'>
                {auth?.health_related_info === 'No' ? healthQuesVisible && <HealthQuestions toggleHealthQuestion={toggleHealthQuestion} /> : <></>}
            </div>
            <Navbar toggleVisibilityLogin={toggleVisibilityLogin} toggleVisibilityLogout={toggleVisibilityLogout} />
            <div className="z-10 flex fixed top-10 w-full items-center justify-center">
                {loginIsVisible && <Login toggleVisibility={toggleVisibilityLogin} />}
                {logoutIsVisible && <Logout toggleVisibility={toggleVisibilityLogout} />}
            </div>
            <Hero ref_cta={ref_cta} />
            <CTA ref_cta={ref_cta} toggleVisibility={toggleVisibilityLogin} />
            <Contact />
        </>
    )
}

export default Home
