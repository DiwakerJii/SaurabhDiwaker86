import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useAuth from '../hooks/useAuth';

const GameCard = ({ title, detail, classes, toggleVisibilityLogin }) => {

    const { auth } = useAuth()

    const cardVariant = {
        visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
        hidden: { opacity: 0, scale: 0 }
    };

    const control = useAnimation();
    const [ref, inView] = useInView();


    useEffect(() => {
        if (inView) {
            control.start("visible");
        } else {
            control.start("hidden");
        }
    }, [control, inView]);

    const handleNotLoggedIn = () => {
        toggleVisibilityLogin(true)
    }

    return (

        <motion.div ref={ref}
            variants={cardVariant}
            initial="hidden"
            animate={control} className={`${classes} bg-cover h-[350px] md:w-[20%] w-full flex flex-col justify-around items-center rounded-xl `}>
            <div className=' rounded-md h-full w-full flex flex-col items-center justify-around'>
                <div className='space-y-4 items-center flex flex-col justify-around'>
                    {/* <img src={card_couple} className='  h-[350px] bg-white shadow-md shadow-gray-500' alt={title} /> */}
                    {/* image in rounded form */}
                    {/* <h1 className='font-poppins text-3xl text-blue-800 font-bold'>{title}</h1> */}
                    {/* <p className='text-center text-'>{detail}</p> */}
                </div>
                <div>
                    {title === 'couple' ?

                        auth?.accessToken != null ?
                            <Link to={`/${title}/gametype`}>
                                <button className='bg-pink-600 shadow-md shadow-black px-6 py-1 rounded-full text-white'> Play</button>
                            </Link>
                            :
                            <button onClick={handleNotLoggedIn} className='bg-pink-600 shadow-md shadow-black px-6 py-1 rounded-full text-white'> Play</button>


                        :
                        <button className='bg-pink-600 shadow-md shadow-black px-6 py-1 rounded-full text-white'> Coming Soon</button>
                    }
                </div>
            </div>
        </motion.div>


    )
}

export default GameCard
