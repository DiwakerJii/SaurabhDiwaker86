import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import vsync from '../assets/vsync_logo.png'
import techatriocare from '../assets/logo.png'
import axios from '../api/axios'
import { FiDownload } from 'react-icons/fi'
import { VscDebugRestart } from 'react-icons/vsc'
import takeScreenshot from '../utils/takeScreenshot'
import logo from '../assets/logo.png'
import FinalBar from './FinalBar'



const FinalResultInstant = () => {
    const PERCENT_URL = '/api/instant/correlation/'
    const INFO_URL = '/api/instant/dashboard/'
    const restart_url = '/api/instant/restart/'
    const location = useLocation()
    const navigate = useNavigate()
    const ss_ref = useRef()
    const [user1, setUser1] = useState('')
    const [user2, setUser2] = useState('')
    const [graphUser1, setGraphUser1] = useState()
    const [graphUser2, setGraphUser2] = useState()
    const [userImage, setUserImage] = useState()
    // const user1_name = location.state.user1_name
    // const user2_name = location.state.user2_name

    const roomId = location.state.roomId
    const [error, setError] = useState('')
    const [percent, setPercent] = useState('')

    const setMessage = (response) => {
        { response?.data.status == 400 ? setError(response?.data.message) : setPercent(`${Math.round(response?.data?.data.correlation * 100) / 100}`) }
    }

    const restart = async () => {
        try {
            const response = await axios.post(restart_url,
                JSON.stringify({
                    room_id: roomId
                }),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response?.data);

        } catch (error) {
            console.log(error);
        }

        navigate('/')

    }

    useEffect(() => {
        const percentage = async () => {
            try {
                const response = await axios.post(
                    PERCENT_URL,
                    JSON.stringify({ room_id: roomId }),
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')} `,
                            'Content-Type': 'application/json'
                        }

                    }
                )

                console.log(response?.data.status);
                setMessage(response)

            } catch (err) {
                console.log(err);
            }

            try {
                const response = await axios.post(
                    INFO_URL,
                    JSON.stringify({ room_id: roomId }),
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')} `,
                            'Content-Type': 'application/json'
                        }

                    }
                )

                console.log(response?.data);
                setUser1(response?.data?.data.user1_name)
                setUser2(response?.data?.data.user2_name)
                setGraphUser1(`data:graph/jpg;base64,${response?.data?.data.user1_spectrogram_string}`)
                setGraphUser2(`data:graph/jpg;base64,${response?.data?.data.user2_spectrogram_string}`)
                setUserImage(`data:graph/jpg;base64,${response?.data?.data.user_image}`)
            } catch (error) {
                console.log(error);
            }
        }

        percentage()
        console.log(user1);

    }, [error, percent, userImage, user1, user2])


    return (


        <div className='flex justify-between flex-col p-7 bg-couple_bg min-h-screen' ref={ss_ref}>
            <div className='flex w-full items-end md:justify-end space-x-5 justify-center md:pb-0'>
                {/* <FiDownload onClick={() => { takeScreenshot(ss_ref.current, 'Vsync') }} style={{ fontSize: '36px' }} className='font-bold text-fuchsia-600 bg-pink-400/50 p-1 rounded-md' /> */}
                <VscDebugRestart onClick={restart} style={{ fontSize: '36px', fontWeight: 'bold' }} className='text-fuchsia-600 bg-pink-400/50 p-1 rounded-md' />
            </div>
            <div className='flex flex-col w-full md:space-x-10 space-y-10'>
                <div className='w-full flex items-center flex-col justify-around mt-10'>
                    <img src={userImage} className='border-8 border-purple-600 md:h-[200px] md:w-[250px] h-[150px] w-[200px]' alt='host_pic' />
                    <p className='text-purple-700 font-ysa md:text-5xl text-2xl mt-5 font-bold'>{user1} & {user2}</p>
                </div>
                <div className='flex items-center justify-center md:space-y-0 space-y-10 md:flex-row flex-col'>
                    <div className='w-full flex justify-center flex-col items-center'>
                        <img src={graphUser1} alt='host-graph' className='rounded-full md:h-[100px] md:w-[150px] h-[150px] w-[200px]' />
                        <p className='text-purple-700 font-ysa md:text-3xl text-2xl mt-5 font-bold'>{user1}</p>
                    </div>
                    {percent === '' ?
                        <p className='md:text-5xl text-2xl text-red-700 font-bold w-full text-center'>{error}</p>
                        :
                        <div className='flex flex-col items-center justify-center '>
                            <p className='md:text-7xl text-6xl text-purple-700 font-bold w-full text-center '>{percent}%</p>
                            <FinalBar percent={percent} />
                        </div>
                    }
                    <div className='w-full flex justify-center flex-col items-center'>
                        <img src={graphUser2} alt='host-graph' className='rounded-full md:h-[100px] md:w-[150px] h-[150px] w-[200px]' />
                        <p className='text-purple-700 font-ysa md:text-3xl text-2xl mt-5 font-bold'>{user2}</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between bg-pink-400/40 p-4 rounded-lg'>
                <img src={vsync} alt='v-sync' className='w-24 h-16' />
                <img src={logo} alt='v-sync' className='w-24 h-16' />
            </div>
        </div>

    )
}

export default FinalResultInstant
