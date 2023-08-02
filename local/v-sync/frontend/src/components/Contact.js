import React from 'react'
import logo from '../assets/logo.png'
import { FaLinkedin, FaInstagram } from 'react-icons/fa'
import { BsFillSuitHeartFill } from 'react-icons/bs'
import { ImLink } from 'react-icons/im'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <section id='contact' className='bg-slate-900'>
            <div className='flex justify-between items-center p-10'>
                <div className='flex flex-col items-center '>
                    <img src={logo} alt='tech atriocare' className='max-w-[200px]' />
                    <div>
                        <p className='text-white mt-4'>Made with <BsFillSuitHeartFill style={{ color: 'red', display: 'inline' }} /> in IIT Delhi</p>
                    </div>
                </div>
                <div className='flex flex-row space-x-4 pr-4 items-center text-white'>
                    <Link to='https://instagram.com/tech.atriocare?igshid=YmMyMTA2M2Y=' target="_blank">
                        <FaInstagram style={{ fontSize: '30px' }} />
                    </Link>
                    <Link to="https://www.linkedin.com/company/tech-atriocare/" target="_blank">
                        <FaLinkedin style={{ fontSize: '30px' }} />
                    </Link>
                    <Link to="https://www.techatriocare.com/" target="_blank">
                        <ImLink style={{ fontSize: '25px' }} />
                    </Link>


                </div>
            </div>

        </section>
    )
}

export default Contact
