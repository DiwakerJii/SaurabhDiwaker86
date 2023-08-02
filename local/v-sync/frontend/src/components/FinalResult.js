import React, { useEffect, useState, useRef } from 'react'
import image from '../assets/test1.jpg'
import image_c from '../assets/test2.jpg'
import { FiDownload } from 'react-icons/fi'
import { VscDebugRestart } from 'react-icons/vsc'
import axios from '../api/axios'
import vsync from '../assets/vsync_logo.png'
import logo from '../assets/logo.png'
import { useLocation } from 'react-router-dom'
import takeScreenshot from '../utils/takeScreenshot'
import { useNavigate } from 'react-router-dom'
import FinalBar from './FinalBar'
import graph from '../assets/graphTest.jpg'
import html2canvas from 'html2canvas'



const FinalResult = () => {

    const PERCENT_URL = '/api/room2/correlation/'
    const INFO_URL = '/api/room2/dashboard/'
    const restart_url = '/api/room2/restart/'
    const [error, setError] = useState('')
    const [percent, setPercent] = useState('')
    const [hostGraph, setHostGraph] = useState('')
    const [joinGraph, setJoinGraph] = useState('')
    const [hostName, setHostName] = useState('')
    const [joinName, setJoinName] = useState('')
    const [joinPic, setJoinPic] = useState('')
    const [hostPic, sethostPic] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const containerRef = useRef(null)
    const roomId = location.state.roomId

    // testing
    // const hostName = "Garima"
    // const joinName = "Rima"
    // const joinPic = image
    // const hostPic = image_c
    // const percent = 60;

    const setMessage = (response) => {
        { response?.data.status == 400 ? setError(response?.data.message) : setPercent(`${Math.round(response?.data?.data.correlation * 100) / 100}`) }
    }

    useEffect(() => {
        // setHostGraph(graph)
        // setJoinGraph(graph)
        // console.log(roomId);

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
                // console.log("inside percentage");
                // console.log(response?.data);
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
                // console.log("inside dashboard");
                // console.log(response?.data);
                // hostName = response?.data?.data.host_name
                setHostName(response?.data?.data.host_name)
                setJoinName(response?.data?.data.join_name)
                sethostPic(`data:graph/jpg;base64,${response?.data?.data.host_image_string}`)
                setJoinPic(`data:graph/jpg;base64,${response?.data?.data.join_image_string}`)
                setHostGraph(`data:graph/jpg;base64,${response?.data?.data.host_spectrogram_string}`)
                setJoinGraph(`data:graph/jpg;base64,${response?.data?.data.join_spectrogram_string}`)
                console.log(hostPic);
                console.log(joinName);


            } catch (error) {
                console.log(error);
            }
        }

        percentage()
        // console.log(percent);
    }, [error, percent, hostGraph, joinGraph, hostName, hostPic, joinName, joinPic])

    const handleCaptureClick = async () => {

        const container = containerRef.current;

        html2canvas(container).then((canvas) => {
            const screenshot = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = screenshot;
            downloadLink.download = 'screenshot.png';
            downloadLink.click();
        });
    };

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


    return (
        <div ref={containerRef} id='screenshot-container' className='flex flex-col min-h-[100vh] w-full bg-couple_bg md:px-28 py-4' >
            <div className='flex w-full items-end md:justify-end space-x-5 pb-32 justify-center md:pb-0 z-10'>
                {/* <FiDownload onClick={() => { takeScreenshot(ss_ref.current, 'Vsync') }} style={{ fontSize: '40px' }} className='font-bold text-purple-700 bg-pink-400/50 p-1 rounded-md' /> */}
                {/* <FiDownload onClick={handleCaptureClick} style={{ fontSize: '40px' }} className='font-bold text-purple-700 bg-pink-400/50 p-1 rounded-md' /> */}
                <p onClick={restart} className='text-purple-700 bg-pink-400/50 p-3 rounded-md text-2xl font-bold' >Restart</p>
            </div>
            <div className='flex flex-1 w-full items-center h-[50%] justify-around md:flex-row flex-col'>
                <div className='w-full flex items-center flex-col'>
                    <img src={hostPic} className='md:-rotate-[12deg] border-8 border-purple-600 md:h-[200px] md:w-[250px]' alt='host_pic' />
                    <p className='md:-rotate-[12deg] text-3xl text-purple-700 font-bold'>{hostName}</p>
                </div>
                <div className='w-full flex items-center flex-col '>
                    <img src={joinPic} className='md:rotate-[12deg] border-8 border-purple-600 md:h-[200px] md:w-[250px]' alt='joinPic' />
                    <p className='md:rotate-[12deg] text-3xl text-purple-700 font-bold'>{joinName}</p>
                </div>

            </div>
            <div className='flex md:mt-10 mt-24 justify-between items-center flex-1 w-full'>
                <div className='w-full flex justify-center'>
                    <img src={hostGraph} alt='host-graph' className='rounded-full md:h-[100px] md:w-[150px]' />
                </div>
                <div className='w-full items-center md:flex md:flex-col hidden justify-around p-3'>
                    <p className='text-8xl text-purple-700 font-bold '>{percent}%</p>
                    <FinalBar percent={percent} />
                    <p className='text-4xl text-red-700 font-bold text-center'>{error}</p>

                </div>
                <div className='w-full flex justify-center'>
                    <img src={joinGraph} alt='join-graph' className='rounded-full md:h-[100px] md:w-[150px]' />
                </div>
            </div>
            {/* <div className='w-full flex justify-center'>
                
            </div> */}
            <div className='w-full items-center md:hidden flex flex-col justify-around p-5 space-y-3'>
                {percent === '' ?
                    <p className='md:text-6xl text-2xl text-red-700 font-bold w-full text-center '>{error}</p>
                    :
                    <p className='md:text-6xl text-4xl text-purple-700 font-bold w-full text-center '>{percent}%</p>
                }
                <FinalBar percent={percent} />
            </div>
            <div className='flex items-center justify-between bg-pink-400/40 p-4 rounded-lg'>
                <img src={vsync} alt='v-sync' className='w-24 h-16' />
                <img src={logo} alt='v-sync' className='w-24 h-16' />
            </div>
        </div>

    )
}

export default FinalResult
