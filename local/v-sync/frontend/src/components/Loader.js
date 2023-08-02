import React, { useEffect, useState } from 'react'
import gif from '../assets/loader_gif.gif'
import { useNavigate, useParams, useLocation, redirect } from 'react-router-dom'
import Typewriter from 'typewriter-effect';
import useAuth from '../hooks/useAuth';

const Loader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [textCompleted, setTextCompleted] = useState(false)
    // const imgSrc = location.state?.imgSrc
    // const user1_name = location.state?.user1_name
    // const user2_name = location.state?.user2_name
    const roomId = location.state?.roomId
    // const joinName = location.state?.joinName
    // const hostName = location.state?.hostName
    // const joinPic = location.state?.joinPic
    // const hostPic = location.state?.hostPic

    const token = localStorage.getItem("token")
    // console.log(token);
    return (
        <div className=' flex w-full h-[100vh] items-center justify-around bg-couple_bg text-fuchsia-500 text-5xl leading-7 font-ysa font-bold'>
            {/* { */}
            {/* setTimeout(() => { */}
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.typeString('Thank you for trying the V-sync')
                        .pauseFor(2500)
                        .deleteAll()
                        .typeString('Wait')
                        .deleteAll()
                        .typeString('Until')
                        .deleteAll()
                        .typeString('Voices are')
                        .deleteAll()
                        .typeString('Syncing')
                        .start()
                        .callFunction(() => {
                            { console.log("hii") }
                            token != ''
                                ?

                                navigate(`/${params.cat}/${params.type}/result`, { state: { roomId: roomId } })

                                : navigate('/')
                        })
                }}
            />
            {/* {setTextCompleted(true)}
            {textCompleted && <p>proceed</p>} */}
            {/* }, 6000) */}
            {/* } */}


        </div>
    )
}

export default Loader
