import React, { useState, useEffect } from 'react'
import { AiOutlineLink } from 'react-icons/ai'
import { TbCameraSelfie } from 'react-icons/tb'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { MdOutlineRecordVoiceOver } from 'react-icons/md'
import { IoMdSync } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'
import Selfie from './dashboard/Selfie'
import SelfieInstant from './dashboard/SelfieInstant'
import Questions from './dashboard/Questions'
import QuestionsInstant from './dashboard/QuestionsInstant'
import Audio from './dashboard/Audio'
import AudioInstant from './dashboard/AudioInstant'
import Result from './dashboard/Result'
import ResultInstant from './dashboard/ResultInstant'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from '../api/axios'

// import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
// import { w3cwebsocket } from 'websocket'

const Dashboard = ({ imgSrc, roomId, selfieComponent, setSelfieComponent, questionComponent, setQuestionComponent, audioComponent, setAudioComponent, resultComponent, setResultComponent }) => {
    const params = useParams()
    const location = useLocation()
    const [user1_name, setUser1Name] = useState('')
    const [user2_name, setUser2Name] = useState('')
    const URL = '/api/room2/dashboard/'
    const [hostName, setHostName] = useState('Waiting for other user to join')
    const [joinName, setJoinName] = useState('Waiting for other user to join')
    const [joinPic, setJoinPic] = useState('')
    const [hostPic, setHostPic] = useState('')


    useEffect(() => {
        console.log('effect rendered');
        const fetchingData = async () => {
            try {

                const response = await axios.post(
                    URL,
                    JSON.stringify({ room_id: roomId }),
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                console.log(response?.data);
                if (response?.data?.data?.host_name != null) {
                    console.log(response?.data?.data.host_name);
                    setHostName(response?.data?.data.host_name)
                }
                if (response?.data?.data?.host_image_string != null) {
                    setHostPic(`data:graph/jpg;base64,${response?.data?.data.host_image_string}`)
                }
                if (response?.data?.data?.join_name != null) {
                    setJoinName(response?.data?.data?.join_name)
                }
                if (response?.data?.data?.join_image_string != null) {
                    setJoinPic(`data:graph/jpg;base64,${response?.data?.data?.join_image_string}`)
                }

            } catch (err) {
                console.log(err);
            }
        }

        fetchingData()
    })

    useEffect(() => {
        if (params.type != 'instant') {
            setSelfieComponent(<Selfie onCLickQues={onCLickQues} joinName={joinName} hostName={hostName} joinPic={joinPic} hostPic={hostPic} />)
            setQuestionComponent(<Questions roomId={roomId} onClickAudio={onClickAudio} />)
            setAudioComponent(<Audio imgSrc={imgSrc} roomId={roomId} onClickResult={onClickResult} />)
            setResultComponent(<Result roomId={roomId} joinName={joinName} hostName={hostName} joinPic={joinPic} hostPic={hostPic} />)
        } else {
            setUser1Name(location.state.user1_name)
            setUser2Name(location.state.user2_name)
            setSelfieComponent(<SelfieInstant imgSrc={imgSrc} user1_name={user1_name} user2_name={user2_name} onCLickQues={onCLickQues} />)
            setQuestionComponent(<QuestionsInstant roomId={roomId} onClickAudio={onClickAudio} />)
            setAudioComponent(<AudioInstant imgSrc={imgSrc} roomId={roomId} user1_name={user1_name} user2_name={user2_name} onClickResult={onClickResult} />)
            setResultComponent(<Result roomId={roomId} />)
        }

    }, [user1_name, user2_name, joinName, joinPic, hostName, hostPic])



    const code = roomId
    // console.log(code);
    // usestates for each page
    const [selfieComp, setSlefieComp] = useState(true)
    const [quesComp, setQuesComp] = useState(false)
    const [audioComp, setAudioComp] = useState(false)
    const [resultComp, setResultComp] = useState(false)
    const [messageVisible, toggleMessageVisibility] = useState(false)
    const [linkVisible, togglelinkVisibility] = useState(false)

    useEffect(() => {
        { linkVisible ? console.log('visible') : console.log('NotVisible'); }
    }, [linkVisible])

    const copy = () => {
        navigator.clipboard.writeText(code);
        toggleMessageVisibility(true)

        setTimeout(() => {
            toggleMessageVisibility(false)
        }, 1000)
    }

    const handleCross = () => {
        togglelinkVisibility(false)
    }

    // toggle visibility funcions for each page

    const onClickLink = () => {

        togglelinkVisibility((current) => !current)

    }

    const onClickSelfie = () => {
        setSlefieComp(true)
        setQuesComp(false)
        setAudioComp(false)
        setResultComp(false)
    }

    const onCLickQues = () => {
        setSlefieComp(false)
        setQuesComp(true)
        setAudioComp(false)
        setResultComp(false)
    }

    const onClickAudio = () => {
        setSlefieComp(false)
        setQuesComp(false)
        setAudioComp(true)
        setResultComp(false)
    }

    const onClickResult = () => {
        setSlefieComp(false)
        setQuesComp(false)
        setAudioComp(false)
        setResultComp(true)
    }


    const items = [
        {
            id: '1',
            title: 'Link',
            // put vsyn logo here
            icon: <AiOutlineLink />,
            click: onClickLink,

        },
        {
            id: '2',
            title: 'Selfie',
            icon: <TbCameraSelfie />,
            click: onClickSelfie,
        },
        {
            id: '3',
            title: 'Questions',
            icon: <RiQuestionAnswerFill />,
            click: onCLickQues,
        },
        {
            id: '4',
            title: 'Record Audio',
            icon: <MdOutlineRecordVoiceOver />,
            click: onClickAudio,
        },
        {
            id: '5',
            title: 'Result',
            icon: <IoMdSync />,
            click: onClickResult,
        }
    ]

    return (
        <div className='flex w-full'>
            {/* <button onClick={sendData}>hii</button> */}
            {
                linkVisible && <div className='w-full h-[100vh] bg-slate-600/70 absolute flex items-center justify-around z-10 '>
                    <div className='flex flex-col bg-blue-200 w-fit items-center px-10 border-black border-2 rounded-xl pb-10'>
                        <RxCrossCircled onClick={handleCross} className='mb-7 mt-3 text-slate-600 hover:cursor-pointer hover:rotate-[135deg]' style={{ fontSize: '35px' }} />
                        <h1 className='font-poppins text-xl mb-4 '>Room Code</h1>
                        <p>Please copy the code and share it to your partner.</p>
                        <span className='underline' onClick={copy}>{roomId}</span>
                        {messageVisible && <span className='bg-white/70 rounded-full px-2 p-1 mt-4 font-bold text-slate-800'>Copied</span>}
                    </div>
                </div>

            }
            <div className='flex-col md:space-y-6 bg-pink_1 inline-flex min-h-[100vh] justify-around md:pt-14 pt-8 pb-14 md:px-5 w-fit px-3'>
                {items.map((item) => (
                    <div className="flex items-center p-4 bg-purple-900 rounded-full hover:bg-blue-900" key={item.id} onClick={item.click}>
                        <div style={{ fontSize: '40px', color: 'white' }} >{item.icon}</div>
                        {/* <h1 className='font-poppins'>{item.title}</h1> */}
                    </div>
                ))}
            </div>
            <div className="flex-1 w-full bg-couple_bg">
                {selfieComp && selfieComponent}
                {quesComp && questionComponent}
                {audioComp && audioComponent}
                {resultComp && resultComponent}
            </div>
        </div>

    )
}

export default Dashboard

// bg-pink_2/70